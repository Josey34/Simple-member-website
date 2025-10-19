import { createContext, type ReactNode, useState } from "react";
import { MOCK_LEADERBOARD, MOCK_REWARDS, MOCK_SESSIONS, MOCK_USER } from "../data/dummyData";
import type { LeaderboardEntry, Reward, Session, User } from "../types";

interface AuthContextType {
    user: User | null;
    sessions: Session[];
    leaderboard: LeaderboardEntry[];
    rewards: Reward[];
    isAuthenticated: boolean;
    login: (userData: User) => void;
    logout: () => void;
    redeemReward: (rewardId: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(MOCK_USER);
    const [sessions, setSessions] = useState<Session[]>(MOCK_SESSIONS);
    const [leaderboard] = useState<LeaderboardEntry[]>(MOCK_LEADERBOARD);
    const [rewards] = useState<Reward[]>(MOCK_REWARDS);

    const login = (userData: User) => {
        setUser(userData);
        setSessions(MOCK_SESSIONS);
    };

    const logout = () => {
        setUser(null);
        setSessions([]);
    };

    const redeemReward = (rewardId: string) => {
        const reward = rewards.find((r) => r.id === rewardId);
        if (reward && user && user.totalPoints >= reward.pointsCost) {
            setUser({
                ...user,
                totalPoints: user.totalPoints - reward.pointsCost,
            });
            alert(`Successfully redeemed: ${reward.title}`);
        } else {
            alert("Insufficient points!");
        }
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider
            value={{
                user,
                sessions,
                leaderboard,
                rewards,
                isAuthenticated,
                login,
                logout,
                redeemReward,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
