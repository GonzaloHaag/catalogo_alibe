export const fetchToken = async () => {
    try {
        const response = await fetch('https://rest.contabilium.com/token', {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: "client_credentials",
                client_id: import.meta.env.VITE_CLIENT_ID,
                client_secret: import.meta.env.VITE_CLIENT_SECRET,
            }),
        });

        if (!response.ok) throw new Error("Error obteniendo el token");

        const data = await response.json();
        const expiresAt = Date.now() + data.expires_in * 1000; // Guardar tiempo de expiración

        localStorage.setItem("token", data.access_token);
        localStorage.setItem("token_expires_at", expiresAt.toString());

        return data.access_token;
    } catch (error) {
        console.error("Error obteniendo token:", error);
        return null;
    }
};

export const getToken = async () => {
    const storedToken = localStorage.getItem("token");
    const storedExpiresAt = localStorage.getItem("token_expires_at");

    // Si todavia no expiro lo retorno
    if (storedToken && storedExpiresAt && Date.now() < Number(storedExpiresAt)) {
        return storedToken;
    }

    // Si expiro hago uno nuevo

    return await fetchToken();
};
