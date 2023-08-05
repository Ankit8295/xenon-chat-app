import Loading from "./Loading";

type Props = {
  loading?: boolean;
  error?: boolean;
  label?: string;
  loadingLabel?: string;
  errorLabel?: string;
  type: "submit" | "button" | "reset";
  onClick?: () => void;
  customStyles?: string;
};

export function AddFriend({
  loading,
  error,
  label,
  onClick,
  type,
  loadingLabel,
  customStyles,
  errorLabel,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      type={type}
      className={`flex disabled:cursor-not-allowed items-center h-9 w-auto min-w-[100px] justify-center gap-2 bg-hover_light dark:bg-hover_dark hover:bg-primary_light dark:hover:bg-primary_dark rounded  dark:text-white/80 text-black/80 py-1 px-3 ${customStyles}`}
    >
      {loading && <Loading />}
      <span className="font-medium whitespace-nowrap">
        {loading ? loadingLabel : error ? errorLabel : label}
      </span>
    </button>
  );
}
