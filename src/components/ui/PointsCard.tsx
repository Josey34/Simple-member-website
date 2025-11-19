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
                className={`btn w-full h-auto bg-base-100 hover:bg-base-200 border border-base-300 rounded-2xl p-6 shadow-lg relative overflow-hidden group transition-all duration-500 hover:border-primary active:scale-95 ${
                    isHovered ? "scale-105 shadow-2xl shadow-primary/20" : "scale-100"
                }`}
            >
                <div className="relative flex items-center justify-between w-full">
                    <div className="text-left">
                        <div className="flex items-center gap-2 mb-2">
                            <Award className="w-5 h-5 text-primary animate-pulse group-hover:scale-125 transition-transform" strokeWidth={2} />
                            <p className="text-base-content opacity-70 text-sm font-semibold group-hover:opacity-100 transition-opacity">
                                Total Points Balance
                            </p>
                        </div>
                        <p className="text-base-content text-5xl font-black tracking-tight mb-1 group-hover:text-primary transition-colors duration-300">
                            {user.totalPoints.toLocaleString()}
                        </p>
                        <p className="text-base-content opacity-60 text-xs flex items-center gap-1 group-hover:opacity-100 transition-opacity">
                            <TrendingUp className="w-3 h-3 group-hover:animate-pulse" strokeWidth={2.5} />
                            +135 this week
                        </p>
                    </div>
                    <div className="avatar placeholder">
                        <div className="bg-base-200 rounded-full p-3 group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                            <ChevronRight className="w-8 h-8 text-primary group-hover:text-primary-content group-hover:translate-x-1 transition-all" strokeWidth={2} />
                        </div>
                    </div>
                </div>
            </button>

            {/* Hover Detail Panel */}
            {isHovered && (
                <div className="absolute top-full left-0 right-0 mt-2 card bg-base-100 shadow-2xl border-2 border-primary z-30 animate-fadeIn">
                    <div className="card-body p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="card-title text-base-content text-lg">
                                Points Overview
                            </h4>
                            <button
                                onClick={onClick}
                                className="btn btn-primary btn-xs hover:scale-110 active:scale-95 transition-transform"
                            >
                                Details →
                            </button>
                        </div>

                        <div className="stats stats-vertical shadow bg-base-200">
                            <div className="stat p-3">
                                <div className="stat-title text-xs">This Week</div>
                                <div className="stat-value text-success text-lg">+135</div>
                                <div className="stat-desc">pts</div>
                            </div>
                            <div className="stat p-3">
                                <div className="stat-title text-xs">This Month</div>
                                <div className="stat-value text-success text-lg">+450</div>
                                <div className="stat-desc">pts</div>
                            </div>
                            <div className="stat p-3">
                                <div className="stat-title text-xs">Available to Redeem</div>
                                <div className="stat-value text-base-content text-lg">{user.totalPoints.toLocaleString()}</div>
                                <div className="stat-desc">pts</div>
                            </div>
                        </div>

                        <div className="alert alert-info mt-4">
                            <div className="text-xs">
                                💡 You need{" "}
                                <span className="font-semibold">
                                    250 more points
                                </span>{" "}
                                to unlock the "2 Hours Free Play" reward
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PointsCard;
