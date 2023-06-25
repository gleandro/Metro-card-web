export const API_BASE_URL = 'http://localhost:8080';

export const API_BASE_URL_USER = 'http://localhost:8080/user';
export const API_BASE_URL_ACCOUNT = 'http://localhost:8080/account';
export const API_BASE_URL_RECHARGE_AMOUNT = 'http://localhost:8080/recharge_account';


export const ACEPTAR = 'ACEPTAR';


export const SUCCESS = "200";
export const ERROR = "400";

export const formatCardNumber = (cardNumber: String) => {
    const formattedNumber = cardNumber.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ');
    return formattedNumber.trim();
};
