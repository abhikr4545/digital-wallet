import { sendMoney } from "@/service/TransactionService";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const senderId = '2oFQCNJZteaD7i03Ci8vQOBZ01z';
const receiverList: string[] = [
  '2oFQCNYCmqFHPLZze3vGya8IHGp', '2nzHxoW12YZCx0estbxVYZdLy6y',
  '2nzHxouvGUYH00H6K4qRoXOybEc'
];

const SendMoney = () => {
  const [receiverId, setReceiverId] = useState<string | undefined>('');
  const [amountToSend, setAmountToSend] = useState<string>('');

  const mutation = useMutation({
    mutationFn: sendMoney,
    onSuccess: () => {
      alert("Money sent successfully!");
      setReceiverId("");
      setAmountToSend("");
    },
    onError: (error: any) => {
      alert(`Error: ${error.response?.data?.message || error.message}`);
    },
  });


  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    const allowedValue = '0123456789';

    if (!allowedValue.includes(value[value.length - 1])) return; 

    setAmountToSend(value)
  }

  const objToSend = {
    senderId,
    receiverId,
    amount: amountToSend,
    currency: "INR"
  }

  const handleSubmit = () => {
    if (!receiverId || !amountToSend) {
      alert("Please fill out all fields.");
      return;
    }

    mutation.mutate(objToSend);
  };

  return (
    <div className='pt-20 ml-[260px]'>
      <h1>User Id: {senderId}</h1>
      <div>
        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          User Id: {senderId}
        </label>
            
        </div>
      <div>
        <label htmlFor="receiver" className="block mb-2 text-sm font-medium text-gray-900">
          Select a receiver
        </label>
        <select id="receiver-list" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
          required
        >
          <option value="" disabled>
            Please select a receiver
          </option>
          {receiverList.map((id: string) => {
            return <option value={id} key={id}>{id}</option>
          })}
        </select>
      </div>
      <div className='mt-5'>
        <label htmlFor="number-input" className="block mb-2 text-sm font-medium text-gray-900">
          Amount:
        </label>
        <input type="string" id="number-input" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="90210" required value={amountToSend} onChange={handleAmountChange} 
        
        />

      </div>
      <button type="button" className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={handleSubmit}
      >Send</button>

    </div>
  )
}

export default SendMoney