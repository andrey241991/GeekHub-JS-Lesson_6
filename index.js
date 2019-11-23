(function () {

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

        addMoney(newTotalCount, newBanknotes) {
            this.totalCount += newTotalCount;
            this.banknotes = [...this.banknotes, ...newBanknotes];
            inputText.innerHTML = `Ваш счет пополнен на ${newTotalCount}. Текущий баланс в банкомате ${this.totalCount}`;
        }

        clearScreen() {
            screen.innerHTML = '';
        }

        withdrawCash(cashCount) {
            this.totalCount -= cashCount;
            inputText.innerHTML = `Вы сняли ${cashCount} Текущий баланс в банкомате ${this.totalCount}`;
        }

        showMoney() {
            inputWrapper.classList.add('input-container--invisible');
            inputText.innerHTML = `Текущий баланс в банкомате ${this.totalCount}`;
        }

        createCreditCard() {
            this.creaditCard = new CreditCard();
            inputWrapper.classList.add('input-container--invisible');
            inputText.innerHTML = "Карточка была создана";
            console.log('this', this);
            btnShowBalanceCard.addEventListener('click', atm.creaditCard.showMoney);
        }
    }

    class CreditCard {
        constructor() {
            this.totalCount = 0;
        }

        addMoney(newTotalCount) {
            this.totalCount += newTotalCount;
            inputText.innerHTML = `Ваш счет пополнен на ${newTotalCount}. Текущий баланс на карточке ${this.totalCount}`;
        }

        withdrawCash(cashCount) {
            atm.creaditCard.totalCount -= cashCount;
            inputText.innerHTML = `Вы сняли ${cashCount}`;
            inputText.innerHTML = `Вы сняли ${cashCount} Текущий баланс на карточке ${atm.creaditCard.totalCount}`;
        }

        showMoney() {
            inputWrapper.classList.add('input-container--invisible');
            inputText.innerHTML = `Текущий баланс на Карте ${atm.creaditCard.totalCount}`;
        }

    }

    let atm = new ATM();
    const screen = document.querySelector('.atm__screen');
    const btnSubmit = document.querySelector('.btn-submit');
    const input = document.querySelector('.input');
    const inputWrapper = document.querySelector('.input-container');
    const inputText = document.querySelector('.input-container-wrapper__text');

    //atm buttons
    const btnCreateCreditCard = document.querySelector('.create-credit-card');
    const btnAddMoneyAtm = document.querySelector('.add-money-atm');
    const btnShowBalanceAtm = document.querySelector('.show-balance-atm');
    const btnWithdrawCashAtm = document.querySelector('.withdraw-cash-atm');
    let createCreditCard = atm.createCreditCard.bind(atm);
    btnCreateCreditCard.addEventListener('click', createCreditCard);
    btnAddMoneyAtm.addEventListener('click', startOperation);
    let atmShowbalance = atm.showMoney.bind(atm);
    btnShowBalanceAtm.addEventListener('click', atmShowbalance);
    btnWithdrawCashAtm.addEventListener('click', startOperation);
    btnSubmit.addEventListener('click', finishOperation);

    //card buttons
    const btnAddMoneyCard = document.querySelector('.add-money-card');
    const btnShowBalanceCard = document.querySelector('.show-balance-card');
    const btnWithdrawCashCard = document.querySelector('.withdraw-cash-card');
    btnWithdrawCashCard.addEventListener('click', startOperation);
    btnAddMoneyCard.addEventListener('click', startOperation);



    function startOperation(e) {
        inputWrapper.classList.remove('input-container--invisible');
        switch (e.target.id) {
            case ADD_MONEY_ATM:
                inputWrapper.classList.remove('input-container--invisible');
                inputText.innerHTML = "Input Money quantity, first number sum and then banknots.EX: 200 100 100"
                operation = ADD_MONEY_ATM;
                break
            case WITHDRAW_MONEY_ATM:
                inputWrapper.classList.remove('input-container--invisible');
                inputText.innerHTML = "Input Money quantity, you want to withdraw"
                operation = WITHDRAW_MONEY_ATM;
                break
            case ADD_MONEY_CARD:
                inputWrapper.classList.remove('input-container-wrapper--invisible');
                inputText.innerHTML = "Input Money quantity, EX: 200"
                operation = ADD_MONEY_CARD;
                break
            case WITHDRAW_MONEY_CARD:
                inputWrapper.classList.remove('input-container-wrapper--invisible');
                inputText.innerHTML = "Input Money quantity, you want to withdraw"
                operation = WITHDRAW_MONEY_CARD;
                break
        }
    }


    function finishOperation() {
        if (input.innerHTML = '') {
            alert('Field should not be empty');
            return;
        }

        function addMoney(obj) {
            if (obj === undefined) {
                alert('You should create new cart');
                return;
            }

            let sum = 0;
            let banknotsArray = [];
            const array = input.value.split(" ");
            array.forEach((item, index) => {
                item = Number(item);
                index === 0 ? sum = item : banknotsArray.push(item);
            });
            if(obj instanceof CreditCard){
                obj.addMoney(sum);
            }else{
                obj.addMoney(sum, banknotsArray);
            }
        }

        function withDrawMoneyFromCart(obj) {
            const oldTotalCount = obj.totalCount;
            const oldBanknots = [...obj.banknotes];
            sumToWithDraw = Number(input.value);
            const oldSumToWithDraw = sumToWithDraw;
            if (obj.creaditCard === undefined) {
                alert('You should create new cart');
                return;
            }

            if (sumToWithDraw > obj.totalCount) {
                alert('No enough money in atm');
                return;
            }

            for (let i = 0; i < oldBanknots.length; i++) {
                if (sumToWithDraw >= 500) {
                    getMoney(500, obj);
                }
                if (sumToWithDraw >= 200) {
                    getMoney(200, obj);
                }
                if (sumToWithDraw >= 100) {
                    getMoney(100, obj);
                }
                if (sumToWithDraw >= 50) {
                    getMoney(50, obj);
                } else {
                    break;
                }
            }
            if (sumToWithDraw > 0) {
                obj.totalCount = oldTotalCount;
                obj.banknotes = [...oldBanknots];
            } else {
                obj.withdrawCash(oldSumToWithDraw);
                obj.creaditCard.withdrawCash(oldSumToWithDraw);
            }
        }

        function withDrawMoney(obj) {
            const oldTotalCount = obj.totalCount;
            const oldBanknots = [...obj.banknotes];
            sumToWithDraw = Number(input.value);
            const oldSumToWithDraw = sumToWithDraw;
            if (sumToWithDraw > obj.totalCount) {
                alert('No enough money in atm');
                return;
            }

            for (let i = 0; i < oldBanknots.length; i++) {
                if (sumToWithDraw >= 500) {
                    getMoney(500, obj);
                }
                if (sumToWithDraw >= 200) {
                    getMoney(200, obj);
                }
                if (sumToWithDraw >= 100) {
                    getMoney(100, obj);
                }
                if (sumToWithDraw >= 50) {
                    getMoney(50, obj);
                } else {
                    break;
                }
            }
            if (sumToWithDraw > 0) {
                obj.totalCount = oldTotalCount;
                obj.banknotes = [...oldBanknots];
            } else {
                obj.withdrawCash(oldSumToWithDraw);
            }

        }

        function getMoney(sum, obj) {
            for (let i = 0; i < obj.banknotes.length; i++) {
                if (obj.banknotes[i] === sum) {
                    obj.banknotes.splice(i, 1);
                    obj.totalCount - sum;
                    sumToWithDraw -= sum;
                    break;
                }
            }
        }

        switch (operation) {
            case ADD_MONEY_ATM:
                addMoney(atm);
                break;
            case WITHDRAW_MONEY_ATM:
                withDrawMoney(atm);
                break;
            case ADD_MONEY_CARD:
                addMoney(atm.creaditCard);
                break;
            case WITHDRAW_MONEY_CARD:
                withDrawMoneyFromCart(atm);
                break;
        }
        input.value = '';
        inputWrapper.classList.add('input-container--invisible');
    }

})();