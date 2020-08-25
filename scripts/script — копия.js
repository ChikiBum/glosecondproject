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
    depositCheckmark = document.getElementsByClassName('deposit-checkmark');

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
    
    let appData = {
        budget: 0,
        budgetDay: 0,
        budgetMonth : 0,
        income: {},
        incomeMonth: 0,
        addIncome: [],
        expenses: {},
        addExpenses: [],
        expensesMonth: 0,
        deposit: false,
        percentDeposit: 0,
        moneyDeposit: 0,
        start : function() {
          
            start.setAttribute('style', 'display: none;');
            cancel.setAttribute('style', 'display: block;');
           
           this.budget = +salaryAmount.value;
    
           this.getExpenses();
           this.getIncome();
           this.getExpensesMonth();
           this.getAddExpenses();
           this.getAddIncome();
           this.getBudget();
           this.disableField();
            

           this.showResult();
          
        },
        showResult : function(){
            budgetMonthValue.value = this.budgetMonth;
            budgetDayValue.value = Math.ceil(this.budgetDay);
            expensesMonthValue.value = this.expensesMonth;
            additionalExpensesValue.value = this.addExpenses.join(', ');
            additionalIncomeValue.value = this.addIncome.join(', ');
            targetMonthValue.value = this.getTargetMonth();
            incomePeriodValue.value = this.calcPeriod();
        },
        addExpensesBlock: function(){
            let  cloneExpensesItem = expensesItems[0].cloneNode(true);
            cloneExpensesItem.querySelector('.expenses-title').value = '';  
            cloneExpensesItem.querySelector('.expenses-amount').value = '';  
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesplus);
            expensesItems = document.querySelectorAll('.expenses-items');

            if(expensesItems.length === 3){
                expensesplus.style.display = 'none';
            }
        },
        addIncomeBlock : function(){
            let  cloneIncomeItem = incomeItems[0].cloneNode(true);
            cloneIncomeItem.querySelector('.income-title').value = '';  
            cloneIncomeItem.querySelector('.income-amount').value = '';  
            incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
            incomeItems = document.querySelectorAll('.income-items');

            if(incomeItems.length === 3){
                incomePlus.style.display = 'none';
            }
        },
        getExpenses: function(){
            expensesItems.forEach((item) => {
                let itemExpenses = item.querySelector('.expenses-title').value;
                let cashExpenses = item.querySelector('.expenses-amount').value;
                if(itemExpenses !== '' && cashExpenses !== ''){
                    this.expenses[itemExpenses] = cashExpenses;
                }
            });
        },
        getIncome: function(){
            incomeItems.forEach((item) => {
                let itemIncome = item.querySelector('.income-title').value;
                let cashIncome = item.querySelector('.income-amount').value;
               
                if(itemIncome !== '' && cashIncome !== ''){
                this.income[itemIncome] = +cashIncome;
                }
            });
           
            for(let key in this.income){
                this.incomeMonth += +this.income[key];
            }
        },
        getAddExpenses: function(){
            let addExpenses = additionalExpensesItem.value.split(',');
            addExpenses.forEach((item) => {
                item = item.trim();
                if(item !== ''){
                    this.addExpenses.push(item);
                }
            });
        },
        getAddIncome:  function(){
            additionalIncomeItem.forEach((item) => {
                let itemValue = item.value.trim();
                if(itemValue !== ''){
                    this.addIncome.push(itemValue);
                }
            });
        },
        getExpensesMonth: function(){
                    for (let key in this.expenses) {
                    this.expensesMonth += +this.expenses[key];
                }
        },
        getBudget:function(){
            this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
            this.budgetDay = Math.floor(this.budgetMonth / 30);
                },
    
        getTargetMonth: function(){
            /*3) Если getTargetMonth возвращает нам отрицательное значение, то 
            вместо “Цель будет достигнута” необходимо выводить “Цель не будет достигнута”*/
                    let targetMonthValue = Math.ceil(targetAmount.value / this.budgetMonth);
            
                    if (targetMonthValue >= 0){
                        return targetMonthValue;
                    } else {
                        return 'Цель не будет достигнута';
                    }
                },
        getStatusIncome: function(){
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
        },
        getInfoDeposit: function(){
            this.deposit = confirm('Есть ли у вас депозит в банке?');
            if(this.deposit){
                do {this.percentDeposit = prompt('Какой годовой процент?', '10');}
                    while (!isNumber(this.percentDeposit));
    
                do {this.moneyDeposit = prompt('Какая сумма заложена?', 10000);}
                    while (!isNumber(this.moneyDeposit));
            }
        } ,
        calcPeriod: function(){
            return this.budgetMonth * periodSelect.value;
        },
        chekNamField : function(){
    
        const matchResult = this.value.match(/[а-я]|[А-Я]|[-.?!)(,:;]|[ ]/g);
        
        if (!matchResult) {
            this.value = '';
        } else if (prevLength !==0 && prevLength === matchResult.length){
            this.value = currentValue;
        } else if (matchResult !== null) {
        prevLength = matchResult.length;}
        currentValue = this.value;
        },
        chekSumField : function(){
    
        const matchResult = this.value.match(/[0-9]/g);
        
        if (!matchResult) {
            this.value = '';
        } else if (prevLength !==0 && prevLength === matchResult.length){
            this.value = currentValue;
        } else if (matchResult !== null) {
        prevLength = matchResult.length;}
        currentValue = this.value;
        },
        disableField : function(){
            inputTypeText= document.querySelectorAll('[type="text"]');

            for (var i = 0; i < inputTypeText.length; i++) {
            inputTypeText[i].disabled = true ;
            }
        },
        cancel : function(){
            start.setAttribute('style', 'display: block;');
            cancel.setAttribute('style', 'display: none;');

            
            this.clearAppdataValue();
            this.resetIncomeBlock();
            this.resetExpensesBlock();
            this.enableField();
            this.cleanFields();
            
        },
        resetIncomeBlock : function(){
          
            for (let key of incomeItems){
                key.remove();
            }
                        
            let  cloneIncomeItem = incomeItems[0].cloneNode(true);
            cloneIncomeItem.querySelector('.income-title').value = '';  
            cloneIncomeItem.querySelector('.income-amount').value = '';  
            incomeBlock[0].insertBefore(cloneIncomeItem, incomePlus);
            incomeItems = document.querySelectorAll('.income-items');

            incomePlus.style.display = 'block';
            },
        resetExpensesBlock: function(){
            for (let key of expensesItems){
                key.remove();
            }

            let  cloneExpensesItem = expensesItems[0].cloneNode(true);
            cloneExpensesItem.querySelector('.expenses-title').value = '';  
            cloneExpensesItem.querySelector('.expenses-amount').value = '';  
            expensesBlock[0].insertBefore(cloneExpensesItem, expensesplus);
            expensesItems = document.querySelectorAll('.expenses-items');

            expensesplus.style.display = 'block';
        },
        enableField : function(){
            inputTypeText= document.querySelectorAll('[type="text"]');
            
            for (var i = 0; i < inputTypeText.length; i++) {
            inputTypeText[i].disabled = false ;
            }
        },
        cleanFields : function(){
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
        },
        clearAppdataValue: function(){
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
    };

    const startContext = appData.start.bind(appData);

    start.addEventListener('click', startContext);

    expensesplus.addEventListener('click', appData.addExpensesBlock);

    incomePlus.addEventListener('click', appData.addIncomeBlock);

    periodSelect.addEventListener('change', function(){
        divPeriodAmount.textContent = periodSelect.value;
        // periodSelect.setAttribute('value', periodSelect.value);
        incomePeriodValue.value = appData.calcPeriod();
    });
    
    salaryAmount.addEventListener('input', function(){
        if (start.disabled === true){
        start.disabled = false;}
        else if (salaryAmount.value === ''){
        start.disabled = true;
        }
    });

    let prevLength = 0,
    currentValue;    
      
    for (var i = 0; i < placeHolderNamination.length; i++) {
        placeHolderNamination[i].addEventListener('input', appData.chekNamField);
    }
   

    for (var i = 0; i < placeHolderSum.length; i++) {
        placeHolderSum[i].addEventListener('input', appData.chekSumField);
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

    const cancelContext = appData.cancel.bind(appData);

    cancel.addEventListener('click', cancelContext);

