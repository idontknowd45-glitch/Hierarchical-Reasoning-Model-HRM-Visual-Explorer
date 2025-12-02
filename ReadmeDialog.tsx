import { ReactElement } from 'react';
import { FileText } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useReadmeContent } from '@/hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';

export default function ReadmeDialog() {
  const { data: readmeContent, isLoading } = useReadmeContent();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <FileText className="h-4 w-4" />
          <span className="hidden sm:inline">README</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[85vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <FileText className="h-5 w-5 text-primary" />
            Project Documentation
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[calc(85vh-5rem)] px-6 py-4">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-6 w-2/3 mt-6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ) : readmeContent ? (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReadmeContent content={readmeContent} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                README content not available
              </p>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function ReadmeContent({ content }: { content: string }) {
  // Parse markdown-like content into React elements
  const lines = content.split('\n');
  const elements: ReactElement[] = [];
  let currentList: string[] = [];
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let codeBlockLang = '';

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="list-disc pl-6 space-y-1 my-4">
          {currentList.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  const flushCodeBlock = () => {
    if (codeBlockContent.length > 0) {
      elements.push(
        <pre
          key={`code-${elements.length}`}
          className="bg-muted p-4 rounded-lg overflow-x-auto my-4 text-sm"
        >
          <code className={codeBlockLang ? `language-${codeBlockLang}` : ''}>
            {codeBlockContent.join('\n')}
          </code>
        </pre>
      );
      codeBlockContent = [];
      codeBlockLang = '';
    }
  };

  lines.forEach((line, idx) => {
    // Handle code blocks
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        flushCodeBlock();
        inCodeBlock = false;
      } else {
        flushList();
        inCodeBlock = true;
        codeBlockLang = line.slice(3).trim();
      }
      return;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      return;
    }

    // Handle headings
    if (line.startsWith('# ')) {
      flushList();
      elements.push(
        <h1 key={idx} className="text-3xl font-bold mt-8 mb-4 text-primary">
          {line.slice(2)}
        </h1>
      );
    } else if (line.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={idx} className="text-2xl font-semibold mt-6 mb-3">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={idx} className="text-xl font-semibold mt-5 mb-2">
          {line.slice(4)}
        </h3>
      );
    }
    // Handle list items
    else if (line.startsWith('- ')) {
      currentList.push(line.slice(2));
    }
    // Handle numbered lists
    else if (/^\d+\.\s/.test(line)) {
      flushList();
      const match = line.match(/^\d+\.\s(.+)$/);
      if (match) {
        currentList.push(match[1]);
      }
    }
    // Handle bold text with **
    else if (line.includes('**')) {
      flushList();
      const parts = line.split('**');
      elements.push(
        <p key={idx} className="my-2">
          {parts.map((part, i) =>
            i % 2 === 1 ? <strong key={i}>{part}</strong> : part
          )}
        </p>
      );
    }
    // Handle empty lines
    else if (line.trim() === '') {
      flushList();
    }
    // Handle regular paragraphs
    else if (line.trim()) {
      flushList();
      elements.push(
        <p key={idx} className="my-2">
          {line}
        </p>
      );
    }
  });

  flushList();
  flushCodeBlock();

  return <div className="space-y-1">{elements}</div>;
}
