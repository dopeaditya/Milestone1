const validCategories = ['Food', 'Travel', 'Utilities', 'Shopping', 'Sports', 'Others'];

const validateExpense = (category, amount, date) => {
    if (!validCategories.includes(category)) {
        return `Invalid category. Must be one of: ${validCategories.join(', ')}`;
    }
    if (typeof amount !== 'number' || amount <= 0) {
        return 'Amount must be a positive number.';
    }
    if (!Date.parse(date)) {
        return 'Invalid date format.';
    }
    return null;
};

module.exports = { validateExpense };
