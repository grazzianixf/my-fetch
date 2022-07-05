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
const addHeader = document.createElement('button')
addHeader.innerText = '+'
addHeader.setAttribute("type", "button")

let newHeaders = []

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

	newHeaders.forEach(element => {
		element.key.disabled = true
		element.value.disabled = true
	})
};

const stopLoading = (_) => {
	textUrl.disabled = false;
	textRequestBody.disabled = false;
	optionMethod.disabled = false;

	newHeaders.forEach(element => {
		element.key.disabled = false
		element.value.disabled = false
	})

	message.removeChild(loadMessage);
};

const enviar = (e) => {
	try {
		let objHeaders = new Headers()
		newHeaders.map((header) => {
			objHeaders.append(header.key.value, header.value.value)
		})
	
		let obj = { 
			method: optionMethod.value,
			headers: objHeaders, 
			requestBody: textRequestBody.value,
		};
		
		startLoading("Processando...");

		fetch(textUrl.value, obj)
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
	} catch (error) {
		textResponseBody.value = error
		stopLoading()
	}

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

	newHeaders.push({key: newKey, value: newValue})
})

document.addEventListener("DOMContentLoaded", load, false);