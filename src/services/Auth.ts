import { authApi } from "./Auth.axios";

const Login = async ({ email, password }: { email: string; password: string }) => {
    if (!email || !password) throw new Error("Todos los campos son obligatorios");

    try {
        const response = await authApi.post("/login", { email, password });

        return {
            status: response.data.status || "error",
            message: response.data.message || "",
            token: response.data.token || "",
            user: {
                id: response.data.user.id || "",
                full_name: response.data.user.full_name || "",
                username: response.data.user.username || "",
                email: response.data.user.email || "",
                created_at: response.data.user.created_at || "",
                updated_at: response.data.user.updated_at || ""
            }
        };
    } catch (error: any) {
        console.error("Error detallado:", error.response?.data || error.message);
        throw error;
    }
};

const Register = async ({
    username,
    full_name,
    email,
    password,
    confirm_password
}: {
    username: string;
    full_name: string;
    email: string;
    password: string;
    confirm_password: string;
}) => {
    if (!username || !full_name || !email || !password || !confirm_password)
        throw new Error("Todos los campos son obligatorios");

    const response = await authApi.post("/register", {
        username,
        full_name,
        email,
        password,
        confirm_password
    });

    return {
        status: response.data.status || "error",
        message: response.data.message || "",
        user: {
            id: response.data.user.id || "",
            full_name: response.data.user.full_name || "",
            username: response.data.user.username || "",
            email: response.data.user.email || "",
            created_at: response.data.user.created_at || "",
            updated_at: response.data.user.updated_at || ""
        }
    };
};

const Logout = async () => {
    const response = await authApi.post("/logout");

    return {
        status: response.data.status || "error",
        message: response.data.message || ""
    };
};

const ValidateToken = async () => {
    const response = await authApi.get("/validate");

    return {
        message: response.data.message || "",
        status: response.data.status || "error",
        user_id: response.data.user_id || null,
        username: response.data.username || null
    };
};

const GetMe = async () => {
    const response = await authApi.get("/me");

    return {
        source: response.data.source || "",
        status: response.data.status || "error",
        user: {
            id: response.data.user.id || "",
            full_name: response.data.user.full_name || "",
            username: response.data.user.username || "",
            email: response.data.user.email || "",
            created_at: response.data.user.created_at || "",
            updated_at: response.data.user.updated_at || ""
        }
    };
};

export { Login, Register, Logout, ValidateToken, GetMe };
