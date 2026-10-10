import "dotenv/config";
import { PrismaClient, TeamGroup } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  await seedAdmin();
  await seedSettings();
  await seedDistributors();
  await seedTopics();
  await seedTeam();
  await seedPages();
  await seedCurrentIssue();
}

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env before seeding");
  }
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });
  console.log(`✓ Admin: ${email}`);
}

async function seedSettings() {
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      publisherName: "3 Oceans Sp. z o.o.",
      address: "ul. Przykładowa 1, 00-000 Warszawa",
      phone: "+48 000 000 000",
      email: "kontakt@example.com",
      facebookUrl: "https://www.facebook.com/magazyn.zeglarstwo/",
      instagramUrl: "https://www.instagram.com/magazyn.zeglarstwo/",
      subscriptionUrl: "https://sklep.3oceans.pl/prenumerata",
      shopBaseUrl: "https://sklep.3oceans.pl",
    },
  });
  console.log("✓ SiteSettings");
}

async function seedDistributors() {
  const distributors = ["The Warsaw Store", "InMedio", "Relay", "1Minute", "Empik"];
  await prisma.distributor.deleteMany();
  await prisma.distributor.createMany({
    data: distributors.map((name, order) => ({ name, order })),
  });
  console.log(`✓ Distributors (${distributors.length})`);
}

async function seedTopics() {
  const topics = [
    {
      slug: "ku-przestrodze",
      title: "Ku Przestrodze",
      description:
        "Analizy wypadków, niebezpiecznych sytuacji i lekcji z morza. Uczymy się na cudzych błędach — żeby nie popełniać własnych.",
    },
    {
      slug: "wielkie-regaty",
      title: "Wielkie Regaty",
      description:
        "Relacje z najważniejszych regat świata. Od Volvo Ocean Race po lokalne mistrzostwa — sport, taktyka, ludzie.",
    },
    {
      slug: "rozmowy-i-wywiady",
      title: "Rozmowy i Wywiady",
      description:
        "Szczere rozmowy z żeglarzami, konstruktorami, podróżnikami. Historie, które zostają w pamięci długo po zamknięciu numeru.",
    },
    {
      slug: "akweny-i-miejsca",
      title: "Akweny i Miejsca",
      description:
        "Przewodniki po portach, wyspach i zatokach. Dokąd popłynąć i co zobaczyć — sprawdzone trasy i ukryte perełki.",
    },
    {
      slug: "wiedza-i-nauka",
      title: "Wiedza i Nauka",
      description:
        "Meteorologia, nawigacja, manewrówka, pierwsza pomoc. Praktyczna wiedza, która ratuje skóry i oszczędza nerwy.",
    },
    {
      slug: "kultura-i-sztuka",
      title: "Kultura i Sztuka",
      description:
        "Literatura, film, malarstwo marynistyczne. Morze jako inspiracja — od klasyków po współczesne dzieła.",
    },
    {
      slug: "jachty-i-zaglowce",
      title: "Jachty i Żaglowce",
      description:
        "Testy, porównania i prezentacje. Od klasycznych slupów po nowoczesne katamarany — co warto znać przed zakupem.",
    },
    {
      slug: "sail-training",
      title: "Sail Training",
      description:
        "Rejsy szkoleniowe, wyprawy młodzieżowe, programy edukacyjne. Gdzie i jak uczyć się żeglarstwa w dobrym towarzystwie.",
    },
    {
      slug: "felietony",
      title: "Felietony",
      description:
        "Subiektywne komentarze, osobiste refleksje, lekko prowokacyjne spojrzenie na świat żagli.",
    },
  ];
  await prisma.topic.deleteMany();
  await prisma.topic.createMany({
    data: topics.map((t, order) => ({
      ...t,
      order,
      image: `/uploads/topics/${t.slug}.jpg`,
    })),
  });
  console.log(`✓ Topics (${topics.length})`);
}

async function seedTeam() {
  const staff = [
    { name: "Redaktor Naczelny", role: "Redaktor Naczelny" },
    { name: "Sekretarz Redakcji", role: "Sekretarz Redakcji" },
    { name: "Dyrektor Artystyczny", role: "Dyrektor Artystyczny" },
    { name: "Redaktor Prowadzący", role: "Redaktor Prowadzący" },
  ];
  const contributors = [
    { name: "Stały Współpracownik 1", role: "Publicysta" },
    { name: "Stały Współpracownik 2", role: "Reporter" },
    { name: "Stały Współpracownik 3", role: "Fotograf" },
    { name: "Stały Współpracownik 4", role: "Felietonista" },
  ];

  await prisma.teamMember.deleteMany();
  await prisma.teamMember.createMany({
    data: [
      ...staff.map((m, order) => ({ ...m, group: TeamGroup.STAFF, order })),
      ...contributors.map((m, order) => ({ ...m, group: TeamGroup.CONTRIBUTOR, order })),
    ],
  });
  console.log(`✓ Team (${staff.length + contributors.length})`);
}

async function seedPages() {
  const magazineBody = {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text:
              '"ŻEGLARSTWO" to dwumiesięcznik lifestylowy skierowany do wszystkich miłośników żagli — ' +
              "od regatowców po pasjonatów morskich podróży, od konstruktorów po zwykłych marzycieli. " +
              "Łączymy reportaż, wywiad, poradnik i felieton w jeden spójny, elegancki magazyn.",
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "Misja" }],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text:
              "Pokazywać żeglarstwo takim, jakim jest naprawdę — wymagającym, nieprzewidywalnym, " +
              "a jednocześnie pięknym i formującym charakter. Dzielić wiedzę, inspirować do wypraw, ostrzegać przed zagrożeniami.",
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "Wizja" }],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text:
              "Być pismem, po które sięga się z przyjemnością — w domu, w porcie, w długą zimową noc. " +
              "Tworzyć społeczność wokół wartości, które niesie morze: odwagi, odpowiedzialności i wzajemnego wsparcia.",
          },
        ],
      },
    ],
  };

  await prisma.pageContent.upsert({
    where: { slug: "magazine" },
    update: { contentJson: JSON.stringify(magazineBody) },
    create: {
      slug: "magazine",
      title: "MAGAZYN",
      contentJson: JSON.stringify(magazineBody),
    },
  });
  console.log("✓ PageContent: magazine");
}

async function seedCurrentIssue() {
  await prisma.issue.deleteMany();
  await prisma.issue.create({
    data: {
      label: "9-10/2025",
      number: 18,
      year: 2025,
      coverImage: "/uploads/issues/placeholder-cover.jpg",
      shopUrl: "https://sklep.3oceans.pl",
      isCurrent: true,
      publishedAt: new Date("2025-09-01"),
    },
  });
  console.log("✓ Issue: 9-10/2025 (current)");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
