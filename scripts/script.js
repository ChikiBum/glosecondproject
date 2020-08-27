'use strict';

let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesplus = btnPlus[1],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    depositCheck = document.querySelector('#deposit-check'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    //accamulatedMonthValue = document.getElementsByClassName('accamulated_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpenses = document.querySelector('.additional_expenses'),
    periodSelect = document.querySelector('.period-select'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    incomeItems = document.querySelectorAll('.income-items'),
    divPeriodAmount = document.querySelector('div .period-amount'),
    placeHolderNamination = document.querySelectorAll('[placeholder="Наименование"]'),
    placeHolderSum = document.querySelectorAll('[placeholder="Сумма"]'),
    inputTypeText= document.querySelectorAll('[type="text"]'),
    inputsAll = document.querySelectorAll('input'),
    incomeBlock = document.getElementsByClassName('income'),
    expensesBlock = document.getElementsByClassName('expenses'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');

    // depositAmount = document.querySelector('.deposit-amount'),
    // depositPercent = document.querySelector('.deposit-percent'),
    // ,
    // resultTotal = document.querySelector('.result-total'),
    //
    // 
    // buttionPlusExpenses = document.querySelector('button.expenses_add');
   
    const isNumber = function(n){
        return !isNaN(parseFloat(n)) && isFinite(n);
    };
    
    const isString = function(n){
        return !isNaN(parseFloat(n)) || n === null || n.trim() === '';
    };
    
    start.disabled = true;

    class AppData {
            constructor() {
            this.budget = 0;
            this.budgetDay = 0;
            this.budgetMonth  = 0;
            this.income = {};
            this.incomeMonth = 0;
            this.addIncome = [];
            this.expenses = {};
            this.addExpenses = [];
            this.expensesMonth = 0;
            this.deposit = false;
            this.percentDeposit = 0;
            this.moneyDeposit = 0;
        }

        start() {
            
            start.setAttribute('style', 'display: none;');
            cancel.setAttribute('style', 'display: block;');
        
        this.budget = +salaryAmount.value;

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getInfoDeposit();
        this.getBudget();
        this.disableField();
            

        this.showResult();
        
        }

        showResult() {
            budgetMonthValue.value = this.budgetMonth;
            budgetDayValue.value = Math.ceil(this.budgetDay);
            expensesMonthValue.value = this.expensesMonth;
            additionalExpensesValue.value = this.addExpenses.join(', ');
            additionalIncomeValue.value = this.addIncome.join(', ');
            targetMonthValue.value = this.getTargetMonth();
            incomePeriodValue.value = this.calcPeriod();
        }

        addExpensesBlock() {
            const  cloneExpensesItem = expensesItems[0].cloneNode(true);
            cloneExpensesItem.querySelector('.expenses-title').value = '';  
            cloneExpensesItem.querySelector('.expenses-amount').value = '';  
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesplus);
            expensesItems = document.querySelectorAll('.expenses-items');

            if(expensesItems.length === 3){
                expensesplus.style.display = 'none';
            }
        }

        addIncomeBlock() {
            const  cloneIncomeItem = incomeItems[0].cloneNode(true);
            cloneIncomeItem.querySelector('.income-title').value = '';  
            cloneIncomeItem.querySelector('.income-amount').value = '';  
            incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
            incomeItems = document.querySelectorAll('.income-items');

            if(incomeItems.length === 3){
                incomePlus.style.display = 'none';
            }
        }

        getExpenses() {
            expensesItems.forEach((item) => {
                let itemExpenses = item.querySelector('.expenses-title').value;
                let cashExpenses = item.querySelector('.expenses-amount').value;
                if(itemExpenses !== '' && cashExpenses !== ''){
                    this.expenses[itemExpenses] = cashExpenses;
                }
            });
        }

        getIncome() {
            incomeItems.forEach((item) => {
                const itemIncome = item.querySelector('.income-title').value,
                     cashIncome = item.querySelector('.income-amount').value;
            
                if(itemIncome !== '' && cashIncome !== ''){
                this.income[itemIncome] = +cashIncome;
                }
            });
        
            for(let key in this.income){
                this.incomeMonth += +this.income[key];
            }
        }

        getAddExpenses() {
            let addExpenses = additionalExpensesItem.value.split(',');
            addExpenses.forEach((item) => {
                item = item.trim();
                if(item !== ''){
                    this.addExpenses.push(item);
                }
            });
        }

        getAddIncome() {
            additionalIncomeItem.forEach((item) => {
                let itemValue = item.value.trim();
                if(itemValue !== ''){
                    this.addIncome.push(itemValue);
                }
            });
        }

        getExpensesMonth() {
            for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
            }
        }

        getBudget() {

            const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
            this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
            this.budgetDay = Math.floor(this.budgetMonth / 30);
        }

        getTargetMonth() {
            let targetMonthValue = Math.ceil(targetAmount.value / this.budgetMonth);
        
                if (targetMonthValue >= 0){
                    return targetMonthValue;
                } else {
                    return 'Цель не будет достигнута';
                }
        }

        getStatusIncome() {
            if (this.budgetDay >= 1200){
                return('У вас высокий уровень дохода!');
            } 
            else if (this.budgetDay > 600  && this.budgetDay < 1200){
                return ('У вас средний уровень дохода :)');  
            }
            else if (this.budgetDay <= 600 && this.budgetDay >= 0){
                return ('К сожалению у вас уровень дохода ниже среднего :(');  
            }
            else if (this.budgetDay < 0){
                return ('Что то пошло не так!');  
            }
        }

            calcPeriod(){
            return this.budgetMonth * periodSelect.value;
        }

        chekNamField() {
        
            const matchResult = this.value.match(/[а-я]|[А-Я]|[-.?!)(,:;]|[ ]/g);
            
            if (!matchResult) {
                this.value = '';
            } else if (prevLength !==0 && prevLength === matchResult.length){
                this.value = currentValue;
            } else if (matchResult !== null) {
            prevLength = matchResult.length;}
            currentValue = this.value;
        }

        chekSumField() {
        
            const matchResult = this.value.match(/[0-9]/g);
            
            if (!matchResult) {
                this.value = '';
            } else if (prevLength !==0 && prevLength === matchResult.length){
                this.value = currentValue;
            } else if (matchResult !== null) {
            prevLength = matchResult.length;}
            currentValue = this.value;
        }

        disableField() {
            inputTypeText= document.querySelectorAll('[type="text"]');

            for (var i = 0; i < inputTypeText.length; i++) {
            inputTypeText[i].disabled = true ;
            }
        }

        cancel() {
            start.setAttribute('style', 'display: block;');
            cancel.setAttribute('style', 'display: none;');

            
            this.clearAppdataValue();
            this.resetIncomeBlock();
            this.resetExpensesBlock();
            this.enableField();
            this.cleanFields();
            
        }

        resetIncomeBlock() {
            
            for (let key of incomeItems){
                key.remove();
            }
                        
            let  cloneIncomeItem = incomeItems[0].cloneNode(true);
            cloneIncomeItem.querySelector('.income-title').value = '';  
            cloneIncomeItem.querySelector('.income-amount').value = '';  
            incomeBlock[0].insertBefore(cloneIncomeItem, incomePlus);
            incomeItems = document.querySelectorAll('.income-items');

            incomePlus.style.display = 'block';
        }

        resetExpensesBlock() {
            for (let key of expensesItems){
                key.remove();
            }

            let  cloneExpensesItem = expensesItems[0].cloneNode(true);
            cloneExpensesItem.querySelector('.expenses-title').value = '';  
            cloneExpensesItem.querySelector('.expenses-amount').value = '';  
            expensesBlock[0].insertBefore(cloneExpensesItem, expensesplus);
            expensesItems = document.querySelectorAll('.expenses-items');

            expensesplus.style.display = 'block';
        }

        enableField() {
            inputTypeText= document.querySelectorAll('[type="text"]');
            
            for (var i = 0; i < inputTypeText.length; i++) {
            inputTypeText[i].disabled = false ;
            }
        }

        cleanFields() {
            salaryAmount.value = '';
            additionalExpensesItem.value = '';
            targetAmount.value = '';
            budgetMonthValue.value = '';
            budgetDayValue.value = '';
            expensesMonthValue.value = '';
            additionalIncomeValue.value = '';
            additionalExpensesValue.value = '';
            incomePeriodValue.value = '';
            targetMonthValue.value = '';
        
            for (let key of additionalIncomeItem){
                key.value = '';
            }
        }

        clearAppdataValue() {
            this.budget = 0;
            this.budgetDay = 0;
            this.budgetMonth = 0;
            this.income = {};
            this.incomeMonth = 0;
            this.addIncome = [];
            this.expenses = {};
            this.addExpenses = [];
            this.expensesMonth = 0;
            this.deposit = false;
            this.percentDeposit = 0;
            this.moneyDeposit = 0;
        }

        getInfoDeposit() {
            if (this.deposit) {
                this.percentDeposit = depositPercent.value;
                this.moneyDeposit = depositAmount.value;
            }
          
        }

        validateDepositPercent() {
 
            depositPercent.value = depositPercent.value.replace(/[^0-9]/, '');
            if (depositPercent.value < 0) 
            {
                depositPercent.value = 0;
            } else if (depositPercent.value > 100) {
                depositPercent.value = 100;
            }
    
        }

        changePercent(){
            const valueSelect = this.value;
            if (valueSelect === 'other'){
                depositPercent.value = '';
                depositPercent.style.display = 'inline-block';
                depositPercent.addEventListener('input', this.validateDepositPercent);
            } else {
                depositPercent.style.display = 'none';
                depositPercent.value = valueSelect;
            }
           
        }

        depositHandler(){
            if (depositCheck.checked) {
                depositBank.style.display = 'inline-block';
                depositAmount.style.display = 'inline-block';
                this.deposit = true;
                depositBank.addEventListener('change', this.changePercent);
                depositPercent.addEventListener('input', this.validateDepositPercent);
            } else {
                depositBank.style.display = 'none';
                depositAmount.style.display = 'none';
                depositPercent.style.display = 'none';
                depositBank.value = '';
                depositAmount.value = '';
                depositPercent.value = '';
                this.deposit = false;
                depositBank.removeEventListener('change', this.changePercent);
               depositPercent.removeEventListener('input', this.validateDepositPercent);
            }
        }

        eventsListeners() {
        start.addEventListener('click', this.start.bind(this));

        expensesplus.addEventListener('click', this.addExpensesBlock);

        incomePlus.addEventListener('click', this.addIncomeBlock);

        periodSelect.addEventListener('change', function(){
            divPeriodAmount.textContent = periodSelect.value;
            // periodSelect.setAttribute('value', periodSelect.value);
            incomePeriodValue.value = this.calcPeriod();
        });
        
        salaryAmount.addEventListener('input', function(){
            if (start.disabled === true){
            start.disabled = false;}
            else if (salaryAmount.value === ''){
            start.disabled = true;
            }
        });
        
        for (var i = 0; i < placeHolderNamination.length; i++) {
            placeHolderNamination[i].addEventListener('input', this.chekNamField);
        }
    

        for (var i = 0; i < placeHolderSum.length; i++) {
            placeHolderSum[i].addEventListener('input', this.chekSumField);
        }
    
        function handle(event) {
            if (event.target.tagName === 'INPUT') {
            prevLength = 0,
            currentValue = null;
            }
        }
        
        for (var i = 0; i < inputsAll.length; i++) {
            inputsAll[i].addEventListener('mouseout', handle);
        }

        const cancelContext = this.cancel.bind(this);

        cancel.addEventListener('click', cancelContext);

        depositCheck.addEventListener('change', this.depositHandler.bind(this))
    }
}

    const appData = new AppData();

    let prevLength = 0,
    currentValue;    

    appData.eventsListeners();

   

