import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Compass, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import SudokuDemo from './demos/SudokuDemo';
import MazeDemo from './demos/MazeDemo';

export default function ExplorationSection() {
  const [activeDemo, setActiveDemo] = useState<'sudoku' | 'maze'>('sudoku');

  return (
    <section id="exploration" className="py-16 md:py-24 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="container">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium">
              <Brain className="h-4 w-4" />
              Interactive Learning
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Watch HRM Think and Solve
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience HRM's reasoning capabilities through interactive demonstrations—see how it plans and executes
              solutions step by step
            </p>
          </div>

          {/* How to Use Instructions */}
          <Alert className="border-2 border-primary/30 bg-primary/5">
            <Info className="h-5 w-5 text-primary" />
            <AlertDescription className="text-base ml-2">
              <span className="font-semibold text-foreground">How to use these demos:</span> Click the "Solve" or "Find
              Path" button to watch HRM work. Use the "Watch how it thinks" toggle to slow down the process and see each
              reasoning step. Reset anytime to try again!
            </AlertDescription>
          </Alert>

          <Tabs value={activeDemo} onValueChange={(v) => setActiveDemo(v as 'sudoku' | 'maze')} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="sudoku" className="gap-2">
                <Brain className="h-4 w-4" />
                Sudoku Solver
              </TabsTrigger>
              <TabsTrigger value="maze" className="gap-2">
                <Compass className="h-4 w-4" />
                Pathfinding
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sudoku" className="mt-8">
              <Card className="border-2 shadow-lg">
                <CardHeader className="space-y-3">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Brain className="h-6 w-6 text-primary" />
                    Sudoku Reasoning Demo
                  </CardTitle>
                  <CardDescription className="text-base">
                    Watch HRM solve a 9x9 Sudoku puzzle using hierarchical reasoning. The slow module plans which
                    numbers to try, while the fast module quickly checks if they fit the rules.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SudokuDemo />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="maze" className="mt-8">
              <Card className="border-2 shadow-lg">
                <CardHeader className="space-y-3">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Compass className="h-6 w-6 text-accent" />
                    Maze Pathfinding Demo
                  </CardTitle>
                  <CardDescription className="text-base">
                    Observe HRM navigate complex mazes using meta-representations. The slow module creates a mental map
                    and plans the route, while the fast module executes each movement.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MazeDemo />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Learning Points */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 border-primary/30 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  What You're Seeing: Sudoku
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">Slow Module (Planning):</span> Analyzes the puzzle
                  structure, identifies constraints, and decides which cells to fill first.
                </p>
                <p>
                  <span className="font-semibold text-foreground">Fast Module (Execution):</span> Rapidly checks if each
                  number violates Sudoku rules and fills in valid numbers.
                </p>
                <p>
                  <span className="font-semibold text-foreground">Result:</span> Efficient solving through coordinated
                  planning and execution!
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/30 bg-accent/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Compass className="h-5 w-5 text-accent" />
                  What You're Seeing: Maze
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">Slow Module (Planning):</span> Creates a mental map of
                  the maze, identifies the goal, and plans the optimal path.
                </p>
                <p>
                  <span className="font-semibold text-foreground">Fast Module (Execution):</span> Quickly navigates each
                  step of the planned route, avoiding walls.
                </p>
                <p>
                  <span className="font-semibold text-foreground">Result:</span> Smart pathfinding that adapts to
                  complex environments!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
