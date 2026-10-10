# Magazyn ŻEGLARSTWO

Strona i panel administracyjny dla dwumiesięcznika żeglarskiego **ŻEGLARSTWO**. Strona publiczna pokazuje bieżący numer, archiwum, działy tematyczne, zespół i dane kontaktowe wydawcy. Redakcja zarządza treścią w panelu `/admin`.

## Stack

- Next.js 16.2 (App Router), React 19.2, TypeScript
- Prisma 7 z SQLite przez `@prisma/adapter-better-sqlite3`
- Auth.js (next-auth 5 beta): logowanie e-mail i hasło (provider Credentials), hasła hashowane przez bcryptjs
- TipTap (edytor treści strony Magazyn), DOMPurify (sanityzacja HTML z edytora), Tailwind CSS 4, Zod

## Funkcje

### Strona publiczna (`/`)
Sekcje z `app/(public)/sections/`:
- **Hero** - ekran startowy
- **Magazyn** - treść strony `magazine` z tabeli `PageContent`
- **Kiosk** - bieżący numer (`Issue` z `isCurrent`) i archiwum (do 6 poprzednich numerów)
- **Tematyka** - działy (`Topic`) w kolejności ustawionej w panelu
- **Zespół** - redakcja i stali współpracownicy (`TeamMember`)
- **Kontakt** - dane wydawcy, dystrybutorzy i media społecznościowe (`SiteSettings`, `Distributor`)

### Panel administratora (`/admin`)
- **Pulpit** - strona startowa panelu
- **Numery** - dodawanie, edycja i usuwanie numerów; wskazanie numeru bieżącego; okładki
- **Strony** - edycja treści strony Magazyn w edytorze TipTap
- **Tematyka** - edycja działów i zmiana kolejności
- **Zespół** - dodawanie, edycja i usuwanie członków zespołu, zdjęcia
- **Ustawienia** - dane wydawcy, dystrybutorzy i linki

Logowanie odbywa się na `/admin/login`. Ścieżki `/admin/*` (poza logowaniem) chroni `proxy.ts`. Uploady (`/api/upload`) wymagają sesji i akceptują JPEG, PNG, WebP i AVIF do 8 MB.

## Struktura

```
app/
  (public)/       strona główna i jej sekcje
  admin/          panel administratora i logowanie
  api/            Auth.js (NextAuth) i upload plików
  fonts/          lokalne czcionki (Gloock, Italiana, Work Sans)
components/       nawigacja, stopka, formularze panelu, edytor TipTap
lib/              auth.ts, prisma.ts, upload.ts
prisma/           schema.prisma, migracje, seed.ts
proxy.ts          ochrona /admin (w Next.js 16 odpowiednik middleware.ts)
```

## Wymagania

- Node.js 20.9 lub nowszy (wymóg Next.js 16)

## Uruchomienie lokalne

```bash
npm install
cp .env.example .env        # uzupełnij AUTH_SECRET i dane administratora
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

Strona będzie dostępna pod `http://localhost:3000`, panel pod `http://localhost:3000/admin/login`. Logowanie używa `ADMIN_EMAIL` i `ADMIN_PASSWORD` z `.env`, zapisanych przez seed.

> **TODO:** `db:generate` i `db:migrate` nie działają z obecnym `package.json`. Pakiet `prisma` (CLI) jest w wersji 6.19.3, a klient i `prisma.config.ts` są w wersji 7. Wymaga to ujednolicenia wersji (zmiana wersji głównej, osobne zadanie).

## Zmienne środowiskowe

Lista zgodna z `.env.example`:

| Zmienna | Opis |
|---|---|
| `DATABASE_URL` | ścieżka do pliku SQLite, domyślnie `file:./dev.db` |
| `AUTH_SECRET` | sekret Auth.js, np. z `openssl rand -base64 32` |
| `AUTH_TRUST_HOST` | `true` - Auth.js ufa nagłówkowi `Host` |
| `ADMIN_EMAIL` | e-mail konta administratora tworzonego przez seed |
| `ADMIN_PASSWORD` | hasło konta administratora tworzonego przez seed |

## Skrypty npm

| Skrypt | Działanie |
|---|---|
| `npm run dev` | serwer deweloperski |
| `npm run build` | build produkcyjny |
| `npm run start` | uruchomienie zbudowanej aplikacji |
| `npm run lint` | lint (`next lint`) |
| `npm run db:generate` | generowanie klienta Prisma |
| `npm run db:migrate` | migracje Prisma (`migrate dev`) |
| `npm run db:seed` | dane startowe i konto administratora (`tsx prisma/seed.ts`) |
| `npm run db:reset` | reset bazy (`migrate reset`) |

## TODO

- **Dane kontaktowe:** seed zawiera placeholdery adresu, telefonu i e-maila. Uzupełnij je w panelu (Ustawienia).
- **Seed i grafiki:** seed odwołuje się do plików w `/uploads/` (np. `placeholder-cover.jpg`, grafiki działów), których nie ma w repozytorium. Katalog `public/uploads/` jest ignorowany, więc po seedzie część grafik będzie brakować.
- **Prisma CLI:** patrz uwaga w sekcji uruchomienia.
