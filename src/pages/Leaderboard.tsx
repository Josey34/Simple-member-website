import { Crown, Medal, TrendingUp, Trophy } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const Leaderboard = () => {
    const { leaderboard, user } = useAuth();

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1:
                return <Crown className="w-6 h-6 text-yellow-400" strokeWidth={2} />;
            case 2:
                return <Medal className="w-6 h-6 text-gray-300" strokeWidth={2} />;
            case 3:
                return <Medal className="w-6 h-6 text-orange-400" strokeWidth={2} />;
            default:
                return <span className="text-slate-400 font-bold">#{rank}</span>;
        }
    };

    const getRankBadgeColor = (rank: number) => {
        switch (rank) {
            case 1:
                return "bg-gradient-to-r from-yellow-400 to-yellow-600";
            case 2:
                return "bg-gradient-to-r from-gray-300 to-gray-500";
            case 3:
                return "bg-gradient-to-r from-orange-400 to-orange-600";
            default:
                return "bg-slate-700";
        }
    };

    return (
        <div className="min-h-screen bg-base-200 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6 sm:mb-8">
                    <div className="flex items-center mb-2">
                        <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-warning mr-3" strokeWidth={2} />
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-base-content">Global Leaderboard</h1>
                    </div>
                    <p className="text-base-content opacity-70 text-sm sm:text-base lg:text-lg">
                        Compete with players across all clubs and climb to the top!
                    </p>
                </div>

                {/* Your Rank Card */}
                {user && (
                    <div className="stats shadow-lg w-full mb-6 sm:mb-8 bg-gradient-to-r from-primary to-blue-600">
                        <div className="stat">
                            <div className="stat-figure text-primary-content">
                                <div className="avatar placeholder">
                                    <div className="w-12 h-12 rounded-full bg-base-100 bg-opacity-20">
                                        <TrendingUp className="w-6 h-6" strokeWidth={2} />
                                    </div>
                                </div>
                            </div>
                            <div className="stat-title text-primary-content opacity-80">Your Current Rank</div>
                            <div className="stat-value text-primary-content">
                                #{leaderboard.find(l => l.isCurrentUser)?.rank || "-"}
                            </div>
                        </div>
                        <div className="stat">
                            <div className="stat-title text-primary-content opacity-80">Your Points</div>
                            <div className="stat-value text-primary-content">{user.totalPoints}</div>
                        </div>
                    </div>
                )}

                {/* Leaderboard Table */}
                <div className="card bg-base-100 shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th className="text-xs sm:text-sm">Rank</th>
                                    <th className="text-xs sm:text-sm">Player</th>
                                    <th className="text-xs sm:text-sm hidden sm:table-cell">Home Club</th>
                                    <th className="text-xs sm:text-sm text-right">Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboard.map((entry) => (
                                    <tr
                                        key={entry.id}
                                        className={`transition-colors duration-200 ${
                                            entry.isCurrentUser
                                                ? "bg-primary bg-opacity-10"
                                                : ""
                                        }`}
                                    >
                                        <td className="py-3 sm:py-4">
                                            <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full ${getRankBadgeColor(entry.rank)}`}>
                                                {getRankIcon(entry.rank)}
                                            </div>
                                        </td>
                                        <td className="py-3 sm:py-4">
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <div className="avatar placeholder">
                                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-base-300">
                                                        <span className="text-sm">{entry.name.charAt(0)}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className={`font-semibold text-sm sm:text-base ${
                                                        entry.isCurrentUser ? "text-primary" : "text-base-content"
                                                    }`}>
                                                        {entry.name}
                                                        {entry.isCurrentUser && (
                                                            <span className="badge badge-primary badge-sm ml-2">YOU</span>
                                                        )}
                                                    </p>
                                                    <p className="text-xs text-base-content opacity-70 sm:hidden">{entry.club}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 sm:py-4 hidden sm:table-cell">
                                            <p className="text-base-content opacity-80">{entry.club}</p>
                                        </td>
                                        <td className="py-3 sm:py-4 text-right">
                                            <div className="badge badge-success badge-lg font-bold text-base sm:text-xl">
                                                {entry.points.toLocaleString()}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Bottom Info */}
                <div className="mt-6 text-center text-base-content opacity-70">
                    <p className="text-sm sm:text-base">Leaderboard updates every hour • Keep playing to climb higher!</p>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;