const fs = require('fs');
const path = require('path');

// Mapa de rutas antiguas a nuevas
const importMap = {
  // Auth
  '../context/AuthContext': '../../features/auth/context/AuthContext',
  './context/AuthContext': '../features/auth/context/AuthContext',
  '../guards/ProtectedRoute': '../../features/auth/guards/ProtectedRoute',
  './guards/ProtectedRoute': '../features/auth/guards/ProtectedRoute',
  '../services/authService': '../../features/auth/services/authService',
  './services/authService': '../features/auth/services/authService',
  '../pages/loginPage': '../../features/auth/pages/loginPage',
  '../pages/registerPage': '../../features/auth/pages/registerPage',
  
  // Movies
  '../components/moviesList': '../../features/movies/components/moviesList',
  './components/moviesList': '../features/movies/components/moviesList',
  '../hooks/useMovies': '../../features/movies/hooks/useMovies',
  './hooks/useMovies': '../features/movies/hooks/useMovies',
  '../hooks/useMovieDetail': '../../features/movies/hooks/useMovieDetail',
  './hooks/useMovieDetail': '../features/movies/hooks/useMovieDetail',
  '../services/api': '../../features/movies/services/api',
  './services/api': '../features/movies/services/api',
  '../pages/moviesContainerPage': '../../features/movies/pages/moviesContainerPage',
  '../pages/movieDetailPage': '../../features/movies/pages/movieDetailPage',
  
  // Home
  '../pages/homePage': '../../features/home/pages/homePage',
  './pages/homePage': '../features/home/pages/homePage',
  
  // Shared
  '../components/layout': '../../shared/components/layout',
  './components/layout': '../shared/components/layout',
  '../components/navbar': '../../shared/components/navbar',
  './components/navbar': '../shared/components/navbar',
  '../hooks/useInfiniteScroll': '../../shared/hooks/useInfiniteScroll',
  './hooks/useInfiniteScroll': '../shared/hooks/useInfiniteScroll',
  '../ui/Button': '../../shared/ui/Button',
  './ui/Button': '../shared/ui/Button',
  '../ui/Card': '../../shared/ui/Card',
  './ui/Card': '../shared/ui/Card',
  '../ui/LoadingSpinner': '../../shared/ui/LoadingSpinner',
  './ui/LoadingSpinner': '../shared/ui/LoadingSpinner',
};

function updateImportsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;

  for (const [oldPath, newPath] of Object.entries(importMap)) {
    const regex = new RegExp(`from ["']${oldPath.replace(/\//g, '\\/')}["']`, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, `from "${newPath}"`);
      updated = true;
    }
  }

  if (updated) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Actualizado: ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      updateImportsInFile(filePath);
    }
  });
}

console.log('🔄 Actualizando imports...\n');
walkDir('./src');
console.log('\n✅ Imports actualizados!');