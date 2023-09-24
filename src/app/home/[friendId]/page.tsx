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
  const paths = await fetch(`${process.env.NEXTAUTH_URL}/api/get-paths`, {
    cache: "no-store",
  }).then((res) => res.json());
  if (paths) {
    return paths.data.map((path: UserDb) => ({
      friendId: path,
    }));
  }
  return NotFound();
}

export default function Page({ params }: Params) {
  return <FriendId friendId={params.friendId} />;
}
