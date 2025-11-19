import type { LucideIcon } from "lucide-react";

interface ActionButtonProps {
    icon: LucideIcon;
    title: string;
    subtitle: string;
    onClick?: () => void;
    className?: string;
    iconClassName?: string;
}

const ActionButton = ({
    icon: Icon,
    title,
    subtitle,
    onClick,
    className = "",
    iconClassName = ""
}: ActionButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`card bg-base-100 shadow-lg border border-base-300 hover:shadow-xl hover:border-primary transform hover:scale-105 active:scale-95 transition-all group ${className}`}
        >
            <div className="card-body p-5 items-start">
                <Icon
                    className={`w-10 h-10 text-primary mb-2 group-hover:scale-110 transition-transform ${iconClassName}`}
                    strokeWidth={2}
                />
                <span className="text-sm font-bold text-base-content block">
                    {title}
                </span>
                <span className="text-xs text-base-content opacity-70">
                    {subtitle}
                </span>
            </div>
        </button>
    );
};

export default ActionButton;
