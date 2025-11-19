import { Gift, MapPin } from "lucide-react";

interface QuickActionsProps {
    onRewardsClick: () => void;
}

const QuickActions = ({ onRewardsClick }: QuickActionsProps) => {
    return (
        <div className="mx-4 mt-6 mb-4">
            <h3 className="text-base-content font-bold text-lg mb-3">
                Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2">
                <button
                    onClick={onRewardsClick}
                    className="card bg-base-100 shadow-lg border border-base-300 hover:shadow-xl hover:border-primary transform hover:scale-105 active:scale-95 transition-all group"
                >
                    <div className="card-body p-5 items-start">
                        <Gift
                            className="w-10 h-10 text-primary mb-2 group-hover:scale-110 transition-transform"
                            strokeWidth={2}
                        />
                        <span className="text-sm font-bold text-base-content block">
                            Rewards Store
                        </span>
                        <span className="text-xs text-base-content opacity-70">
                            Redeem now
                        </span>
                    </div>
                </button>
                <button className="card bg-base-100 shadow-lg border border-base-300 hover:shadow-xl hover:border-primary transform hover:scale-105 active:scale-95 transition-all group">
                    <div className="card-body p-5 items-start">
                        <MapPin
                            className="w-10 h-10 text-primary mb-2 group-hover:scale-110 group-hover:animate-pulse transition-transform"
                            strokeWidth={2}
                        />
                        <span className="text-sm font-bold text-base-content block">
                            Find Clubs
                        </span>
                        <span className="text-xs text-base-content opacity-70">
                            Near you
                        </span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default QuickActions;
