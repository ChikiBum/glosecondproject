'use strict';

let start = document.getElementById('start'),
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
    divPeriodAmount = document.querySelector('div .period-amount');

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
            //1) Переписать функцию start циклом do while
            //проверка что на входе число
            // do {
            //     money = prompt('Ваш месячный доход?', 5000);
            // }
            // while (!isNumber(money));

           
            
            
           
            appData.budget = +salaryAmount.value;
    
            appData.getExpenses();
            appData.getIncome();
            appData.getExpensesMonth();
            appData.getAddExpenses();
            appData.getAddIncome();
            appData.getBudget();
            

            appData.showResult();
          
        },
        showResult : function(){
            budgetMonthValue.value = appData.budgetMonth;
            budgetDayValue.value = Math.ceil(appData.budgetDay);
            expensesMonthValue.value = appData.expensesMonth;
            additionalExpensesValue.value = appData.addExpenses.join(', ');
            additionalIncomeValue.value = appData.addIncome.join(', ');
            targetMonthValue.value = appData.getTargetMonth();
            incomePeriodValue.value = appData.calcPeriod();
        },
        addExpensesBlock: function(){
            let  cloneExpensesItem = expensesItems[0].cloneNode(true);
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesplus);
            expensesItems = document.querySelectorAll('.expenses-items');

            if(expensesItems.length === 3){
                expensesplus.style.display = 'none';
            }
        },
        addIncomeBlock : function(){
            let  cloneIncomeItem = incomeItems[0].cloneNode(true);
            incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
            incomeItems = document.querySelectorAll('.income-items');

            if(incomeItems.length === 3){
                incomePlus.style.display = 'none';
            }
        },
        getExpenses: function(){
            expensesItems.forEach(function(item){
                let itemExpenses = item.querySelector('.expenses-title').value;
                let cashExpenses = item.querySelector('.expenses-amount').value;
                if(itemExpenses !== '' && cashExpenses !== ''){
                    appData.expenses[itemExpenses] = cashExpenses;
                }
            });
        },
        getIncome: function(){
            incomeItems.forEach(function(item){
                let itemIncome = item.querySelector('.income-title').value;
                let cashIncome = item.querySelector('.income-amount').value;
                if(itemIncome !== '' && cashIncome !== ''){
                    appData.income[itemIncome] = +cashIncome;
                }
            });
           
            for(let key in appData.income){
                appData.incomeMonth += +appData.income[key];
            }
        },
        getAddExpenses: function(){
            let addExpenses = additionalExpensesItem.value.split(',');
            addExpenses.forEach(function(item){
                item = item.trim();
                if(item !== ''){
                    appData.addExpenses.push(item);
                }
            });
        },
        getAddIncome:  function(){
            additionalIncomeItem.forEach(function(item){
                let itemValue = item.value.trim();
                if(itemValue !== ''){
                    appData.addIncome.push(itemValue);
                }
            });
        },
        getExpensesMonth:function(){
                    for (let key in appData.expenses) {
                    appData.expensesMonth += +appData.expenses[key];
                }
        },
        getBudget:function(){
                appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
                appData.budgetDay = Math.floor(appData.budgetMonth / 30);
                },
    
        getTargetMonth: function(){
            /*3) Если getTargetMonth возвращает нам отрицательное значение, то 
            вместо “Цель будет достигнута” необходимо выводить “Цель не будет достигнута”*/
                    let targetMonthValue = Math.ceil(targetAmount.value / appData.budgetMonth);
            
                    if (targetMonthValue >= 0){
                        return targetMonthValue;
                    } else {
                        return 'Цель не будет достигнута';
                    }
                },
        getStatusIncome: function(){
            if (appData.budgetDay >= 1200){
                return('У вас высокий уровень дохода!');
            } 
            else if (appData.budgetDay > 600  && appData.budgetDay < 1200){
                return ('У вас средний уровень дохода :)');  
            }
            else if (appData.budgetDay <= 600 && appData.budgetDay >= 0){
                return ('К сожалению у вас уровень дохода ниже среднего :(');  
            }
            else if (appData.budgetDay < 0){
                return ('Что то пошло не так!');  
            }
        },
        getInfoDeposit: function(){
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
            if(appData.deposit){
                do {appData.percentDeposit = prompt('Какой годовой процент?', '10');}
                    while (!isNumber(appData.percentDeposit));
    
                do {appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);}
                    while (!isNumber(appData.moneyDeposit));
            }
        } ,
        calcPeriod: function(){
            return appData.budgetMonth * periodSelect.value;
        }
    };

    start.addEventListener('click', appData.start);

    expensesplus.addEventListener('click', appData.addExpensesBlock);

    incomePlus.addEventListener('click', appData.addIncomeBlock);

    periodSelect.addEventListener('change', function(){
        divPeriodAmount.textContent = periodSelect.value;
        // periodSelect.setAttribute('value', periodSelect.value);
        incomePeriodValue.value = appData.calcPeriod();
    });
    
    salaryAmount.addEventListener('input', function(){
        start.disabled = false;
    });

  

    
        
      