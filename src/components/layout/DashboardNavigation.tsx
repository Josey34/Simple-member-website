import { Gift, History, Home, User } from "lucide-react";

interface DashboardNavigationProps {
    currentView: "home" | "points" | "history" | "rewards" | "profile";
    onViewChange: (view: "home" | "points" | "history" | "rewards" | "profile") => void;
}

const DashboardNavigation = ({
    currentView,
    onViewChange,
}: DashboardNavigationProps) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-base-100/95 backdrop-blur-xl border-t border-base-300 shadow-2xl sm:relative sm:rounded-b-3xl">
            <div className="max-w-7xl mx-auto px-2 py-2">
                <div className="flex items-center justify-around gap-1">
                    {/* Home Button */}
                    <button
                        onClick={() => onViewChange("home")}
                        className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300 min-w-[70px] ${
                            currentView === "home"
                                ? "bg-primary text-primary-content shadow-lg scale-105"
                                : "hover:bg-base-200 text-base-content hover:scale-105 active:scale-95"
                        }`}
                    >
                        <Home
                            className={`w-6 h-6 transition-all ${
                                currentView === "home"
                                    ? "fill-current scale-110"
                                    : ""
                            }`}
                            strokeWidth={2.5}
                        />
                        <span
                            className={`text-xs font-medium ${
                                currentView === "home" ? "font-bold" : ""
                            }`}
                        >
                            Home
                        </span>
                    </button>

                    {/* History Button */}
                    <button
                        onClick={() => onViewChange("history")}
                        className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300 min-w-[70px] ${
                            currentView === "history"
                                ? "bg-primary text-primary-content shadow-lg scale-105"
                                : "hover:bg-base-200 text-base-content hover:scale-105 active:scale-95"
                        }`}
                    >
                        <History
                            className={`w-6 h-6 transition-all ${
                                currentView === "history"
                                    ? "fill-current scale-110"
                                    : ""
                            }`}
                            strokeWidth={2.5}
                        />
                        <span
                            className={`text-xs font-medium ${
                                currentView === "history" ? "font-bold" : ""
                            }`}
                        >
                            History
                        </span>
                    </button>

                    {/* Rewards Button - Center with Special Design */}
                    <button
                        onClick={() => onViewChange("rewards")}
                        className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300 min-w-[70px] ${
                            currentView === "rewards"
                                ? "bg-gradient-to-br from-success to-green-600 text-success-content shadow-xl shadow-success/30 scale-110"
                                : "hover:bg-base-200 text-base-content hover:scale-105 active:scale-95"
                        }`}
                    >
                        <div
                            className={`relative ${
                                currentView === "rewards" ? "animate-pulse" : ""
                            }`}
                        >
                            <Gift
                                className={`w-7 h-7 transition-all ${
                                    currentView === "rewards"
                                        ? "fill-current"
                                        : ""
                                }`}
                                strokeWidth={2.5}
                            />
                            {currentView !== "rewards" && (
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-success rounded-full animate-ping"></span>
                            )}
                        </div>
                        <span
                            className={`text-xs font-medium ${
                                currentView === "rewards" ? "font-bold" : ""
                            }`}
                        >
                            Rewards
                        </span>
                    </button>

                    {/* Profile Button */}
                    <button
                        onClick={() => onViewChange("profile")}
                        className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300 min-w-[70px] ${
                            currentView === "profile"
                                ? "bg-primary text-primary-content shadow-lg scale-105"
                                : "hover:bg-base-200 text-base-content hover:scale-105 active:scale-95"
                        }`}
                    >
                        <User
                            className={`w-6 h-6 transition-all ${
                                currentView === "profile"
                                    ? "fill-current scale-110"
                                    : ""
                            }`}
                            strokeWidth={2.5}
                        />
                        <span
                            className={`text-xs font-medium ${
                                currentView === "profile" ? "font-bold" : ""
                            }`}
                        >
                            Account
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardNavigation;
