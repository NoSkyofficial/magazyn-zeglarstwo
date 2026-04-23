import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { updateTopic } from "../../actions";

export const metadata = { title: "Edytuj kategorię" };

export default async function EditTopicPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const topic = await prisma.topic.findUnique({ where: { id } });
  if (!topic) notFound();

  const action = updateTopic.bind(null, id);

  return (
    <div className="max-w-xl">
      <h1 className="font-gloock text-2xl text-paper mb-8">Edytuj kategorię</h1>

      <form action={action} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="section-label text-navy-300">Tytuł</label>
          <input name="title" type="text" required defaultValue={topic.title} className="input-field" />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="section-label text-navy-300">Slug (URL)</label>
          <input name="slug" type="text" required defaultValue={topic.slug} className="input-field" />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="section-label text-navy-300">Opis</label>
          <textarea
            name="description"
            required
            rows={4}
            defaultValue={topic.description}
            className="input-field resize-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="section-label text-navy-300">Zdjęcie (opcjonalne)</label>
          <div className="flex gap-4 items-start">
            <div className="relative w-20 h-20 bg-navy-800 overflow-hidden shrink-0">
              <Image src={topic.image} alt={topic.title} fill className="object-cover" sizes="80px" />
            </div>
            <input
              name="image"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              className="text-xs text-navy-300 file:mr-3 file:py-1.5 file:px-3 file:border-0 file:bg-navy-800 file:text-navy-200 file:cursor-pointer file:hover:bg-navy-700 file:transition-colors"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" className="section-label bg-brass-400 hover:bg-brass-300 text-navy-950 font-bold px-6 py-2.5 transition-colors">
            Zapisz
          </button>
          <a href="/admin/topics" className="section-label text-navy-400 hover:text-paper border border-navy-700 hover:border-navy-500 px-6 py-2.5 transition-colors">
            Anuluj
          </a>
        </div>
      </form>
    </div>
  );
}
