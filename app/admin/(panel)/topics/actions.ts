"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { saveUpload } from "@/lib/upload";

async function requireAdmin() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
}

const topicSchema = z.object({
  title:       z.string().min(1),
  slug:        z.string().min(1),
  description: z.string().min(1),
});

export async function updateTopic(id: string, formData: FormData) {
  await requireAdmin();

  const parsed = topicSchema.parse({
    title:       formData.get("title"),
    slug:        formData.get("slug"),
    description: formData.get("description"),
  });

  const imageFile = formData.get("image");
  let image: string | undefined;
  if (imageFile instanceof File && imageFile.size > 0) {
    image = await saveUpload(imageFile, "topics");
  }

  await prisma.topic.update({
    where: { id },
    data: { ...parsed, ...(image ? { image } : {}) },
  });

  revalidatePath("/");
  revalidatePath("/admin/topics");
}

export async function reorderTopics(orderedIds: string[]) {
  await requireAdmin();
  await Promise.all(
    orderedIds.map((id, order) => prisma.topic.update({ where: { id }, data: { order } }))
  );
  revalidatePath("/");
  revalidatePath("/admin/topics");
}
