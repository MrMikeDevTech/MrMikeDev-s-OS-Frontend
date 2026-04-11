import type { SVGProps } from "react";

export function Network({ className, ...props }: { className?: string; props?: SVGProps<SVGSVGElement> }) {
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
            <rect width="6" height="6" x="16" y="16" rx="1" />
            <rect width="6" height="6" x="2" y="16" rx="1" />
            <rect width="6" height="6" x="9" y="2" rx="1" />
            <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3m-7-4V8" />
        </svg>
    );
}
