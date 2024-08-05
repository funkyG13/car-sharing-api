const authenticateWithGoogle = async (googleToken) => {
    try {
        const response = await fetch('http://localhost:8080/auth/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: googleToken }),
        });

        if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log("data:" + JSON.stringify(data));
        console.log("data.accessToken:" + data.accessToken);
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('role', "USER");
        localStorage.setItem('isLoggedIn', 'true');

    } catch (error) {
        console.error('Error:', error);
    }
};

export default authenticateWithGoogle;