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

//Getting all Chat Rooms ADMIN by userID
export const allRooms = (token, userId) => {
	return fetch(`${endpoint}/all/rooms/${userId}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};
