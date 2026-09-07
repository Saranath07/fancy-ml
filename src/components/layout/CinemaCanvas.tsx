import React, { ReactNode } from 'react';

interface CinemaCanvasProps {
  children: ReactNode;
}

export const CinemaCanvas: React.FC<CinemaCanvasProps> = ({ children }) => {
  return (
    <div className="presentation-shell">
      <main className="presentation-stage">{children}</main>
    </div>
  );
};
