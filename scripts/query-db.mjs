import { PrismaClient } from '../node_modules/@prisma/client/index.js';
const p = new PrismaClient();
const [topics, team, dist] = await Promise.all([
  p.topic.findMany({ orderBy: { order: 'asc' }, select: { id:true, slug:true, title:true, image:true, order:true } }),
  p.teamMember.findMany({ orderBy: { order: 'asc' }, select: { id:true, name:true, role:true, group:true, photo:true } }),
  p.distributor.findMany({ orderBy: { order: 'asc' } }),
]);
console.log('TOPICS:' + JSON.stringify(topics));
console.log('TEAM:' + JSON.stringify(team));
console.log('DIST:' + JSON.stringify(dist));
await p.$disconnect();
