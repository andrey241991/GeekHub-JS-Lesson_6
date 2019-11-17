(function () {
    const screen = document.querySelector('.atm__screen');
    const btnCreateCreditCard = document.querySelector('.create-credit-card');
    const btnAddMoneyAtm = document.querySelector('.add-money-atm');
    const btnShowBalanceAtm = document.querySelector('.show-balance-atm');
    const btnWithdrawCashAtm = document.querySelector('.withdraw-cash-atm');

    const btnSubmit = document.querySelector('.btn-submit');
    const input = document.querySelector('.input');
    const inputWrapper = document.querySelector('.input-container-wrapper');
    const inputText = document.querySelector('.input-container-wrapper__text');

    let operation = -1;
    const ADD_MONEY_ATM = '1';
    const WITHDRAW_MONEY_ATM = '2';
    const ADD_MONEY_CARD = '3';
    const WITHDRAW_MONEY_CARD = '4';
    let sumToWithDraw = 0;


    class ATM {
        constructor() {
            this.totalCount = 0;
            this.banknotes = [];
        }

        addMoney(totalCount, newBanknotes) {
            this.totalCount += totalCount;
            this.banknotes = [...this.banknotes, ...newBanknotes];
        }

        clearScreen() {
            screen.innerHTML = '';
        }

        withdrawCash(cashCount) {
            this.clearScreen();
            screen.innerHTML = `Вы сняли ${cashCount}`;
        }

        showMoney = () => {
            this.clearScreen();
            screen.innerHTML = `Текущий баланс в банкомате ${this.totalCount}`;
        }

        createCreditCard() {
            this.creaditCard = new CreditCard();
        }

    }

    class CreditCard {
        constructor() {
            this.totalCount = 0;
            const btnAddMoneyCard = document.querySelector('.add-money-card');
            const btnShowBalanceCard = document.querySelector('.show-balance-card');
            const btnWithdrawCashCard = document.querySelector('.withdraw-cash-card');
            btnWithdrawCashCard.addEventListener('click', this.withdrawCash);
            btnAddMoneyCard.addEventListener('click', this.addMoney);
            btnShowBalanceCard.addEventListener('click', this.showMoney);
        }
        addMoney(totalCount) {
            this.totalCount += totalCount;
        }
        withdrawCash(cashCount) {
            this.clearScreen();
            screen.innerHTML = `Вы сняли ${cashCount}`;
        }
        showMoney() {
            screen.innerHTML = `Текущий баланс на Карте ${this.totalCount}`;
        }

    }

    const atm = new ATM();
    atm.addMoney(200, [100, 100]);
    atm.createCreditCard();
    atm.creaditCard.addMoney(300, [100, 100, 100]);
    btnCreateCreditCard.addEventListener('click', atm.CreditCard);
    btnAddMoneyAtm.addEventListener('click', startOperation);
    btnShowBalanceAtm.addEventListener('click', atm.showMoney);
    btnWithdrawCashAtm.addEventListener('click', startOperation);
    btnSubmit.addEventListener('click', finishOperation);

    function startOperation(e) {
        switch (e.target.id) {
            case ADD_MONEY_ATM:
                inputWrapper.classList.remove('input-container-wrapper--invisible');
                inputText.innerHTML = "Input Money quantity, first number sum and then banknots.EX: 200 100 100"
                operation = ADD_MONEY_ATM;
                break
            case WITHDRAW_MONEY_ATM:
                inputWrapper.classList.remove('input-container-wrapper--invisible');
                inputText.innerHTML = "Input Money quantity, you want to withdraw"
                operation = WITHDRAW_MONEY_ATM;
                break
        }
    }

    function finishOperation(e) {
        if (input.innerHTML = '') {
            alert('Field should not be empty');
            return;
        }

        switch (operation) {
            case ADD_MONEY_ATM:
                let sum = 0;
                let banknotsArray = [];
                const array = input.value.split(" ");
                array.forEach((item, index) => {
                    item = Number(item);
                    index === 0 ? sum = item : banknotsArray.push(item);
                });
                atm.addMoney(sum, banknotsArray);
                break;
            case WITHDRAW_MONEY_ATM:
                const oldTotalCount = atm.totalCount;
                const oldBanknots = [...atm.banknotes];
                sumToWithDraw = Number(input.value);
                const oldSumToWithDraw = sumToWithDraw;
                if (sumToWithDraw > atm.totalCount) {
                    alert('No enough money in atm');
                    return;
                }

                for (let i = 0; i < oldBanknots.length; i++) {
                    if (sumToWithDraw >= 500) {
                        getMoney(500);
                    }
                    if (sumToWithDraw >= 200) {
                        getMoney(200);
                    }
                    if (sumToWithDraw >= 100) {
                        getMoney(100);
                    } else {
                        break;
                    }
                }
                if (sumToWithDraw > 0) {
                    atm.totalCount = oldTotalCount;
                    atm.banknotes = [...oldBanknots];
                } else {
                    atm.withdrawCash(oldSumToWithDraw);
                }
                break;
            case ADD_MONEY_CARD:
                let sum2 = 0;
                let banknotsArray2 = [];
                const array2 = input.value.split(" ");
                array2.forEach((item, index) => {
                    item = Number(item);
                    index === 0 ? sum2 = item : banknotsArray2.push(item);
                });
                card.addMoney(sum2, banknotsArray2);
                break;

            case WITHDRAW_MONEY_CARD:
                oldTotalCount = card.totalCount;
                oldBanknots = [...card.banknotes];
                sumToWithDraw = Number(input.value);
                oldSumToWithDraw = sumToWithDraw;
                if (sumToWithDraw > card.totalCount) {
                    alert('No enough money in card');
                    return;
                }

                for (let i = 0; i < oldBanknots.length; i++) {
                    if (sumToWithDraw >= 500) {
                        getMoney(500);
                    }
                    if (sumToWithDraw >= 200) {
                        getMoney(200);
                    }
                    if (sumToWithDraw >= 100) {
                        getMoney(100);
                    } else {
                        break;
                    }
                }
                if (sumToWithDraw > 0) {
                    card.totalCount = oldTotalCount;
                    card.banknotes = [...oldBanknots];
                } else {
                    card.withdrawCash(oldSumToWithDraw);
                }
                break;

        }

        inputWrapper.classList.add('input-container-wrapper--invisible');
    }

    function getMoney(sum) {
        for (let i = 0; i < atm.banknotes.length; i++) {
            if (atm.banknotes[i] === sum) {
                atm.banknotes.splice(i, 1);
                atm.totalCount - sum;
                sumToWithDraw -= sum;
                break;
            }
        }
    }

})();