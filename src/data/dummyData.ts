import type { LeaderboardEntry, Reward, Session, User } from "../types";

// MOCK DATA
export const MOCK_USER: User = {
    id: "user-123",
    name: "Budi Santoso",
    email: "budi.s@example.com",
    homeClub: "The Corner Pocket - Surabaya",
    totalPoints: 1250,
};

export const MOCK_SESSIONS: Session[] = [
    {
        id: "s1",
        date: "Oct 19, 2025",
        location: "The Break Room",
        duration: "2h 15m",
        pointsEarned: 45,
    },
    {
        id: "s2",
        date: "Oct 17, 2025",
        location: "The Corner Pocket",
        duration: "1h 30m",
        pointsEarned: 30,
    },
    {
        id: "s3",
        date: "Oct 15, 2025",
        location: "Grand Billiard",
        duration: "3h 00m",
        pointsEarned: 60,
    },
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
    {
        id: "u1",
        rank: 1,
        name: "Ahmad Rizki",
        points: 3450,
        club: "Grand Billiard",
    },
    {
        id: "u2",
        rank: 2,
        name: "Siti Nurhaliza",
        points: 2890,
        club: "The Break Room",
    },
    {
        id: "u3",
        rank: 3,
        name: "Dedi Wijaya",
        points: 2340,
        club: "The Corner Pocket",
    },
    {
        id: "user-123",
        rank: 4,
        name: "Budi Santoso",
        points: 1250,
        club: "The Corner Pocket",
        isCurrentUser: true,
    },
    {
        id: "u5",
        rank: 5,
        name: "Rina Kartika",
        points: 1180,
        club: "Grand Billiard",
    },
    {
        id: "u6",
        rank: 6,
        name: "Eko Prasetyo",
        points: 950,
        club: "The Break Room",
    },
    {
        id: "u7",
        rank: 7,
        name: "Maya Sari",
        points: 820,
        club: "The Corner Pocket",
    },
    {
        id: "u8",
        rank: 8,
        name: "Bambang Sutrisno",
        points: 760,
        club: "Grand Billiard",
    },
];

export const MOCK_REWARDS: Reward[] = [
    {
        id: "r1",
        title: "1 Hour Free Play",
        description: "Enjoy 1 hour of free billiard time at any partner club",
        pointsCost: 500,
        category: "time",
        available: true,
    },
    {
        id: "r2",
        title: "2 Hours Free Play",
        description: "Enjoy 2 hours of free billiard time at any partner club",
        pointsCost: 900,
        category: "time",
        available: true,
    },
    {
        id: "r3",
        title: "Free Coffee & Snack",
        description: "Redeem for one coffee and snack combo at the club cafe",
        pointsCost: 200,
        category: "food",
        available: true,
    },
    {
        id: "r4",
        title: "Premium Cue Rental",
        description: "Use premium cue stick for free during your next session",
        pointsCost: 300,
        category: "equipment",
        available: true,
    },
    {
        id: "r5",
        title: "Tournament Entry",
        description: "Free entry to monthly club tournament",
        pointsCost: 1000,
        category: "tournament",
        available: true,
    },
    {
        id: "r6",
        title: "Club T-Shirt",
        description: "Official billiard club merchandise t-shirt",
        pointsCost: 1500,
        category: "merchandise",
        available: false,
    },
    {
        id: "r7",
        title: "VIP Lounge Access",
        description: "Access to VIP lounge for one day",
        pointsCost: 800,
        category: "time",
        available: true,
    },
    {
        id: "r8",
        title: "Meal Voucher",
        description: "Rp 100.000 meal voucher at club restaurant",
        pointsCost: 600,
        category: "food",
        available: true,
    },
];

export const banners = [
        {
            id: 1,
            gradient: "from-red-600 via-red-500 to-orange-500",
            title: "🔥 October Special!",
            subtitle: "Extra 20% Points on Weekends",
            badge: "HOT",
        },
        {
            id: 2,
            gradient: "from-[#261FB3] via-blue-500 to-indigo-500",
            title: "🎉 New Club Open!",
            subtitle: "Grand Opening at Mall Surabaya",
            badge: "NEW",
        },
        {
            id: 3,
            gradient: "from-purple-600 via-purple-500 to-pink-500",
            title: "🏆 Tournament Alert!",
            subtitle: "Monthly Championship - Oct 25",
            badge: "LIVE",
        },
    ];