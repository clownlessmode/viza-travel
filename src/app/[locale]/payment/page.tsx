// app/payment/page.tsx
"use client";

import { useState } from "react";

export default function PaymentPage() {
  const [amount, setAmount] = useState("100");
  const [description, setDescription] = useState("Тестовая оплата");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        amount,
        description,
        email,
        userId: "123", // Здесь должен быть реальный ID пользователя
      });

      const res = await fetch(`/api/payment?${params}`);
      const data = await res.json();

      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        throw new Error("Payment URL not received");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Ошибка при создании платежа");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Оплата</h1>
      <div className="space-y-4">
        <div>
          <label>Сумма (руб)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label>Описание</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label>Email (для чека)</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          onClick={handlePayment}
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          {isLoading ? "Обработка..." : "Оплатить"}
        </button>
      </div>
    </div>
  );
}
