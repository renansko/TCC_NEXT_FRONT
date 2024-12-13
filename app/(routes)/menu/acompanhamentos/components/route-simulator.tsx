import React, { useEffect, useState, useCallback } from 'react';
import { TruckIcon } from './icons/TruckIcon';

// Utility to decode Google's encoded polyline format
const decodePolyline = (encoded: string) => {
  const points = [];
  let index = 0, lat = 0, lng = 0;

  while (index < encoded.length) {
    let shift = 0, result = 0;
    
    let byte;
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    
    const dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lat += dlat;

    shift = 0;
    result = 0;
    
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    
    const dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lng += dlng;

    points.push({
      lat: lat / 1e5,
      lng: lng / 1e5
    });
  }

  return points;
};

// Calculate the angle between two points for truck rotation
const calculateAngle = (point1: { lat: number; lng: number }, point2: { lat: number; lng: number }) => {
  const dx = point2.lng - point1.lng;
  const dy = point2.lat - point1.lat;
  return Math.atan2(dy, dx) * (180 / Math.PI);
};

// SVG viewBox calculations
const calculateViewBox = (points: { lat: number; lng: number }[]) => {
  const lats = points.map(p => p.lat);
  const lngs = points.map(p => p.lng);
  
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  
  // Add padding
  const padding = 0.1;
  const width = maxLng - minLng;
  const height = maxLat - minLat;
  
  return {
    minX: minLng - width * padding,
    minY: minLat - height * padding,
    width: width * (1 + 2 * padding),
    height: height * (1 + 2 * padding)
  };
};

// Convert geo coordinates to SVG coordinates
const geoToSvgPoint = (lat: number, lng: number, viewBox: { minX: number; minY: number; width: number; height: number }) => {
  const x = ((lng - viewBox.minX) / viewBox.width) * 100;
  const y = (1 - ((lat - viewBox.minY) / viewBox.height)) * 100;
  return { x, y };
};

const RouteSimulator = ({ routes }: { routes: any[] }) => {
  const [vehicles, setVehicles] = useState(new Map());
  const [viewBox, setViewBox] = useState({ minX: 0, minY: 0, width: 0, height: 0 });
  
  // Initialize routes and viewBox
  useEffect(() => {
    const allPoints: { lat: number; lng: number }[] = [];
    const newVehicles = new Map();
    
    routes.forEach(route => {
      const points = route.directions.routes[0].legs.flatMap((leg: any) => 
        decodePolyline(leg.steps.flatMap((step: any) => step.polyline.points))
      );
      
      allPoints.push(...points);
      
      newVehicles.set(route.id, {
        currentPoint: 0,
        points,
        position: points[0],
        speed: 0.1 + Math.random() * 0.3, // Random speed between 0.1 and 0.4
        lastUpdate: Date.now(),
        angle: 0
      });
    });
    
    setViewBox(calculateViewBox(allPoints));
    setVehicles(newVehicles);
  }, [routes]);

  // Update vehicle positions
  const updatePositions = useCallback(() => {
    setVehicles(prevVehicles => {
      const newVehicles = new Map(prevVehicles);
      
      newVehicles.forEach((vehicle, routeId) => {
        const now = Date.now();
        const timeDelta = now - vehicle.lastUpdate;
        
        // Update position based on speed and time
        const progress = (vehicle.speed * timeDelta) / 1000;
        const nextPointIndex = Math.min(
          vehicle.currentPoint + 1,
          vehicle.points.length - 1
        );
        
        const currentPoint = vehicle.points[vehicle.currentPoint];
        const nextPoint = vehicle.points[nextPointIndex];
        
        // Calculate new position
        const lat = currentPoint.lat + (nextPoint.lat - currentPoint.lat) * progress;
        const lng = currentPoint.lng + (nextPoint.lng - currentPoint.lng) * progress;
        
        // Update angle
        const angle = calculateAngle(currentPoint, nextPoint);
        
        // Move to next point if we've passed it
        if (progress >= 1) {
          vehicle.currentPoint = nextPointIndex;
          vehicle.speed = 0.1 + Math.random() * 0.3; // New random speed
          vehicle.lastUpdate = now;
        }
        
        vehicle.position = { lat, lng };
        vehicle.angle = angle;
      });
      
      return newVehicles;
    });
  }, []);

  // Animation loop
  useEffect(() => {
    const interval = setInterval(updatePositions, 50); // 20fps update rate
    return () => clearInterval(interval);
  }, [updatePositions]);

  return (
    <div className="w-full h-full min-h-[400px] relative">
      <svg
        viewBox={`0 0 100 100`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
      >
        {/* Draw routes */}
        {Array.from(vehicles.entries()).map(([routeId, vehicle]) => {
          const pathPoints = vehicle.points.map((point: { lat: number; lng: number }) => {
            const svgPoint = geoToSvgPoint(point.lat, point.lng, viewBox);
            return `${svgPoint.x},${svgPoint.y}`;
          });

          return (
            <polyline
              key={routeId}
              points={pathPoints.join(' ')}
              fill="none"
              stroke="#2196F3"
              strokeWidth="0.5"
              strokeOpacity="0.6"
            />
          );
        })}

        {/* Draw vehicles */}
        {Array.from(vehicles.entries()).map(([routeId, vehicle]) => {
          const position = geoToSvgPoint(
            vehicle.position.lat,
            vehicle.position.lng,
            viewBox
          );

          return (
            <g
              key={routeId}
              transform={`translate(${position.x}, ${position.y}) rotate(${vehicle.angle})`}
            >
              <TruckIcon 
                style={{
                  transform: 'translate(-1.5px, -1.5px)',
                  width: '3px',
                  height: '3px'
                }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default RouteSimulator;