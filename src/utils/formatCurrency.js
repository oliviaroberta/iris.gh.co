export function formatCurrency(value) {
  return new Intl.NumberFormat('en-GH', { style: 'currency', currency: 'GHS', maximumFractionDigits: 0 }).format(value).replace('GHS', 'GH₵');
}
