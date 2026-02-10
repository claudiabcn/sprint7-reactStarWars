import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { vi } from 'vitest'
import ProtectedRoute from '../features/auth/guards/ProtectedRoute'
import { useAuth } from '../features/auth/context/AuthContext'

vi.mock('../features/auth/context/AuthContext', () => ({
    useAuth: vi.fn(),
}))

const MoviePage = (): React.ReactElement => <div>Movie Detail</div>
const LoginPage = (): React.ReactElement => <div>Login Page</div>


function renderWithRouter(initialPath: string) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/movies/:id"
          element={
            <ProtectedRoute>
              <MoviePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </MemoryRouter>
  )
}

describe('ProtectedRoute - Autenticación y acceso a rutas protegidas', () => {
  it('redirige a /login si el usuario NO está logueado', () => {

    vi.mocked(useAuth).mockReturnValue({
      user: null,
      loading: false,
      login: vi.fn(),
      logout: vi.fn(),
      register: vi.fn(),
      loginGoogle: vi.fn(),
    })

    renderWithRouter('/movies/1')

    expect(screen.getByText('Login Page')).toBeInTheDocument()
    expect(screen.queryByText('Movie Detail')).not.toBeInTheDocument()
  })


  it('muestra el contenido si el usuario SÍ está logueado', () => {

    vi.mocked(useAuth).mockReturnValue({
      user: { uid: '123', email: 'test@test.com' } as any,
      loading: false,
      login: vi.fn(),
      logout: vi.fn(),
      register: vi.fn(),
      loginGoogle: vi.fn(),
    })

    renderWithRouter('/movies/1')

    expect(screen.getByText('Movie Detail')).toBeInTheDocument()
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument()
  }) 
})
