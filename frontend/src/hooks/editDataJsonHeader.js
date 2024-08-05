import { useState } from 'react';
import fetchWithToken from './fetchWithToken'


export default function EditDataJsonHeader() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const editDataJsonHeader = (url, data) => {
        setLoading(true);
        setError(null);

        return fetchWithToken(`${url}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(responseData => {
                setLoading(false);
                return responseData;
            })
            .catch(error => {
                console.log('Error:', error);
                setLoading(false);
                setError('An error occurred while updating the data.');
            });
    };

    return { editDataJsonHeader, loading, error };
};