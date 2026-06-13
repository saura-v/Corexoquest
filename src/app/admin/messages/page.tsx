import { verifySession } from "@/lib/dal";
import prisma from "@/lib/prisma";
import MessagesManager from "./MessagesManager";

async function getMessages() {
  try {
    return await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function AdminMessagesPage() {
  await verifySession();
  const messages = await getMessages();
  return <MessagesManager initialMessages={messages} />;
}
