import React from "react";
import "./Error.css";
function Error({error, message}) {
	if (!message || message.length === 0) return "";
	return (
		<div
			className='Error'
			style={error ? {backgroundColor: "#D51010"} : {backgroundColor: "green"}}
		>
			{message}
		</div>
	);
}

export default Error;
