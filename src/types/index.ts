export interface User {
    id: string;
    name: string;
    email: string;
    homeClub: string;
    totalPoints: number;
}

export interface Session {
    id: string;
    date: string;
    location: string;
    duration: string;
    pointsEarned: number;
}

export interface LeaderboardEntry {
    id: string;
    rank: number;
    name: string;
    points: number;
    club: string;
    isCurrentUser?: boolean;
}

export interface Reward {
    id: string;
    title: string;
    description: string;
    pointsCost: number;
    category: "time" | "food" | "equipment" | "tournament" | "merchandise";
    image?: string;
    available: boolean;
}

export interface LoginCredentials {
    identifier: string;
    pin: string;
}

export interface DeviceInfo {
    deviceId: string;
    platform: string;
    userAgent: string;
}

export interface LoginPayload {
    identifier: string;
    pin: string;
    identifierType: "email" | "phone";
    deviceInfo: DeviceInfo;
    timestamp: number;
    formattedTime: string;
    timezone: string;
}

export interface LoginResponse {
    user: User;
}