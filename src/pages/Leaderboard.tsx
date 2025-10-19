import { Crown, Medal, TrendingUp, Trophy } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const Leaderboard = () => {
    const { leaderboard, user } = useAuth();

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1:
                return <Crown className="w-6 h-6 text-yellow-400" />;
            case 2:
                return <Medal className="w-6 h-6 text-gray-300" />;
            case 3:
                return <Medal className="w-6 h-6 text-orange-400" />;
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
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center mb-2">
                    <Trophy className="w-10 h-10 text-yellow-400 mr-3" />
                    <h1 className="text-4xl font-bold text-white">Global Leaderboard</h1>
                </div>
                <p className="text-slate-400 text-lg">
                    Compete with players across all clubs and climb to the top!
                </p>
            </div>

            {/* Your Rank Card */}
            {user && (
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-lg shadow-lg mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
                                <TrendingUp className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-blue-200 text-sm">Your Current Rank</p>
                                <p className="text-white text-3xl font-bold">
                                    #{leaderboard.find(l => l.isCurrentUser)?.rank || "-"}
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-blue-200 text-sm">Your Points</p>
                            <p className="text-white text-3xl font-bold">{user.totalPoints}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Leaderboard Table */}
            <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-900">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                    Rank
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                    Player
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                    Home Club
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                    Points
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            {leaderboard.map((entry) => (
                                <tr
                                    key={entry.id}
                                    className={`transition-colors duration-200 ${
                                        entry.isCurrentUser
                                            ? "bg-blue-900 bg-opacity-30"
                                            : "hover:bg-slate-750"
                                    }`}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${getRankBadgeColor(entry.rank)}`}>
                                            {getRankIcon(entry.rank)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold mr-3">
                                                {entry.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className={`font-semibold ${
                                                    entry.isCurrentUser ? "text-blue-300" : "text-white"
                                                }`}>
                                                    {entry.name}
                                                    {entry.isCurrentUser && (
                                                        <span className="ml-2 text-xs bg-blue-600 px-2 py-1 rounded">YOU</span>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <p className="text-slate-300">{entry.club}</p>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <p className="text-2xl font-bold text-green-400">
                                            {entry.points.toLocaleString()}
                                        </p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Bottom Info */}
            <div className="mt-6 text-center text-slate-400">
                <p>Leaderboard updates every hour • Keep playing to climb higher!</p>
            </div>
        </div>
    );
};

export default Leaderboard;