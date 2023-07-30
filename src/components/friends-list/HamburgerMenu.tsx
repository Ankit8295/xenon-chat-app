type Props = {};

export default function HamburgerMenu({}: Props) {
  return (
    <>
      <div
        className={`w-[20px] h-[1.5px] bg-white  invert dark:invert-0
           
          }`}
      ></div>
      <div
        className={` w-[20px] h-[1.5px] bg-white  invert dark:invert-0
         `}
      ></div>
      <div
        className={` w-[20px] h-[1.5px] bg-white  invert dark:invert-0
            `}
      ></div>
    </>
  );
}
