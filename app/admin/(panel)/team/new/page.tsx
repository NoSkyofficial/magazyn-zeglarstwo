import { createMember } from "../actions";
import TeamForm from "@/components/admin/TeamForm";

export const metadata = { title: "Dodaj osobę" };

export default function NewMemberPage() {
  return (
    <div className="max-w-lg">
      <h1 className="font-gloock text-2xl text-paper mb-8">Dodaj osobę</h1>
      <TeamForm action={createMember} />
    </div>
  );
}
