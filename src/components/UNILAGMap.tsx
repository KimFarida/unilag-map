import React, { useEffect, useState, useCallback, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { PathFinder } from '../utils/pathFinding';
import { getMergedLocations } from '../data/getMergedLocation';

interface UNILAGMapProps {
  onPathFound?: (directions: string[]) => void;
}

// global.d.ts
export {};

declare global {
    interface Window {
        setStart?: (id: number) => void;
        setEnd?: (id: number) => void;
    }
}


const UNILAGMap: React.FC<UNILAGMapProps> = ({ onPathFound }) => {
  const [map, setMap] = useState<L.Map | null>(null);
  const [directionsControl, setDirectionsControl] = useState<L.Control | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedStart, setSelectedStart] = useState<number | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<number | null>(null);
  const [currentPath, setCurrentPath] = useState<L.Polyline | null>(null);
  const [currentMarkers, setCurrentMarkers] = useState<L.Marker[]>([]);

  // Get merged locations
  const locations = useMemo(() => getMergedLocations(), []);
  const pathFinder = useMemo(() => new PathFinder(locations), [locations]);

  const sortedLocations = useMemo(() => 
    [...locations].sort((a, b) => a.name.localeCompare(b.name)),
    [locations]
  );

  const markerIcons = useMemo(() => ({
    administrative: L.divIcon({
      className: 'custom-div-icon',
      html: `<div class="marker-pin bg-red-500"></div>`,
      iconSize: [30, 42],
      iconAnchor: [15, 42]
    }),
    academic: L.divIcon({
      className: 'custom-div-icon',
      html: `<div class="marker-pin bg-yellow-500"></div>`,
      iconSize: [30, 42],
      iconAnchor: [15, 42]
    }),
    residence: L.divIcon({
      className: 'custom-div-icon',
      html: `<div class="marker-pin bg-green-500"></div>`,
      iconSize: [30, 42],
      iconAnchor: [15, 42]
    }),
    transport: L.divIcon({
      className: 'custom-div-icon',
      html: `<div class="marker-pin bg-blue-500"></div>`,
      iconSize: [30, 42],
      iconAnchor: [15, 42]
    }),
    facility: L.divIcon({
      className: 'custom-div-icon',
      html: `<div class="marker-pin bg-purple-500"></div>`,
      iconSize: [30, 42],
      iconAnchor: [15, 42]
    }),
    landmark: L.divIcon({
      className: 'custom-div-icon',
      html: `<div class="marker-pin bg-orange-500"></div>`,
      iconSize: [30, 42],
      iconAnchor: [15, 42]
    }),
    library: L.divIcon({
      className: 'custom-div-icon',
      html: `<div class="marker-pin bg-indigo-500"></div>`,
      iconSize: [30, 42],
      iconAnchor: [15, 42]
    }),
    
  }), []);

  const updateDirections = useCallback((directions: string[]) => {
    if (!map) return;

    if (directionsControl) {
      map.removeControl(directionsControl);
    }

    const DirectionsControl = L.Control.extend({
      onAdd: function() {
        const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
        container.style.cssText = `
          background-color: white;
          padding: 10px;
          margin: 10px;
          max-height: 400px;
          overflow-y: auto;
          min-width: 300px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        `;
        container.innerHTML = `
          <h3 class="font-bold text-lg mb-4">Directions</h3>
          ${directions.map(direction => `
            <div class="mb-2 p-2 ${direction ? 'bg-gray-50 rounded' : ''}">${direction}</div>
          `).join('')}
        `;
        return container;
      }
    });

    const newControl = new DirectionsControl({ position: 'topright' });
    newControl.addTo(map);
    setDirectionsControl(newControl);
    
    if (onPathFound) {
      onPathFound(directions);
    }
  }, [map, directionsControl, onPathFound]);

  const findPath = useCallback(async () => {
    if (!selectedStart || !selectedEnd || !map) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      if (currentPath) {
        currentPath.remove();
      }
      currentMarkers.forEach(marker => marker.remove());

      const result = pathFinder.findShortestPath(selectedStart, selectedEnd);
      const directions = pathFinder.getDirections(result.path);
      updateDirections(directions);

      const pathCoordinates = result.path.map(id => {
        const location = locations.find(loc => loc.id === id)!;
        return location.coordinates;
      });

      const polyline = L.polyline(pathCoordinates, {
        color: '#2563eb',
        weight: 5,
        opacity: 0.8
      }).addTo(map);

      // Add start and end markers
      const startLocation = locations.find(loc => loc.id === selectedStart)!;
      const endLocation = locations.find(loc => loc.id === selectedEnd)!;
      
      const startMarker = L.marker(startLocation.coordinates, {
        icon: L.divIcon({
          className: 'custom-div-icon',
          html: '<div class="marker-pin bg-green-600"></div>',
          iconSize: [30, 42],
          iconAnchor: [15, 42]
        })
      }).addTo(map);
      
      const endMarker = L.marker(endLocation.coordinates, {
        icon: L.divIcon({
          className: 'custom-div-icon',
          html: '<div class="marker-pin bg-red-600"></div>',
          iconSize: [30, 42],
          iconAnchor: [15, 42]
        })
      }).addTo(map);

      setCurrentMarkers([startMarker, endMarker]);
      setCurrentPath(polyline);
      map.fitBounds(polyline.getBounds(), { padding: [50, 50] });
    } catch (err) {
      console.error('Pathfinding error:', err);
      setError(err instanceof Error ? err.message : 'Error finding path');
    } finally {
      setIsLoading(false);
    }
  }, [selectedStart, selectedEnd, map, pathFinder, locations, updateDirections, currentPath, currentMarkers]);

  useEffect(() => {
    if (map) return;

    const mapInstance = L.map('map', {
      center: [6.5168, 3.3977],
      zoom: 16,
      zoomControl: true,
      maxBounds: [
        [6.5037, 3.3871],
        [6.5198, 3.4055]
      ],
      maxBoundsViscosity: 1.0
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapInstance);

    locations.forEach(location => {
      const marker = L.marker(location.coordinates, {
        icon: markerIcons[location.type as keyof typeof markerIcons] || markerIcons.facility,
        title: location.name
      });

      marker.bindPopup(`
        <div class="p-3">
          <h3 class="font-bold text-lg mb-2">${location.name}</h3>
          <p class="text-gray-600 mb-3">${location.description || ''}</p>
          <div class="flex gap-2">
            <button 
              onclick="window.setStart(${location.id})"
              class="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            >
              Set as Start
            </button>
            <button 
              onclick="window.setEnd(${location.id})"
              class="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
            >
              Set as Destination
            </button>
          </div>
        </div>
      `);

      marker.addTo(mapInstance);
    });

    window.setStart = (id: number) => {
      setSelectedStart(id);
      mapInstance.closePopup();
    };
    
    window.setEnd = (id: number) => {
      setSelectedEnd(id);
      mapInstance.closePopup();
    };

    setMap(mapInstance);

    return () => {
      mapInstance.remove();
      delete window.setStart;
      delete window.setEnd;
    };
  }, [locations, markerIcons]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gray-900 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Start Location
                </label>
                <select
                  value={selectedStart?.toString() || ''}
                  onChange={(e) => setSelectedStart(Number(e.target.value))}
                  className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select start point</option>
                  {sortedLocations.map(loc => (
                    <option key={`start-${loc.id}`} value={loc.id}>
                      {loc.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Destination
                </label>
                <select
                  value={selectedEnd?.toString() || ''}
                  onChange={(e) => setSelectedEnd(Number(e.target.value))}
                  className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select destination</option>
                  {sortedLocations.map(loc => (
                    <option key={`end-${loc.id}`} value={loc.id}>
                      {loc.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => findPath()}
                disabled={!selectedStart || !selectedEnd || isLoading}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Finding Path...' : 'Find Path'}
              </button>
              <button
                onClick={() => {
                  if (currentPath && map) {
                    currentPath.remove();
                    setCurrentPath(null);
                  }
                  if (directionsControl && map) {
                    map.removeControl(directionsControl);
                    setDirectionsControl(null);
                  }
                  currentMarkers.forEach(marker => marker.remove());
                  setCurrentMarkers([]);
                  setSelectedStart(null);
                  setSelectedEnd(null);
                  setError(null);
                }}
                className="px-8 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Clear Route
              </button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-900/50 border-l-4 border-red-500 text-red-200">
                {error}
              </div>
            )}
          </div>

          <div id="map" className="w-full h-[700px]" />
        </div>
      </div>
    </div>
  );
};

export default UNILAGMap;