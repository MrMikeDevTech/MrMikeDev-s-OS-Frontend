import type { SVGProps } from "react";

export function Pin({ className, ...props }: { className?: string; props?: SVGProps<SVGSVGElement> }) {
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
            <path d="M12 2a8 8 0 0 0-8 8c0 5 8 12 8 12s8-7 8-12a8 8 0 0 0-8-8z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    );
}
