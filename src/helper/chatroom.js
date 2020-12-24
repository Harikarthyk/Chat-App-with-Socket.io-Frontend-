import endpoint from "../config/endpoint";

//Creating new chat Rooms
export const createChatRoom = (input, token, userId) => {
	return fetch(`${endpoint}/create/chatRoom/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(input),
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};
