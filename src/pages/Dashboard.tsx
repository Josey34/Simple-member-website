import {
    ChevronLeft,
    ChevronRight,
    Clock,
    Gift,
    History,
    Home,
    MapPin,
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
            <div className="flex items-center justify-center h-screen bg-white">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#261FB3] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-[#0C0950] text-lg">
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

    return (
        // Outer background
        <div className="flex items-center justify-center bg-[#FBE4D6]">
            {/* Mobile Container*/}
            <div
                className="w-full h-screen bg-[#FBE4D6] overflow-hidden flex flex-col relative md:max-w-md md:h-[90vh] md:rounded-3xl md:shadow-2xl md:my-4"
                style={{ height: "97vh" }}
            >
                {/* Header */}
                <div
                    className={`sticky top-0 z-50 transition-all duration-300 bg-white ${
                        isScrolled ? "shadow-md" : "shadow-none"
                    }`}
                >
                    <div className="p-3 md:p-4 flex items-center justify-between h-16 md:h-24 pt-6 md:pt-10">
                        <div className="w-12">
                            {currentView !== "home" && (
                                <button
                                    onClick={() => setCurrentView("home")}
                                    className="p-2 rounded-full hover:bg-gray-100"
                                >
                                    <ChevronLeft className="w-6 h-6 text-[#0C0950]" />
                                </button>
                            )}
                        </div>
                        <h1 className="text-xl font-bold text-[#0C0950]">
                            {getTitle()}
                        </h1>
                        <div className="w-12 flex justify-end">
                            <button
                                onClick={() => setCurrentView("profile")}
                                className="w-10 h-10 rounded-full bg-gradient-to-br from-[#261FB3] to-blue-400 flex items-center justify-center shadow-lg ring-2 ring-white"
                            >
                                <span className="text-white font-bold text-lg">
                                    {user.name.charAt(0)}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Scrollable Content (App background is White) */}
                <div
                    id="scroll-content"
                    className="flex-1 overflow-y-auto bg-white"
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
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all hover:bg-opacity-80 hover:scale-110"
                                >
                                    <ChevronLeft className="w-5 h-5 text-white" />
                                </button>
                                <button
                                    onClick={nextBanner}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all hover:bg-opacity-80 hover:scale-110"
                                >
                                    <ChevronRight className="w-5 h-5 text-white" />
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
                                <h3 className="text-[#0C0950] font-bold text-lg mb-3 flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-[#161179] opacity-80" />
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
                                    className="w-full mt-3 p-4 bg-gray-100 hover:bg-gray-200 rounded-xl text-center text-[#261FB3] font-semibold text-sm transition-all flex items-center justify-center gap-2"
                                >
                                    View All Activity
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Quick Actions */}
                            <div className="mx-4 mt-6 mb-4">
                                <h3 className="text-[#0C0950] font-bold text-lg mb-3">
                                    Quick Actions
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() =>
                                            setCurrentView("rewards")
                                        }
                                        className="bg-white shadow-lg border border-gray-100 rounded-xl p-5 hover:shadow-xl transform hover:scale-105 transition-all group"
                                    >
                                        <Gift className="w-10 h-10 text-[#261FB3] mb-2 group-hover:scale-110 transition-transform" />
                                        <span className="text-sm font-bold text-[#0C0950] block">
                                            Rewards Store
                                        </span>
                                        <span className="text-xs text-[#161179] opacity-80">
                                            Redeem now
                                        </span>
                                    </button>
                                    <button className="bg-white shadow-lg border border-gray-100 rounded-xl p-5 hover:shadow-xl transform hover:scale-105 transition-all group">
                                        <MapPin className="w-10 h-10 text-[#261FB3] mb-2 group-hover:scale-110 transition-transform" />
                                        <span className="text-sm font-bold text-[#0C0950] block">
                                            Find Clubs
                                        </span>
                                        <span className="text-xs text-[#161179] opacity-80">
                                            Near you
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* POINTS DETAIL VIEW */}
                    {currentView === "points" && (
                        <div className="p-4 animate-fadeIn">
                            <div className="bg-white shadow-xl border border-gray-100 rounded-2xl p-8 mb-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 text-[#261FB3] opacity-10 rounded-full -mr-16 -mt-16"></div>
                                <p className="text-[#161179] opacity-80 text-sm mb-2">
                                    Total Points Balance
                                </p>
                                <p className="text-[#0C0950] text-6xl font-black mb-2">
                                    {user.totalPoints.toLocaleString()}
                                </p>
                                <div className="flex items-center gap-2 text-[#161179] opacity-80 text-sm">
                                    <TrendingUp className="w-4 h-4" />
                                    <span>+10.8% from last month</span>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-[#0C0950] mb-4">
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
                                        className="bg-white shadow-lg border border-gray-100 rounded-xl p-5 hover:shadow-lg transition-all"
                                    >
                                        <div className="flex justify-between items-center mb-3">
                                            <p className="font-bold text-[#0C0950] text-lg">
                                                {loc.name}
                                            </p>
                                            <span className="text-green-500 font-black text-xl">
                                                {loc.points} pts
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                            <div
                                                className={`bg-gradient-to-r ${loc.color} h-3 rounded-full transition-all duration-1000 shadow-lg`}
                                                style={{
                                                    width: `${loc.percent}%`,
                                                }}
                                            ></div>
                                        </div>
                                        <p className="text-[#161179] opacity-80 text-sm mt-2">
                                            {loc.percent}% of total points
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* HISTORY VIEW */}
                    {currentView === "history" && (
                        <div className="p-4">
                            <div className="space-y-3">
                                {sessions.map((session, idx) => (
                                    <div
                                        key={session.id}
                                        className="bg-white shadow-lg border border-gray-100 rounded-xl p-5 hover:shadow-xl transform hover:scale-[1.02] transition-all"
                                        style={{
                                            animationDelay: `${idx * 100}ms`,
                                        }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center flex-1">
                                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#261FB3] to-blue-400 flex items-center justify-center mr-4 shadow-lg">
                                                    <History className="w-7 h-7 text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-[#0C0950] text-lg">
                                                        {session.location}
                                                    </p>
                                                    <p className="text-sm text-[#161179] opacity-80">
                                                        {session.date}
                                                    </p>
                                                    <p className="text-xs text-[#161179] opacity-80 flex items-center gap-1 mt-1">
                                                        <Clock className="w-3 h-3" />
                                                        {session.duration}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="font-black text-green-500 text-2xl">
                                                    +{session.pointsEarned}
                                                </span>
                                                <p className="text-xs text-[#161179] opacity-80">
                                                    points
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* REWARDS VIEW */}
                    {currentView === "rewards" && (
                        <div className="p-4">
                            <div className="bg-gradient-to-br from-[#261FB3] to-blue-400 rounded-2xl p-8 text-center shadow-2xl">
                                <Gift className="w-20 h-20 text-white mx-auto mb-4 animate-bounce" />
                                <p className="text-white text-xl font-bold mb-2">
                                    Rewards Coming Soon!
                                </p>
                                <p className="text-white opacity-90">
                                    Exciting rewards are on the way
                                </p>
                            </div>
                        </div>
                    )}

                    {/* PROFILE VIEW */}
                    {currentView === "profile" && (
                        <div className="p-4">
                            <div className="bg-white shadow-xl border border-gray-100 rounded-2xl p-8 text-center mb-6">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#261FB3] to-blue-400 flex items-center justify-center mx-auto mb-4 shadow-lg ring-4 ring-white">
                                    <span className="text-white text-4xl font-bold">
                                        {user.name.charAt(0)}
                                    </span>
                                </div>
                                <p className="text-2xl font-bold text-[#0C0950] mb-1">
                                    {user.name}
                                </p>
                                <p className="text-sm text-[#161179] opacity-80 mb-4">
                                    {user.email}
                                </p>
                                <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-sm font-bold px-4 py-2 rounded-full">
                                    Gold Member
                                </div>
                            </div>
                            <div className="bg-white shadow-xl border border-gray-100 rounded-2xl p-5 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-[#161179] opacity-80">
                                        Home Club
                                    </span>
                                    <span className="font-bold text-[#0C0950]">
                                        {user.homeClub}
                                    </span>
                                </div>
                                <div className="border-t border-gray-200"></div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#161179] opacity-80">
                                        Total Points
                                    </span>
                                    <span className="font-bold text-green-500">
                                        {user.totalPoints}
                                    </span>
                                </div>
                                <div className="border-t border-gray-200"></div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#161179] opacity-80">
                                        Member Since
                                    </span>
                                    <span className="font-bold text-[#0C0950]">
                                        Oct 2024
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Navigation */}
                <div className="fixed md:absolute bottom-0 left-0 right-0 bg-white backdrop-blur-lg border-t border-gray-200 shadow-2xl">
                    <div className="flex justify-around items-center py-2 px-2 h-20">
                        <button
                            onClick={() => setCurrentView("home")}
                            className={`flex flex-col items-center justify-center py-2 px-4 rounded-xl transition-all w-20 ${
                                currentView === "home"
                                    ? "text-[#261FB3]"
                                    : "text-gray-400 hover:text-[#261FB3]"
                            }`}
                        >
                            <Home className="w-6 h-6 mb-1" />
                            <span className="text-xs font-bold">Overview</span>
                        </button>

                        <button
                            onClick={() => setCurrentView("history")}
                            className={`flex flex-col items-center justify-center py-2 px-4 rounded-xl transition-all w-20 ${
                                currentView === "history"
                                    ? "text-[#261FB3]"
                                    : "text-gray-400 hover:text-[#261FB3]"
                            }`}
                        >
                            <History className="w-6 h-6 mb-1" />
                            <span className="text-xs font-bold">History</span>
                        </button>

                        <button
                            onClick={() => setCurrentView("rewards")}
                            className={`flex flex-col items-center justify-center py-2 px-4 rounded-xl transition-all w-20 ${
                                currentView === "rewards"
                                    ? "text-[#261FB3]"
                                    : "text-gray-400 hover:text-[#261FB3]"
                            }`}
                        >
                            <Gift className="w-6 h-6 mb-1" />
                            <span className="text-xs font-bold">Rewards</span>
                        </button>

                        <button
                            onClick={() => setCurrentView("profile")}
                            className={`flex flex-col items-center justify-center py-2 px-4 rounded-xl transition-all w-20 ${
                                currentView === "profile"
                                    ? "text-[#261FB3]"
                                    : "text-gray-400 hover:text-[#2G1FB3]"
                            }`}
                        >
                            <User className="w-6 h-6 mb-1" />
                            <span className="text-xs font-bold">Account</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
