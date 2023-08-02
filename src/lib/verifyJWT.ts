import { verifyJwt } from "./jwt";

export default function verifyUserOnServer(request: Request) {
  const jwt = request.headers.get("authorization");

  if (!jwt) {
    return false;
  }

  const verifyToken = verifyJwt(jwt);

  if (!verifyToken) {
    return false;
  }
  return true;
}
