document.addEventListener('DOMContentLoaded', function() {
    const peopleInput = document.querySelector('.calc__input_value_number-people');
    const label = peopleInput.closest('.calc__form-group').querySelector('.calc__text');

    peopleInput.addEventListener('input', function() {
        validateInput(peopleInput, label);
    });

    function validateInput(input) {
        const value = input.value;

        if (validator.isEmpty(value)) {
            showError(input, label, 'This field is required');
        } else if (validator.equals(value, '0')) {
            showError(input, label, "Can't be zero");
        } else {
            clearError(input, label);
        }
    }

    function showError(input, label, message) {
        input.classList.add('error');
        let errorElement = label.querySelector('.error-message');

        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.classList.add('error-message');
            label.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    function clearError(input, label) {
        input.classList.remove('error');
        const errorElement = label.querySelector('.error-message');

        if (errorElement) {
            errorElement.remove();
        }
    }

});