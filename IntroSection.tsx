import { useState, useEffect } from 'react';
import { Brain, Zap, ArrowRight, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function IntroSection() {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { label: 'Input', icon: Lightbulb, color: 'text-chart-3' },
    { label: 'Planning (Slow)', icon: Brain, color: 'text-primary' },
    { label: 'Execution (Fast)', icon: Zap, color: 'text-accent' },
    { label: 'Solution', icon: Lightbulb, color: 'text-chart-2' },
  ];

  return (
    <section id="intro" className="py-16 md:py-24 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container">
        <div className="mx-auto max-w-6xl space-y-16">
          {/* What is HRM */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Brain className="h-4 w-4" />
              Understanding HRM
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              What is the Hierarchical Reasoning Model?
            </h2>
            <div className="mx-auto max-w-3xl space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Imagine your brain when solving a puzzle: you have a <span className="text-foreground font-semibold">big-picture planner</span> thinking about strategy, 
                and <span className="text-foreground font-semibold">quick workers</span> handling the details. That's exactly how HRM works!
              </p>
              <p>
                HRM is an AI model inspired by how the human brain processes information in layers. 
                Just like your brain has different regions working together—some thinking slowly and carefully, 
                others acting fast—HRM uses <span className="text-primary font-semibold">"slow modules"</span> for planning and 
                <span className="text-accent font-semibold"> "fast modules"</span> for execution.
              </p>
            </div>
          </div>

          {/* Why it Matters */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                  <Brain className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Brain-Inspired</h3>
                <p className="text-muted-foreground">
                  Mimics how your brain naturally solves problems, making AI more efficient and human-like in its reasoning.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Learns Efficiently</h3>
                <p className="text-muted-foreground">
                  Requires fewer examples to learn new tasks, just like humans can learn from a few demonstrations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-chart-2/10 text-chart-2">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Solves Complex Problems</h3>
                <p className="text-muted-foreground">
                  Excels at logic puzzles, pattern recognition, and pathfinding—tasks that require real reasoning.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* How it Works Animation */}
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold">How It Works: A Visual Journey</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Watch how HRM processes information from input to solution, just like your brain does
              </p>
            </div>

            <div className="relative">
              {/* Brain Hierarchy Diagram */}
              <div className="flex justify-center mb-8">
                <img
                  src="/assets/generated/brain-hierarchy-diagram.dim_400x300.png"
                  alt="Brain hierarchy showing slow and fast modules"
                  className="rounded-lg border-2 border-border shadow-lg max-w-md"
                />
              </div>

              {/* Animated Process Flow */}
              <div className="flex items-center justify-center gap-4 flex-wrap">
                {steps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isActive = animationStep === index;
                  const isPast = animationStep > index;

                  return (
                    <div key={step.label} className="flex items-center gap-4">
                      <Card
                        className={`transition-all duration-500 ${
                          isActive
                            ? 'border-2 border-primary shadow-lg scale-110 bg-primary/5'
                            : isPast
                            ? 'border-primary/30 bg-muted/50'
                            : 'border-border/50'
                        }`}
                      >
                        <CardContent className="p-6 flex flex-col items-center gap-3 min-w-[140px]">
                          <div
                            className={`flex items-center justify-center w-12 h-12 rounded-full transition-all ${
                              isActive
                                ? 'bg-primary text-primary-foreground animate-pulse'
                                : isPast
                                ? 'bg-primary/20 text-primary'
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            <StepIcon className="h-6 w-6" />
                          </div>
                          <div className="text-center">
                            <p className={`font-semibold ${isActive ? 'text-primary' : ''}`}>
                              {step.label}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                      {index < steps.length - 1 && (
                        <ArrowRight
                          className={`h-6 w-6 transition-colors ${
                            isPast ? 'text-primary' : 'text-muted-foreground'
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Step Descriptions */}
              <div className="mt-8 text-center">
                <Card className="max-w-2xl mx-auto border-2">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground">
                      {animationStep === 0 && (
                        <>
                          <span className="font-semibold text-foreground">Input:</span> The problem arrives—like a puzzle or maze to solve.
                        </>
                      )}
                      {animationStep === 1 && (
                        <>
                          <span className="font-semibold text-primary">Planning (Slow Module):</span> Like a manager, it thinks carefully about the best strategy and creates a plan.
                        </>
                      )}
                      {animationStep === 2 && (
                        <>
                          <span className="font-semibold text-accent">Execution (Fast Module):</span> Like skilled workers, they quickly carry out the plan with precision.
                        </>
                      )}
                      {animationStep === 3 && (
                        <>
                          <span className="font-semibold text-foreground">Solution:</span> The problem is solved efficiently through teamwork between slow and fast modules!
                        </>
                      )}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Module Interaction Visualization */}
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Slow & Fast Modules Working Together</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Think of it like a manager coordinating with employees—constant communication leads to better results
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <Card className="border-2 border-primary/50 bg-primary/5">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
                        <Brain className="h-5 w-5" />
                      </div>
                      <h4 className="text-lg font-bold">Slow Module (The Planner)</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Thinks about the big picture and overall strategy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Makes high-level decisions and plans</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Learns from experience and adapts</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 border-accent/50 bg-accent/5">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent text-accent-foreground">
                        <Zap className="h-5 w-5" />
                      </div>
                      <h4 className="text-lg font-bold">Fast Module (The Executor)</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Handles quick, detailed actions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Executes the plan efficiently</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Processes information rapidly</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center">
                <img
                  src="/assets/generated/neural-network-connections.dim_600x400.png"
                  alt="Neural network connections showing module interaction"
                  className="rounded-lg border-2 border-border shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
