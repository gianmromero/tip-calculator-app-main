
document.addEventListener('DOMContentLoaded', function() {
    const peopleInput = document.querySelector('.calc__input_value_number-people');
    const label = peopleInput.closest('.calc__form-group').querySelector('.calc__text');
    const inputs = document.querySelectorAll('.calc__input_value_subtotal, .calc__input_value_number-people');
    const outputs = document.querySelectorAll('.calc__output_tip, .calc__output_total');
    const resetButton = document.getElementById('resetButton');
    const billInput = document.getElementById('billInput');
    const customTipInput = document.getElementById('customTipInput');
    const tipAmountOutput = document.getElementById('tipAmountOutput');
    const totalAmountOutput = document.getElementById('totalAmountOutput');
    const tipButtons = document.querySelectorAll('.calc__button_value_5, .calc__button_value_10, .calc__button_value_15, .calc__button_value_25, .calc__button_value_50');

    let selectedTipPercentage = 0;

    tipButtons.forEach(button => {
        button.addEventListener('click', function() {
            selectedTipPercentage = parseInt(button.textContent);
            customTipInput.value = '';
            calculateTip();
        });
    });

    customTipInput.addEventListener('input', function() {
        selectedTipPercentage = parseFloat(customTipInput.value) / 100;
        calculateTip();
    });

    //Take valus from the inputs and calculate the tip
    billInput.addEventListener('input', calculateTip);
    peopleInput.addEventListener('input', calculateTip);

    function calculateTip() {
        const billAmount = parseFloat(billInput.value);
        const numberOfPeople = parseInt(peopleInput.value);

        if (isNaN(billAmount) || isNaN(numberOfPeople) || numberOfPeople <= 0) {
            tipAmountOutput.textContent = '$0.00';
            totalAmountOutput.textContent = '$0.00';
            return;
        }

        const tipAmount = (billAmount * selectedTipPercentage) / numberOfPeople;
        const totalAmount = billAmount / numberOfPeople;

        tipAmountOutput.textContent = `$${tipAmount.toFixed(2)}`;
        totalAmountOutput.textContent = `$${totalAmount.toFixed(2)}`;
    }

    resetButton.addEventListener('click', function() {
        billInput.value = '0';
        customTipInput.value = '';
        peopleInput.value = '0';
        selectedTipPercentage = 0;
        tipAmountOutput.textContent = '$0.00';
        totalAmountOutput.textContent = '$0.00';
        checkValues();
    });


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
            calculateTip();
        });
    });

    
    tipButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            selectedTipPercentage = parseFloat(button.textContent) / 100;
            customTipInput.value = '';
            calculateTip();
        });
    });

    customTipInput.addEventListener('input', function() {
        selectedTipPercentage = parseFloat(customTipInput.value) / 100;
        calculateTip();
    });

    billInput.addEventListener('input', calculateTip);
    peopleInput.addEventListener('input', function() {
        validateInput(peopleInput, label);
        calculateTip();
    });

    peopleInput.addEventListener('input', function() {
        validateInput(peopleInput, label);
    });

    function validateInput(input, label) {
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
    checkValues();
});