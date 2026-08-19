# Innovation Conferences — MERN Stack Platform

A full-stack academic conference management platform. The original React + Vite +
Tailwind frontend has been preserved (design, animations, layout, routing) and is
now connected to a real Node.js / Express / MongoDB backend with an admin panel.

---

## 1. Features

- Public site: Home, Conferences (upcoming/previous), Conference Details, Associate
  Your Conference (evaluation submission), Contact Us — all backed by live data.
- Admin panel (`/admin`): dashboard stats, full conference CRUD with image upload,
  important dates and Scopus/publication row builders, evaluation management,
  contact enquiry management, JWT authentication via httpOnly cookie.
- REST API with public + protected (admin) routes, validation, rate limiting,
  file uploads, and a consistent JSON response shape.
- Seed script that populates the database with the original static conference data.

## 2. Technology Stack

**Frontend:** React 19, Vite, Tailwind CSS, React Router DOM, Framer Motion, lucide-react
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, Multer, express-validator,
Helmet, express-rate-limit, express-mongo-sanitize

## 3. Folder Structure

```
innovation-conference/
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/     # Shared + admin components
│   │   ├── pages/          # Public pages + pages/admin
│   │   ├── services/       # API layer (api.js, authService.js, ...)
│   │   ├── context/        # AuthContext
│   │   ├── hooks/          # useFetch
│   │   └── assets/
│   ├── .env.example
│   └── package.json
├── server/                 # Express backend
│   ├── config/              # db.js, env.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/             # conferences/, evaluations/ (created at runtime)
│   ├── seed/
│   ├── utils/
│   ├── .env.example
│   └── server.js
├── package.json             # root scripts (install-all, dev, seed, build)
└── README.md
```

## 4. Prerequisites

- Node.js 18+
- A MongoDB instance — either local (`mongod`) or a free MongoDB Atlas cluster

## 5. Installation

```bash
npm install          # installs root devDependency (concurrently)
npm run install-all  # installs server and client dependencies
```

## 6. Environment Variables

Copy the example files and fill in real values:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

**server/.env**

| Variable | Description |
|---|---|
| `PORT` | Port the API listens on (default 5000) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Long random secret used to sign JWTs |
| `JWT_EXPIRES_IN` | Token lifetime (e.g. `1d`) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` | Used only by the seed script to create the admin account |
| `CLIENT_URL` | Exact origin of the running frontend, used for CORS |
| `COOKIE_NAME` / `COOKIE_SECURE` | Auth cookie name and whether to mark it `Secure` (true in production over HTTPS) |
| `MAX_IMAGE_SIZE_MB` / `MAX_DOCUMENT_SIZE_MB` | Upload size limits |

**client/.env**

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | e.g. `http://localhost:5000/api` |
| `VITE_SERVER_URL` | e.g. `http://localhost:5000` (used to resolve uploaded file URLs) |

The app fails loudly (not silently) if required variables are missing — the
server refuses to start and logs exactly which variables to set.

## 7. MongoDB Setup

**Local:** install MongoDB Community Edition and run `mongod`. The default
`MONGODB_URI` in `.env.example` (`mongodb://127.0.0.1:27017/innovation_conference`)
will work as-is.

**Atlas:** create a free cluster at mongodb.com/atlas, create a database user,
allow your IP (or `0.0.0.0/0` for development), and copy the connection string
into `MONGODB_URI` in `server/.env`.

## 8. Seed the Database

```bash
npm run seed
```

This creates the 8 conferences that used to be hardcoded in the frontend
(with their Scopus/publication proceedings embedded), plus the default admin
account. The script is idempotent — conferences are matched/updated by
acronym and the admin account is only created if it doesn't already exist, so
running it twice will not create duplicates.

## 9. Development

```bash
npm run dev
```

Runs the API on `http://localhost:5000` and the frontend on
`http://localhost:5173` concurrently.

## 10. Production Build

```bash
npm run build      # builds the client into client/dist
npm start          # starts the API (serve client/dist separately, e.g. via Vercel)
```

## 11. Default Admin Login

```
Email:    admin@innovationconference.com
Password: Admin@123
```

⚠️ **Change these values** (`ADMIN_EMAIL` / `ADMIN_PASSWORD` in `server/.env`)
before deploying to production, then re-run the seed script (or update the
admin record directly) to create the production account.

## 12. API Endpoints

All responses follow `{ success, message, data }` (or `{ success: false, message, errors }`).

### Public

| Method | Path | Description |
|---|---|---|
| GET | `/api/health` | Server + DB health check |
| GET | `/api/conferences` | List active conferences (`status`, `featured`, `search`, `page`, `limit`, `sort`) |
| GET | `/api/conferences/upcoming` | Upcoming conferences, nearest first |
| GET | `/api/conferences/previous` | Previous conferences, most recent first |
| GET | `/api/conferences/:identifier` | Fetch by slug or MongoDB ID |
| POST | `/api/evaluations` | Submit a conference for evaluation (multipart, optional `document`) |
| POST | `/api/contact-enquiries` | Submit a contact enquiry |
| POST | `/api/auth/login` | Admin login (sets httpOnly cookie) |
| GET | `/api/auth/me` | Current admin session (requires auth) |
| POST | `/api/auth/logout` | Clears the session cookie |

