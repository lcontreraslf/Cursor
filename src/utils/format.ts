/**
 * src/utils/format.ts
 * Utility functions for formatting values in the application
 */

/**
 * Format a price value with the appropriate currency symbol and thousands separators
 * 
 * @param price - The price value to format
 * @param currency - The currency code (USD, EUR, etc.)
 * @returns Formatted price string
 */
export const formatPrice = (price: number, currency: string = 'USD'): string => {
  // Define currency symbols for common currencies
  const currencySymbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    CAD: 'C$',
    AUD: 'A$',
    CNY: '¥',
    INR: '₹',
    BRL: 'R$',
    MXN: 'MX$'
  };

  // Get the symbol or use the currency code if no symbol is found
  const symbol = currencySymbols[currency] || currency;

  // Format the number using the browser's Intl.NumberFormat
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return `${symbol}${formatter.format(price)}`;
};

/**
 * Format a date string into a more readable format
 * 
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

/**
 * Format an area value with the appropriate unit
 * 
 * @param area - The area value in square meters
 * @param unit - The unit to display (defaults to m² - square meters)
 * @returns Formatted area string
 */
export const formatArea = (area: number, unit: string = 'm²'): string => {
  return `${area} ${unit}`;
};