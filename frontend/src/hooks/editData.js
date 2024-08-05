import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchWithToken from "./fetchWithToken";

export default function EditData() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const editData = async (url, updatedData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetchWithToken(url, {
                method: 'PUT',
                body: updatedData,
            });

            console.log('Response:', response);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();

            setLoading(false);
            return responseData;
        } catch (error) {
            console.log('Error:', error); // log the error
            setLoading(false);
            setError('An error occurred while creating the data.');
        }
    };

    return { editData, loading, error };
};
