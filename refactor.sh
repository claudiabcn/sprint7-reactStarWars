#!/bin/bash

echo "🚀 Iniciando refactorización..."

# Crear estructura de carpetas
echo "📁 Creando carpetas..."
mkdir -p src/features/auth/{components,context,guards,pages,services}
mkdir -p src/features/movies/{components,hooks,pages,services}
mkdir -p src/features/home/pages
mkdir -p src/shared/{components,hooks,ui}

# Mover archivos AUTH
echo "🔐 Moviendo archivos de autenticación..."
mv src/context/AuthContext.tsx src/features/auth/context/ 2>/dev/null
mv src/guards/ProtectedRoute.tsx src/features/auth/guards/ 2>/dev/null
mv src/pages/loginPage.tsx src/features/auth/pages/ 2>/dev/null
mv src/pages/registerPage.tsx src/features/auth/pages/ 2>/dev/null
mv src/services/authService.ts src/features/auth/services/ 2>/dev/null

# Mover archivos MOVIES
echo "🎬 Moviendo archivos de películas..."
mv src/components/moviesList.tsx src/features/movies/components/ 2>/dev/null
mv src/hooks/useMovies.ts src/features/movies/hooks/ 2>/dev/null
mv src/hooks/useMovieDetail.ts src/features/movies/hooks/ 2>/dev/null
mv src/pages/moviesContainerPage.tsx src/features/movies/pages/ 2>/dev/null
mv src/pages/movieDetailPage.tsx src/features/movies/pages/ 2>/dev/null
mv src/services/api.ts src/features/movies/services/ 2>/dev/null

# Mover HOME
echo "🏠 Moviendo página home..."
mv src/pages/homePage.tsx src/features/home/pages/ 2>/dev/null

# Mover SHARED
echo "🔄 Moviendo componentes compartidos..."
mv src/components/layout.tsx src/shared/components/ 2>/dev/null
mv src/components/navbar.tsx src/shared/components/ 2>/dev/null
mv src/hooks/useInfiniteScroll.ts src/shared/hooks/ 2>/dev/null
mv src/ui/Button.tsx src/shared/ui/ 2>/dev/null
mv src/ui/Card.tsx src/shared/ui/ 2>/dev/null
mv src/ui/LoadingSpinner.tsx src/shared/ui/ 2>/dev/null

# Eliminar carpetas vacías
echo "🗑️  Eliminando carpetas vacías..."
rmdir src/components 2>/dev/null
rmdir src/context 2>/dev/null
rmdir src/guards 2>/dev/null
rmdir src/hooks 2>/dev/null
rmdir src/pages 2>/dev/null
rmdir src/services 2>/dev/null
rmdir src/ui 2>/dev/null

echo "✅ Refactorización de estructura completada!"
echo ""
echo "⚠️  IMPORTANTE: Ahora debes actualizar los imports en todos los archivos."
echo "Usa el script update-imports.js para hacerlo automáticamente."