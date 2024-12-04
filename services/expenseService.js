const expenses = require('../data/expenses');
const { validateExpense } = require('../utils/validators');

// Add Expense
const addExpense = (req, res) => {
    const { category, amount, date } = req.body;

    const validationError = validateExpense(category, amount, date);
    if (validationError) {
        return res.status(400).json({ status: 'error', error: validationError });
    }

    const newExpense = { id: expenses.length + 1, category, amount, date };
    expenses.push(newExpense);
    res.status(201).json({ status: 'success', data: newExpense });
};

// Get Expenses
const getExpenses = (req, res) => {
    const { category, startDate, endDate } = req.query;
    let filtered = [...expenses];

    if (category) {
        filtered = filtered.filter(exp => exp.category === category);
    }
    if (startDate && endDate) {
        filtered = filtered.filter(exp => new Date(exp.date) >= new Date(startDate) && new Date(exp.date) <= new Date(endDate));
    }

    res.json({ status: 'success', data: filtered });
};

// Analyze Spending
const analyzeSpending = (req, res) => {
    const totalByCategory = expenses.reduce((acc, exp) => {
        acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
        return acc;
    }, {});

    res.json({
        status: 'success',
        data: {
            totalByCategory,
            highestCategory: Object.entries(totalByCategory).reduce((a, b) => (a[1] > b[1] ? a : b))[0]
        }
    });
};

module.exports = { addExpense, getExpenses, analyzeSpending };
