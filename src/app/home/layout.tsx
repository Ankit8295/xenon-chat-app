"use client";
import SideBar from "@/src/components/friends-list/SideBar";
import useQueryFunction from "@/src/lib/useQueries";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const { userId } = useQueryFunction();

  if (userId)
    return (
      <div className="w-full max-h-screen h-screen flex max-w-[1650px]">
        <SideBar />
        <div className="flex  flex-[5] h-full flex-col items-start w-full bg-transparent">
          {children}
        </div>
      </div>
    );
  else return <h2>Loading...layout</h2>;
}
