export type PlaceType =
  | 'address'
  | 'establishment'
  | 'geocode'
  | 'regions'
  | 'cities'
  | 'locality'
  | 'sublocality'
  | 'postal_code'
  | 'country'
  | 'administrative_area_level_1'
  | 'administrative_area_level_2'
  | 'street_address'
  | 'route'
  | 'intersection'
  | 'political'
  | 'neighborhood'
  | 'premise'
  | 'subpremise'

export interface AddressComponent {
  long_name: string
  short_name: string
  types: string[]
}

export interface PlacePrediction {
  description: string
  place_id: string
  structured_formatting: {
    main_text: string
    main_text_matched_substrings: Array<{
      length: number
      offset: number
    }>
    secondary_text: string
  }
  matched_substrings: Array<{
    length: number
    offset: number
  }>
  terms: Array<{
    offset: number
    value: string
  }>
  types: PlaceType[]
}

export interface AddressDetails {
  address_components: AddressComponent[]
  formatted_address: string
  geometry: {
    location: {
      lat: number
      lng: number
    }
    location_type: string
    viewport: {
      northeast: {
        lat: number
        lng: number
      }
      southwest: {
        lat: number
        lng: number
      }
    }
  }
  place_id: string
  types: PlaceType[]
} 