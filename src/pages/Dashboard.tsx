import { Award, ChevronLeft, ChevronRight, Clock, Gift, History, Home, Info, MapPin, Play, TrendingUp, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

// Points Card - Refactored for Peach/Blue Light Mode
const PointsCard = ({ user, onClick }: any) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <button 
                onClick={onClick}
                className={`w-full bg-white rounded-2xl p-6 shadow-lg border border-gray-100 relative overflow-hidden group transition-all duration-300 ${
                    isHovered ? 'scale-105 shadow-xl' : 'scale-100'
                }`}
            >
                <div className="relative flex items-center justify-between">
                    <div className="text-left">
                        <div className="flex items-center gap-2 mb-2">
                            <Award className="w-5 h-5 text-[#261FB3] animate-pulse" />
                            <p className="text-[#161179] opacity-80 text-sm font-semibold">Total Points Balance</p>
                        </div>
                        <p className="text-[#0C0950] text-5xl font-black tracking-tight mb-1">{user.totalPoints.toLocaleString()}</p>
                        <p className="text-[#161179] opacity-70 text-xs flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            +135 this week
                        </p>
                    </div>
                    <div className="bg-gray-100 backdrop-blur-sm rounded-full p-3 group-hover:scale-110 transition-transform">
                        <ChevronRight className="w-8 h-8 text-[#261FB3]" />
                    </div>
                </div>
            </button>

            {/* Hover Detail Panel */}
            {isHovered && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl p-5 shadow-2xl border border-gray-200 z-30 animate-fadeIn">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-[#0C0950] font-bold text-lg">Points Overview</h4>
                        <button 
                            onClick={onClick}
                            className="bg-[#261FB3] hover:bg-opacity-80 text-white text-xs font-bold px-3 py-1 rounded-full transition-all"
                        >
                            Details →
                        </button>
                    </div>
                    
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-[#161179] opacity-80 text-sm">This Week</span>
                            <span className="text-green-500 font-bold text-lg">+135 pts</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[#161179] opacity-80 text-sm">This Month</span>
                            <span className="text-green-500 font-bold text-lg">+450 pts</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[#161179] opacity-80 text-sm">Available to Redeem</span>
                            <span className="text-[#0C0950] font-bold text-lg">{user.totalPoints.toLocaleString()} pts</span>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-[#161179] opacity-80 text-xs">
                            💡 You need <span className="text-[#0C0950] font-semibold">250 more points</span> to unlock the "2 Hours Free Play" reward
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

// Netflix-style Card Component with Hover Effect - Refactored for Peach/Blue Light Mode
const NetflixCard = ({ session, delay, onViewHistory }: any) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showDetail, setShowDetail] = useState(false);

    return (
        <>
            <div 
                className="relative group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ animationDelay: `${delay}ms` }}
            >
                <div 
                    className={`bg-white rounded-xl overflow-hidden border border-gray-100 cursor-pointer transition-all duration-300 ${
                        isHovered ? 'scale-110 shadow-xl z-10' : 'scale-100 shadow-lg'
                    }`}
                    onClick={() => setShowDetail(true)}
                >
                    <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center flex-1">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#261FB3] to-blue-400 flex items-center justify-center mr-3 transition-transform shadow-lg">
                                <History className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-[#0C0950] text-sm">{session.location}</p>
                                <p className="text-xs text-[#161179] opacity-80">{session.date} • {session.duration}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="font-black text-green-500 text-xl">+{session.pointsEarned}</span>
                            <p className="text-xs text-[#161179] opacity-80">pts</p>
                        </div>
                    </div>
                    
                    {/* Netflix-style hover details */}
                    {isHovered && (
                        <div className="bg-gray-50 border-t border-gray-200 p-4 animate-fadeIn">
                            <div className="flex gap-2 mb-3">
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowDetail(true);
                                    }}
                                    className="flex-1 bg-[#0C0950] hover:bg-opacity-80 text-white font-bold py-2 rounded-md flex items-center justify-center gap-2 transition-all"
                                >
                                    <Play className="w-4 h-4" fill="white" />
                                    View Details
                                </button>
                                <button className="bg-gray-200 hover:bg-gray-300 text-[#161179] opacity-80 p-2 rounded-md transition-all">
                                    <Info className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="space-y-2 text-xs">
                                <div className="flex justify-between text-[#161179] opacity-80">
                                    <span>Table Number:</span>
                                    <span className="font-semibold text-[#0C0950]">Table 5</span>
                                </div>
                                <div className="flex justify-between text-[#161179] opacity-80">
                                    <span>Cost:</span>
                                    <span className="font-semibold text-[#0C0950]">Rp 45.000</span>
                                </div>
                                <div className="flex justify-between text-[#161179] opacity-80">
                                    <span>Points Rate:</span>
                                    <span className="font-semibold text-green-500">20 pts/hour</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Detail Modal - Refactored for Peach/Blue Light Mode */}
            {showDetail && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 animate-fadeIn"
                    onClick={() => setShowDetail(false)}
                >
                    <div 
                        className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header Image */}
                        <div className="h-48 bg-gradient-to-br from-[#261FB3] to-blue-400 relative overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <History className="w-24 h-24 text-white opacity-20" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                                <h2 className="text-2xl font-bold text-white">{session.location}</h2>
                            </div>
                            <button 
                                onClick={() => setShowDetail(false)}
                                className="absolute top-4 right-4 bg-black bg-opacity-50 backdrop-blur-sm rounded-full p-2 hover:bg-opacity-70 transition-all"
                            >
                                <ChevronLeft className="w-6 h-6 text-white rotate-180" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-green-100 text-green-700 font-bold px-4 py-2 rounded-lg">
                                    +{session.pointsEarned} Points
                                </div>
                                <span className="text-[#161179] opacity-80 text-sm">{session.date}</span>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-gray-100 rounded-xl p-4 border border-gray-200">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[#161179] opacity-80 text-sm">Duration</span>
                                        <span className="text-[#0C0950] font-bold">{session.duration}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[#161179] opacity-80 text-sm">Table Number</span>
                                        <span className="text-[#0C0950] font-bold">Table 5</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[#161179] opacity-80 text-sm">Total Cost</span>
                                        <span className="text-[#0C0950] font-bold">Rp 45.000</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#161179] opacity-80 text-sm">Points Earned</span>
                                        <span className="text-green-500 font-bold">+{session.pointsEarned} pts</span>
                                    </div>
                                </div>

                                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                                    <p className="text-[#261FB3] opacity-80 text-sm flex items-center gap-2 mb-2">
                                        <Info className="w-4 h-4" />
                                        Session Details
                                    </p>
                                    <p className="text-[#161179] opacity-90 text-sm">
                                        You played for {session.duration} and earned {session.pointsEarned} points at a rate of 20 points per hour. Keep playing to earn more rewards!
                                    </p>
                                </div>

                                <button 
                                    onClick={() => {
                                        setShowDetail(false);
                                        onViewHistory();
                                    }}
                                    className="w-full bg-[#261FB3] hover:bg-opacity-90 text-white font-bold py-3 rounded-xl transition-all"
                                >
                                    View Full History
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const Dashboard = () => {
    const { user, sessions, leaderboard } = useAuth();
    const [currentView, setCurrentView] = useState<'home' | 'points' | 'history' | 'rewards' | 'profile'>('home');
    const [currentBanner, setCurrentBanner] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    // Auto-slide banner
    useEffect(() => {
        if (currentView === 'home') {
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
        const scrollContainer = document.getElementById('scroll-content');
        scrollContainer?.addEventListener('scroll', handleScroll);
        return () => scrollContainer?.removeEventListener('scroll', handleScroll);
    }, []);

    if (!user) {
        return <div className="flex items-center justify-center h-screen bg-white">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-[#261FB3] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-[#0C0950] text-lg">Loading your experience...</p>
            </div>
        </div>;
    }

    const banners = [
        { 
            id: 1, 
            gradient: "from-red-600 via-red-500 to-orange-500", 
            title: "🔥 October Special!", 
            subtitle: "Extra 20% Points on Weekends",
            badge: "HOT"
        },
        { 
            id: 2, 
            gradient: "from-[#261FB3] via-blue-500 to-indigo-500", 
            title: "🎉 New Club Open!", 
            subtitle: "Grand Opening at Mall Surabaya",
            badge: "NEW"
        },
        { 
            id: 3, 
            gradient: "from-purple-600 via-purple-500 to-pink-500", 
            title: "🏆 Tournament Alert!", 
            subtitle: "Monthly Championship - Oct 25",
            badge: "LIVE"
        },
    ];

    const nextBanner = () => setCurrentBanner((prev) => (prev + 1) % banners.length);
    const prevBanner = () => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);

    const userRank = leaderboard.find(l => l.isCurrentUser)?.rank || 0;

    const getTitle = () => {
        switch(currentView) {
            case 'home': return 'Overview';
            case 'history': return 'Play History';
            case 'points': return 'Points Breakdown';
            case 'rewards': return 'Rewards';
            case 'profile': return 'My Profile';
            default: return 'Overview';
        }
    }

    return (
        // Outer background is now Peach
        <div className="flex items-center justify-center min-h-screen bg-[#FBE4D6] p-4">
            {/* Mobile Container is now White */}
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col relative" style={{ height: '90vh' }}>
                
                {/* Header */}
                <div className={`sticky top-0 z-50 transition-all duration-300 bg-white ${isScrolled ? 'shadow-md' : 'shadow-none'}`}>
                    <div className="p-4 flex items-center justify-between h-24 pt-10">
                        <div className="w-12">
                            {currentView !== 'home' && (
                                <button 
                                    onClick={() => setCurrentView('home')} 
                                    className="p-2 rounded-full hover:bg-gray-100"
                                >
                                    <ChevronLeft className="w-6 h-6 text-[#0C0950]" />
                                </button>
                            )}
                        </div>
                        <h1 className="text-xl font-bold text-[#0C0950]">{getTitle()}</h1>
                        <div className="w-12 flex justify-end">
                            <button onClick={() => setCurrentView('profile')} className="w-10 h-10 rounded-full bg-gradient-to-br from-[#261FB3] to-blue-400 flex items-center justify-center shadow-lg ring-2 ring-white">
                                <span className="text-white font-bold text-lg">{user.name.charAt(0)}</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Scrollable Content (App background is White) */}
                <div id="scroll-content" className="flex-1 overflow-y-auto bg-white pb-24">
                    {/* HOME VIEW */}
                    {currentView === 'home' && (
                        <div>
                            {/* Hero Banner Slider */}
                            <div className="relative mx-4 mt-4 rounded-2xl overflow-hidden shadow-xl group">
                                <div className={`bg-gradient-to-br ${banners[currentBanner].gradient} p-8 h-56 flex flex-col justify-between relative overflow-hidden`}>
                                    <div className="absolute inset-0 opacity-10">
                                        <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse"></div>
                                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse delay-75"></div>
                                    </div>
                                    
                                    <div className="relative z-10">
                                        <span className="inline-block bg-white bg-opacity-30 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full mb-3 animate-pulse">
                                            {banners[currentBanner].badge}
                                        </span>
                                        <h2 className="text-white text-3xl font-black mb-2 drop-shadow-lg">{banners[currentBanner].title}</h2>
                                        <p className="text-white text-sm font-medium drop-shadow">{banners[currentBanner].subtitle}</p>
                                    </div>
                                    
                                    <div className="relative z-10 flex gap-2">
                                        {banners.map((_, idx) => (
                                            <div 
                                                key={idx} 
                                                className={`h-1 rounded-full transition-all duration-300 ${
                                                    idx === currentBanner 
                                                        ? 'w-8 bg-white shadow-lg' 
                                                        : 'w-1 bg-white bg-opacity-40'
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
                                    onClick={() => setCurrentView('points')}
                                />
                            </div>

                            {/* Recent Activity */}
                            <div className="mx-4 mt-6">
                                <h3 className="text-[#0C0950] font-bold text-lg mb-3 flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-[#161179] opacity-80" />
                                    Recent Activity
                                </h3>
                                <div className="space-y-3">
                                    {sessions.slice(0, 3).map((session, idx) => (
                                        <NetflixCard 
                                            key={session.id}
                                            session={session}
                                            delay={idx * 100}
                                            onViewHistory={() => setCurrentView('history')}
                                        />
                                    ))}
                                </div>
                                <button 
                                    onClick={() => setCurrentView('history')}
                                    className="w-full mt-3 p-4 bg-gray-100 hover:bg-gray-200 rounded-xl text-center text-[#261FB3] font-semibold text-sm transition-all flex items-center justify-center gap-2"
                                >
                                    View All Activity
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Quick Actions */}
                            <div className="mx-4 mt-6 mb-4">
                                <h3 className="text-[#0C0950] font-bold text-lg mb-3">Quick Actions</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <button 
                                        onClick={() => setCurrentView('rewards')}
                                        className="bg-white shadow-lg border border-gray-100 rounded-xl p-5 hover:shadow-xl transform hover:scale-105 transition-all group"
                                    >
                                        <Gift className="w-10 h-10 text-[#261FB3] mb-2 group-hover:scale-110 transition-transform" />
                                        <span className="text-sm font-bold text-[#0C0950] block">Rewards Store</span>
                                        <span className="text-xs text-[#161179] opacity-80">Redeem now</span>
                                    </button>
                                    <button className="bg-white shadow-lg border border-gray-100 rounded-xl p-5 hover:shadow-xl transform hover:scale-105 transition-all group">
                                        <MapPin className="w-10 h-10 text-[#261FB3] mb-2 group-hover:scale-110 transition-transform" />
                                        <span className="text-sm font-bold text-[#0C0950] block">Find Clubs</span>
                                        <span className="text-xs text-[#161179] opacity-80">Near you</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* POINTS DETAIL VIEW */}
                    {currentView === 'points' && (
                        <div className="p-4 animate-fadeIn">
                            <div className="bg-white shadow-xl border border-gray-100 rounded-2xl p-8 mb-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 text-[#261FB3] opacity-10 rounded-full -mr-16 -mt-16"></div>
                                <p className="text-[#161179] opacity-80 text-sm mb-2">Total Points Balance</p>
                                <p className="text-[#0C0950] text-6xl font-black mb-2">{user.totalPoints.toLocaleString()}</p>
                                <div className="flex items-center gap-2 text-[#161179] opacity-80 text-sm">
                                    <TrendingUp className="w-4 h-4" />
                                    <span>+10.8% from last month</span>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-[#0C0950] mb-4">Points by Location</h3>
                            <div className="space-y-4">
                                {[
                                    { name: "The Corner Pocket", points: 540, color: "from-green-500 to-emerald-600", percent: 43 },
                                    { name: "Grand Billiard", points: 450, color: "from-blue-500 to-cyan-600", percent: 36 },
                                    { name: "The Break Room", points: 260, color: "from-purple-500 to-pink-600", percent: 21 }
                                ].map((loc, idx) => (
                                    <div 
                                        key={idx} 
                                        className="bg-white shadow-lg border border-gray-100 rounded-xl p-5 hover:shadow-lg transition-all"
                                    >
                                        <div className="flex justify-between items-center mb-3">
                                            <p className="font-bold text-[#0C0950] text-lg">{loc.name}</p>
                                            <span className="text-green-500 font-black text-xl">{loc.points} pts</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                            <div 
                                                className={`bg-gradient-to-r ${loc.color} h-3 rounded-full transition-all duration-1000 shadow-lg`}
                                                style={{ width: `${loc.percent}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-[#161179] opacity-80 text-sm mt-2">{loc.percent}% of total points</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* HISTORY VIEW */}
                    {currentView === 'history' && (
                        <div className="p-4">
                            <div className="space-y-3">
                                {sessions.map((session, idx) => (
                                    <div 
                                        key={session.id} 
                                        className="bg-white shadow-lg border border-gray-100 rounded-xl p-5 hover:shadow-xl transform hover:scale-[1.02] transition-all"
                                        style={{ animationDelay: `${idx * 100}ms` }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center flex-1">
                                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#261FB3] to-blue-400 flex items-center justify-center mr-4 shadow-lg">
                                                    <History className="w-7 h-7 text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-[#0C0950] text-lg">{session.location}</p>
                                                    <p className="text-sm text-[#161179] opacity-80">{session.date}</p>
                                                    <p className="text-xs text-[#161179] opacity-80 flex items-center gap-1 mt-1">
                                                        <Clock className="w-3 h-3" />
                                                        {session.duration}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="font-black text-green-500 text-2xl">+{session.pointsEarned}</span>
                                                <p className="text-xs text-[#161179] opacity-80">points</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* REWARDS VIEW */}
                    {currentView === 'rewards' && (
                        <div className="p-4">
                            <div className="bg-gradient-to-br from-[#261FB3] to-blue-400 rounded-2xl p-8 text-center shadow-2xl">
                                <Gift className="w-20 h-20 text-white mx-auto mb-4 animate-bounce" />
                                <p className="text-white text-xl font-bold mb-2">Rewards Coming Soon!</p>
                                <p className="text-white opacity-90">Exciting rewards are on the way</p>
                            </div>
                        </div>
                    )}

                    {/* PROFILE VIEW */}
                    {currentView === 'profile' && (
                        <div className="p-4">
                            <div className="bg-white shadow-xl border border-gray-100 rounded-2xl p-8 text-center mb-6">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#261FB3] to-blue-400 flex items-center justify-center mx-auto mb-4 shadow-lg ring-4 ring-white">
                                    <span className="text-white text-4xl font-bold">{user.name.charAt(0)}</span>
                                </div>
                                <p className="text-2xl font-bold text-[#0C0950] mb-1">{user.name}</p>
                                <p className="text-sm text-[#161179] opacity-80 mb-4">{user.email}</p>
                                <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-sm font-bold px-4 py-2 rounded-full">
                                    Gold Member
                                </div>
                            </div>
                            <div className="bg-white shadow-xl border border-gray-100 rounded-2xl p-5 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-[#161179] opacity-80">Home Club</span>
                                    <span className="font-bold text-[#0C0950]">{user.homeClub}</span>
                                </div>
                                <div className="border-t border-gray-200"></div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#161179] opacity-80">Total Points</span>
                                    <span className="font-bold text-green-500">{user.totalPoints}</span>
                                </div>
                                <div className="border-t border-gray-200"></div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#161179] opacity-80">Member Since</span>
                                    <span className="font-bold text-[#0C0950]">Oct 2024</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Navigation */}
                <div className="absolute bottom-0 left-0 right-0 bg-white backdrop-blur-lg border-t border-gray-200 shadow-2xl">
                    <div className="flex justify-around items-center py-2 px-2 h-20">
                        <button 
                            onClick={() => setCurrentView('home')}
                            className={`flex flex-col items-center justify-center py-2 px-4 rounded-xl transition-all w-20 ${
                                currentView === 'home' 
                                    ? 'text-[#261FB3]' 
                                    : 'text-gray-400 hover:text-[#261FB3]'
                            }`}
                        >
                            <Home className="w-6 h-6 mb-1" />
                            <span className="text-xs font-bold">Overview</span>
                        </button>
                        
                        <button 
                            onClick={() => setCurrentView('history')}
                            className={`flex flex-col items-center justify-center py-2 px-4 rounded-xl transition-all w-20 ${
                                currentView === 'history' 
                                    ? 'text-[#261FB3]' 
                                    : 'text-gray-400 hover:text-[#261FB3]'
                            }`}
                        >
                            <History className="w-6 h-6 mb-1" />
                            <span className="text-xs font-bold">History</span>
                        </button>
                        
                        <button 
                            onClick={() => setCurrentView('rewards')}
                            className={`flex flex-col items-center justify-center py-2 px-4 rounded-xl transition-all w-20 ${
                                currentView === 'rewards' 
                                    ? 'text-[#261FB3]' 
                                    : 'text-gray-400 hover:text-[#261FB3]'
                            }`}
                        >
                            <Gift className="w-6 h-6 mb-1" />
                            <span className="text-xs font-bold">Rewards</span>
                        </button>
                        
                        <button 
                            onClick={() => setCurrentView('profile')}
                            className={`flex flex-col items-center justify-center py-2 px-4 rounded-xl transition-all w-20 ${
                                currentView === 'profile' 
                                    ? 'text-[#261FB3]' 
                                    : 'text-gray-400 hover:text-[#2G1FB3]'
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