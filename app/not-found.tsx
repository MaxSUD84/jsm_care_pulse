import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-18-bold mb-4">
        <span className="text-24-bold text-red-500">404</span> | Страница не найдена
      </h1>
      <Link className="regular underline" href="/">
        Вернуться на стартовую страницу
      </Link>
    </div>
  );
}
