import { calculateIncomeTax, calculateIncomeTaxDetailed, calculatePersonalAllowance } from './lib/income_tax.js';

// Calculate income tax for 2023/2024
const incomes = [60000, 112000, 175000];
const year = '2024/25';

try {
  // Check if an salary argument has been passed
  const income = parseFloat( process.argv[2] );
  if (process.argv.length === 3) {
    if( typeof income === 'number' ) {
      const personalAllowance = calculatePersonalAllowance(income, 12570);
      const incomeTax = calculateIncomeTaxDetailed(income, year);
      console.log('Income Tax ' + year + ': ', incomeTax);
    }
    else {
      console.log(`An argument [${income} type=${typeof income}] has been passed as an income but isn't a number...`);
      process.exit(1);
    }
  }
  else
  {
    for (let index = 0; index < incomes.length; index++) {
        const income = incomes[index];
        
        const personalAllowance = calculatePersonalAllowance(income, 12570);
        const incomeTax = calculateIncomeTaxDetailed(income, year);
        console.log('Income Tax ' + year + ': ', incomeTax);
    }
  }
}
catch (error) {
    console.error(error.message);  // Outputs: "Invalid income: Must be a positive number."
}
