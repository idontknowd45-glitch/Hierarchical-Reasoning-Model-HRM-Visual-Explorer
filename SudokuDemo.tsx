import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw, Pause, Eye, EyeOff } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const initialPuzzle = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

const solvedPuzzle = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

export default function SudokuDemo() {
  const [grid, setGrid] = useState(initialPuzzle);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentCell, setCurrentCell] = useState<[number, number] | null>(null);
  const [watchMode, setWatchMode] = useState(false);
  const [thinkingPhase, setThinkingPhase] = useState<'planning' | 'executing' | null>(null);

  const speed = watchMode ? 400 : 150;

  useEffect(() => {
    if (!isPlaying) return;

    const totalCells = 81;
    const emptyCells = initialPuzzle.flat().filter((v) => v === 0).length;
    let filled = 0;

    const interval = setInterval(() => {
      // Alternate between planning and executing phases in watch mode
      if (watchMode) {
        setThinkingPhase((prev) => (prev === 'planning' ? 'executing' : 'planning'));
        if (thinkingPhase === 'planning') return; // Skip filling on planning phase
      }

      filled++;
      const progressPercent = (filled / emptyCells) * 100;
      setProgress(progressPercent);

      // Find next empty cell to fill
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (initialPuzzle[i][j] === 0 && grid[i][j] === 0) {
            setCurrentCell([i, j]);
            setGrid((prev) => {
              const newGrid = prev.map((row) => [...row]);
              newGrid[i][j] = solvedPuzzle[i][j];
              return newGrid;
            });
            return;
          }
        }
      }

      // All cells filled
      setIsPlaying(false);
      setCurrentCell(null);
      setThinkingPhase(null);
    }, speed);

    return () => clearInterval(interval);
  }, [isPlaying, grid, watchMode, thinkingPhase, speed]);

  const handleReset = () => {
    setGrid(initialPuzzle);
    setIsPlaying(false);
    setProgress(0);
    setCurrentCell(null);
    setThinkingPhase(null);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setThinkingPhase('planning');
    } else {
      setThinkingPhase(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex gap-2">
          <Button onClick={handlePlayPause} size="lg">
            {isPlaying ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Solve
              </>
            )}
          </Button>
          <Button onClick={handleReset} variant="outline" size="lg">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Label htmlFor="watch-mode" className="text-sm font-medium cursor-pointer">
            Watch how it thinks
          </Label>
          <Switch id="watch-mode" checked={watchMode} onCheckedChange={setWatchMode} />
        </div>
      </div>

      {watchMode && isPlaying && thinkingPhase && (
        <div className="flex items-center justify-center gap-3">
          <Badge
            variant={thinkingPhase === 'planning' ? 'default' : 'secondary'}
            className={`text-sm py-2 px-4 ${
              thinkingPhase === 'planning' ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'
            }`}
          >
            {thinkingPhase === 'planning' ? '🧠 Slow Module: Planning strategy...' : '⚡ Fast Module: Executing move...'}
          </Badge>
        </div>
      )}

      <Progress value={progress} className="h-2" />

      <div className="flex justify-center">
        <div className="inline-grid grid-cols-9 gap-0 border-2 border-border rounded-lg overflow-hidden shadow-lg">
          {grid.map((row, i) =>
            row.map((cell, j) => {
              const isInitial = initialPuzzle[i][j] !== 0;
              const isCurrent = currentCell?.[0] === i && currentCell?.[1] === j;
              const isThickRight = (j + 1) % 3 === 0 && j !== 8;
              const isThickBottom = (i + 1) % 3 === 0 && i !== 8;

              return (
                <div
                  key={`${i}-${j}`}
                  className={`
                    w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-sm font-medium
                    border-r border-b border-border/30
                    ${isThickRight ? 'border-r-2 border-r-border' : ''}
                    ${isThickBottom ? 'border-b-2 border-b-border' : ''}
                    ${isInitial ? 'bg-muted font-bold' : 'bg-background'}
                    ${isCurrent ? 'bg-primary/30 animate-pulse ring-2 ring-primary' : ''}
                    ${cell === 0 ? 'text-transparent' : ''}
                    transition-all duration-200
                  `}
                >
                  {cell || ''}
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span className="font-medium">Progress:</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <p className="text-sm text-muted-foreground">
          HRM uses hierarchical reasoning to efficiently solve Sudoku puzzles
        </p>
        <p className="text-xs text-muted-foreground">
          Slow modules plan strategy • Fast modules check constraints
        </p>
      </div>
    </div>
  );
}
