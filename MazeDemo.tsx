import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw, Pause } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const GRID_SIZE = 15;
const CELL_SIZE = 32;

type Cell = 'empty' | 'wall' | 'start' | 'end' | 'path' | 'visited';

const generateMaze = (): Cell[][] => {
  const maze: Cell[][] = Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill('empty'));

  // Add walls
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (Math.random() < 0.25) {
        maze[i][j] = 'wall';
      }
    }
  }

  // Set start and end
  maze[1][1] = 'start';
  maze[GRID_SIZE - 2][GRID_SIZE - 2] = 'end';

  // Clear path around start and end
  maze[0][1] = 'empty';
  maze[1][0] = 'empty';
  maze[2][1] = 'empty';
  maze[1][2] = 'empty';
  maze[GRID_SIZE - 1][GRID_SIZE - 2] = 'empty';
  maze[GRID_SIZE - 2][GRID_SIZE - 1] = 'empty';
  maze[GRID_SIZE - 3][GRID_SIZE - 2] = 'empty';
  maze[GRID_SIZE - 2][GRID_SIZE - 3] = 'empty';

  return maze;
};

const findPath = (maze: Cell[][]): [number, number][] => {
  const path: [number, number][] = [];
  let current: [number, number] = [1, 1];
  const target: [number, number] = [GRID_SIZE - 2, GRID_SIZE - 2];

  while (current[0] !== target[0] || current[1] !== target[1]) {
    path.push(current);

    // Simple pathfinding: move towards target
    const [x, y] = current;
    const moves: [number, number][] = [];

    if (x < target[0] && maze[x + 1]?.[y] !== 'wall') moves.push([x + 1, y]);
    if (y < target[1] && maze[x]?.[y + 1] !== 'wall') moves.push([x, y + 1]);
    if (x > target[0] && maze[x - 1]?.[y] !== 'wall') moves.push([x - 1, y]);
    if (y > target[1] && maze[x]?.[y - 1] !== 'wall') moves.push([x, y - 1]);

    // If no direct move, try any valid move
    if (moves.length === 0) {
      if (maze[x + 1]?.[y] !== 'wall') moves.push([x + 1, y]);
      if (maze[x]?.[y + 1] !== 'wall') moves.push([x, y + 1]);
      if (maze[x - 1]?.[y] !== 'wall') moves.push([x - 1, y]);
      if (maze[x]?.[y - 1] !== 'wall') moves.push([x, y - 1]);
    }

    if (moves.length === 0) break;
    current = moves[0];
  }

  path.push(target);
  return path;
};

export default function MazeDemo() {
  const [maze, setMaze] = useState<Cell[][]>(() => generateMaze());
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pathIndex, setPathIndex] = useState(0);
  const [path, setPath] = useState<[number, number][]>([]);
  const [watchMode, setWatchMode] = useState(false);
  const [thinkingPhase, setThinkingPhase] = useState<'planning' | 'executing' | null>(null);

  const speed = watchMode ? 300 : 100;

  useEffect(() => {
    if (!isPlaying || pathIndex >= path.length) {
      if (pathIndex >= path.length && path.length > 0) {
        setIsPlaying(false);
        setThinkingPhase(null);
      }
      return;
    }

    const interval = setInterval(() => {
      // Alternate between planning and executing phases in watch mode
      if (watchMode) {
        setThinkingPhase((prev) => (prev === 'planning' ? 'executing' : 'planning'));
        if (thinkingPhase === 'planning') return; // Skip movement on planning phase
      }

      const [x, y] = path[pathIndex];
      setMaze((prev) => {
        const newMaze = prev.map((row) => [...row]);
        if (newMaze[x][y] === 'empty') {
          newMaze[x][y] = 'path';
        }
        return newMaze;
      });

      setPathIndex((prev) => prev + 1);
      setProgress(((pathIndex + 1) / path.length) * 100);
    }, speed);

    return () => clearInterval(interval);
  }, [isPlaying, pathIndex, path, watchMode, thinkingPhase, speed]);

  const handleReset = () => {
    const newMaze = generateMaze();
    setMaze(newMaze);
    setPath(findPath(newMaze));
    setIsPlaying(false);
    setProgress(0);
    setPathIndex(0);
    setThinkingPhase(null);
  };

  const handlePlayPause = () => {
    if (!isPlaying && pathIndex === 0) {
      setPath(findPath(maze));
    }
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setThinkingPhase('planning');
    } else {
      setThinkingPhase(null);
    }
  };

  useEffect(() => {
    setPath(findPath(maze));
  }, []);

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
                Find Path
              </>
            )}
          </Button>
          <Button onClick={handleReset} variant="outline" size="lg">
            <RotateCcw className="mr-2 h-4 w-4" />
            New Maze
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Label htmlFor="watch-mode-maze" className="text-sm font-medium cursor-pointer">
            Watch how it thinks
          </Label>
          <Switch id="watch-mode-maze" checked={watchMode} onCheckedChange={setWatchMode} />
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
            {thinkingPhase === 'planning' ? '🧠 Slow Module: Planning route...' : '⚡ Fast Module: Moving forward...'}
          </Badge>
        </div>
      )}

      <Progress value={progress} className="h-2" />

      <div className="flex justify-center overflow-auto">
        <div
          className="inline-grid gap-0 border-2 border-border rounded-lg overflow-hidden shadow-lg"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
          }}
        >
          {maze.map((row, i) =>
            row.map((cell, j) => {
              let bgColor = 'bg-background';
              let content: React.ReactNode = null;

              if (cell === 'wall') bgColor = 'bg-muted-foreground/30';
              else if (cell === 'start') {
                bgColor = 'bg-primary';
                content = <div className="text-xs font-bold text-primary-foreground">S</div>;
              } else if (cell === 'end') {
                bgColor = 'bg-accent';
                content = <div className="text-xs font-bold text-accent-foreground">E</div>;
              } else if (cell === 'path') {
                bgColor = 'bg-primary/40';
              }

              return (
                <div
                  key={`${i}-${j}`}
                  className={`flex items-center justify-center border border-border/20 ${bgColor} transition-colors duration-200`}
                  style={{ width: CELL_SIZE, height: CELL_SIZE }}
                >
                  {content}
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
          HRM navigates complex mazes using meta-representations
        </p>
        <p className="text-xs text-muted-foreground">
          Slow modules plan routes • Fast modules execute movements
        </p>
      </div>
    </div>
  );
}
