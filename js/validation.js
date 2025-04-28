document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactform');
    const fields = document.querySelectorAll('.user-data');
    function showError(input, message) {
        input.classList.add('error');
        if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
            const error = document.createElement('div');
            error.className = 'error-message';
            error.innerText = "* " + message;
            input.parentNode.appendChild(error);
        }
    }
    function clearError(input) {
        input.classList.remove('error');
        const next = input.nextElementSibling;
        if (next && next.classList.contains('error-message')) {
            next.remove();
        }
    }

    form.addEventListener('submit', function (e) {
        let valid = true;

        fields.forEach(field => clearError(field));

        const name = form.name.value.trim();
        if (name.length < 2 || name.length > 30 || !/^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ\s-]+$/.test(name)) {
            showError(form.name, "Ім'я має бути від 2 до 30 літер, тільки букви, дефіс або пробіл");
            valid = false;
        }
        const age = parseInt(form.age.value.trim(), 10);
        if (isNaN(age) || age < 18 || age > 130) {
            showError(form.age, "Вік має бути числом від 18 до 130");
            valid = false;
        }
        const email = form.email.value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError(form.email, "Введіть коректну електронну пошту");
            valid = false;
        }
        const website = form.company.value.trim();
        if (website !== "" && !/^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-]*)*$/.test(website)) {
            showError(form.company, "Введіть коректну адресу сайту або залиште поле порожнім");
            valid = false;
        }
        const message = form.message.value.trim();
        if (message.length < 10 || message.length > 350) {
            showError(form.message, "Повідомлення має бути від 10 до 350 символів");
            valid = false;
        }
        if (!valid) {
            e.preventDefault();
        }
    });
    fields.forEach(field => {
        field.addEventListener('focus', function () {
            clearError(this);
        });
    });
});
