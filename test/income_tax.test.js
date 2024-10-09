import { expect } from 'chai';
import { calculateIncomeTax, calculatePersonalAllowance } from '../lib/income_tax.js';

// Tests for calculatePersonalAllowance
describe('calculatePersonalAllowance', () => {
  it('should return the full personal allowance if income is below £100,000', () => {
    expect(calculatePersonalAllowance(60000, 12570)).to.equal(12570);
  });

  it('should reduce the personal allowance for incomes over £100,000 by £1 for ever £2', () => {
    expect(calculatePersonalAllowance(120000, 12570)).to.equal(12570-(20000/2));
  });

  it('should reduce the personal allowance to 0 if income is above £100,000 + personal allowance * 2', () => {
    expect(calculatePersonalAllowance(100000+(12570*2), 12570)).to.equal(0);
  });

  it('should handle edge cases with exactly £100,000 income', () => {
    expect(calculatePersonalAllowance(100000, 12570)).to.equal(12570);
  });

  it('should throw an error if income is negative', () => {
    expect(() => calculatePersonalAllowance(-50000, 12570)).to.throw('Invalid income: Must be a positive number.');
  });
});

// Tests for calculateIncomeTax
describe('calculateIncomeTax', () => {
  const incomeTaxTests = [
    // { args: { year: '2023/2024', income: 60000}, expected: 11432 },
    // { args: { year: '2023/2024', income: 100000}, expected: 27432 },
    // { args: { year: '2023/2024', income: 126000}, expected: 42903 },
    // { args: { year: '2023/2024', income: 150000}, expected: 53703 },
    // { args: { year: '2023/2024', income: 165000}, expected: 60453 },
    // 2025

    { args: { year: '2024/25', income: 260000 }, expected: { pa: 0, basic: 7540, higher: 34976, additional: 60687, total: 103203 } },
    { args: { year: '2024/25', income: 150000 }, expected: { pa: 0, basic: 	7540, higher: 34976, additional: 11187, total: 53703 } },
    { args: { year: '2024/25', income: 125139 }, expected: { pa: 0.5, basic: 	7540, higher: 34975.20, additional: 0, total: 42515.20 } },
    { args: { year: '2024/25', income: 121000 }, expected: { pa: 2070, basic: 	7540, higher: 34292, additional: 0, total: 40032 } },
    { args: { year: '2024/25', income: 60000 },  expected: { pa: 12570, basic: 	7540, higher: 3892, additional: 0, total: 11432 } },
    { args: { year: '2024/25', income: 30000 },  expected: { pa: 12570, basic: 	3486, higher: 0, additional: 0, total: 3486 } },
  ];
  
  incomeTaxTests.forEach(({args, expected}) => {
    it(`should calculate the correct tax for £${args.income} in the ${args.year} tax year`, () => {
      // Known value for income £60,000 in 2023/2024
      const tax = calculateIncomeTax(args.income, args.year);
      expect(tax).to.be.closeTo(expected.total, 0.5);
    });
  
  });

  it('should apply the default tax year if none is provided', () => {
    const tax = calculateIncomeTax(60000);
    expect(tax).to.be.closeTo(11432, 0);  // Expected tax value for 2024/2025
  });

  it('should return 0 tax if income is below personal allowance', () => {
    const tax = calculateIncomeTax(9000, '2023/24');
    expect(tax).to.equal(0);
  });

  it('should handle edge cases with exactly personal allowance income', () => {
    const tax = calculateIncomeTax(12570, '2023/24');
    expect(tax).to.equal(0);
  });

  it('should throw an error for invalid income', () => {
    expect(() => calculateIncomeTax('invalid income', '2023/24')).to.throw('Invalid income: Must be a positive number.');
  });

  it('should throw an error for an invalid year', () => {
    expect(() => calculateIncomeTax(60000, '2019/20')).to.throw('Invalid year: Rates not found for 2019/20.');
  });
});
