"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { TeamGroup } from "@prisma/client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { saveUpload } from "@/lib/upload";

async function requireAdmin() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
}

const memberSchema = z.object({
  name:  z.string().min(1),
  role:  z.string().min(1),
  group: z.nativeEnum(TeamGroup),
});

export async function createMember(formData: FormData) {
  await requireAdmin();
  const parsed = memberSchema.parse({
    name:  formData.get("name"),
    role:  formData.get("role"),
    group: formData.get("group"),
  });

  const photoFile = formData.get("photo");
  let photo: string | null = null;
  if (photoFile instanceof File && photoFile.size > 0) {
    photo = await saveUpload(photoFile, "team");
  }

  const count = await prisma.teamMember.count({ where: { group: parsed.group } });
  await prisma.teamMember.create({ data: { ...parsed, order: count, photo } });
  revalidatePath("/");
  redirect("/admin/team");
}

export async function updateMember(id: string, formData: FormData) {
  await requireAdmin();
  const parsed = memberSchema.parse({
    name:  formData.get("name"),
    role:  formData.get("role"),
    group: formData.get("group"),
  });

  const photoFile = formData.get("photo");
  let photo: string | undefined;
  if (photoFile instanceof File && photoFile.size > 0) {
    photo = await saveUpload(photoFile, "team");
  }

  await prisma.teamMember.update({ 
    where: { id }, 
    data: { 
      ...parsed,
      ...(photo ? { photo } : {})
    } 
  });
  revalidatePath("/");
  redirect("/admin/team");
}

export async function deleteMember(id: string) {
  await requireAdmin();
  await prisma.teamMember.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/team");
}
