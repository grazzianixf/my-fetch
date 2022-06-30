/*
   https://github.com/shevabam/breaking-bad-quotes
   https://github.com/ywalia01/dune-api

   https://api.publicapis.org/entries
*/
const textUrl = document.getElementById("url");
const optionMethod = document.getElementById("method");
const textRequestBody = document.getElementById("requestBody");
const textResponseBody = document.getElementById("responseBody");
const message = document.getElementById('message')
let loadMessage = document.createElement('span')

const btnEnviar = document.getElementById("enviar");

const startLoading = (msg) => {
	textUrl.disabled = true
	textRequestBody.disabled = true
	optionMethod.disabled = true
	loadMessage.innerText = msg
	message.appendChild(loadMessage)
};

const stopLoading = (_) => {
	textUrl.disabled = false
	textRequestBody.disabled = false
	optionMethod.disabled = false
	message.removeChild(loadMessage)
};

const enviar = (e) => {
	let obj = {
		url: textUrl.value,
		method: optionMethod.value,
		headers: {}, // TODO capturar HEADERS vindos do formulário
		requestBody: textRequestBody.value,
	};

	startLoading("Processando...");

	fetch(obj.url, {
		method: obj.method,
	})
		.then((response) => response.text())
		.then((responseText) => {
         // TODO checar antes se responseText é um JSON, caso contrário dará um erro
			textResponseBody.value = JSON.stringify(
				JSON.parse(responseText),
				null,
				4 /* espaços */
			);
  		stopLoading();
		});

      // TODO implementar o catch para exibir no responseBody os erros vindos  no response caso o status da response seja diferente da faixa 200
};

const setupEvents = (_) => {
	btnEnviar.addEventListener("click", enviar);
};

const load = () => {
	setupEvents();
};

document.addEventListener("DOMContentLoaded", load, false);
