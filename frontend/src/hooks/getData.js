import { useState, useEffect } from 'react';

export default function GetData(url) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [url]);

    return { data, isLoading, error };
}
