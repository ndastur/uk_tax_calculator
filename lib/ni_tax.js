import { niTaxRates } from "./tax_rates.js";
import { validateIncomeAndYear } from "./validation.js";

// return just the total
export const calculateNITax = (income, year = '2024/25') => {  // Default year set to 2024/2025
    return calculateIncomeTaxDetailed(income, year).total;
  }
  
  // return a breakdown
  export const calculateNITaxDetailed = (income, year = '2024/25') => {  // Default year set to 2024/2025
    validateIncomeAndYear(income, year);  // Type checking for income and year

        const {
            lowerEarningsLimit,
            primaryThreshold,
            upperEarningsLimit,
            standardRate,
            higherRate
        } = niTaxRates[year];
    
        let ni = {
            lower: 0,
            higher: 0,
            total: 0
        };

        if (income <= lowerEarningsLimit) {
          return ni;
        }
    
        else if (income > primaryThreshold && income <= upperEarningsLimit) {
          ni.lower = (income - primaryThreshold) * standardRate;
          ni.total = ni.lower;
        }
    
        else if (income > upperEarningsLimit) {
          ni.lower = (upperEarningsLimit - primaryThreshold) * standardRate;
          ni.higher = (income - upperEarningsLimit) * higherRate;
          ni.total = ni.lower + ni.higher;
        }
    
        return ni;


  }  