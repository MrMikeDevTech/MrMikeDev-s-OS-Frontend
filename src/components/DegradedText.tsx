export default function DegradedText({ text, className }: { text: string; className?: string }) {
    return (
        <h1
            className={`bg-linear-to-b from-white to-gray-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent ${className}`}
        >
            {text}
        </h1>
    );
}
