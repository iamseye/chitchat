import { authOptions } from "@/lib/auth";
import {
  addFriendRequest,
  getUserIdByEmail,
  hasRequestedFriend,
  isUserAFriend,
} from "@/lib/db";
import { addFriendValidator } from "@/lib/validations/add-friend";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function POST(res: Request) {
  try {
    const body = await res.json();

    const { email: emailToAdd } = addFriendValidator.parse(body.email);

    const friendIdToAdd = (await getUserIdByEmail(emailToAdd)) as string;

    if (!friendIdToAdd) {
      return new Response("This person does not exist.", { status: 400 });
    }

    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const sessionId = session.user.id;

    if (friendIdToAdd === sessionId) {
      return new Response("You cannot add yourself as a friend", {
        status: 400,
      });
    }

    // check if user is already requested
    const isAlreadyRequested = await hasRequestedFriend(
      friendIdToAdd,
      sessionId
    );

    if (isAlreadyRequested) {
      return new Response("Already requested this user as a friend", {
        status: 400,
      });
    }

    // check if user is already a friend
    const isAlreadyFriend = await isUserAFriend(friendIdToAdd, sessionId);

    if (isAlreadyFriend) {
      return new Response("The user is already your friend", {
        status: 400,
      });
    }

    await addFriendRequest(friendIdToAdd, sessionId);

    return new Response("OK");
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response(`Invalid request payload: ${err}`, { status: 422 });
    }

    return new Response(`Invalid request: ${err}`, { status: 400 });
  }
}
