# Real-time Chat App with Push Notifications

**Timeline:** Weeks 1-2  
**Category:** Base skills  
**Estimated effort:** ~68 hours across 16 tickets

## What you are building

A WhatsApp-style chat app with 1:1 and group rooms, live presence, read receipts and push notifications for offline users.

## Tech stack

React + Vite + TypeScript, Redux Toolkit, Tailwind, Node.js, Express, MongoDB (Mongoose), Socket.IO, Firebase Cloud Messaging, Zod, Vitest/Jest

## Key features

- JWT auth with refresh tokens in httpOnly cookies
- 1:1 and group conversations
- Typing indicator, online presence, read receipts
- FCM push when the recipient is offline
- Paginated message history with infinite scroll
- Rate limiting and input validation
- Basic CI on every pull request

## Skills this proves to recruiters

React, Redux Toolkit, Node/Express, MongoDB, Socket.IO, FCM, auth, TypeScript

## Order of work (the flow)

Work top to bottom. A ticket should only start once everything in its _Depends on_ column is done. Tickets with the same dependencies can be done in either order.

| Step | ID      | Ticket                                                                         | Milestone          | Depends on       | Hours |
| ---- | ------- | ------------------------------------------------------------------------------ | ------------------ | ---------------- | ----- |
| 1    | CHAT-01 | Repo setup: monorepo (client/server), TS, ESLint, Prettier, Husky              | M1 Setup           | -                | 3     |
| 2    | CHAT-02 | Express + MongoDB setup: health route, error middleware, Zod validation        | M1 Setup           | CHAT-01          | 3     |
| 3    | CHAT-03 | React scaffold: Vite + TS, Tailwind, Redux Toolkit store, routing              | M1 Setup           | CHAT-01          | 4     |
| 4    | CHAT-04 | Auth API: register, login, refresh, logout (bcrypt + JWT)                      | M2 Auth            | CHAT-02          | 5     |
| 5    | CHAT-05 | Auth UI: login/register forms, refresh interceptor, protected routes           | M2 Auth            | CHAT-03, CHAT-04 | 4     |
| 6    | CHAT-06 | Data models + REST: user search, conversations, paginated messages             | M3 Chat core       | CHAT-04          | 5     |
| 7    | CHAT-07 | Socket.IO server: authenticated handshake, rooms, send/receive with ack        | M3 Chat core       | CHAT-06          | 5     |
| 8    | CHAT-08 | Chat UI: conversation list, message thread, infinite scroll, optimistic send   | M3 Chat core       | CHAT-05, CHAT-07 | 6     |
| 9    | CHAT-09 | Start conversation UI: user search, new 1:1 chat, empty and loading states     | M3 Chat core       | CHAT-06, CHAT-08 | 4     |
| 10   | CHAT-10 | Typing indicators, online presence, read receipts                              | M4 Realtime extras | CHAT-08          | 5     |
| 11   | CHAT-11 | Group chats: create, add/remove members, admin role                            | M4 Realtime extras | CHAT-08, CHAT-09 | 5     |
| 12   | CHAT-12 | FCM push notifications for offline users (service worker, token storage)       | M4 Realtime extras | CHAT-08          | 5     |
| 13   | CHAT-13 | Security hardening: rate limit, helmet, CORS, sanitization, reconnect handling | M5 Ship            | CHAT-10          | 4     |
| 14   | CHAT-14 | Tests: unit tests for auth service and socket handlers                         | M5 Ship            | CHAT-13          | 4     |
| 15   | CHAT-15 | CI: GitHub Actions for lint, type-check and tests on every PR                  | M5 Ship            | CHAT-14          | 2     |
| 16   | CHAT-16 | Deploy (Render/Railway + Vercel), demo GIF, README with architecture diagram   | M5 Ship            | CHAT-14, CHAT-15 | 4     |

## Feature coverage check

Every feature above maps to at least one ticket. If you add a feature, add a ticket for it.

| Feature                                          | Delivered by              |
| ------------------------------------------------ | ------------------------- |
| JWT auth with refresh tokens in httpOnly cookies | CHAT-04, CHAT-05          |
| 1:1 and group conversations                      | CHAT-06, CHAT-09, CHAT-11 |
| Typing indicator, online presence, read receipts | CHAT-10                   |
| FCM push when the recipient is offline           | CHAT-12                   |
| Paginated message history with infinite scroll   | CHAT-06, CHAT-08          |
| Rate limiting and input validation               | CHAT-02, CHAT-13          |
| Basic CI on every pull request                   | CHAT-15                   |

## Resources

Links are from memory and were not all opened individually, so tell me if one is dead.

| Resource                                                                                                              | Use it for                                            |
| --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| [Socket.IO v4 docs](https://socket.io/docs/v4/)                                                                       | rooms, acknowledgements, auth handshake, reconnection |
| [Firebase Cloud Messaging for web](https://firebase.google.com/docs/cloud-messaging/js/client)                        | service worker, tokens, receiving messages            |
| [Redux Toolkit](https://redux-toolkit.js.org)                                                                         | store setup, slices, typed hooks                      |
| [Mongoose docs](https://mongoosejs.com/docs/)                                                                         | schemas, indexes, pagination queries                  |
| [Zod](https://zod.dev)                                                                                                | request validation                                    |
| [Express docs](https://expressjs.com)                                                                                 | middleware and error handling                         |
| [OWASP Node.js security cheat sheet](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html) | hardening checklist                                   |
| [Vitest](https://vitest.dev)                                                                                          | unit tests                                            |
| [Render docs](https://render.com/docs)                                                                                | deploy the API                                        |
| [Vercel docs](https://vercel.com/docs)                                                                                | deploy the client                                     |

## Milestones

- M1 Setup: CHAT-01, CHAT-02, CHAT-03
- M2 Auth: CHAT-04, CHAT-05
- M3 Chat core: CHAT-06, CHAT-07, CHAT-08, CHAT-09
- M4 Realtime extras: CHAT-10, CHAT-11, CHAT-12
- M5 Ship: CHAT-13, CHAT-14, CHAT-15, CHAT-16

## Definition of done for the whole project

- All tickets closed and acceptance criteria ticked
- Live URL and demo GIF in the README
- README has: features, tech stack, architecture diagram, run-locally steps, what you would do next
- Repo pinned on your GitHub profile
- One resume bullet written with a number (users, speed-up, coverage, score)

## GitHub Projects board setup (2 minutes)

1. Create a new Project (Board layout) named after this project.
2. Columns: Backlog, Ready, In progress, In review, Done.
3. Add a **Milestone** field view (grouped by milestone) and a Table view sorted by issue number.
4. Run `create_issues.py` (see the top-level README) to create all issues and add them to the board.
5. Move only the next unblocked ticket into Ready. Limit In progress to 1-2 tickets.
