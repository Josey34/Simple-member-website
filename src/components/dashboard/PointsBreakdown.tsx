import { TrendingUp } from "lucide-react";

interface PointsBreakdownProps {
    totalPoints: number;
}

const PointsBreakdown = ({ totalPoints }: PointsBreakdownProps) => {
    const locationData = [
        {
            name: "The Corner Pocket",
            points: 540,
            color: "from-green-500 to-emerald-600",
            percent: 43,
        },
        {
            name: "Grand Billiard",
            points: 450,
            color: "from-blue-500 to-cyan-600",
            percent: 36,
        },
        {
            name: "The Break Room",
            points: 260,
            color: "from-purple-500 to-pink-600",
            percent: 21,
        },
    ];

    return (
        <div className="p-4 animate-fadeIn">
            <div className="stats shadow-xl w-full mb-6">
                <div className="stat">
                    <div className="stat-title">Total Points Balance</div>
                    <div className="stat-value text-primary">
                        {totalPoints.toLocaleString()}
                    </div>
                    <div className="stat-desc flex items-center gap-2">
                        <TrendingUp
                            className="w-4 h-4 text-success"
                            strokeWidth={2.5}
                        />
                        +10.8% from last month
                    </div>
                </div>
            </div>

            <h3 className="text-xl font-bold text-base-content mb-4">
                Points by Location
            </h3>
            <div className="space-y-4">
                {locationData.map((loc, idx) => (
                    <div
                        key={idx}
                        className="card bg-base-100 shadow-lg border border-base-300 hover:shadow-xl transition-all"
                    >
                        <div className="card-body p-5">
                            <div className="flex justify-between items-center mb-3">
                                <p className="font-bold text-base-content text-lg">
                                    {loc.name}
                                </p>
                                <span className="badge badge-success badge-lg font-black text-lg">
                                    {loc.points} pts
                                </span>
                            </div>
                            <progress
                                className="progress progress-success w-full h-3"
                                value={loc.percent}
                                max="100"
                            ></progress>
                            <p className="text-base-content opacity-70 text-sm mt-2">
                                {loc.percent}% of total points
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PointsBreakdown;
