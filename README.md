# Ticket Frontend (Next.js)

Frontend สำหรับระบบ Tickets (CRUD + Queue Monitor)
ใช้ **Next.js 15 (App Router)** + **React 19** + **Tailwind CSS v4** + **React Query** + **React Hook Form + Zod**

---

## Features

-   ✅ หน้า `/tickets`
    -   แสดงรายการ tickets
    -   Filter (status, priority)
    -   Search, Sort, Pagination
    -   Loading skeleton, Empty state, Error state
-   ✅ หน้า `/tickets/create`
    -   ฟอร์มสร้าง Ticket (title, description, priority)
    -   Client-side validation (Zod + React Hook Form)
    -   แสดงผลลัพธ์สำเร็จ/ล้มเหลว
-   ✅ หน้า `/tickets/[id]`
    -   แสดงรายละเอียด Ticket
    -   อัปเดตสถานะ (OPEN / IN_PROGRESS / RESOLVED)
    -   แก้ไข/ลบ Ticket ได้

---

## Installation

```sh
# เข้าโฟลเดอร์ frontend
cd frontend

# ติดตั้ง dependencies
npm install
```

# รันโหมด dev

npm run dev

# env ต้องมี

NEXT_PUBLIC_API_URL=http://localhost:3000

📂 Project Structure

```
frontend/
├─ app/
│ ├─ layout.js # Layout หลัก
│ ├─ globals.css # Global styles (Tailwind)
│ ├─ tickets/
│ │ ├─ page.js # หน้า list tickets
│ │ ├─ create/page.js # หน้า create ticket
│ │ └─ [id]/page.js # หน้า ticket detail
├─ components/ # UI components (Filters, Table, Pagination, Skeletons)
├─ lib/ # api client, utils
└─ README.md
```
