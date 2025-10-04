import { useState, useEffect } from 'react';
import Scene from './components/Scene';
import Controls from './components/Controls';
import ResultsPanel from './components/ResultsPanel';
import './App.css';

const API_URL = 'http://localhost:5000';

function App() {
  const [meteors, setMeteors] = useState([]);
  const [selectedMeteor, setSelectedMeteor] = useState(null);
  const [isLaunched, setIsLaunched] = useState(false);
  const [results, setResults] = useState(null);
  const [showImpact, setShowImpact] = useState(false);
  const [impactPosition, setImpactPosition] = useState([0, 0, 2.1]);

  useEffect(() => {
    fetchMeteors();
  }, []);

  const fetchMeteors = async () => {
    try {
      const response = await fetch(`${API_URL}/meteors`);
      const data = await response.json();
      setMeteors(data);
    } catch (error) {
      console.error('Error fetching meteors:', error);
      // Use fallback data if API is not available
      setMeteors([
        {
          id: 1,
          name: 'Small Iron Meteor',
          diameter: 10,
          mass: 3000,
          composition: 'Iron',
          density: 7800,
          velocity: 17000,
          angle: 45,
        },
        {
          id: 2,
          name: 'Medium Stony Meteor',
          diameter: 50,
          mass: 150000,
          composition: 'Stone',
          density: 3500,
          velocity: 20000,
          angle: 60,
        },
      ]);
    }
  };

  const handleLaunch = async () => {
    if (!selectedMeteor) return;

    setIsLaunched(true);
    setShowImpact(true);

    // Generate random impact location on Earth
    const lat = (Math.random() - 0.5) * 180;
    const lng = (Math.random() - 0.5) * 360;

    try {
      const response = await fetch(`${API_URL}/simulate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          diameter: selectedMeteor.diameter,
          mass: selectedMeteor.mass,
          velocity: selectedMeteor.velocity,
          angle: selectedMeteor.angle,
          density: selectedMeteor.density,
          lat,
          lng,
        }),
      });

      const data = await response.json();
      setResults(data);

      // Convert lat/lng to 3D position on sphere
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const radius = 2.1;

      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);

      setImpactPosition([x, y, z]);
    } catch (error) {
      console.error('Error simulating impact:', error);
    }
  };

  const handleReset = () => {
    setSelectedMeteor(null);
    setIsLaunched(false);
    setResults(null);
    setShowImpact(false);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌠 Dhoomketu</h1>
        <p>NASA Space Apps Challenge 2025 - Meteor Impact Simulator</p>
      </header>

      <Controls
        selectedMeteor={selectedMeteor}
        onLaunch={handleLaunch}
        onReset={handleReset}
        disabled={isLaunched}
      />

      <ResultsPanel results={results} visible={!!results} />

      <Scene
        meteors={meteors}
        selectedMeteor={selectedMeteor}
        onMeteorSelect={setSelectedMeteor}
        isLaunched={isLaunched}
        impactPosition={impactPosition}
        showImpact={showImpact}
      />
    </div>
  );
}

export default App;
