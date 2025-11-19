import { Clock } from "lucide-react";
import type { Session } from "../../types";
import { getLocationIcon } from "../../utils/locationUtils";

interface HistoryListProps {
    sessions: Session[];
}

const HistoryList = ({ sessions }: HistoryListProps) => {
    return (
        <div className="p-4">
            <div className="space-y-3">
                {sessions.map((session, idx) => {
                    const locationConfig = getLocationIcon(session.location);
                    const LocationIcon = locationConfig.icon;

                    return (
                        <div
                            key={session.id}
                            className="group card bg-base-100 shadow-lg border border-base-300 hover:border-primary hover:shadow-2xl hover:shadow-primary/20 transform hover:scale-105 active:scale-95 transition-all duration-500 cursor-pointer"
                            style={{
                                animationDelay: `${idx * 100}ms`,
                            }}
                        >
                            <div className="card-body p-5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center flex-1">
                                        <div className="avatar placeholder mr-4 group-hover:scale-110 transition-transform duration-300">
                                            <div
                                                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${locationConfig.gradient} shadow-lg group-hover:shadow-xl group-hover:shadow-primary/50 flex items-center justify-center`}
                                            >
                                                <LocationIcon
                                                    className="w-7 h-7 text-white"
                                                    strokeWidth={2}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-bold text-base-content text-lg group-hover:text-primary transition-colors">
                                                {session.location}
                                            </p>
                                            <p className="text-sm text-base-content opacity-70 group-hover:opacity-100 transition-opacity">
                                                {session.date}
                                            </p>
                                            <p className="text-xs text-base-content opacity-70 group-hover:opacity-100 flex items-center gap-1 mt-1 transition-opacity">
                                                <Clock
                                                    className="w-3 h-3"
                                                    strokeWidth={2.5}
                                                />
                                                {session.duration}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right group-hover:scale-110 transition-transform duration-300">
                                        <div className="badge badge-success badge-lg font-black text-xl group-hover:animate-pulse group-hover:shadow-lg group-hover:shadow-success/50">
                                            +{session.pointsEarned}
                                        </div>
                                        <p className="text-xs text-base-content opacity-70 mt-1 font-semibold">
                                            points
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HistoryList;
