"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import alertify from "alertifyjs";
import axios from "axios";

function Login() {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const router = useRouter()
    const onSubmit = handleSubmit(async (data) => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://test-back.test/api/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data : JSON.stringify(data)
        };

        await axios.request(config)
        .then((response) => {
            let responseStatus = response.status;
            if (responseStatus === 200) {
                // alertify.set('notifier','position', 'top-center');
                // alertify.success("Usuario autenticado correctamente");
                //almacenar en local storage token y type token
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('typeToken', response.data.typeToken);
                localStorage.setItem('userData', JSON.stringify(response.data.user));

                console.log('redirecting');

                router.push('/');
            }
        })
        .catch((error) => {
            console.log(error);
        });
    })
    return (
        <div className="flex flex-col min-h-screen justify-center items-center bg-gray-100">
            <div className="bg-white shadow-md rounded-lg px-8 py-6 mb-4 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>
                <form onSubmit={onSubmit} method="POST">
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">Correo electrónico:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full border border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "El correo electrónico es requerido",
                                },
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "El correo electrónico no es válido",
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs italic">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full border border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "La contraseña es requerida",
                                },
                            })}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs italic">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        Iniciar sesión
                    </button>
                </form>
            </div>
        </div>
    )
  }
  export default Login;