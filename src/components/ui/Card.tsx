import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  glow,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: "gold" | "emerald";
}) {
  return (
    <div
      className={cn(
        "bezel-shell relative",
        glow === "gold" && "glow-gold",
        glow === "emerald" && "glow-emerald",
      )}
    >
      <div className={cn("bezel-core relative", className)}>{children}</div>
    </div>
  );
}

export function CardHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("flex flex-col gap-3", align === "center" && "items-center text-center")}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-ink-3">
          <span className="size-1.5 rounded-full bg-[var(--color-gold)]" />
          {eyebrow}
        </div>
      )}
      <h3 className="text-2xl md:text-[2rem] font-display tracking-tighter leading-[1.02] ink-gradient">
        {title}
      </h3>
      {subtitle && <p className="max-w-[60ch] text-ink-3 leading-relaxed">{subtitle}</p>}
    </div>
  );
}

export function Eyebrow({ children, accent = "gold" }: { children: React.ReactNode; accent?: "gold" | "emerald" }) {
  const dot = accent === "gold" ? "bg-[var(--color-gold)]" : "bg-[var(--color-emerald)]";
  return (
    <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-ink-3">
      <span className={cn("size-1.5 rounded-full", dot)} />
      {children}
    </div>
  );
}
