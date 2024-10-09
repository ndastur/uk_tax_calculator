# UK Tax Module

A Node.js module that provides simple tax calculations for income tax and national insurance tax.

## Installation

```bash
npm install uk_tax_calc
```

## Example Use

```js
import { calculateIncomeTaxDetailed } from './lib/income_tax.js';

try {
    const incomeTax = calculateIncomeTaxDetailed(30000, '2024/25');
    console.log('Income Tax ' + year + ': ', incomeTax);
}
catch (error) {
    console.error(error.message);  // Outputs: "Invalid income: Must be a positive number."
}
```

## TODO
 - add Scottish rates
 - check the 2023 rates
 - account for mid year changes to NI