import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import Header from './components/Header';
import Hero from './components/Hero';
import IntroSection from './components/IntroSection';
import ArchitectureSection from './components/ArchitectureSection';
import BenchmarkSection from './components/BenchmarkSection';
import ExplorationSection from './components/ExplorationSection';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main>
          <Hero />
          <IntroSection />
          <ArchitectureSection />
          <BenchmarkSection />
          <ExplorationSection />
        </main>
        <Footer />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
