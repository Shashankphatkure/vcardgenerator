'use client';

import { useState } from 'react';

export default function UPIPaymentPage() {
  const [upiId, setUpiId] = useState('');
  const [amount, setAmount] = useState('');

  const handlePayment = () => {
    if (!upiId || !amount) {
      alert('Please enter both UPI ID and amount');
      return;
    }

    const upiUrl = `upi://pay?pa=${upiId}&pn=Recipient&am=${amount}&cu=INR`;
    window.location.href = upiUrl;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">UPI Payment</h1>
      <input
        type="text"
        placeholder="Enter UPI ID"
        value={upiId}
        onChange={(e) => setUpiId(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <button
        onClick={handlePayment}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Pay with UPI
      </button>
    </div>
  );
}
