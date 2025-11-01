import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
    const [credentials, setCredentials] = useState({
        identifier: "",
        pin: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        if (name === 'pin' && !/^\d{0,6}$/.test(value)) {
            return;
        }
        
        setCredentials((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        if (credentials.pin.length !== 6) {
            setError("PIN must be 6 digits");
            setIsLoading(false);
            return;
        }

        if (!credentials.identifier) {
            setError("Please enter your email or phone number");
            setIsLoading(false);
            return;
        }

        try {
            // const response = await loginUser(credentials);
            // login(response.user);
            navigate("/dashboard");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to login");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0C0950]">
            <div className="max-w-md w-full space-y-8 p-8 bg-[white] rounded-lg shadow-xl">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-[#0C0950]">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Sign in to access your billiards club account
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-400 p-4">
                            <div className="text-red-700 text-sm">{error}</div>
                        </div>
                    )}

                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label
                                htmlFor="identifier"
                                className="block text-sm font-medium text-[#0C0950]"
                            >
                                Email or Phone Number
                            </label>
                            <input
                                id="identifier"
                                name="identifier"
                                type="text"
                                required
                                className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-[#0C0950] focus:outline-none focus:ring-[#261FB3] focus:border-[#261FB3]"
                                placeholder="Enter email or phone number"
                                value={credentials.identifier}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                Example: user@email.com or 081234567890
                            </p>
                        </div>

                        <div>
                            <label
                                htmlFor="pin"
                                className="block text-sm font-medium text-[#0C0950]"
                            >
                                PIN (6 digits)
                            </label>
                            <input
                                id="pin"
                                name="pin"
                                type="password"
                                inputMode="numeric"
                                pattern="\d{6}"
                                maxLength={6}
                                required
                                className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-[#0C0950] focus:outline-none focus:ring-[#261FB3] focus:border-[#261FB3] tracking-[0.5em] text-center text-xl"
                                placeholder="••••••"
                                value={credentials.pin}
                                onChange={handleChange}
                                disabled={isLoading}
                                autoComplete="new-password"
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                Enter your 6-digit PIN number
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-[#261FB3] focus:ring-[#261FB3] border-gray-300 rounded"
                            />
                            <label
                                htmlFor="remember-me"
                                className="ml-2 block text-sm text-[#0C0950]"
                            >
                                Remember me
                            </label>
                        </div>

                    <div className="text-sm">
                        <a
                            href="#"
                            className="font-medium text-[#261FB3] hover:text-[#261FB3]/80"
                        >
                            Forgot your PIN?
                        </a>
                    </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                            isLoading
                                ? "bg-[#261FB3]/50 cursor-not-allowed"
                                : "bg-[#261FB3] hover:bg-[#261FB3]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#261FB3]"
                        }`}
                    >
                        {isLoading ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Signing in...
                            </span>
                        ) : (
                            "Sign in"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;