import { useState } from 'react';
import jwt from "jsonwebtoken";

export default function useAuthorization () {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const authorize = async (username, password) => {
        try {
            const response = await fetch('http://localhost:8080/auth/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "username":username, "password":password }),
            });

            if (!response.ok) {
                console.error(`Error: ${response.status} ${response.statusText}`);
                setIsLoggedIn(false);
                throw new Error('Network response was not ok');
            }

            const data = await response.text();

            if (!data) {
                console.log('No data received');
                setIsLoggedIn(false);
                return;
            }

            const jsonData = JSON.parse(data);
            if (jsonData.accessToken) {
                localStorage.setItem('token', jsonData.accessToken);
                setIsLoggedIn(true);
                const decodedToken = jwt.decode(localStorage.getItem('token'));
                localStorage.setItem('role', decodedToken.rol[0]);
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('email', decodedToken.email);
            } else {
                console.log('Authentication failed');
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error('Error:', error);
            setIsLoggedIn(false);
        }
    };

    return { isLoggedIn, authorize };
};
