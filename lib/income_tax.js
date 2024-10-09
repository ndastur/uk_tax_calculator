// Import the tax rates from the separate file
import { incomeTaxRates } from './tax_rates.js';
import { validateIncomeAndYear } from './validation.js';

// Function to calculate the adjusted personal allowance
export const calculatePersonalAllowance = (income, personalAllowance) => {
  if (typeof income !== 'number' || income < 0) {
    throw new Error('Invalid income: Must be a positive number.');
  }

  if (typeof personalAllowance !== 'number' || personalAllowance < 0) {
    throw new Error('Invalid personal allowance: Must be a positive number.');
  }

  let adjustedPersonalAllowance = personalAllowance;

  // Reduce personal allowance if income exceeds £100,000
  if (income > 100000) {
    const allowanceReduction = Math.min((income - 100000) / 2, personalAllowance);
    adjustedPersonalAllowance -= allowanceReduction;
  }

  return adjustedPersonalAllowance;
};

// Functions to calculate the income tax

// return just the total
export const calculateIncomeTax = (income, year = '2024/25') => {  // Default year set to 2024/2025
  return calculateIncomeTaxDetailed(income, year).total;
}

// return a breakdown
export const calculateIncomeTaxDetailed = (income, year = '2024/25') => {  // Default year set to 2024/2025
  validateIncomeAndYear(income, year);  // Type checking for income and year

  const { personalAllowance, brackets } = incomeTaxRates[year];

  // Calculate adjusted personal allowance
  const adjustedPersonalAllowance = calculatePersonalAllowance(income, personalAllowance);

  let tax = 0;
  // init breakdown array
  let taxPerBracket = Array(brackets.length).fill(0);

  // If income is less than or equal to adjusted personal allowance, no tax is due
  if (income <= adjustedPersonalAllowance) {
    return {
      adjustedPersonalAllowance,
      taxPerBracket,
      total: tax
    };
  }

  let remainingIncomeToBeTaxed = income - adjustedPersonalAllowance;
  //console.log(`income = ${income} - taxableIncome = ${remainingIncomeToBeTaxed}`);

  // Loop through the tax brackets and calculate the tax for each band
  for (let i = 0; i < brackets.length; i++) {
    const { rate, threshold } = brackets[i];

    // The amount of income taxable in this bracket
    const bandLimit = i === 0 ? threshold : threshold - (brackets[i - 1].threshold);
    //console.log(`i = ${i}  :: remainingIncomeToBeTaxed = ${remainingIncomeToBeTaxed} :: bandLimit = ${bandLimit} :: theshold = ${threshold } :: rate = ${rate}`);

    let bandTax = 0;
    if (remainingIncomeToBeTaxed <= bandLimit) {
      bandTax = remainingIncomeToBeTaxed * rate;
      tax += bandTax;
      taxPerBracket[i] = bandTax;
      break;
    } else {
      bandTax = bandLimit * rate;
      tax += bandTax;
      taxPerBracket[i] = bandTax;
      remainingIncomeToBeTaxed -= bandLimit;
    }
  }

  return {
    adjustedPersonalAllowance,
    taxPerBracket,
    total: tax
  };
};