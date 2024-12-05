import { Location } from "../types/location";

export function convertToXY(location: {
    id: number;
    name: string;
    type: string;
    coordinates: number[];
    description: string;
    connections: number[];
}
): Location 
{
    const [lat, long] = location.coordinates ?? [0, 0];
    
    // Earth's radius and reference coordinates
    const EARTH_RADIUS = 6371000; 
    const REF_LAT = 6.5157;
    const REF_LONG = 3.3861;
  
    const x = EARTH_RADIUS * Math.cos(REF_LAT * Math.PI / 180) * (long - REF_LONG) * Math.PI / 180;
    const y = EARTH_RADIUS * (lat - REF_LAT) * Math.PI / 180;

  
    return {
      ...location,
      x,
      y
    };
}