import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router";
import Dashboard from "./components/Pages/Dashboard";
import Login from "./components/Pages/Login";
import Register from "./components/Pages/Register";
import useAuthStore from "./hooks/useAuthStore";
import { ValidateToken } from "./services/Auth";

export default function App() {
    const { isAuthenticated, logout } = useAuthStore();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
        const checkToken = async () => {
            if (isAuthenticated) {
                try {
                    const res = await ValidateToken();
                    if (res.status !== "success") {
                        logout();
                    }
                } catch (err) {
                    logout();
                }
            }
            setIsCheckingAuth(false);
        };
        checkToken();
    }, [isAuthenticated, logout]);

    if (isCheckingAuth) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-900 text-white">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-white"></div>
            </div>
        );
    }

    return (
        <Routes>
            <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />} />
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} />
            <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" replace />} />
        </Routes>
    );
}
