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
                    className={`bg-white rounded-xl overflow-hidden border border-gray-100 cursor-pointer transition-all duration-300 ${
                        isHovered
                            ? "scale-110 shadow-xl z-10"
                            : "scale-100 shadow-lg"
                    }`}
                    onClick={() => setShowDetail(true)}
                >
                    <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center flex-1">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#261FB3] to-blue-400 flex items-center justify-center mr-3 transition-transform shadow-lg">
                                <History className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-[#0C0950] text-sm">
                                    {session.location}
                                </p>
                                <p className="text-xs text-[#161179] opacity-80">
                                    {session.date} • {session.duration}
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="font-black text-green-500 text-xl">
                                +{session.pointsEarned}
                            </span>
                            <p className="text-xs text-[#161179] opacity-80">
                                pts
                            </p>
                        </div>
                    </div>

                    {/* Hover details */}
                    {isHovered && (
                        <div className="bg-gray-50 border-t border-gray-200 p-4 animate-fadeIn">
                            <div className="flex gap-2 mb-3">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowDetail(true);
                                    }}
                                    className="flex-1 bg-[#0C0950] hover:bg-opacity-80 text-white font-bold py-2 rounded-md flex items-center justify-center gap-2 transition-all"
                                >
                                    View Details
                                </button>
                                <button className="bg-gray-200 hover:bg-gray-300 text-[#161179] opacity-80 p-2 rounded-md transition-all">
                                    <Info className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="space-y-2 text-xs">
                                <div className="flex justify-between text-[#161179] opacity-80">
                                    <span>Table Number:</span>
                                    <span className="font-semibold text-[#0C0950]">
                                        Table 5
                                    </span>
                                </div>
                                <div className="flex justify-between text-[#161179] opacity-80">
                                    <span>Cost:</span>
                                    <span className="font-semibold text-[#0C0950]">
                                        Rp 45.000
                                    </span>
                                </div>
                                <div className="flex justify-between text-[#161179] opacity-80">
                                    <span>Points Rate:</span>
                                    <span className="font-semibold text-green-500">
                                        20 pts/hour
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Detail Modal - Refactored for Peach/Blue Light Mode */}
            {showDetail && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 animate-fadeIn"
                    onClick={() => setShowDetail(false)}
                >
                    <div
                        className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header Image */}
                        <div className="h-48 bg-gradient-to-br from-[#261FB3] to-blue-400 relative overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <History className="w-24 h-24 text-white opacity-20" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                                <h2 className="text-2xl font-bold text-white">
                                    {session.location}
                                </h2>
                            </div>
                            <button
                                onClick={() => setShowDetail(false)}
                                className="absolute top-4 right-4 bg-black bg-opacity-50 backdrop-blur-sm rounded-full p-2 hover:bg-opacity-70 transition-all"
                            >
                                <ChevronLeft className="w-6 h-6 text-white rotate-180" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-green-100 text-green-700 font-bold px-4 py-2 rounded-lg">
                                    +{session.pointsEarned} Points
                                </div>
                                <span className="text-[#161179] opacity-80 text-sm">
                                    {session.date}
                                </span>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-gray-100 rounded-xl p-4 border border-gray-200">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[#161179] opacity-80 text-sm">
                                            Duration
                                        </span>
                                        <span className="text-[#0C0950] font-bold">
                                            {session.duration}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[#161179] opacity-80 text-sm">
                                            Table Number
                                        </span>
                                        <span className="text-[#0C0950] font-bold">
                                            Table 5
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[#161179] opacity-80 text-sm">
                                            Total Cost
                                        </span>
                                        <span className="text-[#0C0950] font-bold">
                                            Rp 45.000
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#161179] opacity-80 text-sm">
                                            Points Earned
                                        </span>
                                        <span className="text-green-500 font-bold">
                                            +{session.pointsEarned} pts
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                                    <p className="text-[#261FB3] opacity-80 text-sm flex items-center gap-2 mb-2">
                                        <Info className="w-4 h-4" />
                                        Session Details
                                    </p>
                                    <p className="text-[#161179] opacity-90 text-sm">
                                        You played for {session.duration} and
                                        earned {session.pointsEarned} points at
                                        a rate of 20 points per hour. Keep
                                        playing to earn more rewards!
                                    </p>
                                </div>

                                <button
                                    onClick={() => {
                                        setShowDetail(false);
                                        onViewHistory();
                                    }}
                                    className="w-full bg-[#261FB3] hover:bg-opacity-90 text-white font-bold py-3 rounded-xl transition-all"
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
