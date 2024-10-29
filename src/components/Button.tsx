import { cn } from "../lib/utils";

const Button = ({
    children,
    className,
    ...buttonProps
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { children?: React.ReactNode; className?: string }) => {
    return (
        <button
            className={cn(
                "mt-6 rounded border border-mono-700 bg-transparent px-6 py-2 hover:bg-mono-700/30 active:scale-[0.98]",
                className
            )}
            {...buttonProps}
        >
            {children}
        </button>
    );
};

export default Button;
