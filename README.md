# ⚡️ SPRINT 7: Using react for building a movies webpage

This project is a modern web application to explore popular movies, actors, and cinema content, built with React and powered by The Movie Database (TMDB) API.

## 🎯 Objectives:

- Build a scalable React app with feature-based architecture.
- Add authentication and protected routes using Firebase.
- Fetch dynamic movie and actor data from the TMDB API.
- Use custom hooks and React Router for smooth navigation.

## 💻 Technology Stack:

- **React** 
- **TypeScript** 
- **Vite** 
- **Firebase** 
- **TMDB API** 
- **Tailwind CSS** 

## 📋 Files:

```
src/
├── test/ 
├── features/           
│   ├── auth/          
│   ├── movies/        
│   ├── actors/        
│   └── home/          
├── shared/            
│   ├── components/    
│   ├── ui/            
│   └── hooks/         
├── config/            
│   ├── appData.ts     
│   ├── firebase.ts    
│   └── types.ts       
└── routes/           
```
## 🛠 Installation:

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/claudiabcn/sprint7-reactStarWars
    ```

2.  **Install Dependencies:**

    ```bash
    cd sprint7-reactStarWars
    npm install
    ```

3. **Environment Variables:**
   
    Create a `.env` file in the root directory:
   
    ```
    VITE_TMDB_TOKEN=your_tmdb_api_token_here
    VITE_FIREBASE_API_KEY=your_firebase_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_sender_id
    VITE_FIREBASE_APP_ID=your_firebase_app_id
    ```
    Get your API keys:
    ```
    - TMDB API: [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
    - Firebase: [https://console.firebase.google.com/](https://console.firebase.google.com/)
    ```

4. **Run Development Server:**
   ```npm run dev```
   
    The app will be available at `http://localhost:5173`

6.  **Testing:** 

Install Test Dependencies: `npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom`

Run the test: `npm test`

## 📸 Demo:

https://sprint7-movies.vercel.app/

<img width="1649" height="884" alt="Demo" src="https://github.com/user-attachments/assets/2c8b30d8-8377-43d0-8018-0f659979e6eb" />


## ⭐ Learnings and challenges:

This sprint significantly improved my understanding of how real-world React applications are structured. I learned to separate concerns using custom hooks for reusable logic, manage authentication and protected routes effectively, and handle dynamic and nested routing with React Router. Implementing infinite scroll deepened my knowledge of pagination, performance, and state management, while integrating TypeScript across the project improved code reliability and reinforced strong typing practices.

## ⭐ Gherkin testing:

Feature: Autenticación y acceso a rutas protegidas

    Given el usuario NO está logueado
    When intenta navegar a "/movies/1"
    Then es redirigido a "/login"

    Given el usuario SÍ está logueado
    When intenta navegar a "/movies/1"
    Then ProtectedRoute permite el acceso y se renderiza movieDetailPage

    Given el usuario está en la página de login
    When envía el formulario con credenciales válidas
    Then AuthContext guarda el user y es redirigido a "/movies"

    Given el usuario está en la página de login
    When envía el formulario con credenciales inválidas
    Then AuthContext no guarda ningún user y permanece en "/login"

    Given el usuario SÍ está logueado
    When clica en cerrar sesión, hace log out
    Then el user en AuthContext pasa a null

    Given cualquier usuario (logueado o no) 
    When navega a una ruta que no existe como "/ruta-inventada" 
    Then es redirigido a la home "/"

