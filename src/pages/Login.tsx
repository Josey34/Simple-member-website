import { Eye, EyeOff, Lock, LogIn, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [credentials, setCredentials] = useState({
        identifier: "",
        pin: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPin, setShowPin] = useState(false);
    const navigate = useNavigate();
    
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 via-base-300 to-base-200 p-4">
            <div className="w-full max-w-md">
                {/* Login Card */}
                <div className="bg-base-100 rounded-3xl shadow-2xl p-8 sm:p-10 backdrop-blur-xl bg-opacity-95">
                    {/* Icon Header */}
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-base-200 flex items-center justify-center shadow-lg">
                            <LogIn className="w-8 h-8 text-primary" strokeWidth={2} />
                        </div>
                    </div>

                    {/* Title */}
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-base-content mb-2">
                            Sign in with email
                        </h2>
                        <p className="text-sm text-base-content/60">
                            Make a new doc to bring your words, data,<br />and teams together. For free
                        </p>
                    </div>

                    {/* Error Alert */}
                    {error && (
                        <div className="alert alert-error mb-6 rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span className="text-sm">{error}</span>
                        </div>
                    )}

                    {/* Form */}
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {/* Email/Phone Input */}
                        <div className="form-control">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10">
                                    <Mail className="w-5 h-5 text-base-content/60" strokeWidth={2} />
                                </div>
                                <input
                                    id="identifier"
                                    name="identifier"
                                    type="text"
                                    required
                                    className="input input-bordered w-full pl-12 h-12 rounded-xl bg-base-200 border-base-300 focus:bg-base-100 focus:border-primary focus:outline-none transition-all duration-200"
                                    placeholder="Email"
                                    value={credentials.identifier}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* PIN Input */}
                        <div className="form-control">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10">
                                    <Lock className="w-5 h-5 text-base-content/60" strokeWidth={2} />
                                </div>
                                <input
                                    id="pin"
                                    name="pin"
                                    type={showPin ? "text" : "password"}
                                    inputMode="numeric"
                                    pattern="\d{6}"
                                    maxLength={6}
                                    required
                                    className="input input-bordered w-full pl-12 pr-12 h-12 rounded-xl bg-base-200 border-base-300 focus:bg-base-100 focus:border-primary focus:outline-none transition-all duration-200"
                                    placeholder="PIN"
                                    value={credentials.pin}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPin(!showPin)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-4 hover:opacity-70 transition-opacity z-10"
                                    disabled={isLoading}
                                >
                                    {showPin ? (
                                        <EyeOff className="w-5 h-5 text-base-content/60" strokeWidth={2} />
                                    ) : (
                                        <Eye className="w-5 h-5 text-base-content/60" strokeWidth={2} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Forgot PIN Link */}
                        <div className="text-right">
                            <a href="#" className="text-sm text-primary hover:underline">
                                Forgot PIN?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn btn-neutral w-full h-12 rounded-xl text-base font-medium hover:scale-[1.02] active:scale-[0.98] transition-transform"
                        >
                            {isLoading ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Signing in...
                                </>
                            ) : (
                                "Get Started"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;