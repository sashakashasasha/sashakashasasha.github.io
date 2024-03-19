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

    // Запрашиваем доступ к микрофону пользователя
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {
            // Микрофон доступен
        })
        .catch(function(err) {
            console.error('Ошибка при доступе к микрофону:', err);
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
        "Здравствуйте!",
        "Хорошо, спасибо, как у вас?",
        "Это интересно!",
        "Какие у вас есть вопросы?",
        "Что нового?"
        "Буду рада ответить на все выши вопросы"
    ];
    var randomIndex = Math.floor(Math.random() * responses.length);
    var response = responses[randomIndex];
    setTimeout(function() {
        displayMessage('Бот', response);
    }, 1000); // Добавляем время задержки в миллисекундах, например, 1000 мс (1 с)
}

// Создаем экземпляр MediaRecorder для записи аудио
let mediaRecorder;
const chunks = [];

function startRecording() {
    mediaRecorder.start();
}

function stopRecording() {
    mediaRecorder.stop();
}

// Обработчик события для кнопки начала записи
document.getElementById('start-recording-button').addEventListener('click', function() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = function(e) {
                chunks.push(e.data);
            }

            mediaRecorder.onstop = function() {
                const audioBlob = new Blob(chunks, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                sendAudioMessage(audioUrl);
            }

            startRecording();
        })
        .catch(function(err) {
            console.error('Ошибка при доступе к микрофону:', err);
        });
});

// Обработчик события для кнопки остановки записи
document.getElementById('stop-recording-button').addEventListener('click', function() {
    stopRecording();
});

// Создаем экземпляр распознавания речи
const recognition = new window.webkitSpeechRecognition();
recognition.continuous = false;
recognition.lang = 'ru-RU';

recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    // Отправляем распознанный текст в чат
    sendMessage(transcript);
}

// Обработчик события для кнопки начала распознавания речи
document.getElementById('start-speech-recognition-button').addEventListener('click', function() {
    recognition.start();
});

// Обработчик события для кнопки остановки распознавания речи
document.getElementById('stop-speech-recognition-button').addEventListener('click', function() {
    recognition.stop();
});

// Функция отправки аудио сообщения в чат
function sendAudioMessage(audioUrl) {
    var audioElement = document.createElement('audio');
    audioElement.controls = true;
    audioElement.src = audioUrl;
    displayMessage('Вы', audioElement.outerHTML);
}
