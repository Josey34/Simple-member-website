import { Building2, MapPin, Store } from "lucide-react";

export interface LocationConfig {
    icon: typeof Building2 | typeof MapPin | typeof Store;
    gradient: string;
    bgColor: string;
}

export const getLocationIcon = (locationName: string): LocationConfig => {
    const lowerLocation = locationName.toLowerCase();

    if (
        lowerLocation.includes("corner") ||
        lowerLocation.includes("pocket")
    ) {
        return {
            icon: Store,
            gradient: "from-purple-500 to-purple-700",
            bgColor: "bg-purple-500",
        };
    } else if (
        lowerLocation.includes("grand") ||
        lowerLocation.includes("billiard")
    ) {
        return {
            icon: Building2,
            gradient: "from-blue-500 to-blue-700",
            bgColor: "bg-blue-500",
        };
    } else if (lowerLocation.includes("break")) {
        return {
            icon: MapPin,
            gradient: "from-green-500 to-green-700",
            bgColor: "bg-green-500",
        };
    } else {
        return {
            icon: Building2,
            gradient: "from-primary to-blue-400",
            bgColor: "bg-primary",
        };
    }
};
