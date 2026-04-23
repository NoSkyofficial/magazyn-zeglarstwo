import { PrismaClient, TeamGroup } from '../node_modules/@prisma/client/index.js';

const p = new PrismaClient();

const team = [
  { name: 'Waldemar Heflich', role: 'Redaktor Naczelny', group: TeamGroup.STAFF },
  { name: 'Dominik Życki', role: 'Zastępca Redaktora Naczelnego', group: TeamGroup.STAFF },
  { name: 'Kuba Strzyczkowski', role: 'Felietonista', group: TeamGroup.CONTRIBUTOR },
  { name: 'Milka Jung', role: 'Sekretarz Redakcji', group: TeamGroup.STAFF },
  { name: 'Piotr Kulczycki', role: 'Wydawca', group: TeamGroup.STAFF },
  { name: 'Piotr Jodkowski', role: 'Dyrektor Artystyczny', group: TeamGroup.STAFF },
  { name: 'Marek Słodownik', role: 'Publicysta', group: TeamGroup.CONTRIBUTOR },
  { name: 'Adam Struzik', role: 'Reporter', group: TeamGroup.CONTRIBUTOR },
  { name: 'Monika Witkowska', role: 'Podróżnik', group: TeamGroup.CONTRIBUTOR },
  { name: 'Tomasz Maracewicz', role: 'Ekspert', group: TeamGroup.CONTRIBUTOR },
  { name: 'Krzysztof Romański', role: 'Fotograf', group: TeamGroup.CONTRIBUTOR },
  { name: 'Olga Sabok', role: 'Koordynator', group: TeamGroup.STAFF },
  { name: 'Aleksandra Rapp', role: 'Redaktor', group: TeamGroup.STAFF },
  { name: 'Andrzej Minkiewicz', role: 'Publicysta', group: TeamGroup.CONTRIBUTOR },
  { name: 'Małgorzata Talar', role: 'Współpracownik', group: TeamGroup.CONTRIBUTOR },
  { name: 'Marek Zwierz', role: 'Współpracownik', group: TeamGroup.CONTRIBUTOR },
  { name: 'Robert Smagoń', role: 'Współpracownik', group: TeamGroup.CONTRIBUTOR },
  { name: 'Stefan Ekner', role: 'Współpracownik', group: TeamGroup.CONTRIBUTOR }
];

async function updateTeam() {
  await p.teamMember.deleteMany();
  await p.teamMember.createMany({
    data: team.map((t, order) => ({ ...t, order }))
  });
  console.log('Team updated!');
  await p.$disconnect();
}

updateTeam().catch(e => console.error(e));
