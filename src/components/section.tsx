import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
}

interface SectionHeaderProps {
  children: ReactNode;
  className?: string;
}

function SectionHeader({ children, className = "" }: SectionHeaderProps) {
  return (
    <div className={`bg-muted px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground ${className}`}>
      {children}
    </div>
  );
}

export function Section({ children, className = "" }: SectionProps) {
  return (
    <div className={`max-w-[500px] rounded-md border bg-background overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

Section.Header = SectionHeader;
