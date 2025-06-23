import '../styles/Controls.css';

interface ControlsProps {
  isRunning: boolean;
  speed: number;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
}

export const Controls: React.FC<ControlsProps> = ({
  isRunning,
  speed,
  onStart,
  onStop,
  onReset,
  onSpeedChange,
}) => {
  return (
    <div className="controls">
      {!isRunning ? (
        <button onClick={onStart} className="control-button">
          Start
        </button>
      ) : (
        <button onClick={onStop} className="control-button">
          Stop
        </button>
      )}
      <button onClick={onReset} className="control-button">
        Reset
      </button>
      <div className="speed-control">
        <label>Update Speed (ms):</label>
        <input
          type="range"
          min="50"
          max="2000"
          value={speed}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
        />
        <span>{speed}ms</span>
      </div>
    </div>
  );
};
