import endpoint from "../config/endpoint";

export const register = (input) => {
	return fetch(`${endpoint}/register`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(input),
	})
		.then((res) => res.json())
		.catch((error) => console.error(error));
};

export const login = (input) => {
	return fetch(`${endpoint}/login`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(input),
	})
		.then((res) => res.json())
		.catch((error) => console.error(error));
};

export const logout = () => {
	if (typeof window !== undefined) {
		localStorage.removeItem("@chat_app_23-12");
		return fetch(`${endpoint}/logout`, {
			method: "GET",
		})
			.then((res) => res.json())
			.catch((error) => console.log(error));
	}
};
