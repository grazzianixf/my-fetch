const textUrl = document.getElementById("url");
const optionMethod = document.getElementById("method");
const textRequestBody = document.getElementById("requestBody");
const textResponseBody = document.getElementById("responseBody");

const btnEnviar = document.getElementById("enviar");

const enviar = (e) => {
	let obj = {
		url: textUrl.value,
		method: optionMethod.value,
		headers: {},
		requestBody: textRequestBody.value,
	};

	// console.log(obj)

	fetch(obj.url, {
		method: obj.method,
	})
		.then((response) => response.text())
		.then((responseText) => (textResponseBody.value = JSON.stringify(JSON.parse(responseText), null, 4 /* espaços */ )));
};

const setupEvents = (_) => {
	btnEnviar.addEventListener("click", enviar);
};

const load = () => {
	setupEvents();
};

document.addEventListener("DOMContentLoaded", load, false);
