type Props = {};

export default function HamburgerMenu({}: Props) {
  return (
    <div className=" flex flex-col items-center justify-center p-2 gap-1 w-[40px] h-[40px]  cursor-pointer rounded-[50%] hover:bg-blue-500">
      <div
        className={`w-[25px] h-[2px] bg-white 
           
          }`}
      ></div>
      <div
        className={` w-[25px] h-[2px] bg-white  
         `}
      ></div>
      <div
        className={` w-[25px] h-[2px] bg-white  
            `}
      ></div>
    </div>
  );
}
