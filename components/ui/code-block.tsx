// FILE: royce/components/ui/code-block.tsx
// --------------------------------------------------------------------------------
import React from 'react';
import { cn } from '@/lib/utils'; // Assuming your cn utility is here

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  code: string;
  language?: string;
  // Allow passing other pre props like className
}

export const CodeBlock = ({ code, language = 'plaintext', className, ...props }: CodeBlockProps) => {
  // Basic implementation without syntax highlighting library
  // For actual highlighting, you'd integrate something like 'react-syntax-highlighter' or 'shiki'
  return (
    <pre
        className={cn(
            "my-4 max-h-[400px] overflow-x-auto rounded-lg border bg-muted p-4 text-sm font-mono text-muted-foreground", // Base styling
            // Example: Add language class for potential future CSS/JS highlighting
             `language-${language}`,
            className // Allow overriding via prop
        )}
        {...props} // Pass down other props like data-attributes
    >
      <code>
        {code}
      </code>
    </pre>
  );
};

// --- Example Usage with a Syntax Highlighting Library (e.g., react-syntax-highlighter) ---
/*
// 1. Install: npm install react-syntax-highlighter @types/react-syntax-highlighter
// 2. Import:
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Choose a theme

export const CodeBlockWithHighlighting = ({ code, language = 'json', className, ...props }: CodeBlockProps) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={vscDarkPlus} // Apply the theme style
      customStyle={{
        margin: '1rem 0',
        padding: '1rem',
        borderRadius: '0.5rem', // Match theme radius
        backgroundColor: 'var(--muted)', // Use theme color
      }}
      className={cn("text-xs", className)}
      wrapLongLines={true}
      {...props}
    >
      {code.trim()} // Trim whitespace
    </SyntaxHighlighter>
  );
};
*/