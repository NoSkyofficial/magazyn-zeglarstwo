import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { saveUpload } from "@/lib/upload";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const subfolder = (formData.get("subfolder") as string) ?? "misc";

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "Brak pliku." }, { status: 400 });
    }

    const url = await saveUpload(file, subfolder);
    return NextResponse.json({ url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Błąd uploadu.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