### Admin (require the auth cookie / `Authorization: Bearer <token>`)

| Method | Path |
|---|---|
| GET / POST | `/api/admin/conferences` |
| GET / PUT / DELETE | `/api/admin/conferences/:id` |
| GET | `/api/admin/evaluations` |
| GET / PATCH / DELETE | `/api/admin/evaluations/:id` |
| PATCH | `/api/admin/evaluations/:id/status` |
| GET | `/api/admin/contact-enquiries` |
| GET / PATCH / DELETE | `/api/admin/contact-enquiries/:id` |
| PATCH | `/api/admin/contact-enquiries/:id/status` |
| GET | `/api/admin/dashboard/summary` |

## 13. Image / File Uploads

- Conference covers: `server/uploads/conferences/` — jpg, jpeg, png, webp — max `MAX_IMAGE_SIZE_MB` (default 5MB)
- Evaluation proposals: `server/uploads/evaluations/` — pdf, doc, docx — max `MAX_DOCUMENT_SIZE_MB` (default 20MB)
- Filenames are never trusted — the server generates a random, collision-safe
  filename and only preserves the (validated) extension. Files are served
  statically at `/uploads/...` and replaced files are deleted from disk.
- **Production note:** Render/Railway free tiers and Vercel serverless functions
  have ephemeral or read-only filesystems — uploaded files will not persist
  across deploys/restarts. For production, swap the local Multer disk storage
  for **Cloudinary** (or S3). The upload middleware (`server/middleware/upload.js`)
  is isolated specifically so this swap only touches one file. Add
  `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` to
  `server/.env` when you do.

## 14. Deployment

### Database — MongoDB Atlas
1. Create a free cluster, a database user, and allow network access.
2. Copy the connection string into your backend host's `MONGODB_URI`.

### Backend — Render or Railway
1. Create a new Web Service pointing at `server/`.
2. Build command: `npm install`. Start command: `npm start`.
3. Set all variables from `server/.env.example` (with production values —
   long random `JWT_SECRET`, real `MONGODB_URI`, `NODE_ENV=production`,
   `COOKIE_SECURE=true`, and `CLIENT_URL` set to your deployed frontend origin).
4. Run `npm run seed` once (via a one-off/shell command on the host) to create
   the admin account and initial conferences.

### Frontend — Vercel
1. Import the `client/` folder as the project root.
2. Framework preset: Vite. Build command: `npm run build`. Output: `dist`.
3. Set `VITE_API_BASE_URL` and `VITE_SERVER_URL` to your deployed backend URL.
4. `client/vercel.json` already includes the SPA rewrite so client-side routes
   (like `/conferences/:slug`) work on refresh.

### CORS
Make sure `CLIENT_URL` on the backend exactly matches your deployed frontend
origin (protocol + domain, no trailing slash). Multiple origins can be
comma-separated.

## 15. Troubleshooting

| Symptom | Likely cause |
|---|---|
| Server exits immediately with a `[FATAL]` message | A required `.env` variable is missing — check `server/.env` against `.env.example` |
| `Not allowed by CORS` in the browser console | `CLIENT_URL` on the server doesn't match the frontend's origin exactly |
| Images/documents 404 | `VITE_SERVER_URL` isn't set, or the backend isn't serving `/uploads` (check the server is running and reachable) |
| Login works locally but not in production | `COOKIE_SECURE` should be `true` in production (HTTPS) and both apps must be on HTTPS for the cookie to be sent |
| Upload disappears after a Render/Railway redeploy | Expected on ephemeral filesystems — see the Cloudinary note above |

## 16. Notes on Testing

This project was built and verified in a sandboxed environment without
network access to a live MongoDB instance, so live database round-trips
(seed → login → CRUD) were not exercised end-to-end here. What **was**
verified:

- `npm run install-all` completes without errors
- All backend modules load without syntax errors (`node -e "require(...)"` over every file)
- `npm run build` (client) completes successfully with no errors
- `npm run lint` (client) reports 0 errors (a handful of pre-existing unused-import
  warnings from the original frontend remain and don't affect functionality)

Before going live, run through this checklist against a real MongoDB instance:

- [ ] `npm run seed` creates 8 conferences + 1 admin account
- [ ] Admin login succeeds with seeded credentials; invalid login returns 401
- [ ] `/api/admin/*` routes return 401 without a session
- [ ] Conference create/edit/delete + image upload work end-to-end
- [ ] Home and Conferences pages show the seeded conferences
- [ ] Conference details page loads by slug, shows Scopus rows and important dates
- [ ] Associate Us form submission appears in the admin Evaluations table
- [ ] Contact form submission appears in the admin Contact Enquiries table
- [ ] Status updates on evaluations/enquiries persist after refresh
