import axios from "axios";
import type { LoginCredentials, LoginPayload, LoginResponse } from "../types";
import { formatIdentifier, getIndonesiaTimestamp, hashPin, isValidEmail, isValidPhone } from "../utils";

const API_URL =
    import.meta.env.VITE_API_URL || "http://your-backend-api.com/api";
const API_VERSION = import.meta.env.VITE_APP_VERSION || "1.0.0";

export const loginUser = async (
    credentials: LoginCredentials
): Promise<LoginResponse> => {
    const timeData = getIndonesiaTimestamp();
    const identifierData = formatIdentifier(credentials.identifier);
    const hashedPin = await hashPin(credentials.pin);
    
    try {
        const payload: LoginPayload = {
            identifier: identifierData.value,
            pin: hashedPin,
            identifierType: identifierData.type,
            deviceInfo: {
                deviceId: crypto.randomUUID(),
                platform: navigator.platform,
                userAgent: navigator.userAgent,
            },
            timestamp: timeData.timestamp,
            formattedTime: timeData.formatted,
            timezone: "Asia/Jakarta",
        };

        console.log("Login attempt:", {
            ...payload,
        });

        if (
            !isValidEmail(payload.identifier) &&
            !isValidPhone(payload.identifier)
        ) {
            throw new Error("Please enter a valid email or phone number");
        }

        const response = await axios.post<LoginResponse>(
            `${API_URL}/auth/login`,
            payload,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Request-ID": crypto.randomUUID(),
                    "X-Client-Version": API_VERSION,
                    "X-Timezone": "Asia/Jakarta",
                },
            }
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Login failed");
        }
        throw error;
    }
};