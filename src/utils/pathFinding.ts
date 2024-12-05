import { Location } from "../types/location";

export class PathFinder {
    private locations: Map<number, Location>;

    constructor(locations: Location[]) {
        this.locations = new Map(locations.map(loc => [loc.id, loc]));
    }

    findShortestPath(startId: number, endId: number): {
        path: number[];
        distance: number;
        estimatedTime: string;
    } {
        if (!this.locations.has(startId) || !this.locations.has(endId)) {
            throw new Error('Invalid start or end location');
        
        }

        const distances: { [key: number]: number } = {};
        const previous: { [key: number]: number | null } = {};
        const unvisited = new Set<number>();

        // Initialize
        this.locations.forEach((_, id) => {
            distances[id] = id === startId ? 0 : Infinity;
            previous[id] = null;
            unvisited.add(id);
        });

        while (unvisited.size > 0) {
            // Find minimum distance vertex
            const current = Array.from(unvisited)
                .reduce((min, id) => distances[id] < distances[min] ? id : min);

            if (distances[current] === Infinity) {
                throw new Error('No path exists between these locations');
            }

            if (current === endId) break;
            
            unvisited.delete(current);
            const currentNode = this.locations.get(current)!;

            // Process neighbors
            for (const neighborId of currentNode.connections) {
                if (!unvisited.has(neighborId)) continue;
                
                const neighborNode = this.locations.get(neighborId)!;
                const distance = this.calculateDistance(currentNode, neighborNode);
                const totalDistance = distances[current] + distance;

                if (totalDistance < distances[neighborId]) {
                    distances[neighborId] = totalDistance;
                    previous[neighborId] = current;
                }
            }
        }

        // Reconstruct path
        const path: number[] = [];
        let current: number | null = endId;

        while (current !== null && current !== undefined) {
            path.unshift(current);
            current = previous[current] ;
        }

        if (path.length === 0 || path[0] !== startId) {
            throw new Error('No valid path found');
        }

        return {
            path,
            distance: distances[endId],
            estimatedTime: this.getApproximateTime(distances[endId])
        };
    }

    private calculateDistance(from: Location, to: Location): number {
        const dx = from.x - to.x;
        const dy = from.y - to.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    private getApproximateTime(distance: number): string {
        const meters = distance * 10;
        const minutes = Math.round((meters / 1.4) / 60);
        return `${minutes} minute${minutes === 1 ? '' : 's'}`;
    }

    private getBearing(from: Location, to: Location): string {
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        
        if (Math.abs(dx) > Math.abs(dy)) {
            return dx > 0 ? "east" : "west";
        }
        return dy > 0 ? "south" : "north";
    }

    private getLandmarkDirection(current: Location, next: Location): string {
        const bearing = this.getBearing(current, next);
        const distance = Math.round(this.calculateDistance(current, next) * 10);
        
        switch(next.type) {
            case "road": return `Follow ${next.name} for ${distance} meters`;
            case "academic": return `Head ${bearing} towards ${next.name} (${distance}m)`;
            case "hostel": return `Walk ${bearing} towards ${next.name} hostel area (${distance}m)`;
            case "facility": 
                if (next.name.includes("Junction") || next.name.includes("Roundabout")) {
                    return `Continue to the ${next.name} (${distance}m)`;
                }
                return `Head ${bearing} towards ${next.name} (${distance}m)`;
            default: return `Go ${bearing} for ${distance} meters to ${next.name}`;
        }
    }

    getDirections(path: number[]): string[] {
        if (path.length < 2) return ["You are already at your destination."];

        const directions: string[] = [];
        const start = this.locations.get(path[0])!;
        const end = this.locations.get(path[path.length - 1])!;
        
        directions.push(`Starting point: ${start.name}`);
        directions.push(`Destination: ${end.name}`);
        directions.push("");

        for (let i = 0; i < path.length - 1; i++) {
            const current = this.locations.get(path[i])!;
            const next = this.locations.get(path[i + 1])!;
            
            directions.push(this.getLandmarkDirection(current, next));
            if (next.type === "academic") {
                directions.push(`Note: ${next.description}`);
            }
        }

        const totalDistance = Math.round(this.calculateDistance(start, end) * 10);
        directions.push("");
        directions.push(`Total distance: approximately ${totalDistance} meters`);
        directions.push(`Estimated walking time: ${this.getApproximateTime(totalDistance / 10)}`);

        return directions;
    }
}
