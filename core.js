/*
	 https://github.com/shevabam/breaking-bad-quotes
	 https://github.com/ywalia01/dune-api
	 https://api.publicapis.org/entries
*/

const textUrl = document.getElementById("url");
const optionMethod = document.getElementById("method");
const textRequestBody = document.getElementById("requestBody");
const textResponseBody = document.getElementById("responseBody");
const statusResponse = document.getElementById("responseStatus")

const message = document.getElementById('message');
const loadMessage = document.createElement('span');

const headers = document.getElementById('headers')
const addHeader = document.createElement('button')
addHeader.innerText = '+'
addHeader.setAttribute("type", "button")

const newHeaders = []

headers.appendChild(addHeader)

const alertField = document.getElementById('alert')
const alertMessage = document.createElement('span')
const deleteAlertMsg = document.createElement('span')

const btnEnviar = document.getElementById("enviar");

const isJson = (str) => {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}

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

	statusResponse.value = ""
	textResponseBody.value = ""
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

	startLoading("Processando...");

	let objHeaders = new Headers()
	newHeaders.map((header) => {
		if (header.key.value !== "" && header.value.value !== "") {
			objHeaders.append(header.key.value, header.value.value)
		}
	})

	let obj = {
		method: optionMethod.value,
		headers: objHeaders,
		requestBody: textRequestBody.value,
	};

	fetch(textUrl.value, obj)
		.then((response) => {
			console.log('1º Then')
			statusResponse.value = response.status
			if (response.status >= 200 && response.status < 300) {
				alertField.style.backgroundColor = "lightGreen"
				alertField.appendChild(alertMessage)
				alertField.appendChild(deleteAlertMsg)
				alertMessage.innerText = "Requisição com sucesso"
				deleteAlertMsg.innerText = "x"
			} else {
				alertField.style.backgroundColor = "red"
				alertField.appendChild(alertMessage)
				alertField.appendChild(deleteAlertMsg)
				alertMessage.innerText = "Erro na requisição"
				deleteAlertMsg.innerText = "x"
			}
			return response.text() 
		})
		.then((responseText) => {
			console.log('2º Then')
			if (isJson(responseText) === true) {
				textResponseBody.value = JSON.stringify(JSON.parse(responseText), null, 4);
			} else {
				textResponseBody.value = responseText
			}
		}).catch(error => {
			console.log("Catch")
				alertField.style.backgroundColor = "red"
				alertField.appendChild(alertMessage)
				alertField.appendChild(deleteAlertMsg)
				alertMessage.innerText = "Erro na requisição"
				deleteAlertMsg.innerText = "x"
		}).finally(() => {
			console.log("Finally")
			stopLoading();
		});
};

const setupEvents = (_) => {
	btnEnviar.addEventListener("click", enviar);
};

const load = () => {
	setupEvents();
};

addHeader.addEventListener('click', function () {
	let newHeader = document.createElement('div')
	let newKey = document.createElement('input')
	let newValue = document.createElement('input')

	newHeader.appendChild(newKey)
	newHeader.appendChild(newValue)
	headers.appendChild(newHeader)
	headers.insertBefore(newHeader, addHeader)

	newHeaders.push({ key: newKey, value: newValue })
})

deleteAlertMsg.addEventListener('click', function () {
	alertField.removeChild(alertMessage)
	alertField.removeChild(deleteAlertMsg)
	alertField.style.backgroundColor = "transparent"
})

document.addEventListener("DOMContentLoaded", load, false);