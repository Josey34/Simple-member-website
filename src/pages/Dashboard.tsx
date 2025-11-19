import {
    Building2,
    ChevronLeft,
    ChevronRight,
    Clock,
    Gift,
    History,
    Home,
    MapPin,
    Store,
    TrendingUp,
    User,
} from "lucide-react";
import { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import PointsCard from "../components/ui/PointsCard";
import { banners } from "../data/dummyData";
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
    const { user, sessions } = useAuth();
    const [currentView, setCurrentView] = useState<
        "home" | "points" | "history" | "rewards" | "profile"
    >("home");
    const [currentBanner, setCurrentBanner] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    // Auto-slide banner
    useEffect(() => {
        if (currentView === "home") {
            const timer = setInterval(() => {
                setCurrentBanner((prev) => (prev + 1) % banners.length);
            }, 4000);
            return () => clearInterval(timer);
        }
    }, [currentView]);

    // Scroll detection
    useEffect(() => {
        const handleScroll = (e: any) => {
            setIsScrolled(e.target.scrollTop > 10);
        };
        const scrollContainer = document.getElementById("scroll-content");
        scrollContainer?.addEventListener("scroll", handleScroll);
        return () =>
            scrollContainer?.removeEventListener("scroll", handleScroll);
    }, []);

    if (!user) {
        return (
            <div className="flex items-center justify-center h-screen bg-base-100">
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <p className="text-base-content text-lg mt-4">
                        Loading your experience...
                    </p>
                </div>
            </div>
        );
    }

    const nextBanner = () =>
        setCurrentBanner((prev) => (prev + 1) % banners.length);
    const prevBanner = () =>
        setCurrentBanner(
            (prev) => (prev - 1 + banners.length) % banners.length
        );

    // const userRank = leaderboard.find((l) => l.isCurrentUser)?.rank || 0;

    const getTitle = () => {
        switch (currentView) {
            case "home":
                return "Overview";
            case "history":
                return "Play History";
            case "points":
                return "Points Breakdown";
            case "rewards":
                return "Rewards";
            case "profile":
                return "My Profile";
            default:
                return "Overview";
        }
    };

    // Get icon and color based on location name
    const getLocationIcon = (locationName: string) => {
        const lowerLocation = locationName.toLowerCase();

        if (lowerLocation.includes("corner") || lowerLocation.includes("pocket")) {
            return {
                icon: Store,
                gradient: "from-purple-500 to-purple-700",
                bgColor: "bg-purple-500"
            };
        } else if (lowerLocation.includes("grand") || lowerLocation.includes("billiard")) {
            return {
                icon: Building2,
                gradient: "from-blue-500 to-blue-700",
                bgColor: "bg-blue-500"
            };
        } else if (lowerLocation.includes("break")) {
            return {
                icon: MapPin,
                gradient: "from-green-500 to-green-700",
                bgColor: "bg-green-500"
            };
        } else {
            return {
                icon: Building2,
                gradient: "from-primary to-blue-400",
                bgColor: "bg-primary"
            };
        }
    };

    return (
        // Outer background
        <div className="flex items-center justify-center bg-base-100 min-h-screen">
            {/* Mobile Container - Responsive */}
            <div
                className="w-full h-screen bg-base-100 overflow-hidden flex flex-col relative
                          sm:max-w-md sm:h-[95vh] sm:rounded-3xl sm:shadow-2xl sm:my-4
                          md:max-w-lg md:h-[90vh]
                          lg:max-w-xl"
                style={{ height: "97vh" }}
            >
                {/* Header */}
                <div
                    className={`sticky top-0 z-50 transition-all duration-300 bg-base-100 ${
                        isScrolled ? "shadow-md" : "shadow-none"
                    }`}
                >
                    <div className="p-3 md:p-4 lg:p-5 flex items-center justify-between h-16 md:h-20 lg:h-24 pt-4 md:pt-6 lg:pt-8">
                        <div className="w-12">
                            {currentView !== "home" && (
                                <button
                                    onClick={() => setCurrentView("home")}
                                    className="btn btn-ghost btn-circle btn-sm hover:scale-110 active:scale-95 transition-transform"
                                >
                                    <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
                                </button>
                            )}
                        </div>
                        <h1 className="text-xl md:text-2xl font-bold text-base-content">
                            {getTitle()}
                        </h1>
                        <div className="w-12 flex justify-end">
                            <button
                                onClick={() => setCurrentView("profile")}
                                className="avatar placeholder hover:scale-110 active:scale-95 transition-transform"
                            >
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-400 ring ring-base-100 ring-offset-base-100 ring-offset-2 hover:shadow-lg hover:shadow-primary/50">
                                    <span className="text-white font-bold text-lg">
                                        {user.name.charAt(0)}
                                    </span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div
                    id="scroll-content"
                    className="flex-1 overflow-y-auto bg-base-100"
                    style={{ paddingBottom: "5rem" }}
                >
                    {/* HOME VIEW */}
                    {currentView === "home" && (
                        <div>
                            {/* Hero Banner Slider */}
                            <div className="relative mx-4 mt-4 rounded-2xl overflow-hidden shadow-xl group">
                                <div
                                    className={`bg-gradient-to-br ${banners[currentBanner].gradient} p-8 h-56 flex flex-col justify-between relative overflow-hidden`}
                                >
                                    <div className="absolute inset-0 opacity-10">
                                        <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse"></div>
                                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse delay-75"></div>
                                    </div>

                                    <div className="relative z-10">
                                        <span className="inline-block bg-white bg-opacity-30 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full mb-3 animate-pulse">
                                            {banners[currentBanner].badge}
                                        </span>
                                        <h2 className="text-white text-3xl font-black mb-2 drop-shadow-lg">
                                            {banners[currentBanner].title}
                                        </h2>
                                        <p className="text-white text-sm font-medium drop-shadow">
                                            {banners[currentBanner].subtitle}
                                        </p>
                                    </div>

                                    <div className="relative z-10 flex gap-2">
                                        {banners.map((_, idx) => (
                                            <div
                                                key={idx}
                                                className={`h-1 rounded-full transition-all duration-300 ${
                                                    idx === currentBanner
                                                        ? "w-8 bg-white shadow-lg"
                                                        : "w-1 bg-white bg-opacity-40"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Navigation Buttons */}
                                <button
                                    onClick={prevBanner}
                                    className="btn btn-circle btn-sm absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 backdrop-blur-sm border-none opacity-0 group-hover:opacity-100 transition-all hover:bg-opacity-80 hover:scale-105 active:scale-95"
                                >
                                    <ChevronLeft className="w-5 h-5 text-white" strokeWidth={2.5} />
                                </button>
                                <button
                                    onClick={nextBanner}
                                    className="btn btn-circle btn-sm absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 backdrop-blur-sm border-none opacity-0 group-hover:opacity-100 transition-all hover:bg-opacity-80 hover:scale-105 active:scale-95"
                                >
                                    <ChevronRight className="w-5 h-5 text-white" strokeWidth={2.5} />
                                </button>
                            </div>

                            {/* Points Card */}
                            <div className="mx-4 mt-4">
                                <PointsCard
                                    user={user}
                                    onClick={() => setCurrentView("points")}
                                />
                            </div>

                            {/* Recent Activity */}
                            <div className="mx-4 mt-6">
                                <h3 className="text-base-content font-bold text-lg mb-3 flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-primary" strokeWidth={2.5} />
                                    Recent Activity
                                </h3>
                                <div className="space-y-3">
                                    {sessions
                                        .slice(0, 3)
                                        .map((session, idx) => (
                                            <Card
                                                key={session.id}
                                                session={session}
                                                delay={idx * 100}
                                                onViewHistory={() =>
                                                    setCurrentView("history")
                                                }
                                            />
                                        ))}
                                </div>
                                <button
                                    onClick={() => setCurrentView("history")}
                                    className="btn btn-ghost w-full mt-3 gap-2 hover:scale-105 active:scale-95 transition-transform"
                                >
                                    View All Activity
                                    <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
                                </button>
                            </div>

                            {/* Quick Actions */}
                            <div className="mx-4 mt-6 mb-4">
                                <h3 className="text-base-content font-bold text-lg mb-3">
                                    Quick Actions
                                </h3>
                                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2">
                                    <button
                                        onClick={() =>
                                            setCurrentView("rewards")
                                        }
                                        className="card bg-base-100 shadow-lg border border-base-300 hover:shadow-xl hover:border-primary transform hover:scale-105 active:scale-95 transition-all group"
                                    >
                                        <div className="card-body p-5 items-start">
                                            <Gift className="w-10 h-10 text-primary mb-2 group-hover:scale-110 transition-transform" strokeWidth={2} />
                                            <span className="text-sm font-bold text-base-content block">
                                                Rewards Store
                                            </span>
                                            <span className="text-xs text-base-content opacity-70">
                                                Redeem now
                                            </span>
                                        </div>
                                    </button>
                                    <button className="card bg-base-100 shadow-lg border border-base-300 hover:shadow-xl hover:border-primary transform hover:scale-105 active:scale-95 transition-all group">
                                        <div className="card-body p-5 items-start">
                                            <MapPin className="w-10 h-10 text-primary mb-2 group-hover:scale-110 group-hover:animate-pulse transition-transform" strokeWidth={2} />
                                            <span className="text-sm font-bold text-base-content block">
                                                Find Clubs
                                            </span>
                                            <span className="text-xs text-base-content opacity-70">
                                                Near you
                                            </span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* POINTS DETAIL VIEW */}
                    {currentView === "points" && (
                        <div className="p-4 animate-fadeIn">
                            <div className="stats shadow-xl w-full mb-6">
                                <div className="stat">
                                    <div className="stat-title">Total Points Balance</div>
                                    <div className="stat-value text-primary">
                                        {user.totalPoints.toLocaleString()}
                                    </div>
                                    <div className="stat-desc flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4 text-success" strokeWidth={2.5} />
                                        +10.8% from last month
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-base-content mb-4">
                                Points by Location
                            </h3>
                            <div className="space-y-4">
                                {[
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
                                ].map((loc, idx) => (
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
                    )}

                    {/* HISTORY VIEW */}
                    {currentView === "history" && (
                        <div className="p-4">
                            <div className="space-y-3">
                                {sessions.map((session, idx) => {
                                    const locationConfig = getLocationIcon(session.location);
                                    const LocationIcon = locationConfig.icon;

                                    return (
                                        <div
                                            key={session.id}
                                            className="group card bg-base-100 shadow-lg border border-base-300 hover:border-primary hover:shadow-2xl hover:shadow-primary/20 transform hover:scale-105 active:scale-95 transition-all duration-500 cursor-pointer"
                                            style={{
                                                animationDelay: `${idx * 100}ms`,
                                            }}
                                        >
                                            <div className="card-body p-5">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center flex-1">
                                                        <div className="avatar placeholder mr-4 group-hover:scale-110 transition-transform duration-300">
                                                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${locationConfig.gradient} shadow-lg group-hover:shadow-xl group-hover:shadow-primary/50 flex items-center justify-center`}>
                                                                <LocationIcon className="w-7 h-7 text-white" strokeWidth={2} />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-base-content text-lg group-hover:text-primary transition-colors">
                                                                {session.location}
                                                            </p>
                                                            <p className="text-sm text-base-content opacity-70 group-hover:opacity-100 transition-opacity">
                                                                {session.date}
                                                            </p>
                                                            <p className="text-xs text-base-content opacity-70 group-hover:opacity-100 flex items-center gap-1 mt-1 transition-opacity">
                                                                <Clock className="w-3 h-3" strokeWidth={2.5} />
                                                                {session.duration}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right group-hover:scale-110 transition-transform duration-300">
                                                        <div className="badge badge-success badge-lg font-black text-xl group-hover:animate-pulse group-hover:shadow-lg group-hover:shadow-success/50">
                                                            +{session.pointsEarned}
                                                        </div>
                                                        <p className="text-xs text-base-content opacity-70 mt-1 font-semibold">
                                                            points
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* REWARDS VIEW */}
                    {currentView === "rewards" && (
                        <div className="p-4">
                            <div className="hero bg-gradient-to-br from-primary to-blue-400 rounded-2xl shadow-2xl min-h-64">
                                <div className="hero-content text-center">
                                    <div>
                                        <Gift className="w-20 h-20 text-white mx-auto mb-4 animate-bounce" strokeWidth={2} />
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
                    )}

                    {/* PROFILE VIEW */}
                    {currentView === "profile" && (
                        <div className="p-4">
                            <div className="card bg-base-100 shadow-xl border border-base-300 mb-6">
                                <div className="card-body items-center text-center p-8">
                                    <div className="avatar placeholder mb-4">
                                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-blue-400 ring ring-base-100 ring-offset-base-100 ring-offset-4">
                                            <span className="text-white text-4xl font-bold">
                                                {user.name.charAt(0)}
                                            </span>
                                        </div>
                                    </div>
                                    <h2 className="card-title text-2xl text-base-content">
                                        {user.name}
                                    </h2>
                                    <p className="text-sm text-base-content opacity-70 mb-4">
                                        {user.email}
                                    </p>
                                    <div className="badge badge-warning badge-lg font-bold">
                                        Gold Member
                                    </div>
                                </div>
                            </div>
                            <div className="card bg-base-100 shadow-xl border border-base-300">
                                <div className="card-body p-5">
                                    <div className="flex justify-between items-center py-3">
                                        <span className="text-base-content opacity-70">
                                            Home Club
                                        </span>
                                        <span className="font-bold text-base-content">
                                            {user.homeClub}
                                        </span>
                                    </div>
                                    <div className="divider my-0"></div>
                                    <div className="flex justify-between items-center py-3">
                                        <span className="text-base-content opacity-70">
                                            Total Points
                                        </span>
                                        <span className="badge badge-success badge-lg font-bold">
                                            {user.totalPoints}
                                        </span>
                                    </div>
                                    <div className="divider my-0"></div>
                                    <div className="flex justify-between items-center py-3">
                                        <span className="text-base-content opacity-70">
                                            Member Since
                                        </span>
                                        <span className="font-bold text-base-content">
                                            Oct 2024
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Navigation - Redesigned */}
                <div className="fixed bottom-0 left-0 right-0 z-50 bg-base-100/95 backdrop-blur-xl border-t border-base-300 shadow-2xl sm:relative sm:rounded-b-3xl">
                    <div className="max-w-7xl mx-auto px-2 py-2">
                        <div className="flex items-center justify-around gap-1">
                            {/* Home Button */}
                            <button
                                onClick={() => setCurrentView("home")}
                                className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300 min-w-[70px] ${
                                    currentView === "home"
                                        ? "bg-primary text-primary-content shadow-lg scale-105"
                                        : "hover:bg-base-200 text-base-content hover:scale-105 active:scale-95"
                                }`}
                            >
                                <Home
                                    className={`w-6 h-6 transition-all ${
                                        currentView === "home" ? "fill-current scale-110" : ""
                                    }`}
                                    strokeWidth={2.5}
                                />
                                <span className={`text-xs font-medium ${currentView === "home" ? "font-bold" : ""}`}>
                                    Home
                                </span>
                            </button>

                            {/* History Button */}
                            <button
                                onClick={() => setCurrentView("history")}
                                className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300 min-w-[70px] ${
                                    currentView === "history"
                                        ? "bg-primary text-primary-content shadow-lg scale-105"
                                        : "hover:bg-base-200 text-base-content hover:scale-105 active:scale-95"
                                }`}
                            >
                                <History
                                    className={`w-6 h-6 transition-all ${
                                        currentView === "history" ? "fill-current scale-110" : ""
                                    }`}
                                    strokeWidth={2.5}
                                />
                                <span className={`text-xs font-medium ${currentView === "history" ? "font-bold" : ""}`}>
                                    History
                                </span>
                            </button>

                            {/* Rewards Button - Center with Special Design */}
                            <button
                                onClick={() => setCurrentView("rewards")}
                                className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300 min-w-[70px] ${
                                    currentView === "rewards"
                                        ? "bg-gradient-to-br from-success to-green-600 text-success-content shadow-xl shadow-success/30 scale-110"
                                        : "hover:bg-base-200 text-base-content hover:scale-105 active:scale-95"
                                }`}
                            >
                                <div className={`relative ${currentView === "rewards" ? "animate-pulse" : ""}`}>
                                    <Gift
                                        className={`w-7 h-7 transition-all ${
                                            currentView === "rewards" ? "fill-current" : ""
                                        }`}
                                        strokeWidth={2.5}
                                    />
                                    {currentView !== "rewards" && (
                                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-success rounded-full animate-ping"></span>
                                    )}
                                </div>
                                <span className={`text-xs font-medium ${currentView === "rewards" ? "font-bold" : ""}`}>
                                    Rewards
                                </span>
                            </button>

                            {/* Profile Button */}
                            <button
                                onClick={() => setCurrentView("profile")}
                                className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300 min-w-[70px] ${
                                    currentView === "profile"
                                        ? "bg-primary text-primary-content shadow-lg scale-105"
                                        : "hover:bg-base-200 text-base-content hover:scale-105 active:scale-95"
                                }`}
                            >
                                <User
                                    className={`w-6 h-6 transition-all ${
                                        currentView === "profile" ? "fill-current scale-110" : ""
                                    }`}
                                    strokeWidth={2.5}
                                />
                                <span className={`text-xs font-medium ${currentView === "profile" ? "font-bold" : ""}`}>
                                    Account
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
