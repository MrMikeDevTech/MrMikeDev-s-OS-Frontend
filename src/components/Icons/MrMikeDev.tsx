import type { SVGProps } from "react";

export function MrMikeDev({ className, props }: { className?: string; props?: SVGProps<SVGSVGElement> }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            viewBox="0 0 100 100"
            className={className}
            {...props}
        >
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8">
                <path d="m50 15 30.3 17.5v35L50 85 19.7 67.5v-35zm0 35v35" />
                <path d="M19.7 32.5 50 50l30.3-17.5" />
            </g>
        </svg>
    );
}
