import { decHexe } from "@/src/lib/encryptDecrypt";

type Params = {
  params: {
    userId: string;
  };
};
export default function page({ params }: Params) {
  return <h1>{decHexe(params.userId, process.env.ENCRYPTION_KEY)}</h1>;
}
