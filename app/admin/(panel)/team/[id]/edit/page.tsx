import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateMember } from "../../actions";
import TeamForm from "@/components/admin/TeamForm";

export const metadata = { title: "Edytuj osobę" };

export default async function EditMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = await prisma.teamMember.findUnique({ where: { id } });
  if (!member) notFound();

  const action = updateMember.bind(null, id);

  return (
    <div className="max-w-lg">
      <h1 className="font-gloock text-2xl text-paper mb-8">Edytuj osobę</h1>
      <TeamForm action={action} member={member} />
    </div>
  );
}
