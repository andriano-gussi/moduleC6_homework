const wsUrl = "wss://echo.websocket.org/";

const btn_send = document.querySelector('.j-btn-send');
const btn_geo = document.querySelector('.j-btn-geo');

const input_message = document.querySelector('.j-message');
const output = document.querySelector('.j-reading-area');

let websocket;

// выводит на страницу отправленное или полученное сообщения, где 
// class_name - соответствующий класс ("outgoing" или "incoming")
/// text - содержимое сообщения
function insertInOutput (class_name, text) {
  let div = document.createElement('div');
  div.className = class_name;
  div.innerHTML = text;
  output.appendChild(div);
  let br = document.createElement('br');
  output.appendChild(br);
  output.scrollTop = output.scrollHeight;
}

// по клику на кнопку отправляется сообщение на сервер
btn_send.addEventListener('click', () => {
  if (input_message.value) {
    const message = input_message.value;
    websocket.send(message);
    insertInOutput('outgoing', message);
    input_message.value = '';
  } else {
    alert('Вы забыли ввести сообщение :-)')
  }
});

// Функция, выводящая текст об ошибке во время получения геолокации
const error = () => {
  alert('Невозможно получить ваше местоположение');
}

// Функция, срабатывающая при успешном получении геолокации
const success = position => {
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;

  const mapLink = `<a href = 'https://www.openstreetmap.org/#map=18/${latitude}/${longitude}' target="_blank">Посмотреть на карте</a>`;
  insertInOutput('outgoing', mapLink);
}

// по клику на кнопку появляется ссылка на карту с геолокацией
btn_geo.addEventListener('click', () => {
  if (!navigator.geolocation) {
    insertInOutput('outgoing', 'Geolocation не поддерживается вашим браузером');
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
});

// после загрузки страницы устанавливается соединение с сервером и при каждом получении от него данных -
// выводится на страницу соответсвующее сообщение
document.addEventListener("DOMContentLoaded", () => {
  websocket = new WebSocket(wsUrl);
  websocket.onmessage = evt => insertInOutput('incoming', evt.data);
  websocket.onerror = evt => insertInOutput('incoming', 'Проблемы с соединенеием!')
});
