import { ChevronLeft } from "lucide-react";

interface DashboardHeaderProps {
    currentView: "home" | "points" | "history" | "rewards" | "profile";
    userName: string;
    isScrolled: boolean;
    onBackClick: () => void;
    onProfileClick: () => void;
}

const DashboardHeader = ({
    currentView,
    userName,
    isScrolled,
    onBackClick,
    onProfileClick,
}: DashboardHeaderProps) => {
    const getTitle = () => {
        switch (currentView) {
            case "home":
                return "Overview";
            case "history":
                return "Play History";
            case "points":
                return "Points Breakdown";
            case "rewards":
                return "Rewards";
            case "profile":
                return "My Profile";
            default:
                return "Overview";
        }
    };

    return (
        <div
            className={`sticky top-0 z-50 transition-all duration-300 bg-base-100 ${
                isScrolled ? "shadow-md" : "shadow-none"
            }`}
        >
            <div className="p-3 md:p-4 lg:p-5 flex items-center justify-between h-16 md:h-20 lg:h-24 pt-4 md:pt-6 lg:pt-8 ">
                <div className="w-12">
                    {currentView !== "home" && (
                        <button
                            onClick={onBackClick}
                            className="btn btn-ghost btn-circle btn-sm hover:scale-110 active:scale-95 transition-transform "
                        >
                            <ChevronLeft
                                className="w-6 h-6"
                                strokeWidth={2.5}
                            />
                        </button>
                    )}
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-base-content">
                    {getTitle()}
                </h1>
                <div className="w-12 flex justify-end">
                    <button
                        onClick={onProfileClick}
                        className="avatar placeholder hover:scale-110 active:scale-95 transition-transform "
                    >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-400 ring ring-base-100 ring-offset-base-100 ring-offset-2 hover:shadow-lg hover:shadow-primary/50 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                                {userName.charAt(0)}
                            </span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;
