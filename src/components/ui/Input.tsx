import type { LucideIcon } from "lucide-react";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon: LucideIcon;
    label?: string;
    error?: string;
    rightElement?: React.ReactNode;
}

const Input = ({
    icon: Icon,
    label,
    error,
    rightElement,
    className = "",
    disabled,
    ...props
}: InputProps) => {
    return (
        <div className="form-control">
            {label && (
                <label className="label">
                    <span className="label-text">{label}</span>
                </label>
            )}
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10">
                    <Icon className="w-5 h-5 text-base-content/60" strokeWidth={2} />
                </div>
                <input
                    className={`input input-bordered w-full pl-12 ${rightElement ? 'pr-12' : ''} h-12 rounded-xl bg-base-200 border-base-300 focus:bg-base-100 focus:border-primary focus:outline-none transition-all duration-200 ${className}`}
                    disabled={disabled}
                    {...props}
                />
                {rightElement && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 z-10">
                        {rightElement}
                    </div>
                )}
            </div>
            {error && (
                <label className="label">
                    <span className="label-text-alt text-error">{error}</span>
                </label>
            )}
        </div>
    );
};

export default Input;
