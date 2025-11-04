// Container Component
import React from 'react';
import './Container.css';

interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 'xl',
  className = '',
}) => {
  return (
    <div className={`container-wrapper container-${maxWidth} ${className}`}>
      {children}
    </div>
  );
};

