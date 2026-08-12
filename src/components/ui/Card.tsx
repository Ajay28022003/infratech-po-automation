import React from 'react';

export const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`bg-white rounded-xl border border-slate-200/80 shadow-2xs relative flex flex-col ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`p-4 sm:p-5 border-b border-slate-100 ${className}`}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  return (
    <h3 className={`font-bold text-sm text-slate-900 flex items-center gap-2 tracking-tight ${className}`}>
      {children}
    </h3>
  );
};

export const CardContent = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`p-4 sm:p-5 flex-1 ${className}`}>
      {children}
    </div>
  );
};
