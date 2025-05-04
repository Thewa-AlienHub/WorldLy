# 🌍 Worldly – Explore the World at a Glance

CountryLens is a modern React application that allows users to explore, search, and discover detailed information about countries around the globe. With features like user authentication, interactive maps, and a favorites list, CountryLens is your go-to app for quick country insights.

![CountryLens Screenshot](./screenshots/homepage.png)

---

## 🚀 Features

- 🔍 **Search for countries** by name (frontend filtering)
- 🌐 **Filter by region/language**
- 🗺️ **View details** including flag, capital, population, region, and languages
- 💖 **Favorites list** (accessible after login via Firebase Auth)
- 📱 **Responsive UI** with **Tailwind CSS**
- ⚡ **Fast performance** powered by **Vite**
- 🔐 **User login/register** via **Firebase**
- 🧭 **Client-side routing** with **React Router**

---

## 🛠️ Tech Stack

| Tool            | Usage                                |
|-----------------|---------------------------------------|
| React           | Frontend with Functional Components   |
| Tailwind CSS    | Styling                               |
| Vite            | Fast build tool for frontend          |
| Firebase        | Authentication                        |
| REST Countries API | Country data source               |
| React Router DOM| Routing                               |
| Git + GitHub    | Version Control                       |
| Vercel          | Deployment                            |

---

## 📂 Folder Structure

```
src/
├── components/
├── pages/
├── assets/
├── App.jsx
├── main.jsx
└── ...
```

---

## 🔧 Installation

> Before you begin, ensure you have **Node.js ≥ v16** and **npm** installed.

1. **Clone the repository**
   ```bash
   git clone [Repository Link ](https://github.com/Thewa-AlienHub/WorldLy)
   cd WorldLy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Email/Password Authentication
   - Replace the Firebase config inside `firebase.js` with your project credentials

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

---

## 🧪 Testing

- ✅ Manual testing on:
  - Desktop, Tablet, Mobile
  - Chrome, Firefox, Safari
- ✅ Optional: Add unit tests using **Jest** and **React Testing Library**

---

## 🌐 Routes & API Usage

| Route               | Description                                |
|--------------------|--------------------------------------------|
| `/`                | Welcome page                               |
| `/home`            | List of countries                          |
| `/country/:code`   | Country detail page                        |
| `/login`           | Firebase login                             |
| `/register`        | Firebase registration                      |
| `/about`           | About app info                             |
| `/favorites`       | Favorites list (protected)                 |
| `*`                | 404 - Not Found                            |

### 🔗 API: REST Countries

- All country data is fetched from:  
  [`https://restcountries.com/v3.1/all`](https://restcountries.com/v3.1/all)
- Example usage:
  ```js
  const response = await fetch('https://restcountries.com/v3.1/all');
  const countries = await response.json();
  ```

---

## 📦 Deployment

Deployed with **Vercel**  
🔗 [Live Demo](https://world-ly.vercel.app/)

To deploy:
```bash
npm run build
# then follow Vercel CLI or connect GitHub repo to Vercel UI
```

---

## 👨‍🎓 Author

**T.W.T. Damnidu**  
BSc (Hons) in Information Technology – Software Engineering || Software Enginner I (ArimacLanka PVT LTD) 

---

## 📜 License

> This project is for academic use only.  
> Do not distribute without permission.