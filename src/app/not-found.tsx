export default function NotFound() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <section className=" flex flex-col gap-3 items-center border border-black/30 dark:border-white/25 rounded-lg p-6">
        <h1 className="text-center text-xl">404</h1>
        <span className="text-center">Resource not found!</span>
      </section>
    </div>
  );
}
