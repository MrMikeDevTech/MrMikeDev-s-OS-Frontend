import { Register as RegisterService } from "../../services/Auth";
import { useNavigate } from "react-router";
import { useState } from "react";
import { User, Mail, Lock } from "../Icons";
import { toast } from "react-toastify";
import AuthContainer from "../AuthContainer";
import InputForm from "../InputForm";
import DegradedText from "../DegradedText";
import IconBadge from "../IconBadge";

export default function Register() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const username = data.username.toString().trim();
        const full_name = data.full_name.toString().trim();
        const email = data.email.toString().trim();
        const password = data.password.toString();
        const confirm_password = data.confirm_password.toString();

        if (username.length < 3 || username.length > 15) {
            return toast.error("El nombre de usuario debe tener entre 3 y 15 caracteres");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.match(emailRegex)) {
            return toast.error("Por favor, introduce un correo electrónico válido");
        }

        if (!password) {
            return toast.error("La contraseña no puede estar vacía");
        }

        if (password.length < 8 || password.length > 20) {
            return toast.error("La contraseña debe tener entre 8 y 20 caracteres");
        }

        if (password !== confirm_password) {
            return toast.error("Las contraseñas no coinciden");
        }

        const registerData = {
            username,
            full_name,
            email,
            password,
            confirm_password
        };

        try {
            setIsLoading(true);
            const response = await RegisterService(registerData);

            if (response.status === "success") {
                toast.success("Registro exitoso, por favor inicia sesión");
                navigate("/login");
            } else {
                toast.error(response.message || "Error al registrarse");
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Error al registrarse");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContainer>
            <section className="z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#121214]/80 shadow-2xl backdrop-blur-xl">
                <div className="flex flex-col items-center justify-center border-b border-white/5 bg-white/2 p-8">
                    <IconBadge icon={<User className="h-8 w-8 text-white" />} color="blue" size="16" />
                    <div className="mt-4 flex flex-col items-center gap-1">
                        <DegradedText text="Registrar Cuenta" />
                        <p className="text-xs font-medium tracking-widest text-gray-500 uppercase">
                            Crear un usuario para acceder al panel de control
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-8 md:grid-cols-2">
                    <InputForm
                        type="text"
                        placeholder="username123"
                        name="username"
                        required
                        autoComplete="username"
                        icon={<User className="h-5 w-5" />}
                        label="Nombre de Usuario"
                    />

                    <InputForm
                        type="text"
                        placeholder="Full Name"
                        name="full_name"
                        required
                        autoComplete="name"
                        icon={<User className="h-5 w-5" />}
                        label="Nombre Completo"
                    />

                    <InputForm
                        type="email"
                        placeholder="name@example.com"
                        name="email"
                        required
                        autoComplete="email"
                        icon={<Mail className="h-5 w-5" />}
                        className="md:col-span-2"
                        label="Correo Electrónico"
                    />

                    <InputForm
                        type="password"
                        placeholder="••••••••"
                        name="password"
                        required
                        autoComplete="new-password"
                        icon={<Lock className="h-5 w-5" />}
                        label="Contraseña"
                    />

                    <InputForm
                        type="password"
                        placeholder="••••••••"
                        name="confirm_password"
                        required
                        autoComplete="new-password"
                        icon={<Lock className="h-5 w-5" />}
                        label="Confirmar Contraseña"
                    />

                    <button
                        disabled={isLoading}
                        className="relative mt-4 flex w-full items-center justify-center overflow-hidden rounded-xl bg-white px-4 py-3 font-bold text-black transition-all hover:bg-gray-200 active:scale-[0.98] disabled:opacity-50 md:col-span-2"
                        type="submit"
                    >
                        {isLoading ? (
                            <span className="flex animate-pulse items-center gap-2">Creando Usuario...</span>
                        ) : (
                            "Crear Usuario"
                        )}
                    </button>

                    <p className="mt-2 text-center text-xs text-gray-500 md:col-span-2">
                        ¿Ya tienes cuenta?{" "}
                        <a href="/login" className="cursor-pointer font-medium text-blue-400 hover:underline">
                            Acceder al sistema
                        </a>
                    </p>
                </form>
            </section>
        </AuthContainer>
    );
}
