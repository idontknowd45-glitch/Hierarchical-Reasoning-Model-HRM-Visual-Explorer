import { Heart, Brain } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-gradient-to-b from-background to-muted/20">
      <div className="container py-12">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* In Plain Terms Section */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Brain className="h-4 w-4" />
              In Plain Terms
            </div>
            <h3 className="text-2xl font-bold">What is HRM, Really?</h3>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              A new AI model inspired by human reasoning that learns efficiently and solves complex problems—bridging
              neuroscience and artificial intelligence to create smarter, more capable systems.
            </p>
          </div>

          <Separator className="my-8" />

          {/* Attribution */}
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <p className="text-sm text-muted-foreground">
              © 2025. Built with{' '}
              <Heart className="inline h-4 w-4 text-red-500 fill-red-500" />{' '}
              using{' '}
              <a
                href="https://caffeine.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:text-primary transition-colors underline underline-offset-4"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
