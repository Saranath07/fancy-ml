import React, { useMemo } from 'react';
import katex from 'katex';

interface LaTeXProps {
  math: string;
  display?: boolean;
  className?: string;
}

export const LaTeX: React.FC<LaTeXProps> = ({ math, display = false, className = '' }) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: display,
        throwOnError: false,
        strict: false
      });
    } catch (e) {
      console.error('KaTeX rendering error:', e);
      return math;
    }
  }, [math, display]);

  return (
    <span
      className={`inline-block ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
