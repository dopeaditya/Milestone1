const express = require('express');
const bodyParser = require('body-parser');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/expenses', expenseRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

const cron = require('node-cron');
const expenses = require('./data/expenses');

cron.schedule('0 0 * * *', () => { // Runs every day at midnight
    const dailyTotal = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    console.log(`Daily Summary: Total spent: ${dailyTotal}`);
});

cron.schedule('0 0 1 * *', () => { // Runs on the 1st of every month
    const monthlyTotal = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    console.log(`Monthly Summary: Total spent: ${monthlyTotal}`);
});
