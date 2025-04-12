// app/payment/success/page.tsx
export default function SuccessPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-bold mb-4 text-green-600">
        Оплата успешна!
      </h1>
      <p>Номер заказа: {searchParams.InvId}</p>
      <p>Сумма: {searchParams.OutSum} руб</p>
    </div>
  );
}
