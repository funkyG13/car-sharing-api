import { useState } from 'react';
import fetchWithToken from "./fetchWithToken";

export default function DeleteData() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteData = async (url, id) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetchWithToken(`${url}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setLoading(false);
            return response;
        } catch (error) {
            setLoading(false);
            setError('An error occurred while updating the data.');
        }
    };

    return { deleteData, loading, error };
};
