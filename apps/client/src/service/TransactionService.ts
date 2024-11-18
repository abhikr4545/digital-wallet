import axios from 'axios';

export const getTransactionRecord = async () => {
  return await axios.get('http://localhost:3002/api/transaction/2oFQCNJZteaD7i03Ci8vQOBZ01z');
}

export const sendMoney = async (obj: any) => {
  return await axios.post('http://localhost:3000/api/wallet/transfer', obj);
}