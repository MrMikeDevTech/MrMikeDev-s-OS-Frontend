export default function AuthContainer({ children }: { children: React.ReactNode }) {
    return (
        <main className="relative flex h-full flex-1 flex-col items-center justify-center overflow-hidden bg-[#0a0a0c] p-4">
            <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-purple-900/20 blur-[120px]" />
            <div className="absolute right-[-10%] bottom-[-10%] h-[40%] w-[40%] rounded-full bg-blue-900/20 blur-[120px]" />
            {children}
        </main>
    );
}
