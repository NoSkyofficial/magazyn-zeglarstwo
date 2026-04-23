import IssueForm from "@/components/admin/IssueForm";
import { createIssue } from "../actions";

export const metadata = { title: "Nowy numer" };

export default function NewIssuePage() {
  return (
    <div>
      <h1 className="font-gloock text-2xl text-paper mb-8">Dodaj numer</h1>
      <IssueForm action={createIssue} />
    </div>
  );
}
