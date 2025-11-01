/**
 * Email validation with RFC 5322 standard
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email);
};

/**
 * Indonesian phone number validation
 * Supports formats: +62, 62, 0
 */
export const isValidPhone = (phone: string): boolean => {
    const cleanPhone = phone.replace(/\D/g, "");
    const phoneRegex = /^(?:(?:\+|62|0)(?:8[1-9]|2[1-9]|3[1-9])[0-9]{8,11})$/;
    return phoneRegex.test(cleanPhone);
};

type IdentifierType = "email" | "phone";

interface IdentifierResult {
    type: IdentifierType;
    value: string;
    isValid: boolean;
}

/**
 * Formats and validates identifier (email/phone)
 */
export const formatIdentifier = (identifier: string): IdentifierResult => {
    // Check for email first
    if (isValidEmail(identifier)) {
        return {
            type: "email",
            value: identifier.toLowerCase(),
            isValid: true,
        };
    }

    // Format phone number
    const phone = formatPhoneNumber(identifier);
    const isValid = isValidPhone(phone);

    return {
        type: "phone",
        value: phone,
        isValid,
    };
};

/**
 * Formats phone number to Indonesian format
 */
export const formatPhoneNumber = (phone: string): string => {
    let cleaned = phone.replace(/\D/g, "");

    if (cleaned.startsWith("0")) {
        cleaned = "62" + cleaned.substring(1);
    }
    if (!cleaned.startsWith("62")) {
        cleaned = "62" + cleaned;
    }

    return cleaned;
};

interface TimeData {
    timestamp: number;
    formatted: string;
    date: string;
}

/**
 * Gets current timestamp in Indonesia timezone
 */
export const getIndonesiaTimestamp = (): TimeData => {
    const JAKARTA_OFFSET = 7;
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const jakartaTime = new Date(utc + 3600000 * JAKARTA_OFFSET);

    return {
        timestamp: jakartaTime.getTime(),
        formatted: formatTime(jakartaTime),
        date: formatDate(jakartaTime),
    };
};

/**
 * Formats time to HH:mm:ss
 */
export const formatTime = (date: Date): string => {
    return date.toLocaleTimeString("en-US", {
        hour12: false,
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
};

/**
 * Formats date to YYYY-MM-DD
 */
export const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-CA", {
        // en-CA gives YYYY-MM-DD format
        timeZone: "Asia/Jakarta",
    });
};

/**
 * Hashes PIN using SHA-256
 */
export const hashPin = async (pin: string): Promise<string> => {
    try {
        const encoder = new TextEncoder();
        const data = encoder.encode(pin);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    } catch (error) {
        console.error("PIN hashing failed:", error);
        throw new Error("Failed to secure PIN");
    }
};
