export interface Properties {
  wikidata: string;
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Context {
  id: string;
  short_code: string;
  wikidata: string;
  text: string;
}

export interface Feature {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: Properties;
  text: string;
  place_name: string;
  bbox: number[];
  center: number[];
  geometry: Geometry;
  context: Context[];
}
export interface MapBoxResponse {
  type: string;
  query: string[];
  features: Feature[];
  attribution: string;
}
export interface MapBoxGeoRoot {
  data: MapBoxResponse;
}

export interface AutocompleteData {
  value: string;
  label: string;
  item: Feature;
}
export interface SelectedAddress {
  name: string;
  lat: number;
  long: number;
}
