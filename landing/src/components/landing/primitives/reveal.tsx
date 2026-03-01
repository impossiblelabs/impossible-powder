import type { ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className,
      )}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
