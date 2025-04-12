// app/payment/failure/page.tsx
export default function FailurePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-bold mb-4 text-red-600">Ошибка оплаты</h1>
      <p>Код ошибки: {searchParams.InvId}</p>
      <p>Пожалуйста, попробуйте еще раз</p>
    </div>
  );
}
