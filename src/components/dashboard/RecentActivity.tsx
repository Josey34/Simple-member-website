import { ChevronRight, Clock } from "lucide-react";
import Card from "../ui/Card";
import type { Session } from "../../types";

interface RecentActivityProps {
    sessions: Session[];
    onViewHistory: () => void;
}

const RecentActivity = ({ sessions, onViewHistory }: RecentActivityProps) => {
    return (
        <div className="mx-4 mt-6">
            <h3 className="text-base-content font-bold text-lg mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" strokeWidth={2.5} />
                Recent Activity
            </h3>
            <div className="space-y-3">
                {sessions.slice(0, 3).map((session, idx) => (
                    <Card
                        key={session.id}
                        session={session}
                        delay={idx * 100}
                        onViewHistory={onViewHistory}
                    />
                ))}
            </div>
            <button
                onClick={onViewHistory}
                className="btn btn-ghost w-full mt-3 gap-2 hover:scale-105 active:scale-95 transition-transform"
            >
                View All Activity
                <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
            </button>
        </div>
    );
};

export default RecentActivity;
