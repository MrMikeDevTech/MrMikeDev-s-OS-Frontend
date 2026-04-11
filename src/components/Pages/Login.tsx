import { Login as LoginService } from "../../services/Auth";
import { Server, Mail, Lock } from "../Icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import AuthContainer from "../AuthContainer";
import useAuthStore from "../../hooks/useAuthStore";
import InputForm from "../InputForm";
import DegradedText from "../DegradedText";
import IconBadge from "../IconBadge";

export default function Login() {
    const { login } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const response = await LoginService({ email, password });
            if (response.status !== "success" || !response.token) {
                toast.error(response.message || "Error al iniciar sesión");
                return;
            }

            login(response.user, response.token);
            toast.success(`Bienvenido, ${response.user.username}`);
            navigate("/");
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.message || "Error al iniciar sesión";
            toast.error(errorMessage);
        }
    };

    return (
        <AuthContainer>
            <section className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#121214]/80 shadow-2xl backdrop-blur-xl">
                <div className="flex flex-col items-center justify-center border-b border-white/5 bg-white/2 p-8">
                    <IconBadge icon={<Server className="h-8 w-8 text-white" />} color="purple" size="16" />
                    <div className="mt-4 flex flex-col items-center gap-1">
                        <DegradedText text="MrMikeDev's OS" />
                        <p className="text-sm font-medium tracking-widest text-gray-500 uppercase">Panel de Control</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-8">
                    <InputForm
                        type="email"
                        placeholder="name@example.com"
                        name="email"
                        required
                        autoComplete="email"
                        icon={<Mail className="h-5 w-5" />}
                        label="Correo Electrónico"
                    />

                    <InputForm
                        type="password"
                        placeholder="••••••••"
                        name="password"
                        required
                        autoComplete="current-password"
                        icon={<Lock className="h-5 w-5" />}
                        label="Contraseña"
                    />

                    <button
                        className="group re lative mt-2 flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-white px-4 py-3 font-bold text-black transition-all hover:bg-gray-200 active:scale-[0.98]"
                        type="submit"
                    >
                        <span className="z-10 flex items-center gap-2">Acceder</span>
                    </button>

                    <p className="mt-2 text-center text-xs text-gray-500 md:col-span-2">
                        ¿No tienes cuenta?{" "}
                        <a href="/register" className="cursor-pointer font-medium text-blue-400 hover:underline">
                            Registrarse
                        </a>
                    </p>
                </form>
            </section>
        </AuthContainer>
    );
}
