import FriendId from "@/src/components/firendId/FriendId";
import { UserDb } from "@/src/utils/types/types";
import NotFound from "../../not-found";

type Params = {
  params: {
    friendId: string;
  };
};

export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const paths = await fetch(`${process.env.NEXTAUTH_URL}/api/get-paths`, {
      cache: "no-store",
    }).then((res) => res.json());
    return paths.data.map((path: UserDb) => ({
      friendId: path,
    }));
  } catch (err) {
    console.log(err);
    throw new Error();
  }
}

export default function Page({ params }: Params) {
  if (params.friendId) return <FriendId friendId={params.friendId} />;
  return NotFound();
}
