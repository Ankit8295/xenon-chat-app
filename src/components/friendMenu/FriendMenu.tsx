"use client";
import { useState } from "react";

export default function FriendMenu() {
  const [active, setActive] = useState<boolean>(false);

  return (
    <div className="relative">
      <div
        onClick={() => setActive((prev) => !prev)}
        className={`cursor-pointer w-[30px] h-[30px] rounded-[50%] p-2 flex items-center justify-center ${
          active ? "bg-blue-500" : ""
        }`}
      >
        <svg fill="#d9d9d9" width="18px" viewBox="0 0 32 32">
          <path d="M12.15 28.012v-0.85c0.019-0.069 0.050-0.131 0.063-0.2 0.275-1.788 1.762-3.2 3.506-3.319 1.95-0.137 3.6 0.975 4.137 2.787 0.069 0.238 0.119 0.488 0.181 0.731v0.85c-0.019 0.056-0.050 0.106-0.056 0.169-0.269 1.65-1.456 2.906-3.081 3.262-0.125 0.025-0.25 0.063-0.375 0.094h-0.85c-0.056-0.019-0.113-0.050-0.169-0.056-1.625-0.262-2.862-1.419-3.237-3.025-0.037-0.156-0.081-0.3-0.119-0.444zM20.038 3.988l-0 0.85c-0.019 0.069-0.050 0.131-0.056 0.2-0.281 1.8-1.775 3.206-3.538 3.319-1.944 0.125-3.588-1-4.119-2.819-0.069-0.231-0.119-0.469-0.175-0.7v-0.85c0.019-0.056 0.050-0.106 0.063-0.162 0.3-1.625 1.244-2.688 2.819-3.194 0.206-0.069 0.425-0.106 0.637-0.162h0.85c0.056 0.019 0.113 0.050 0.169 0.056 1.631 0.269 2.863 1.419 3.238 3.025 0.038 0.15 0.075 0.294 0.113 0.437zM20.037 15.575v0.85c-0.019 0.069-0.050 0.131-0.063 0.2-0.281 1.794-1.831 3.238-3.581 3.313-1.969 0.087-3.637-1.1-4.106-2.931-0.050-0.194-0.094-0.387-0.137-0.581v-0.85c0.019-0.069 0.050-0.131 0.063-0.2 0.275-1.794 1.831-3.238 3.581-3.319 1.969-0.094 3.637 1.1 4.106 2.931 0.050 0.2 0.094 0.394 0.137 0.588z"></path>
        </svg>
      </div>
      <div
        id="dropDown"
        className={`${
          active
            ? "absolute transition-all duration-200 origin-top-right whitespace-nowrap right-5 top-[110%] flex flex-col items-start text-xs bg-hover_color rounded-md"
            : "hidden"
        } `}
      >
        <span
          onClick={() => setActive(false)}
          className="px-5 w-full py-3 hover:bg-primary cursor-pointer"
        >
          Friend Info
        </span>
        <span
          onClick={() => setActive(false)}
          className="px-5  w-full py-3 hover:bg-primary cursor-pointer"
        >
          Close Chat
        </span>
        <span
          onClick={() => setActive(false)}
          className="px-5 w-full py-3 hover:bg-primary cursor-pointer"
        >
          Unfriend
        </span>
        <span
          onClick={() => setActive(false)}
          className="px-5 w-full py-3 hover:bg-primary cursor-pointer"
        >
          Report & Block
        </span>
      </div>
    </div>
  );
}
