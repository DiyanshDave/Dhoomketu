import './ResultsPanel.css';

export default function ResultsPanel({ results, visible }) {
  if (!visible || !results) return null;

  return (
    <div className="results-panel">
      <h2>Impact Results</h2>
      
      <div className="result-section">
        <h3>🌍 Impact Location</h3>
        <p>Latitude: {results.impact_location.lat.toFixed(4)}°</p>
        <p>Longitude: {results.impact_location.lng.toFixed(4)}°</p>
      </div>

      <div className="result-section">
        <h3>💥 Crater Dimensions</h3>
        <p><strong>Diameter:</strong> {results.crater.diameter.toLocaleString()} m</p>
        <p><strong>Depth:</strong> {results.crater.depth.toLocaleString()} m</p>
      </div>

      <div className="result-section">
        <h3>⚡ Energy Released</h3>
        <p><strong>Total Energy:</strong> {results.energy.joules.toExponential(2)} J</p>
        <p><strong>Equivalent:</strong> {results.energy.kilotons.toLocaleString()} kilotons TNT</p>
      </div>

      <div className="result-section">
        <h3>🌊 Earthquake</h3>
        <p><strong>Magnitude:</strong> {results.quake_magnitude} on Richter scale</p>
      </div>

      <div className="result-section">
        <h3>👥 Casualties</h3>
        <p><strong>Estimated:</strong> {results.casualties.toLocaleString()} people</p>
        <p><strong>Affected Radius:</strong> {(results.affected_radius / 1000).toFixed(2)} km</p>
      </div>

      <div className="result-section">
        <h3>🚀 Velocity</h3>
        <p><strong>Impact Speed:</strong> {results.velocity.toLocaleString()} m/s</p>
        <p><strong>Equivalent:</strong> {(results.velocity / 1000).toFixed(1)} km/s</p>
      </div>
    </div>
  );
}
