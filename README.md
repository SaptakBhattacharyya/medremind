# MedRemind: Personal Medicine & Health Log

**Full Stack Hackathon Project**
*Built with React, Node.js, MongoDB, OpenAI, and Pinecone (2-Day Solo Build).*

## Problem Statement
People often forget to take their medications on time and rarely keep track of their daily health habits. There is no simple, unified tool that allows individuals to manage their medicines, log daily health metrics, and get instant guidance for common health issues all in one place. 

MedRemind is a personal medicine and health log web application that lets users add and manage their medications, log daily health notes (mood, weight, blood pressure), view their health history with filtering and pagination, and interact with an AI-powered chatbot that suggests common medicines for everyday symptoms like fever, gastric issues, headache, and more, powered by RAG (Retrieval-Augmented Generation) and a vector database.

---

## Tech Stack

* **Frontend:** ReactJS + Tailwind CSS + React Router
* **Backend:** Node.js + Express.js
* **Database:** MongoDB (Mongoose)
* **Vector DB:** Pinecone (free tier)
* **Embeddings:** OpenAI text-embedding-ada-002
* **LLM:** OpenAI GPT-3.5-turbo
* **RAG Layer:** LangChain.js

---

## Mandatory Features Coverage

| Feature | Implementation in MedRemind |
| :--- | :--- |
| **Routing & Navigation** | Home, Login, Signup, Dashboard, Medicines, Health Log, Profile |
| **React Hooks** | `useState`, `useEffect`, `useRef`, `useContext` — all demonstrated |
| **State Management** | Context API for auth state + theme state |
| **Authentication** | Signup / Login with LocalStorage + Protected Routes |
| **Theme Support** | Dark / Light mode toggle, preference persisted |
| **Search, Filter, Sort** | Search by medicine name; filter by date/category; sort by time |
| **Pagination** | Medicine list + Health log history (backend limit/skip) |
| **CRUD Operations** | Create / Read / Update / Delete medicines & health logs |
| **API Integration** | REST APIs via Express; loading states; error handling |
| **Form Handling** | Controlled components, input validation, error messages |
| **Responsive UI** | Tailwind CSS—mobile, tablet, desktop layouts |
| **Error Handling** | Try-catch on all API calls; backend error responses |

---

## MongoDB Schema

* **Users:** `{_id, name, email, password, createdAt}`
* **Medicines:** `{_id, userId, name, dosage, frequency, category, startDate, endDate, notes, createdAt}`
* **HealthLogs:** `{_id, userId, date, mood, weight, bloodPressure, notes, createdAt}`

---

## API Routes

| Method | Endpoint | Purpose |
| :--- | :--- | :--- |
| **POST** | `/api/auth/signup` | Register user |
| **POST** | `/api/auth/login` | Login user |
| **GET** | `/api/medicines` | Get all medicines (search, filter, paginate) |
| **POST** | `/api/medicines` | Add medicine |
| **PUT** | `/api/medicines/:id` | Update medicine |
| **DELETE** | `/api/medicines/:id` | Delete medicine |
| **GET** | `/api/logs` | Get health logs (filter by date, paginate) |
| **POST** | `/api/logs` | Add health log |
| **PUT** | `/api/logs/:id` | Update health log |
| **DELETE** | `/api/logs/:id` | Delete health log |
| **POST** | `/api/chat` | RAG Chatbot: symptom to medicine suggestion |

---

## AI Chatbot with RAG + Vector Database

MedRemind integrates an AI-powered medical assistant chatbot that uses Retrieval-Augmented Generation (RAG) to suggest appropriate medicines for common everyday symptoms such as fever, gastric issues, headache, cold, and acidity. The chatbot does not rely on model memory alone; it retrieves accurate, structured knowledge from a curated medical knowledge base stored in a vector database.

### RAG Architecture Flow
1.  **User Input:** User types a symptom e.g., 'I have fever and body ache'.
2.  **Embedding:** Query is embedded using OpenAI text-embedding-ada-002.
3.  **Vector Search:** Pinecone finds top-3 most similar knowledge chunks.
4.  **Prompt Building:** Retrieved context + user query form the LLM prompt.
5.  **LLM Response:** GPT-3.5-turbo returns medicine name, dosage & precautions.
6.  **Chat UI:** Response shown in real-time chat bubble interface.

### RAG Components

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Vector Database** | Pinecone | Free tier, cloud-hosted, fast similarity search |
| **Embeddings** | OpenAI text-embedding-ada-002 | Converts text to 1536-dim vectors |
| **LLM** | GPT-3.5-turbo | Generates medicine suggestions from context |
| **RAG Framework** | LangChain.js | Orchestrates retrieval + prompt + LLM call |
| **Knowledge Base** | `.txt` files per condition | fever, gastric, headache, cold, acidity, etc. |

> **Knowledge Base Example (gastric.txt):**
> Condition: Gastric / Gas & Bloating Symptoms bloating, stomach pain, burping, flatulence, indigestion Common Medicines: Pantoprazole 40mg (before meals, once daily) Domperidone 10mg (after meals) Digene syrup (antacid, after meals) Precautions: Avoid spicy food, eat small meals. See a doctor if pain is severe or lasts more than 3 days.

---
