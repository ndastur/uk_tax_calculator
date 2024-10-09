# My Tax Module

A Node.js module that provides simple tax calculations for income tax and national insurance tax.

## Installation

```bash
npm install my-tax-module
```

## Example Use

```js
const { income_tax } = require('./lib/income_tax');

// Calculate income tax for 2023/2024
const incomeTaxAmount = income_tax.calculate(60000, '2023/2024');
console.log('Income Tax 2023/24:', incomeTaxAmount);
```