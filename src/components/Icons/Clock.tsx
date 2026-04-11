import type { SVGProps } from "react";

export function Clock({ className, ...props }: { className?: string; props?: SVGProps<SVGSVGElement> }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            aria-hidden="true"
            className={className}
            {...props}
            viewBox="0 0 24 24"
        >
            <path d="M12 6v6l4 2" />
            <circle cx="12" cy="12" r="10" />
        </svg>
    );
}
