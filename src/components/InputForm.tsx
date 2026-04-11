export default function InputForm({
    type,
    placeholder,
    name,
    required,
    autoComplete,
    icon,
    className,
    label
}: {
    type: string;
    placeholder: string;
    name: string;
    required: boolean;
    autoComplete: string;
    icon: React.ReactNode;
    className?: string;
    label?: string;
}) {
    return (
        <div className={`space-y-2 ${className}`}>
            <label className="ml-1 text-xs font-semibold tracking-wider text-gray-400 uppercase">{label || name}</label>
            <div className="group relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 group-focus-within:text-blue-400">
                    {icon}
                </div>
                <input
                    className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pr-4 pl-10 text-white transition-all placeholder:text-gray-600 focus:border-blue-500/50 focus:bg-black/40 focus:ring-4 focus:ring-blue-500/10 focus:outline-none"
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    required={required}
                    autoComplete={autoComplete}
                />
            </div>
        </div>
    );
}
