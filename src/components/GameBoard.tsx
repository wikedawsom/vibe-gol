import { useState, useEffect, useCallback } from 'react';
import '../styles/GameBoard.css';

interface GameBoardProps {
  isRunning: boolean;
  speed: number;
}

const GRID_SIZE = 50;
const CELL_SIZE = 15;

export const GameBoard: React.FC<GameBoardProps> = ({ isRunning, speed }) => {
  const [grid, setGrid] = useState<boolean[][]>(() => {
    const rows = Array(GRID_SIZE).fill(null).map(() => 
      Array(GRID_SIZE).fill(false)
    );
    return rows;
  });

  const getNeighborCount = useCallback((x: number, y: number): number => {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newX = x + i;
        const newY = y + j;
        if (newX >= 0 && newX < GRID_SIZE && newY >= 0 && newY < GRID_SIZE) {
          if (grid[newX][newY]) count++;
        }
      }
    }
    return count;
  }, [grid]);

  const updateGrid = useCallback(() => {
    const newGrid = grid.map((row, x) =>
      row.map((cell, y) => {
        const neighbors = getNeighborCount(x, y);
        if (cell) {
          return neighbors === 2 || neighbors === 3;
        }
        return neighbors === 3;
      })
    );
    setGrid(newGrid);
  }, [grid, getNeighborCount]);

  useEffect(() => {
    let intervalId: number;
    if (isRunning) {
      intervalId = window.setInterval(updateGrid, speed);
    }
    return () => {
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [isRunning, speed, updateGrid]);

  const toggleCell = (x: number, y: number) => {
    if (!isRunning) {
      const newGrid = [...grid];
      newGrid[x] = [...newGrid[x]];
      newGrid[x][y] = !newGrid[x][y];
      setGrid(newGrid);
    }
  };

  return (
    <div className="game-board" style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
      gap: '1px',
    }}>
      {grid.map((row, x) =>
        row.map((cell, y) => (
          <div
            key={`${x}-${y}`}
            className={`cell ${cell ? 'alive' : 'dead'}`}
            onClick={() => toggleCell(x, y)}
          />
        ))
      )}
    </div>
  );
};
