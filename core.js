/*
   https://github.com/shevabam/breaking-bad-quotes
   https://github.com/ywalia01/dune-api
   https://api.publicapis.org/entries
*/
const textUrl = document.getElementById("url");
const optionMethod = document.getElementById("method");
const textRequestBody = document.getElementById("requestBody");
const textResponseBody = document.getElementById("responseBody");

const message = document.getElementById('message');
const loadMessage = document.createElement('span');

const headers = document.getElementById('headers') 
const headerInputs = document.createElement('div')
const keyInput = document.createElement('input')
const valueInput = document.createElement('input')
const addHeader = document.createElement('button')
addHeader.innerText = '+'
addHeader.setAttribute("type", "button")

headerInputs.appendChild(keyInput)
headerInputs.appendChild(valueInput)
headers.appendChild(headerInputs)
headers.appendChild(addHeader)

const btnEnviar = document.getElementById("enviar");

const showHeader = () => {
	headers.style.display = "contents"

	document.getElementById('showHeader').style.display = "none";
	document.getElementById('hideHeader').style.display = "contents";
}

const hideHeader = () => {
	headers.style.display = "none"

	document.getElementById('showHeader').style.display = "contents";
	document.getElementById('hideHeader').style.display = "none";
}

const startLoading = (msg) => {
	textUrl.disabled = true;
	textRequestBody.disabled = true;
	optionMethod.disabled = true;
	loadMessage.innerText = msg;
	message.appendChild(loadMessage);
};

const stopLoading = (_) => {
	textUrl.disabled = false;
	textRequestBody.disabled = false;
	optionMethod.disabled = false;
	message.removeChild(loadMessage);
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

addHeader.addEventListener('click', function() {
	let newHeader = document.createElement('div')
	let newKey = document.createElement('input')
	let newValue = document.createElement('input')

	newHeader.appendChild(newKey)
	newHeader.appendChild(newValue)
	headers.appendChild(newHeader)
	headers.insertBefore(newHeader, addHeader)
})

document.addEventListener("DOMContentLoaded", load, false);
