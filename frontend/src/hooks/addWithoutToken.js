import { useState } from 'react';
import fetchWithToken from "./fetchWithToken";

export default function AddDataNoToken() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createData = async (url, data) => {
        setLoading(true);
        setError(null);

        return fetch(url, {
            method: 'POST',
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
                setError('An error occurred while creating the data.');
            });

    };

    return { createData, loading, error };
};

