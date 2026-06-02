## Getting Started

Create a .env file with the content:

```env
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/mydb?schema=public"

BETTER_AUTH_SECRET="CHANGE_WITH_YOUR_SECRET"
BETTER_AUTH_URL="http://localhost:3000" # Base URL of your app

NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

Start up the database:

```bash
docker compose up
```

Migrate prisma:

```bash
npx prisma migrate dev --name init
```

Generate prisma:

```bash
npx prisma generate
```

Run the application:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
