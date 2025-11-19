import { useEffect, useState } from "react";
import HeroBanner from "../components/dashboard/HeroBanner";
import HistoryList from "../components/dashboard/HistoryList";
import PointsBreakdown from "../components/dashboard/PointsBreakdown";
import ProfileView from "../components/dashboard/ProfileView";
import QuickActions from "../components/dashboard/QuickActions";
import RecentActivity from "../components/dashboard/RecentActivity";
import RewardsView from "../components/dashboard/RewardsView";
import DashboardHeader from "../components/layout/DashboardHeader";
import DashboardNavigation from "../components/layout/DashboardNavigation";
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

    return (
        <div className="flex items-center justify-center bg-base-100 min-h-screen">
            <div
                className="w-full h-screen bg-base-100 overflow-hidden flex flex-col relative sm:max-w-md sm:h-[95vh] sm:rounded-3xl sm:shadow-2xl sm:my-4 md:max-w-lg md:h-[90vh] lg:max-w-xl"
                style={{ height: "97vh" }}
            >
                <DashboardHeader
                    currentView={currentView}
                    userName={user.name}
                    isScrolled={isScrolled}
                    onBackClick={() => setCurrentView("home")}
                    onProfileClick={() => setCurrentView("profile")}
                />

                <div
                    id="scroll-content"
                    className="flex-1 overflow-y-auto bg-base-100"
                    style={{ paddingBottom: "5rem" }}
                >
                    {currentView === "home" && (
                        <div>
                            <HeroBanner
                                banners={banners}
                                currentBanner={currentBanner}
                                onNext={nextBanner}
                                onPrev={prevBanner}
                                onBannerChange={setCurrentBanner}
                            />

                            <div className="mx-4 mt-4">
                                <PointsCard
                                    user={user}
                                    onClick={() => setCurrentView("points")}
                                />
                            </div>

                            <RecentActivity
                                sessions={sessions}
                                onViewHistory={() => setCurrentView("history")}
                            />

                            <QuickActions
                                onRewardsClick={() => setCurrentView("rewards")}
                            />
                        </div>
                    )}

                    {currentView === "points" && (
                        <PointsBreakdown totalPoints={user.totalPoints} />
                    )}

                    {currentView === "history" && (
                        <HistoryList sessions={sessions} />
                    )}

                    {currentView === "rewards" && <RewardsView />}

                    {currentView === "profile" && <ProfileView user={user} />}
                </div>

                <DashboardNavigation
                    currentView={currentView}
                    onViewChange={setCurrentView}
                />
            </div>
        </div>
    );
};

export default Dashboard;
