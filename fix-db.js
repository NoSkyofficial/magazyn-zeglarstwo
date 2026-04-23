const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const topics = await prisma.topic.findMany();
  for (const topic of topics) {
    if (topic.image.endsWith('.jpg') && topic.image.includes(topic.slug)) {
      await prisma.topic.update({
        where: { id: topic.id },
        data: { image: topic.image.replace('.jpg', '.png') }
      });
    }
  }
}
main().then(() => console.log('Done'));
