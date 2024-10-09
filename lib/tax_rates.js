// Define and export the income tax rates
export const incomeTaxRates = {
    '2024/25': {
      personalAllowance: 12570,
      blindAllowance: 3070,
      brackets: [
        { rate: 0.20, threshold: 37700 },
        { rate: 0.40, threshold: 125140 },
        { rate: 0.45, threshold: Infinity },
      ],
    },
    '2023/24': {
      personalAllowance: 12570,
      blindAllowance: 2870,
      brackets: [
        { rate: 0.20, threshold: 37700 },
        { rate: 0.40, threshold: 125140 },
        { rate: 0.45, threshold: Infinity },
      ],
    },
    '2022/23': {
      personalAllowance: 12570,
      blindAllowance: 2600,
      brackets: [
        { rate: 0.20, threshold: 37700 },
        { rate: 0.40, threshold: 150000 },
        { rate: 0.45, threshold: Infinity },
      ],
    },
  };

export const niTaxRates = {
    '2024/25': {
        lowerEarningsLimit: 6396,
        primaryThreshold: 12570,
        upperEarningsLimit: 50270,
        standardRate: 0.08,
        higherRate: 0.02
    },
    '2023/24': {
        lowerEarningsLimit: 6396,
        primaryThreshold: 12570,
        upperEarningsLimit: 50270,
        standardRate: 0.115,
        higherRate: 0.02        
    },
    '2022/23': {
        lowerEarningsLimit: 12384,
        primaryThreshold: 12570,
        upperEarningsLimit: 50270,
        standardRate: 0.12,
        higherRate: 0.02
    },      
};
