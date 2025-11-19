import { Gift, MapPin } from "lucide-react";
import ActionButton from "../ui/ActionButton";

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
                <ActionButton
                    icon={Gift}
                    title="Rewards Store"
                    subtitle="Redeem now"
                    onClick={onRewardsClick}
                />
                <ActionButton
                    icon={MapPin}
                    title="Find Clubs"
                    subtitle="Near you"
                    iconClassName="group-hover:animate-pulse"
                />
            </div>
        </div>
    );
};

export default QuickActions;
