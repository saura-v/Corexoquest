import { verifyEditorOrAdmin } from "@/lib/dal";
import prisma from "@/lib/prisma";
import BlogsManager from "./BlogsManager";

async function getBlogs() {
  try {
    return await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function AdminBlogsPage() {
  await verifyEditorOrAdmin();
  const blogs = await getBlogs();
  return <BlogsManager initialBlogs={blogs} />;
}
