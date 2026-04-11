export default function ConectionBadge({ status }: { status: "connected" | "disconnected" }) {
    const statusColor = status === "connected" ? "border-active" : "border-inactive";
    const statusBgColor = status === "connected" ? "bg-active" : "bg-inactive";
    const statusText = status === "connected" ? "Sistema en línea" : "Sistema fuera de línea";
    return (
        <div
            className={`flex items-center justify-center gap-3 rounded-full border ${statusColor} ${statusBgColor}/25 px-4 py-1.5`}
        >
            <span className={`h-2.5 w-2.5 rounded-full ${statusBgColor}`} />
            <span className="text-xs font-bold tracking-wider uppercase">{statusText}</span>
        </div>
    );
}
