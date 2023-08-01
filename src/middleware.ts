import { withAuth } from "next-auth/middleware";

export default withAuth({
  secret: "asdfjalkdsjflakjsdflkdskdsflklk",
});

export const config = {
  matcher: ["/home/:paths*"],
};
