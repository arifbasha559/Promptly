<h1 align="center">
<img src="./src/assets/brain-circuit.svg" height="30px" />
 Promptly
</h1>

<p align="center">
 A modern, minimal AI chat interface built with React + TailwindCSS.
</p>

<p align="center">
 <a href="https://promptly-alpha-eight.vercel.app/">
   <img src="https://img.shields.io/badge/Live%20Demo-Visit%20Now-1E90FF?logo=vercel&logoColor=white" alt="Live Demo Badge" />
 </a>
</p>

<p align="center">
 <img src="https://img.shields.io/badge/React.js-⚛️-61DAFB?logo=react&logoColor=white" />
 <img src="https://img.shields.io/badge/TailwindCSS-🌊-38BDF8?logo=tailwindcss&logoColor=white" />
 <img src="https://img.shields.io/badge/Vite-⚡-646CFF?logo=vite&logoColor=white" />
 <img src="https://img.shields.io/badge/License-MIT-green?logo=open-source-initiative" alt="License Badge" />
 <img src="https://img.shields.io/badge/Status-Active-success" alt="Project Status" />
 <img src="https://img.shields.io/badge/PRs-Welcome-orange?logo=github" alt="PRs Welcome" />
 <img src="https://img.shields.io/badge/AI%20Chatbot-🤖-purple" />
 <img src="https://img.shields.io/badge/React%20Icons-🎨-E34F26" />
 <img src="https://img.shields.io/badge/Syntax%20Highlighting-💡-blueviolet" />
 <img src="https://img.shields.io/badge/Smart%20Input-⌨️-teal" />
</p>

---

## 🌐 Live

👉 [**https://promptly-alpha-eight.vercel.app/**](https://promptly-alpha-eight.vercel.app/)

---

## 🚀 Features

✅ **Chat UI**

- Clean chat layout with user/AI message bubbles
- Auto-scroll to the latest message
- Markdown rendering for AI responses
- Code highlighting with copy-to-clipboard

✅ **Smart Input**

- Global focus on typing anywhere
- Send message on <kbd>Enter</kbd>, new line on <kbd>Shift+Enter</kbd>

✅ **AI Integration**

- Easily switch between multiple AI models
- Built-in fetch method for external APIs
- Extendable API layer for GeminiAI, PollinationsAI, etc.

✅ **Responsive & Dark UI**

- Styled with TailwindCSS
- Smooth layout for desktop and mobile

---

## 🛠️ Tech Stack

| Category               | Technology     |
| ---------------------- | -------------- |
| **Frontend**           | React + Vite   |
| **Styling**            | TailwindCSS    |
| **Icons**              | React Icons    |
| **Markdown Rendering** | React Markdown |

---

## ⚙️ Installation & Setup

```bash
# 1️⃣ Clone the repository
git clone https://github.com/arifbasha559/Promptly
cd promptly

# 2️⃣ Install dependencies
npm install

# 3️⃣ Run the development server
npm run dev
```

---

## 🔑 API Setup

You can plug in **any AI API** into the `fetchapi.js` file.
Example for **ContentAI**:

```js
export const fetchContentAIResponse = async (query) => {
  const res = await fetch(
    `https://api.contentai.cloud/v1/Text/blog-articles?category=${encodeURIComponent(
      query
    )}`,
    {
      headers: {
        accept: "application/json",
        "X-ContentAI-Key": "YOUR_API_KEY_HERE",
      },
    }
  );
  return await res.json();
};
```

> ⚠️ **Note:** Replace `YOUR_API_KEY_HERE` with your actual API key.

---

## 🧠 Future Improvements

- [ ] Add model-based response switching
- [ ] Add chat persistence (localStorage / DB)
- [ ] Add voice input and speech output
- [ ] Add typing animation for AI replies

---

## 🧑‍💻 Author

**Arif **
Developer & Tech Enthusiast

---

## 🪪 License

This project is open source under the **MIT License**.

---

## ✨ Quote I Live By

> “First, solve the problem. Then, write the code.” – John Johnson

---

<p align="center">Built with ❤️ by <b>Arif</b></p>

---
