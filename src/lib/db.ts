import { Redis } from "@upstash/redis";

const upstashRedisRestUrl = process.env.UPSTASH_REDIS_REST_URL || "";
const authToken = process.env.UPSTASH_REDIS_REST_TOKEN || "";

export const db = new Redis({
  url: upstashRedisRestUrl || "",
  token: authToken || "",
});

type Command = "zrange" | "sismember" | "get" | "smembers";

export const fetchRedis = async (
  command: Command,
  ...args: (string | number)[]
) => {
  const commandUrl = `${upstashRedisRestUrl}/${command}/${args.join("/")}`;

  const response = await fetch(commandUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Error executing Redis command: ${response.statusText}`);
  }

  const data = await response.json();
  return data.result;
};

export const getUserIdByEmail = async (
  email: string
): Promise<string | null> => {
  return fetchRedis("get", `user:email:${email}`);
};

export const hasRequestedFriend = async (
  userId: string,
  sessionId: string
): Promise<1 | 0> => {
  return fetchRedis(
    "sismember",
    `user:${userId}:incoming_friend_requests`,
    sessionId
  );
};

export const isUserAFriend = async (
  userId: string,
  sessionId: string
): Promise<1 | 0> => {
  return fetchRedis("sismember", `user:${userId}:friends`, sessionId);
};

export const addFriendRequest = async (
  friendIdToAdd: string,
  sessionId: string
) => {
  db.sadd(`user:${friendIdToAdd}:incoming_friend_requests`, sessionId);
};
