const baseURL = "http://localhost:4200"

export const registerUser = async (username,
    firstName,
    lastName,
    email,
    password) => {
    const url = baseURL + "/register";
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, firstName, lastName, email, password })
        });
        if (response.ok) {
            return response.status;
        } else {
            // Check if the response has a JSON content type
            if (response.headers.get('Content-Type').includes('application/json')) {
                const errorData = await response.json();
                console.log("Registration failed:", errorData);
                throw new Error("Registration failed");
            } else {
                // If the response is not in JSON format, log a generic error
                console.log("Registration failed: Unexpected response format");
                throw new Error("Registration attempt failed");
            }
        }
    } catch (error) {
        console.log("Error: " + error.message);
        throw new Error("Registration attempt failed");
    }
}

export const registerTest = async () => {
    const url = baseURL + "/register/test";
    console.log('registerTest: url', url)
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify()
        });
        console.log('registerTest: response', response)
        if (response.ok) {
            return response.status;
        } else {
            console.log("Registration failed:", response.status)
            throw new Error("Registration failed");
        }
    } catch (error) {
        console.log("Error: " + error.message);
        throw new Error("Registration attempt failed");
    }
}