import { incomeTaxRates } from './tax_rates.js';

// Helper function to validate the income and year parameters
export const validateIncomeAndYear = (income, year) => {
    if (typeof income !== 'number' || income < 0) {
      throw new Error('Invalid income: Must be a positive number.');
    }
  
    if (typeof year !== 'string') {
      throw new Error('Invalid year: Must be a string.');
    }
  
    if (!incomeTaxRates.hasOwnProperty(year)) {
      throw new Error(`Invalid year: Rates not found for ${year}.`);
    }
  };
  