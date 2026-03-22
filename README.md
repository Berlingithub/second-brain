# Second Brain

A backend application to store and organize links, notes, and resources in one place — your personal “second brain”.

Instead of saving things across WhatsApp or scattered apps, this helps you keep everything structured, searchable, and shareable.

```

## Features

* 🔐 JWT-based authentication
* 📦 Save and manage content (links, docs, notes)
* 🏷️ Tag-based organization
* 🔗 Share your content via unique links

```

## Tech Stack

**Backend**

* Node.js
* Express
* MongoDB + Mongoose
* TypeScript
* JWT Authentication

**Frontend (planned)**

* React / Next.js
* Tailwind CSS

---

##  API Overview

* `POST /api/v1/signup` – Register
* `POST /api/v1/signin` – Login
* `POST /api/v1/content` – Add content
* `GET /api/v1/content` – Get user content
* `DELETE /api/v1/content` – Delete content
* `POST /api/v1/brain/share` – Generate/remove share link
* `GET /api/v1/brain/:shareLink` – Access shared content

---

## ⚙️ Setup

```bash
git clone https://github.com/your-username/second-brain.git
cd second-brain
npm install
npm run dev
```

Create a `.env` file:

```
MONGO_URL=your_mongodb_connection_string
JWT_PASSWORD=your_secret_key
```

---

##  Idea

A simple system to collect and revisit everything important — links, notes, and ideas — without losing them across different platforms.

---

##  Future Plans

* Frontend UI
* Search & filters
* Better tagging system
* Secure auth (bcrypt)

---
