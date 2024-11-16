'use client';

import {  FormEvent, useRef, useState } from 'react';
import type { DirectionsResponseData, FindPlaceFromTextResponseData } from '@googlemaps/google-maps-services-js';
import { useMap } from '@/app/hooks/useMap';
import { TruckData } from '../types';

interface GoogleMapProps {
    truck: TruckData
  }

export function GoogleMap({truck}: GoogleMapProps){
    const mapContainerRef = useRef<HTMLDivElement>(null)
    const map = useMap(mapContainerRef)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [directionsResponseData, setDirectionsResponseData] = useState<DirectionsResponseData & {request: any}>()

    async function searchPlaces(event: FormEvent){
        event.preventDefault();

        const [sourceResponse, destinationResponse] = await Promise.all([
            fetch(`http://localhost:3000/places?text=${truck.rota.origem}`),
            fetch(`http://localhost:3000/places?text=${truck.rota.destino}`),
          ]);
      
          const [sourcePlace, destinationPlace]: FindPlaceFromTextResponseData[] =
            await Promise.all([sourceResponse.json(), destinationResponse.json()]);

        if(sourcePlace.status !== 'OK'){
            console.log(sourcePlace);
            alert('Não foi possivel encontrar o local de origem');
            return;
        }

        if(destinationPlace.status !== 'OK'){
            console.log(destinationPlace);
            alert('Não foi possivel encontrar o local de destino');
            return;
        }

        const queryParams = new URLSearchParams({
            originId: sourcePlace.candidates[0].place_id as string,
            destinationId: destinationPlace.candidates[0].place_id as string,
          });

        const directionsResponse = await fetch(`http://localhost:3000/directions?${queryParams.toString()}`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const directionsResponseData: DirectionsResponseData & {request: any} = await directionsResponse.json();
        setDirectionsResponseData(directionsResponseData)
        map?.removeAllRoutes();
        map?.addRouteWithIcons({
            routeId: "1",
            startMarkerOptions: {
              position: directionsResponseData.routes[0]!.legs[0]!.start_location,
            },
            endMarkerOptions: {
              position: directionsResponseData.routes[0]!.legs[0]!.end_location,
            },
            carMarkerOptions: {
              position: directionsResponseData.routes[0]!.legs[0]!.start_location,
            },
            directionsResponseData,
          });
        
    }

    async function createRoute() {
        const response = await fetch("http://localhost:3000/routes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: `${directionsResponseData?.routes[0]!.legs[0]!.start_address} - ${
              directionsResponseData?.routes[0]!.legs[0]!.end_address
            }`,
            source_id: directionsResponseData?.request.origin.place_id,
            destination_id: directionsResponseData?.request.destination.place_id,
          }),
        });
        console.log(response)
        const route = await response.json();
        console.log(route)

        const { legs } = route.directions.routes[0];
    
        const { steps } = legs[0];
        
        for (const step of steps) {
            console.log(step)
          await sleep(2000);
          moveCar(step.start_location);
          //emitNewPoint(route.id, step.start_location);
    
          await sleep(2000);
          moveCar(step.end_location);
          //emitNewPoint(route.id, step.end_location);
        }
      }
    
      function moveCar(point: google.maps.LatLngLiteral) {
        map?.moveCar("1", {
          lat: point.lat,
          lng: point.lng,
        });
      }
    
    //   function emitNewPoint(routeId: string, point: google.maps.LatLngLiteral) {
    //     socket.emit("new-points", {
    //       route_id: routeId,
    //       lat: point.lat,
    //       lng: point.lng,
    //     });
    //   }
    

    return (
        <div className="flex flex-row h-full">
            <div>
                <h1>Nova rota</h1>
                 <form className="flex flex-col" onSubmit={searchPlaces}>
                    <button type="submit">Pesquisar</button>
                </form>
                {directionsResponseData && (
          <ul>
            <li>
              Origem:{" "}
              {directionsResponseData?.routes[0]!.legs[0]!.start_address}
            </li>
            <li>
              Destino: {directionsResponseData?.routes[0]!.legs[0]!.end_address}
            </li>
            <li>
              Distância:{" "}
              {directionsResponseData?.routes[0]!.legs[0]!.distance.text}
            </li>
            <li>
              Duração:{" "}
              {directionsResponseData?.routes[0]!.legs[0]!.duration.text}
            </li>
            <li>
              <button
                className="bg-blue-500 p-4 text-white rounded"
                onClick={createRoute}
              >
                Adicionar rota
              </button>
            </li>
          </ul>
        )}
            </div>
            <div id="map" className="h-full w-full" ref={mapContainerRef}></div>
        </div>
    )
}

export default GoogleMap;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));