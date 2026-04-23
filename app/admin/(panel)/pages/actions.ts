"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
}

export async function updatePageContent(slug: string, formData: FormData) {
  await requireAdmin();
  const contentJson = formData.get("contentJson") as string;
  if (!contentJson) throw new Error("Brak treści");

  await prisma.pageContent.upsert({
    where: { slug },
    update: { contentJson },
    create: { slug, title: slug, contentJson },
  });

  revalidatePath("/");
}
