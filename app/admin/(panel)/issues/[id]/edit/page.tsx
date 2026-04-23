import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import IssueForm from "@/components/admin/IssueForm";
import { updateIssue } from "../../actions";

export const metadata = { title: "Edytuj numer" };

export default async function EditIssuePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({ where: { id } });
  if (!issue) notFound();

  const action = updateIssue.bind(null, id);

  return (
    <div>
      <h1 className="font-gloock text-2xl text-paper mb-2">Edytuj numer</h1>
      <p className="text-sm text-navy-400 mb-8">{issue.label}</p>
      <IssueForm action={action} issue={issue} />
    </div>
  );
}
