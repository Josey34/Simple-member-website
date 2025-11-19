import { Gift } from "lucide-react";

const RewardsView = () => {
    return (
        <div className="p-4">
            <div className="hero bg-gradient-to-br from-primary to-blue-400 rounded-2xl shadow-2xl min-h-64">
                <div className="hero-content text-center">
                    <div>
                        <Gift
                            className="w-20 h-20 text-white mx-auto mb-4 animate-bounce"
                            strokeWidth={2}
                        />
                        <h1 className="text-2xl font-bold text-white mb-2">
                            Rewards Coming Soon!
                        </h1>
                        <p className="text-white opacity-90">
                            Exciting rewards are on the way
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RewardsView;
