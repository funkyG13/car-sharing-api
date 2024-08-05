async function fetchWithToken(url, options = {}) {
    const token = localStorage.getItem('token');

    const response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.status === 401) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('token');
        localStorage.removeItem('role');

        if (!localStorage.getItem('alertShown')) {
            localStorage.setItem('alertShown', 'true');
            if (window.confirm('Your session has expired. Please log in again.')) {
                window.location.href = '/login';
            }
        }

        throw new Error('Token expired');
    }

    return response;
}

export default fetchWithToken;

