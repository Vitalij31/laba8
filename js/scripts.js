// Получаем элементы формы
const submitButton = document.getElementById("submitOrder");
const outputDiv = document.getElementById("output");
const formTitle = document.querySelector(".form_title");
formTitle.addEventListener("mouseover", function () {
    this.style.color = "#e90184"; // Меняем цвет заголовка
});
formTitle.addEventListener("mouseout", function () {
    this.style.color = "#333333"; // Возвращаем исходный цвет
});

// Обработчик кнопки "Отправить заказ"
submitButton.addEventListener("click", function () {
    // Считываем данные из полей формы
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    const destination = document.getElementById("destination").value.trim();
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const quantity = parseInt(document.getElementById("quantity").value, 10) || 0;
    const paymentMethod = document.getElementById("paymentMethod").value;

    // Проверка данных
    let errors = [];
    if (!firstName) errors.push("Поле 'Имя' обязательно для заполнения.");
    if (!lastName) errors.push("Поле 'Фамилия' обязательно для заполнения.");
    if (!phoneNumber.match(/^[78]\d{10}$/)) {
        errors.push("Поле 'Номер телефона' должно начинаться с 7 или 8 и содержать 10 цифр.");
    }
    if (!destination) errors.push("Поле 'Пункт назначения' обязательно для заполнения.");
    if (quantity <= 0) errors.push("Поле 'Количество' должно быть больше 0.");
    if (!date) errors.push("Поле 'Дата' обязательно для заполнения.");
    if (!time) errors.push("Поле 'Время' обязательно для заполнения.");
    if (date && time) {
        const selectedDateTime = new Date(`${date}T${time}`);
        const currentDateTime = new Date();
    
        if (selectedDateTime < currentDateTime) {
            errors.push("Выберете конкретное время.");
        }
    }
    // Если есть ошибки, вывести сообщение
    if (errors.length > 0) {
        alert("Пожалуйста, исправьте следующие ошибки:\n" + errors.join("\n"));
        return;
    }

    // Формирование сводки заказа
    const output = `
        <strong>Сводка заказа:</strong><br>
        Имя: ${firstName}<br>
        Фамилия: ${lastName}<br>
        Номер телефона: ${phoneNumber}<br>
        Пункт назначения: ${destination}<br>
        Дата и время: ${date} ${time}<br>
        Количество: ${quantity}<br>
        Способ оплаты: ${paymentMethod}
    `;

    // Вывод сводки в блок #output
    outputDiv.innerHTML = output;
        // Показать блок с анимацией
outputDiv.style.display = "block"; // Убираем display: none
setTimeout(() => {
    outputDiv.style.opacity = "1"; // Постепенно делаем блок видимым
}, 10); // Небольшая задержка для срабатывания transition

});

// Обработчик для проверки значения количества
document.getElementById("quantity").addEventListener("blur", function () {
    const value = parseInt(this.value, 10);
    if (isNaN(value) || value <= 0) {
        this.value = 1; // Устанавливаем минимальное значение
    }
});



