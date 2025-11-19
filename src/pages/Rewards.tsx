import { AlertCircle, Clock, Coffee, Gem, Gift, ShoppingBag, Trophy, Wrench } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Rewards = () => {
    const { rewards, user, redeemReward } = useAuth();
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case "time":
                return <Clock className="w-5 h-5" strokeWidth={2} />;
            case "food":
                return <Coffee className="w-5 h-5" strokeWidth={2} />;
            case "equipment":
                return <Wrench className="w-5 h-5" strokeWidth={2} />;
            case "tournament":
                return <Trophy className="w-5 h-5" strokeWidth={2} />;
            case "merchandise":
                return <ShoppingBag className="w-5 h-5" strokeWidth={2} />;
            default:
                return <Gift className="w-5 h-5" strokeWidth={2} />;
        }
    };

    const categories = [
        { id: "all", name: "All Rewards" },
        { id: "time", name: "Free Play" },
        { id: "food", name: "Food & Drinks" },
        { id: "equipment", name: "Equipment" },
        { id: "tournament", name: "Tournaments" },
        { id: "merchandise", name: "Merchandise" },
    ];

    const filteredRewards = selectedCategory === "all" 
        ? rewards 
        : rewards.filter(r => r.category === selectedCategory);

    const canAfford = (cost: number) => {
        return user && user.totalPoints >= cost;
    };

    return (
        <div className="min-h-screen bg-base-200 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6 sm:mb-8">
                    <div className="flex items-center mb-2">
                        <Gift className="w-8 h-8 sm:w-10 sm:h-10 text-success mr-3" strokeWidth={2} />
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-base-content">Rewards Store</h1>
                    </div>
                    <p className="text-base-content opacity-70 text-sm sm:text-base lg:text-lg">
                        Redeem your points for exclusive rewards and benefits
                    </p>
                </div>

                {/* Points Balance Card */}
                {user && (
                    <div className="stats shadow-lg w-full mb-6 sm:mb-8 bg-gradient-to-r from-success to-green-600">
                        <div className="stat">
                            <div className="stat-figure text-success-content">
                                <div className="avatar placeholder">
                                    <div className="w-12 h-12 rounded-full bg-base-100 bg-opacity-20">
                                        <Gem className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={2} />
                                    </div>
                                </div>
                            </div>
                            <div className="stat-title text-success-content opacity-80">Your Available Points</div>
                            <div className="stat-value text-success-content text-2xl sm:text-4xl">
                                {user.totalPoints.toLocaleString()}
                            </div>
                            <div className="stat-desc text-success-content opacity-80">Pts</div>
                        </div>
                        <div className="stat hidden sm:block">
                            <div className="stat-title text-success-content opacity-80">Member Since</div>
                            <div className="stat-value text-success-content text-lg">Oct 2024</div>
                        </div>
                    </div>
                )}

                {/* Category Filter */}
                <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`btn btn-sm sm:btn-md hover:scale-105 active:scale-95 transition-transform ${
                                    selectedCategory === cat.id
                                        ? "btn-success"
                                        : "btn-ghost"
                                }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Rewards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {filteredRewards.map((reward) => {
                        const affordable = canAfford(reward.pointsCost);

                        return (
                            <div
                                key={reward.id}
                                className={`card bg-base-100 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all ${
                                    !reward.available ? "opacity-50" : ""
                                }`}
                            >
                                {/* Reward Image/Icon */}
                                <figure className={`h-32 sm:h-40 ${
                                    affordable ? "bg-gradient-to-br from-success to-green-700" : "bg-base-300"
                                }`}>
                                    <div className="text-base-100 scale-150">
                                        {getCategoryIcon(reward.category)}
                                    </div>
                                </figure>

                                {/* Reward Content */}
                                <div className="card-body p-4 sm:p-5">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="card-title text-base sm:text-xl">{reward.title}</h3>
                                        {!reward.available && (
                                            <div className="badge badge-error badge-sm">Out of Stock</div>
                                        )}
                                    </div>
                                    <p className="text-base-content opacity-70 text-xs sm:text-sm mb-4">{reward.description}</p>

                                    {/* Points Cost */}
                                    <div className="card-actions justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <Gem className="w-4 h-4 sm:w-5 sm:h-5 text-success" strokeWidth={2} />
                                            <span className="text-xl sm:text-2xl font-bold text-base-content">
                                                {reward.pointsCost.toLocaleString()}
                                            </span>
                                        </div>

                                        {/* Redeem Button */}
                                        <button
                                            onClick={() => reward.available && affordable && redeemReward(reward.id)}
                                            disabled={!reward.available || !affordable}
                                            className={`btn btn-sm sm:btn-md hover:scale-110 active:scale-95 transition-transform ${
                                                reward.available && affordable
                                                    ? "btn-success"
                                                    : "btn-disabled"
                                            }`}
                                        >
                                            {!reward.available
                                                ? "Unavailable"
                                                : affordable
                                                ? "Redeem"
                                                : "Not Enough"}
                                        </button>
                                    </div>

                                    {/* Insufficient Points Warning */}
                                    {reward.available && !affordable && (
                                        <div className="alert alert-warning mt-3 p-2">
                                            <AlertCircle className="w-4 h-4" strokeWidth={2} />
                                            <span className="text-xs">Need {(reward.pointsCost - (user?.totalPoints || 0)).toLocaleString()} more</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty State */}
                {filteredRewards.length === 0 && (
                    <div className="text-center py-16">
                        <Gift className="w-16 h-16 text-base-content opacity-30 mx-auto mb-4" strokeWidth={1.5} />
                        <p className="text-base-content opacity-70 text-lg">No rewards in this category yet</p>
                    </div>
                )}

                {/* Bottom Info */}
                <div className="alert alert-info mt-8">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
                    <div className="text-sm">
                        <p className="font-semibold mb-1">How to earn more points?</p>
                        <p>Play more at any partner club! You earn 20 points per hour of play. Participate in tournaments for bonus points!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rewards;