import React from "react";

const PALETTE = {
    purple: "from-purple-500 to-blue-600",
    blue: "from-blue-500 to-indigo-600",
    indigo: "from-indigo-500 to-purple-600",
    green: "from-green-500 to-emerald-600",
    red: "from-red-500 to-rose-600",
    yellow: "from-yellow-500 to-amber-600",
    orange: "from-orange-500 to-pink-600",
    pink: "from-pink-500 to-purple-600",
    teal: "from-teal-500 to-cyan-600",
    cyan: "from-cyan-500 to-blue-600",
    lime: "from-lime-500 to-green-600",
    emerald: "from-emerald-500 to-teal-600",
    rose: "from-rose-500 to-red-600",
    fuchsia: "from-fuchsia-500 to-pink-600",
    violet: "from-violet-500 to-purple-600",
    sky: "from-sky-500 to-blue-600",
    stone: "from-stone-500 to-gray-600",
    neutral: "from-neutral-500 to-gray-600",
    gray: "from-gray-500 to-stone-600",
    zinc: "from-zinc-500 to-stone-600"
};

export default function IconBadge({
    icon,
    color,
    size
}: {
    icon: React.ReactNode;
    color: keyof typeof PALETTE;
    size: string;
}) {
    return (
        <div
            className={`flex h-${size} w-${size} items-center justify-center rounded-2xl bg-linear-to-br ${PALETTE[color]} p-3 shadow-lg shadow-${PALETTE[color]}/20`}
        >
            {icon}
        </div>
    );
}
