import { useState } from 'react';
import fetchWithToken from "./fetchWithToken";

export default function AddData() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createData = async (url, formData) => { // rename data to formData
        setLoading(true);
        setError(null);

        try {
            console.log('Sending request to:', url); // log the URL
            console.log('With data:', formData); // log the formData

            const response = await fetchWithToken(url, {
                method: 'POST',
                body: formData,
            });

            console.log('Response:', response);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();

            setLoading(false);
            return responseData;
        } catch (error) {
            console.log('Error:', error);
            setLoading(false);
            setError('An error occurred while creating the data.');
        }
    };

    return { createData, loading, error };
};

