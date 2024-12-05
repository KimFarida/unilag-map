export interface Location {
    id:number;
    name: string
    type: string;
    x: number;
    y: number;
    description: string;
    connections: number[];
    coordinates? : number[];

}

export type LocationType = 'academic' | 'hostel' | 'facility' | 'road' | 'transport' | 'landmark' | 'entrance' | 'library'

export interface Graph{
    [key: number] : {
        [key : number] : number
    }
}

export interface PathFindingResult {
    path: number[];
    distance: number;
}

export interface MapState {
    startLocation: number | null;
    endLocation: number| null;
    currentPath: number[];
    pathDistance: number | null
}

export interface LocationMarkerProps{
    location: Location;
    isStart: boolean;
    isEnd: boolean;
    isOnPath: boolean;
    onClick: (id: number) =>  void
}