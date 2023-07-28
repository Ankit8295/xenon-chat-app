import "./style.css";
type Props = {
  text: string;
};

export default function Loading({ text }: Props) {
  return (
    <div className="h-[80%] w-full flex justify-center items-center">
      <div className="loader JS_on">
        <span className="binary"></span>
        <span className="binary"></span>
        <span className="getting-there">{text}</span>
      </div>
    </div>
  );
}
