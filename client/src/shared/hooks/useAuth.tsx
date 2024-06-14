import { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
    username: string;
    email: string;
    is_admin: boolean; // Добавлено поле is_admin
}

const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/auth/user/'); // Замените на ваш эндпоинт получения пользователя
                setUser(response.data);
            } catch (error) {
                setUser(null);
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);

    return { user };
};

export default useAuth;
