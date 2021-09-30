const initialPriceInput = document.querySelector('#initial-price-input');
const quantityInput = document.querySelector('#quantity-input');
const currentPriceInput = document.querySelector('#current-price-input');
const calcBtn = document.querySelector('#check-btn');
const outputDiv = document.querySelector('#output');
const customAlertDiv = document.querySelector('#my-alert');
const okBtn = document.querySelector('#ok-btn');

calcBtn.addEventListener('click',calcBtnClickHandler);

// alert box
okBtn.addEventListener('click',() => {
    customAlertDiv.classList.remove('show-alert');
});

function getFormattedAmount(amount) {
    return amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

function showOutput(message) {
    outputDiv.firstElementChild.innerHTML = message;
    outputDiv.classList.add('show-output');
}

function clearOutput() {
    outputDiv.classList.remove('show-output');
}

function customAlert(message) {
    customAlertDiv.firstElementChild.innerText = message;
    customAlertDiv.classList.add('show-alert');
}

function calculateProfitLoss(initial,quantity,current) {
    if(initial > current) {
        let loss = (initial-current) * quantity;
        let lossPercentage = (loss/(initial*quantity)) * 100;
        return ['Loss',loss,lossPercentage];
    } else if (initial <current) {
        let profit = (current - initial) * quantity;
        let profitPercentage = (profit/(initial * quantity)) * 100;
        return ['Profit',profit,profitPercentage];
    } else {
        return ['profit',0,0];
    }
}

function validate(initial,quantity,current) {
    if (initial < 0 && quantity < 0 && current < 0) {
        customAlert('Price and quantity cannot be negative!');
    } else if(!initial || !quantity || !current) {
        customAlert("Price and quantity cannot be empty or 0!");
        return false;
    } else if (initial < 0 || current < 0) {
        customAlert('Price cannot be negative!');
        return false;
    } else if (quantity < 0 ) {
        customAlert('Quantity cannot be negative!');
        return false;
    } else {
        return true;
    }
}

function calcBtnClickHandler() {
    clearOutput();
    let initialPrice = Number(initialPriceInput.value);
    let quantity = Number(quantityInput.value);
    let currentPrice = Number(currentPriceInput.value);
    if(validate(initialPrice,quantity,currentPrice)) {
        let resultList = calculateProfitLoss(initialPrice,quantity,currentPrice);
        if(resultList[1] === resultList[2]) {
            showOutput('Thats weird! there is neither a profit nor a loss.');
        } else {
            showOutput(`the ${resultList[0]} is <em>${getFormattedAmount(resultList[1].toFixed(2))}</em>&nbsp and the percentage of ${resultList[0]} is <em>${resultList[2].toFixed(2)}%</em>`);
        }
        
    }
}