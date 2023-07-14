export default function Home() {
  return (
    <form className="flex flex-col gap-5 items-center py-10">
      <h1>Log in or sign up</h1>
      <label>
        <input type="text" placeholder="Email" />
      </label>
      <label>
        <input type="text" placeholder="Password" />
      </label>
      <label>
        <input type="text" placeholder="Confirm password" />
      </label>
      <button type="submit" className="border px-2 hover:bg-black/60">
        Continue
      </button>
    </form>
  );
}
