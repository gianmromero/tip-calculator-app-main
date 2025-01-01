
document.addEventListener('DOMContentLoaded', function() {
    const peopleInput = document.querySelector('.calc__input_value_number-people');
    const label = peopleInput.closest('.calc__form-group').querySelector('.calc__text');
    const inputs = document.querySelectorAll('.calc__input_value_subtotal, .calc__input_value_number-people');
    const outputs = document.querySelectorAll('.calc__output_tip, .calc__output_total');
    const resetButton = document.getElementById('resetButton');

    function checkValues() {
        const allInputsZero = Array.from(inputs).every(input => input.value === '0');
        const allOutputsZero = Array.from(outputs).every(output => output.textContent === '$0.00');

        if (allInputsZero && allOutputsZero) {
            resetButton.disabled = true;
        } else {
            resetButton.disabled = false;
        }
    }

    inputs.forEach(input => {
        if (input.value === '0') {
            input.classList.add('zero-value');
        }

        input.addEventListener('input', function() {
            if (input.value === '0') {
                input.classList.add('zero-value');
            } else {
                input.classList.remove('zero-value');
            }
            checkValues();
        });
    });

    checkValues();

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