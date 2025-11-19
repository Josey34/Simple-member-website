import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";

interface Banner {
    id: number;
    gradient: string;
    title: string;
    subtitle: string;
    badge: string;
}

interface HeroBannerProps {
    banners: Banner[];
    currentBanner: number;
    onNext: () => void;
    onPrev: () => void;
    onBannerChange: (index: number) => void;
}

const HeroBanner = ({
    banners,
    currentBanner,
    onNext,
    onPrev,
    onBannerChange,
}: HeroBannerProps) => {
    useEffect(() => {
        const timer = setInterval(() => {
            onNext();
        }, 4000);
        return () => clearInterval(timer);
    }, [onNext]);

    return (
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
                onClick={onPrev}
                className="btn btn-circle btn-sm absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 backdrop-blur-sm border-none opacity-0 group-hover:opacity-100 transition-all hover:bg-opacity-80 hover:scale-105 active:scale-95"
            >
                <ChevronLeft className="w-5 h-5 text-white" strokeWidth={2.5} />
            </button>
            <button
                onClick={onNext}
                className="btn btn-circle btn-sm absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 backdrop-blur-sm border-none opacity-0 group-hover:opacity-100 transition-all hover:bg-opacity-80 hover:scale-105 active:scale-95"
            >
                <ChevronRight
                    className="w-5 h-5 text-white"
                    strokeWidth={2.5}
                />
            </button>
        </div>
    );
};

export default HeroBanner;
