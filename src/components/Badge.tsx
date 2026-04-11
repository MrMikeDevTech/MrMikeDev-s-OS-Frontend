export type BadgeColor =
    | "blue"
    | "green"
    | "red"
    | "yellow"
    | "purple"
    | "orange"
    | "pink"
    | "cyan"
    | "teal"
    | "lime"
    | "emerald"
    | "indigo"
    | "violet"
    | "fuchsia"
    | "rose"
    | "sky"
    | "slate"
    | "gray"
    | "zinc"
    | "default";

export default function Badge({ text, color, className }: { text: string; color?: BadgeColor; className?: string }) {
    const colorMap: Record<BadgeColor, string> = {
        blue: "#3b82f6",
        green: "#10b981",
        red: "#ef4444",
        yellow: "#f59e0b",
        purple: "#8b5cf6",
        orange: "#f97316",
        pink: "#ec4899",
        cyan: "#06b6d4",
        teal: "#14b8a6",
        lime: "#84cc16",
        emerald: "#10b981",
        indigo: "#6366f1",
        violet: "#8b5cf6",
        fuchsia: "#d946ef",
        rose: "#f43f5e",
        sky: "#0ea5e9",
        slate: "#64748b",
        gray: "#6b7280",
        zinc: "#71717a",
        default: "#71717a"
    };
    const hex = color ? colorMap[color] : colorMap.default;

    return (
        <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide ${className}`}
            style={{
                backgroundColor: `${hex}1a`,
                color: hex,
                border: `1px solid ${hex}4d`,
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)"
            }}
        >
            {text}
        </span>
    );
}
