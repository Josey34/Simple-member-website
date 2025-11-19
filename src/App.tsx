import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { useAuth } from "./hooks/useAuth";
import Dashboard from "./pages/Dashboard";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import Rewards from "./pages/Rewards";
import { ThemeToggle } from "./components/ui/ThemeToggle";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route
                            path="/"
                            element={<Navigate to="/login" replace />}
                        />
                        <Route path="/login" element={<Login />} />

                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/leaderboard"
                            element={
                                <ProtectedRoute>
                                    <Leaderboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/rewards"
                            element={
                                <ProtectedRoute>
                                    <Rewards />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                    <ThemeToggle />
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
