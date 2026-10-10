"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { saveUpload } from "@/lib/upload";

async function requireAdmin() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
}

const issueSchema = z.object({
  label:       z.string().min(1, "Podaj etykietę numeru"),
  number:      z.coerce.number().int().positive(),
  year:        z.coerce.number().int().min(2000).max(2100),
  shopUrl:     z.string().url("Nieprawidłowy URL sklepu"),
  publishedAt: z.string().min(1, "Podaj datę publikacji"),
  isCurrent:   z.boolean().optional(),
});

export async function createIssue(formData: FormData) {
  await requireAdmin();

  const coverFile = formData.get("coverImage");
  if (!coverFile || !(coverFile instanceof File) || coverFile.size === 0) {
    throw new Error("Okładka jest wymagana.");
  }

  const coverImage = await saveUpload(coverFile, "issues");

  const parsed = issueSchema.parse({
    label:       formData.get("label"),
    number:      formData.get("number"),
    year:        formData.get("year"),
    shopUrl:     formData.get("shopUrl"),
    publishedAt: formData.get("publishedAt"),
    isCurrent:   formData.get("isCurrent") === "on",
  });

  if (parsed.isCurrent) {
    await prisma.issue.updateMany({ where: { isCurrent: true }, data: { isCurrent: false } });
  }

  await prisma.issue.create({
    data: {
      ...parsed,
      coverImage,
      isCurrent: parsed.isCurrent ?? false,
      publishedAt: new Date(parsed.publishedAt),
    },
  });

  revalidatePath("/");
  redirect("/admin/issues");
}

export async function updateIssue(id: string, formData: FormData) {
  await requireAdmin();

  const parsed = issueSchema.parse({
    label:       formData.get("label"),
    number:      formData.get("number"),
    year:        formData.get("year"),
    shopUrl:     formData.get("shopUrl"),
    publishedAt: formData.get("publishedAt"),
    isCurrent:   formData.get("isCurrent") === "on",
  });

  const coverFile = formData.get("coverImage");
  let coverImage: string | undefined;
  if (coverFile instanceof File && coverFile.size > 0) {
    coverImage = await saveUpload(coverFile, "issues");
  }

  if (parsed.isCurrent) {
    await prisma.issue.updateMany({
      where: { isCurrent: true, NOT: { id } },
      data: { isCurrent: false },
    });
  }

  await prisma.issue.update({
    where: { id },
    data: {
      ...parsed,
      ...(coverImage ? { coverImage } : {}),
      isCurrent: parsed.isCurrent ?? false,
      publishedAt: new Date(parsed.publishedAt),
    },
  });

  revalidatePath("/");
  redirect("/admin/issues");
}

export async function deleteIssue(id: string) {
  await requireAdmin();
  await prisma.issue.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/issues");
}

export async function setCurrentIssue(id: string) {
  await requireAdmin();
  await prisma.issue.updateMany({ where: { isCurrent: true }, data: { isCurrent: false } });
  await prisma.issue.update({ where: { id }, data: { isCurrent: true } });
  revalidatePath("/");
  revalidatePath("/admin/issues");
}
