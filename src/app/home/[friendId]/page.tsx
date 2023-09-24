import FriendId from "@/src/components/firendId/FriendId";
import { UserDb } from "@/src/utils/types/types";

type Params = {
  params: {
    friendId: string;
  };
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const paths = await fetch(`${process.env.NEXTAUTH_URL}/api/get-paths`).then(
    (res) => res.json()
  );
  return paths.data.map((path: UserDb) => ({
    friendId: path,
  }));
}

export default function Page({ params }: Params) {
  return <FriendId friendId={params.friendId} />;
}
