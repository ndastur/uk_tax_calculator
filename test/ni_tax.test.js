import { expect } from 'chai';
import { calculateNITaxDetailed } from '../lib/ni_tax.js';

// Tests for National Insurance
describe('calculateIncomeTax', () => {
  const incomeTaxTests = [
    { args: { year: '2024/25', income: 260000 }, expected: { lower: 3016, higher: 4194.60, total: 7210.60 } },
    { args: { year: '2024/25', income: 150000 }, expected: { lower: 3016, higher: 1994.60, total: 5010.60 } },
    { args: { year: '2024/25', income: 121000 }, expected: { lower: 3016, higher: 1414.60, total: 4430.60 } },
    { args: { year: '2024/25', income: 60000 },  expected: { lower: 3016, higher: 194.60, total: 3210.60 } },
    { args: { year: '2024/25', income: 50271 },  expected: { lower: 3016, higher: 0.02, total: 3016.02 } },
    { args: { year: '2024/25', income: 50270 },  expected: { lower: 3016, higher: 0, total: 3016 } },
    { args: { year: '2024/25', income: 30000 },  expected: { lower: 1394.40, higher: 0, total: 1394.40 } },
  ];
  
  incomeTaxTests.forEach(({args, expected}) => {
    it(`should calculate the correct lower band NI for £${args.income} in the ${args.year} tax year`, () => {
      const tax = calculateNITaxDetailed(args.income, args.year);
      expect(tax.lower).to.be.closeTo(expected.lower, 0.01);
    });

    it(`should calculate the correct higher band NI for £${args.income} in the ${args.year} tax year`, () => {
      const tax = calculateNITaxDetailed(args.income, args.year);
      expect(tax.higher).to.be.closeTo(expected.higher, 0.01);
    });

    it(`should calculate the correct total NI for £${args.income} in the ${args.year} tax year`, () => {
      const tax = calculateNITaxDetailed(args.income, args.year);
      expect(tax.total).to.be.closeTo(expected.total, 0.5);
    });
  });

  it('should throw an error for invalid income', () => {
    expect(() => calculateNITaxDetailed('invalid income', '2023/24')).to.throw('Invalid income: Must be a positive number.');
  });

  it('should throw an error for an invalid year', () => {
    expect(() => calculateNITaxDetailed(60000, '2019/20')).to.throw('Invalid year: Rates not found for 2019/20.');
  });
});
