"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
}

const settingsSchema = z.object({
  publisherName:   z.string().min(1),
  address:         z.string().min(1),
  phone:           z.string().min(1),
  email:           z.string().email(),
  facebookUrl:     z.string().url(),
  instagramUrl:    z.string().url(),
  subscriptionUrl: z.string().url(),
  shopBaseUrl:     z.string().url(),
});

export async function updateSettings(formData: FormData) {
  await requireAdmin();
  const parsed = settingsSchema.parse({
    publisherName:   formData.get("publisherName"),
    address:         formData.get("address"),
    phone:           formData.get("phone"),
    email:           formData.get("email"),
    facebookUrl:     formData.get("facebookUrl"),
    instagramUrl:    formData.get("instagramUrl"),
    subscriptionUrl: formData.get("subscriptionUrl"),
    shopBaseUrl:     formData.get("shopBaseUrl"),
  });

  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: parsed,
    create: { id: "singleton", ...parsed },
  });

  revalidatePath("/");
  revalidatePath("/admin/settings");
}

export async function createDistributor(formData: FormData) {
  await requireAdmin();
  const name = formData.get("name") as string;
  if (!name?.trim()) throw new Error("Podaj nazwę");
  const count = await prisma.distributor.count();
  await prisma.distributor.create({ data: { name: name.trim(), order: count } });
  revalidatePath("/");
  revalidatePath("/admin/settings");
}

export async function deleteDistributor(id: string) {
  await requireAdmin();
  await prisma.distributor.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/settings");
}
