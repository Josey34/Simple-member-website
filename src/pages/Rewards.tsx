import { AlertCircle, Clock, Coffee, Gem, Gift, ShoppingBag, Trophy, Wrench } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Rewards = () => {
    const { rewards, user, redeemReward } = useAuth();
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case "time":
                return <Clock className="w-5 h-5" />;
            case "food":
                return <Coffee className="w-5 h-5" />;
            case "equipment":
                return <Wrench className="w-5 h-5" />;
            case "tournament":
                return <Trophy className="w-5 h-5" />;
            case "merchandise":
                return <ShoppingBag className="w-5 h-5" />;
            default:
                return <Gift className="w-5 h-5" />;
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
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center mb-2">
                    <Gift className="w-10 h-10 text-green-400 mr-3" />
                    <h1 className="text-4xl font-bold text-white">Rewards Store</h1>
                </div>
                <p className="text-slate-400 text-lg">
                    Redeem your points for exclusive rewards and benefits
                </p>
            </div>

            {/* Points Balance Card */}
            {user && (
                <div className="bg-gradient-to-r from-green-600 to-green-800 p-6 rounded-lg shadow-lg mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
                                <Gem className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <p className="text-green-200 text-sm">Your Available Points</p>
                                <p className="text-white text-4xl font-bold">
                                    {user.totalPoints.toLocaleString()} Pts
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-green-200 text-sm">Member Since</p>
                            <p className="text-white text-lg font-semibold">Oct 2024</p>
                        </div>
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
                            className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
                                selectedCategory === cat.id
                                    ? "bg-green-600 text-white"
                                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                            }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Rewards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRewards.map((reward) => {
                    const affordable = canAfford(reward.pointsCost);
                    
                    return (
                        <div
                            key={reward.id}
                            className={`bg-slate-800 rounded-lg shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl ${
                                !reward.available ? "opacity-50" : ""
                            }`}
                        >
                            {/* Reward Image/Icon */}
                            <div className={`h-40 flex items-center justify-center ${
                                affordable ? "bg-gradient-to-br from-green-600 to-green-800" : "bg-slate-700"
                            }`}>
                                <div className="text-white">
                                    {getCategoryIcon(reward.category)}
                                </div>
                            </div>

                            {/* Reward Content */}
                            <div className="p-5">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-xl font-bold text-white">{reward.title}</h3>
                                    {!reward.available && (
                                        <span className="text-xs bg-red-600 text-white px-2 py-1 rounded">
                                            Out of Stock
                                        </span>
                                    )}
                                </div>
                                <p className="text-slate-400 text-sm mb-4">{reward.description}</p>
                                
                                {/* Points Cost */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Gem className="w-5 h-5 text-green-400 mr-2" />
                                        <span className="text-2xl font-bold text-white">
                                            {reward.pointsCost.toLocaleString()}
                                        </span>
                                    </div>
                                    
                                    {/* Redeem Button */}
                                    <button
                                        onClick={() => reward.available && affordable && redeemReward(reward.id)}
                                        disabled={!reward.available || !affordable}
                                        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                                            reward.available && affordable
                                                ? "bg-green-600 text-white hover:bg-green-700"
                                                : "bg-slate-700 text-slate-500 cursor-not-allowed"
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
                                    <div className="mt-3 flex items-center text-xs text-orange-400">
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        <span>Need {(reward.pointsCost - (user?.totalPoints || 0)).toLocaleString()} more points</span>
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
                    <Gift className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400 text-lg">No rewards in this category yet</p>
                </div>
            )}

            {/* Bottom Info */}
            <div className="mt-8 bg-blue-900 bg-opacity-30 border border-blue-800 rounded-lg p-4">
                <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-200">
                        <p className="font-semibold mb-1">How to earn more points?</p>
                        <p>Play more at any partner club! You earn 20 points per hour of play. Participate in tournaments for bonus points!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rewards;