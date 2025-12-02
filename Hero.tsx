import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const scrollToArchitecture = () => {
    const element = document.getElementById('architecture');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      <div className="container relative py-16 md:py-24 lg:py-32">
        <div className="mx-auto max-w-5xl text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Hierarchical Reasoning Model
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
              Brain-Inspired AI Architecture
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              The Hierarchical Reasoning Model (HRM) is an advanced AI architecture inspired by hierarchical processing in the human brain. 
              By implementing high-level and low-level recurrent modules that mirror neural oscillations and cross-frequency coupling, 
              HRM achieves superior performance on complex reasoning tasks including abstract reasoning, puzzle solving, and pathfinding.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              HRM leverages meta-representations and dual-speed processing modules to enable flexible problem-solving and efficient learning, 
              demonstrating state-of-the-art results across multiple challenging benchmarks.
            </p>
          </div>

          <div className="flex justify-center pt-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            <Button
              size="lg"
              onClick={scrollToArchitecture}
              className="group"
            >
              Explore Architecture
              <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
            </Button>
          </div>
        </div>

        <div className="mx-auto max-w-6xl mt-16 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700">
          <div className="relative rounded-xl border border-border/50 bg-card/50 backdrop-blur p-4 shadow-2xl">
            <img
              src="/assets/image.png"
              alt="HRM Architecture and Performance Comparison"
              className="w-full h-auto rounded-lg"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
