import { useState } from 'react';
import { Brain, Zap, Layers, Network, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useArchitectureExplanations } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';

const conceptIcons = {
  'Cross Frequency Coupling': Network,
  'Meta-representation': Brain,
  'Fast vs. Slow modules': Zap,
  'Hierarchical Processing': Layers,
};

const conceptAnalogies = {
  'Cross Frequency Coupling': 'Like a manager coordinating with employees—different teams working at different speeds but staying in sync through regular communication.',
  'Meta-representation': 'Thinking about thinking! Like when you reflect on your own problem-solving approach and adjust your strategy.',
  'Fast vs. Slow modules': 'Like having a careful planner (slow) and quick workers (fast) on the same team—one thinks deeply, the others act swiftly.',
  'Hierarchical Processing': 'Like a company structure: executives make big decisions, managers handle departments, and workers execute tasks—each layer has its role.',
};

const conceptSimplified = {
  'Cross Frequency Coupling': 'Different parts of the brain communicate at different speeds, allowing complex coordination.',
  'Meta-representation': 'The ability to think about and understand your own thinking process.',
  'Fast vs. Slow modules': 'Some brain processes are quick and automatic, others are slow and deliberate.',
  'Hierarchical Processing': 'Information flows from simple to complex, building understanding layer by layer.',
};

export default function ArchitectureSection() {
  const { data: explanations, isLoading } = useArchitectureExplanations();
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);

  if (isLoading) {
    return (
      <section id="architecture" className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="mx-auto max-w-5xl space-y-8">
            <div className="text-center space-y-4">
              <Skeleton className="h-10 w-64 mx-auto" />
              <Skeleton className="h-6 w-96 mx-auto" />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-48" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="architecture" className="py-16 md:py-24 bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="container">
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Layers className="h-4 w-4" />
              Deep Dive
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Architecture Overview
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore the key concepts behind HRM's brain-inspired design with beginner-friendly explanations
            </p>
          </div>

          <TooltipProvider>
            <Tabs defaultValue="grid" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="detailed">Detailed View</TabsTrigger>
              </TabsList>

              <TabsContent value="grid" className="mt-8">
                <div className="grid gap-6 md:grid-cols-2">
                  {explanations?.map(([concept, explanation]) => {
                    const Icon = conceptIcons[concept as keyof typeof conceptIcons] || Brain;
                    return (
                      <Card
                        key={concept}
                        className="group cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] hover:border-primary/50 border-2"
                        onClick={() => setSelectedConcept(concept)}
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                <Icon className="h-5 w-5" />
                              </div>
                              <CardTitle className="text-xl">{concept}</CardTitle>
                            </div>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button className="text-muted-foreground hover:text-primary transition-colors">
                                  <HelpCircle className="h-5 w-5" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p className="font-semibold mb-2">Simple Analogy:</p>
                                <p className="text-sm">
                                  {conceptAnalogies[concept as keyof typeof conceptAnalogies]}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                            <p className="text-sm font-medium text-accent-foreground mb-1">In Simple Terms:</p>
                            <p className="text-sm text-muted-foreground">
                              {conceptSimplified[concept as keyof typeof conceptSimplified]}
                            </p>
                          </div>
                          <CardDescription className="text-base leading-relaxed">
                            {explanation}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="detailed" className="mt-8">
                <div className="space-y-6">
                  {explanations?.map(([concept, explanation]) => {
                    const Icon = conceptIcons[concept as keyof typeof conceptIcons] || Brain;
                    const isSelected = selectedConcept === concept;

                    return (
                      <Card
                        key={concept}
                        className={`transition-all cursor-pointer border-2 ${
                          isSelected
                            ? 'border-primary shadow-lg scale-[1.01] bg-primary/5'
                            : 'hover:border-primary/50 hover:shadow-md'
                        }`}
                        onClick={() => setSelectedConcept(isSelected ? null : concept)}
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className={`p-3 rounded-lg transition-colors ${
                                  isSelected
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-primary/10 text-primary'
                                }`}
                              >
                                <Icon className="h-6 w-6" />
                              </div>
                              <div>
                                <CardTitle className="text-2xl">{concept}</CardTitle>
                              </div>
                            </div>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button className="text-muted-foreground hover:text-primary transition-colors">
                                  <HelpCircle className="h-6 w-6" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-sm">
                                <p className="font-semibold mb-2">Think of it like this:</p>
                                <p className="text-sm">
                                  {conceptAnalogies[concept as keyof typeof conceptAnalogies]}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="p-4 rounded-lg bg-accent/10 border-2 border-accent/30">
                            <p className="font-semibold text-accent-foreground mb-2 flex items-center gap-2">
                              <Lightbulb className="h-4 w-4" />
                              Beginner-Friendly Explanation:
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                              {conceptSimplified[concept as keyof typeof conceptSimplified]}
                            </p>
                          </div>
                          <div className="p-4 rounded-lg bg-muted/50 border border-border">
                            <p className="font-semibold mb-2">Real-World Analogy:</p>
                            <p className="text-muted-foreground leading-relaxed">
                              {conceptAnalogies[concept as keyof typeof conceptAnalogies]}
                            </p>
                          </div>
                          <div>
                            <p className="font-semibold mb-2">Technical Details:</p>
                            <p className="text-muted-foreground leading-relaxed">{explanation}</p>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </TooltipProvider>
        </div>
      </div>
    </section>
  );
}

function Lightbulb({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  );
}
