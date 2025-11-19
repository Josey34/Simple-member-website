import { ChevronLeft, History, Info } from "lucide-react";
import { useState } from "react";

const Card = ({ session, delay, onViewHistory }: any) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showDetail, setShowDetail] = useState(false);

    return (
        <>
            <div
                className="relative group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ animationDelay: `${delay}ms` }}
            >
                <div
                    className={`card bg-base-100 shadow-lg border border-base-300 cursor-pointer transition-all duration-500 hover:border-primary active:scale-95 ${
                        isHovered
                            ? "scale-105 shadow-2xl shadow-primary/20 z-10"
                            : "scale-100"
                    }`}
                    onClick={() => setShowDetail(true)}
                >
                    <div className="card-body p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center flex-1">
                                <div className="avatar placeholder mr-3 group-hover:scale-110 transition-transform duration-300">
                                    <div className="w-12 rounded-xl bg-gradient-to-br from-primary to-blue-400 shadow-lg group-hover:shadow-xl group-hover:shadow-primary/50 flex items-center justify-center">
                                        <History className="w-6 h-6 text-white" strokeWidth={2} />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-base-content text-sm">
                                        {session.location}
                                    </h3>
                                    <p className="text-xs text-base-content opacity-70">
                                        {session.date} • {session.duration}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right group-hover:scale-110 transition-transform duration-300">
                                <div className="badge badge-success badge-lg font-black text-lg group-hover:animate-pulse group-hover:shadow-lg group-hover:shadow-success/50">
                                    +{session.pointsEarned}
                                </div>
                                <p className="text-xs text-base-content opacity-70 mt-1 font-semibold">
                                    pts
                                </p>
                            </div>
                        </div>

                        {/* Hover details */}
                        {isHovered && (
                            <div className="border-t border-base-300 pt-4 mt-4 animate-fadeIn">
                                <div className="flex gap-2 mb-3">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowDetail(true);
                                        }}
                                        className="btn btn-primary btn-sm flex-1 hover:scale-105 active:scale-95 transition-transform"
                                    >
                                        View Details
                                    </button>
                                    <button className="btn btn-ghost btn-sm btn-square hover:scale-110 hover:bg-primary hover:text-primary-content active:scale-95 transition-all">
                                        <Info className="w-5 h-5" strokeWidth={2} />
                                    </button>
                                </div>
                                <div className="space-y-2 text-xs">
                                    <div className="flex justify-between text-base-content opacity-70">
                                        <span>Table Number:</span>
                                        <span className="font-semibold text-base-content">
                                            Table 5
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-base-content opacity-70">
                                        <span>Cost:</span>
                                        <span className="font-semibold text-base-content">
                                            Rp 45.000
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-base-content opacity-70">
                                        <span>Points Rate:</span>
                                        <span className="font-semibold text-success">
                                            20 pts/hour
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Detail Modal - daisyUI */}
            {showDetail && (
                <div className="modal modal-open" onClick={() => setShowDetail(false)}>
                    <div
                        className="modal-box max-w-md p-0 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header Image */}
                        <div className="h-48 bg-gradient-to-br from-primary to-blue-400 relative overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <History className="w-24 h-24 text-white opacity-20" strokeWidth={1.5} />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                                <h2 className="text-2xl font-bold text-white">
                                    {session.location}
                                </h2>
                            </div>
                            <button
                                onClick={() => setShowDetail(false)}
                                className="btn btn-sm btn-circle absolute top-4 right-4 bg-black bg-opacity-50 backdrop-blur-sm hover:bg-opacity-70 hover:scale-110 active:scale-95 transition-all border-none"
                            >
                                <ChevronLeft className="w-6 h-6 text-white rotate-180" strokeWidth={2.5} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-6 flex-wrap">
                                <div className="badge badge-success badge-lg font-bold px-4 py-3">
                                    +{session.pointsEarned} Points
                                </div>
                                <span className="text-base-content opacity-70 text-sm">
                                    {session.date}
                                </span>
                            </div>

                            <div className="space-y-4">
                                <div className="card bg-base-200 border border-base-300">
                                    <div className="card-body p-4 space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-base-content opacity-70 text-sm">
                                                Duration
                                            </span>
                                            <span className="text-base-content font-bold">
                                                {session.duration}
                                            </span>
                                        </div>
                                        <div className="divider my-0"></div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-base-content opacity-70 text-sm">
                                                Table Number
                                            </span>
                                            <span className="text-base-content font-bold">
                                                Table 5
                                            </span>
                                        </div>
                                        <div className="divider my-0"></div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-base-content opacity-70 text-sm">
                                                Total Cost
                                            </span>
                                            <span className="text-base-content font-bold">
                                                Rp 45.000
                                            </span>
                                        </div>
                                        <div className="divider my-0"></div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-base-content opacity-70 text-sm">
                                                Points Earned
                                            </span>
                                            <span className="text-success font-bold">
                                                +{session.pointsEarned} pts
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="alert alert-info">
                                    <Info className="w-4 h-4" strokeWidth={2} />
                                    <div>
                                        <h4 className="font-bold text-sm">Session Details</h4>
                                        <p className="text-sm">
                                            You played for {session.duration} and
                                            earned {session.pointsEarned} points at
                                            a rate of 20 points per hour.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        setShowDetail(false);
                                        onViewHistory();
                                    }}
                                    className="btn btn-primary w-full hover:scale-105 active:scale-95 transition-transform"
                                >
                                    View Full History
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Card;
