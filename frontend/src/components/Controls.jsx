import './Controls.css';

export default function Controls({ 
  selectedMeteor, 
  onLaunch, 
  onReset,
  disabled 
}) {
  return (
    <div className="controls">
      <div className="meteor-info">
        {selectedMeteor ? (
          <>
            <h3>{selectedMeteor.name}</h3>
            <p><strong>Diameter:</strong> {selectedMeteor.diameter}m</p>
            <p><strong>Mass:</strong> {(selectedMeteor.mass / 1000).toFixed(2)} tons</p>
            <p><strong>Composition:</strong> {selectedMeteor.composition}</p>
            <p><strong>Velocity:</strong> {selectedMeteor.velocity.toLocaleString()} m/s</p>
            <p><strong>Angle:</strong> {selectedMeteor.angle}°</p>
          </>
        ) : (
          <p className="no-selection">Select a meteor to begin</p>
        )}
      </div>
      
      <div className="button-group">
        <button 
          className="btn btn-launch"
          onClick={onLaunch}
          disabled={!selectedMeteor || disabled}
        >
          🚀 Launch
        </button>
        <button 
          className="btn btn-reset"
          onClick={onReset}
        >
          🔄 Reset
        </button>
      </div>
    </div>
  );
}
