"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Home from './Home';

function ProtectedPage() {
    const router = useRouter();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Recuperar token y datos del usuario de localStorage
        const token = localStorage.getItem('token');
        const storedUserData = localStorage.getItem('userData');

        if (!token || !storedUserData) {
            // Redireccionar a la página de login si no hay token o datos de usuario
            router.push('/auth/login');
            return;
        }

        setUserData(JSON.parse(storedUserData));
    }, []);

    if (!userData) {
        return null; // Mostrar un indicador de carga o un mensaje mientras se cargan los datos
    }

    // Mostrar el contenido de la página protegida
    return (
        <Home userData={userData} />
    );
}

export default ProtectedPage;