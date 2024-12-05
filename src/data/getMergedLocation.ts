import { Location } from '../types/location';
import { adminAcademicLocations } from './Locations';
import { transportFacilitiesLocations } from './Locations';
import { landmarksCommercialLocations } from './Locations';
import { librariesHousingLocations } from './Locations';
import { PathFinder } from '../utils/pathFinding';
import { convertToXY } from '../utils/helper';
  
// Merge all locations and convert to PathFinder format
export function getMergedLocations(): Location[] {
    const allLocations = [
        ...adminAcademicLocations,
        ...transportFacilitiesLocations,
        ...landmarksCommercialLocations,
        ...librariesHousingLocations
    ];

    // Check for duplicate IDs
    const idSet = new Set<number>();
    const duplicates = allLocations.filter(loc => {
        if (idSet.has(loc.id)) return true;
        idSet.add(loc.id);
        return false;
    });

    if (duplicates.length > 0) {
        console.error('Warning: Duplicate location IDs found:', 
            duplicates.map(d => `${d.name} (ID: ${d.id})`));
    }

    // Convert all locations to include x,y coordinates
    const locationsWithXY = allLocations.map(convertToXY);

    // Validate connections
    locationsWithXY.forEach(location => {
        location.connections.forEach(connId => {
            if (!idSet.has(connId)) {
                console.error(`Warning: Location ${location.name} (ID: ${location.id}) has invalid connection to ID ${connId}`);
            }
        });
    });

    return locationsWithXY;
}

// Example usage with PathFinder
export function createPathFinder(): PathFinder {
    const locations = getMergedLocations();
    return new PathFinder(locations);
}

// Helper function to print path information
export function printPath(pathFinder: PathFinder, startId: number, endId: number): void {
    try {
        const { path, distance, estimatedTime } = pathFinder.findShortestPath(startId, endId);
        const directions = pathFinder.getDirections(path);
        
        console.log("Path found:");
        console.log("------------");
        directions.forEach(direction => console.log(direction));
        console.log("\nTotal distance:", distance, "meters");
        console.log("Estimated time:", estimatedTime);
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error finding path:", error.message);
        } else {
            console.error("An unexpected error occurred");
        }
    }
}

