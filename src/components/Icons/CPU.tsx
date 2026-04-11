import type { SVGProps } from "react";

export function CPU({ className, ...props }: { className?: string; props?: SVGProps<SVGSVGElement> }) {
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
            <path d="M12 20v2m0-20v2m5 16v2m0-20v2M2 12h2m-2 5h2M2 7h2m16 5h2m-2 5h2M20 7h2M7 20v2M7 2v2" />
            <rect width="16" height="16" x="4" y="4" rx="2" />
            <rect width="8" height="8" x="8" y="8" rx="1" />
        </svg>
    );
}
