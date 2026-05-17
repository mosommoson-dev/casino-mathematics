"use client";

import { useEffect, useRef } from "react";
import katex from "katex";

type Props = {
  expression: string;
  block?: boolean;
  className?: string;
};

export function Formula({ expression, block = false, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    try {
      katex.render(expression, ref.current, {
        throwOnError: false,
        displayMode: block,
        output: "html",
        macros: {
          "\\R": "\\mathbb{R}",
          "\\E": "\\mathbb{E}",
          "\\Var": "\\operatorname{Var}",
          "\\Cov": "\\operatorname{Cov}",
        },
      });
    } catch {
      if (ref.current) ref.current.textContent = expression;
    }
  }, [expression, block]);

  const Tag: keyof React.JSX.IntrinsicElements = block ? "div" : "span";
  return <Tag className={className} ref={ref as React.RefObject<HTMLSpanElement & HTMLDivElement>} />;
}
