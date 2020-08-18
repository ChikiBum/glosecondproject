'use strict';

const buttion = document.getElementById('start'),
    buttionPlusIncome = document.querySelector('button.income_add'),
    buttionPlusExpenses = document.querySelector('button.expenses_add'),
    checkBox = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value'),
    budgetDayValue = document.getElementsByClassName('budget_day-value'),
    expensesMonthValue = document.getElementsByClassName('expenses_month-value'),
    additionalIncomeValue = document.getElementsByClassName('additional_income-value'),
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value'),
    incomePeriodValue = document.getElementsByClassName('income_period-value'),
    targetMonthValue = document.getElementsByClassName('target_month-value'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    resultTotal = document.querySelector('.result-total');

 


    console.log('buttion: ', buttion);
    console.log('buttionPlusIncome: ', buttionPlusIncome);
    console.log('buttionPlusExpenses: ', buttionPlusExpenses);
    console.log('checkBox: ', checkBox);
    console.log('additionalIncomeItem: ', additionalIncomeItem);
    console.log('budgetMonthValue: ', budgetMonthValue);
    console.log('budgetDayValue: ', budgetDayValue);
    console.log('expensesMonthValue: ', expensesMonthValue);
    console.log('additionalExpensesValue: ', additionalExpensesValue);
    console.log('incomePeriodValue: ', incomePeriodValue);
    console.log('targetMonthValue: ', targetMonthValue);
    console.log('depositAmount: ', depositAmount);
    console.log('depositPercent: ', depositPercent);
    console.log('targetAmount: ', targetAmount);
    console.log('periodSelect: ', periodSelect);
    console.log('resultTotal: ', resultTotal);