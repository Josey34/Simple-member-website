import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            // const user = await loginUser(credentials);
            // login(user);
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
                                htmlFor="email"
                                className="block text-sm font-medium text-[#0C0950]"
                            >
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-[#0C0950] focus:outline-none focus:ring-[#261FB3] focus:border-[#261FB3]"
                                placeholder="Email address"
                                value={credentials.email}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-[#0C0950]"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-[#0C0950] focus:outline-none focus:ring-[#261FB3] focus:border-[#261FB3]"
                                placeholder="Password"
                                value={credentials.password}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
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
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                                isLoading
                                    ? "bg-[#261FB3]/50 cursor-not-allowed"
                                    : "bg-[#261FB3] hover:bg-[#261FB3]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#261FB3]"
                            }`}
                        >
                            {isLoading ? "Signing in..." : "Sign in"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;