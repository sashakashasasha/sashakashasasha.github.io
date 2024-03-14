window.onload = function() {
    // Обработчик события для кнопки отправки сообщения
    document.getElementById('send-button').addEventListener('click', function() {
        sendMessage();
    });

    // Обработчик события для ввода сообщения (нажатие Enter)
    document.getElementById('message-input').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
};

// Функция отправки сообщения
function sendMessage() {
    var messageInput = document.getElementById('message-input');
    var message = messageInput.value.trim();

    if (message !== '') {
        displayMessage('Вы', message);
        simulateResponse(message);
        messageInput.value = ''; // Очистка поля ввода
    }
}

// Функция отображения сообщения в чате
function displayMessage(sender, message) {
    var chatMessages = document.getElementById('chat-messages');
    var messageElement = document.createElement('div');
    messageElement.innerHTML = '<strong>' + sender + ':</strong> ' + message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Прокрутка вниз
}

// Функция имитации ответа на сообщение
function simulateResponse(message) {
    var responses = [
        "Понял.",
        "Спасибо за информацию.",
        "Это интересно!",
        "Давайте обсудим это позже.",
        "Какие у вас еще вопросы?"
    ];
    var randomIndex = Math.floor(Math.random() * responses.length);
    var response = responses[randomIndex];
    setTimeout(function() {
        displayMessage('Бот', response);
    }, 
