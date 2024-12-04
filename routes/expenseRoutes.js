const express = require('express');
const router = express.Router();
const { addExpense, getExpenses, analyzeSpending } = require('../services/expenseService');

// Add an expense
router.post('/', addExpense);

// Get filtered expenses
router.get('/', getExpenses);

// Analyze spending patterns
router.get('/analysis', analyzeSpending);

module.exports = router;
