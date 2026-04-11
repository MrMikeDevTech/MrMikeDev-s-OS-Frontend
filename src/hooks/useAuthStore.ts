import { useState, useEffect, useCallback } from "react";

export default function useAuthStore() {
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem("user");
        const savedToken = localStorage.getItem("token");

        if (savedUser && savedToken) {
            try {
                return {
                    ...JSON.parse(savedUser),
                    token: savedToken
                };
            } catch (e) {
                return null;
            }
        }
        return null;
    });

    useEffect(() => {
        const checkAuthIntegrity = () => {
            const savedUser = localStorage.getItem("user");
            const savedToken = localStorage.getItem("token");

            if ((savedUser && !savedToken) || (!savedUser && savedToken)) {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                setUser(null);
                return;
            }

            if (!savedUser && !savedToken && user) {
                setUser(null);
                return;
            }

            if (savedUser && savedToken) {
                try {
                    const parsedUser = JSON.parse(savedUser);
                    const newUserState = { ...parsedUser, token: savedToken };

                    if (user && JSON.stringify(user) !== JSON.stringify(newUserState)) {
                        localStorage.removeItem("user");
                        localStorage.removeItem("token");
                        setUser(null);
                        return;
                    }

                    if (!user) {
                        setUser(newUserState);
                    }
                } catch (e) {
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    setUser(null);
                }
            } else if (user !== null) {
                setUser(null);
            }
        };

        const intervalId = setInterval(checkAuthIntegrity, 5000);

        window.addEventListener("auth-change", checkAuthIntegrity);
        window.addEventListener("storage", checkAuthIntegrity);

        return () => {
            clearInterval(intervalId);
            window.removeEventListener("auth-change", checkAuthIntegrity);
            window.removeEventListener("storage", checkAuthIntegrity);
        };
    }, [user]);

    const login = useCallback((userData: User, token: string) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser({ ...userData, token });
        window.dispatchEvent(new Event("auth-change"));
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        window.dispatchEvent(new Event("auth-change"));
    }, []);

    return {
        user,
        isAuthenticated: !!user?.token,
        login,
        logout
    };
}
