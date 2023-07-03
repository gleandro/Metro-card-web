export const formatCardNumber = (cardNumber: string) => {
  const formattedNumber = cardNumber.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ');
  return formattedNumber.trim();
};
