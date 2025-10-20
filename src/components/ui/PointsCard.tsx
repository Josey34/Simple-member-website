import { Award, ChevronRight, TrendingUp } from "lucide-react";
import { useState } from "react";

const PointsCard = ({ user, onClick }: any) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <button
                onClick={onClick}
                className={`w-full bg-white rounded-2xl p-6 shadow-lg border border-gray-100 relative overflow-hidden group transition-all duration-300 ${
                    isHovered ? "scale-105 shadow-xl" : "scale-100"
                }`}
            >
                <div className="relative flex items-center justify-between">
                    <div className="text-left">
                        <div className="flex items-center gap-2 mb-2">
                            <Award className="w-5 h-5 text-[#261FB3] animate-pulse" />
                            <p className="text-[#161179] opacity-80 text-sm font-semibold">
                                Total Points Balance
                            </p>
                        </div>
                        <p className="text-[#0C0950] text-5xl font-black tracking-tight mb-1">
                            {user.totalPoints.toLocaleString()}
                        </p>
                        <p className="text-[#161179] opacity-70 text-xs flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            +135 this week
                        </p>
                    </div>
                    <div className="bg-gray-100 backdrop-blur-sm rounded-full p-3 group-hover:scale-110 transition-transform">
                        <ChevronRight className="w-8 h-8 text-[#261FB3]" />
                    </div>
                </div>
            </button>

            {/* Hover Detail Panel */}
            {isHovered && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl p-5 shadow-2xl border border-gray-200 z-30 animate-fadeIn">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-[#0C0950] font-bold text-lg">
                            Points Overview
                        </h4>
                        <button
                            onClick={onClick}
                            className="bg-[#261FB3] hover:bg-opacity-80 text-white text-xs font-bold px-3 py-1 rounded-full transition-all"
                        >
                            Details →
                        </button>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-[#161179] opacity-80 text-sm">
                                This Week
                            </span>
                            <span className="text-green-500 font-bold text-lg">
                                +135 pts
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[#161179] opacity-80 text-sm">
                                This Month
                            </span>
                            <span className="text-green-500 font-bold text-lg">
                                +450 pts
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[#161179] opacity-80 text-sm">
                                Available to Redeem
                            </span>
                            <span className="text-[#0C0950] font-bold text-lg">
                                {user.totalPoints.toLocaleString()} pts
                            </span>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-[#161179] opacity-80 text-xs">
                            💡 You need{" "}
                            <span className="text-[#0C0950] font-semibold">
                                250 more points
                            </span>{" "}
                            to unlock the "2 Hours Free Play" reward
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PointsCard;
