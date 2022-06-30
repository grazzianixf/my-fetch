/*
   https://github.com/shevabam/breaking-bad-quotes
   https://github.com/ywalia01/dune-api

   https://api.publicapis.org/entries
*/
const textUrl = document.getElementById("url");
const optionMethod = document.getElementById("method");
const textRequestBody = document.getElementById("requestBody");
const textResponseBody = document.getElementById("responseBody");

const btnEnviar = document.getElementById("enviar");

const startLoading = (_) => {
	// TODO
	// desabilitar todos os componentes do formulario que estão habilitados
	// colocar a msg passada como parametro em um span entre o requestBody e responseBody. Sendo que esse span só aparece quando tiver alguma msg nele
};

const stopLoading = (_) => {
	// TODO
	// habilitar todos os campso do formulario, exceto o responseBody que deve ser sempre disabled
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
