"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import alertify from "alertifyjs";
import { useRouter } from "next/navigation";


function RegisterPage() {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const router = useRouter()
    const onSubmit = handleSubmit(async (data) => {
        if (data.password !== data.confirmPassword) {
            alertify.set('notifier','position', 'top-center');
            alertify.error("Las contraseñas no coinciden");
            return;
        }
        await axios({
            method: "post",
            url: "https://httpbin.org/status/200",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            data: data,
        })
        .then((response) => {
            let responseStatus = response.status;
            if (responseStatus === 200) {
                alertify.set('notifier','position', 'top-center');
                alertify.success("Usuario registrado correctamente");
                router.push("/auth/login");
                
            }
            
        })
        .catch((error) => {
            console.log(error);
        });
    })
    
    return (
        <div className="flex flex-col min-h-screen justify-center items-center bg-gray-100">
            <div className="bg-white shadow-md rounded-lg px-8 py-6 mb-4 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">Registrarse</h1>
                <form onSubmit={onSubmit} method="POST">
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="username">Nombre de usuario:</label>
                    <input
                    type="text"
                    placeholder="Nombre de usuario"
                    className="w-full border border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("username", { required: {
                        value: true,
                        message: "El nombre de usuario es requerido",
                    } })}
                    />
                </div>
                {errors.username && (
                    <p className="text-red-500 text-xs italic">
                        {errors.username.message}
                    </p>
                )}
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="email">Correo electrónico:</label>
                    <input
                    type="email"
                    placeholder="Correo electrónico"
                    className="w-full border border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("email", { required: {
                        value: true,
                        message: "El correo electrónico es requerido",
                    } })}
                    />
                </div>
                {errors.email && (
                    <p className="text-red-500 text-xs italic">
                        {errors.email.message}
                    </p>
                )}
            
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="password">Contraseña:</label>
                    <input
                    type="password"
                    placeholder="*********"
                    className="w-full border border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("password", { required: {
                        value: true,
                        message: "La contraseña es requerida",
                    } })}
                    />
                </div>
                {errors.password && (
                    <p className="text-red-500 text-xs italic">
                        {errors.password.message}
                    </p>
                )}
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">Confirmar contraseña:</label>
                    <input
                    type="password"
                    placeholder="*********"
                    className="w-full border border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("confirmPassword", { required: {
                        value: true,
                        message: "La confirmación de la contraseña es requerida",
                    } })}
                    />
                </div>
                {errors.confirmPassword && (
                    <p className="text-red-500 text-xs italic">
                        {errors.confirmPassword.message}
                    </p>
                )}
                
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    Registrarse
                </button>
                </form>
            </div>
        </div>
    );
}
export default RegisterPage;