import './App.css'
import { useState } from 'react';
import UNILAGMap from './components/UNILAGMap';
import 'leaflet/dist/leaflet.css';

function App() {
  const [currentDirections, setCurrentDirections] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">UNILAG Campus Navigator</h1>
          <p className="text-gray-400">Find your way around campus</p>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <UNILAGMap 
            onPathFound={(directions:any) => {
              setCurrentDirections(directions);
              
              console.log('New path found:', directions);
            }} 
          />
        </div>

        {/* Optional: Display directions in a side panel */}
        {currentDirections.length > 0 && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Current Route</h2>
            <div className="space-y-2">
              {currentDirections.map((direction, index) => (
                <p key={index} className={`p-2 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                  {direction}
                </p>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;