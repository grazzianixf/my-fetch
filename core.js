/*
	 https://github.com/shevabam/breaking-bad-quotes
	 https://github.com/ywalia01/dune-api
	 https://api.publicapis.org/entries
*/

const textUrl = document.getElementById("url");
const optionMethod = document.getElementById("method");
const textRequestBody = document.getElementById("requestBody");
const textResponseBody = document.getElementById("responseBody");
const statusResponse = document.getElementById("responseStatus");

const message = document.getElementById("message");
const loadMessage = document.createElement("span");

const headers = document.getElementById("headers");
const addButton = document.getElementById("addHeaders");
const newHeaders = [];

const alertField = document.getElementById("alert");
const alertMsg = document.getElementById("alertMsg");
const deleteMsg = document.getElementById("deleteMsg");

const isJson = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

const showHeader = () => {
  headers.style.display = "contents";

  document.getElementById("showHeader").style.display = "none";
  document.getElementById("hideHeader").style.display = "contents";
};

const hideHeader = () => {
  headers.style.display = "none";

  document.getElementById("showHeader").style.display = "contents";
  document.getElementById("hideHeader").style.display = "none";
};

const addHeaders = () => {
  let newHeader = document.createElement("div");
  let newKey = document.createElement("input");
  let newValue = document.createElement("input");

  newHeader.appendChild(newKey);
  newHeader.appendChild(newValue);
  headers.appendChild(newHeader);
  headers.insertBefore(newHeader, addButton);

  newHeaders.push({ key: newKey, value: newValue });
};

const startLoading = (msg) => {
  textUrl.disabled = true;
  textRequestBody.disabled = true;
  optionMethod.disabled = true;
  loadMessage.innerText = msg;
  message.appendChild(loadMessage);

  newHeaders.forEach((element) => {
    element.key.disabled = true;
    element.value.disabled = true;
  });

  statusResponse.value = "";
  textResponseBody.value = "";
};

const stopLoading = () => {
  textUrl.disabled = false;
  textRequestBody.disabled = false;
  optionMethod.disabled = false;

  newHeaders.forEach((element) => {
    element.key.disabled = false;
    element.value.disabled = false;
  });

  message.removeChild(loadMessage);
};

const send = (e) => {
  startLoading("Processando...");

  let objHeaders = new Headers();
  newHeaders.map((header) => {
    if (header.key.value !== "" && header.value.value !== "") {
      objHeaders.append(header.key.value, header.value.value);
    }
  });

  let obj = {
    method: optionMethod.value,
    headers: objHeaders,
    requestBody: textRequestBody.value,
  };

  fetch(textUrl.value, obj)
    .then((response) => {
      statusResponse.value = response.status;
      if (response.status >= 200 && response.status < 300) {
        showMessage("success", "REQUISIÇÃO COM SUCESSO");
      } else {
        showMessage("error", "ERRO NA REQUISIÇÃO");
      }
      return response.text();
    })
    .then((responseText) => {
      if (isJson(responseText) === true) {
        textResponseBody.value = JSON.stringify(
          JSON.parse(responseText),
          null,
          4
        );
      } else {
        textResponseBody.value = responseText;
      }
    })
    .catch(() => {
      showMessage("error", "ERRO NA REQUISIÇÃO");
    })
    .finally(() => {
      stopLoading();
    });
};

const showMessage = (type, content) => {
  alertField.style.display = "contents";
  if (type === "success") {
    alertField.setAttribute("style", "background-color: #4AD9B0");
  } else {
    alertField.setAttribute("style", "background-color: #F23005");
  }
  alertMsg.innerText = content;
  deleteMsg.innerText = "x";
};

const hideMessage = () => {
  alertField.style.display = "none";
};
