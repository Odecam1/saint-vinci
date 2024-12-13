This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## configuration

The database contains a `users` collection with user information.

```json
{
  "_id": "675991550a1c028bae2cb375",
  "firstName": "directeur",
  "lastName": "admin",
  "email": "directeur.admin@example.com",
  "passwordHash": "$2a$10$evcZfmimtTwfuudTRkYrTe/d0LLky/52RshUvdXNP4/lScQCGTSR.",
  "role": "directrice"
},
{
    "_id": "675b779c806ac10528cd83c0",
  "firstName": "nathalie",
  "lastName": "LEMAIRE",
  "email": "nathalie.lemaire@example.com",
  "passwordHash": "$2a$10$yc2Qje4hYPbAwC3EhZXwmOeeqXBaAXdd87GwJ6jXk5ClhPP3C7BXG",
  "role": "maire"
},
{
  "_id": "675b85c9806ac10528cd83c2",
  "firstName": "Jean",
  "lastName": "Paul",
  "email": "jean.paul@example.com",
  "passwordHash": "$2a$10$XH/EqfV/6aSOtLabR/p1CODNx6w9tVDeE0f8ivar/90xvRBMGhIQq",
  "role": "professeur"
}
```

### Password

For this project, all users have the same password. The password for all users is: "123Azertyuiop."

Please note that this password is hashed using bcrypt before being stored in the database, as seen in the passwordHash field.

### Roles

The users in this project have specific roles:

- **Director**: This role represents the highest level of access within the system. Users with this role have full permissions to manage and oversee the system.

- **Mayor**: This role has access to certain functionalities, but with lower permissions compared to the director role. Mayors can manage certain aspects of the system but cannot perform actions reserved for directors.

- **Teacher**: This role is for users who can manage students, classes, and their data. Teachers have permissions to interact with the system related to education but do not have access to administrative tasks like directors or mayors.
