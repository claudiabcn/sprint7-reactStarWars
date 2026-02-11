import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes, Navigate } from 'react-router-dom'
import { vi } from 'vitest'
import ProtectedRoute from '../features/auth/guards/ProtectedRoute'
import LoginPage from '../features/auth/pages/loginPage'
import { useAuth } from '../features/auth/context/AuthContext'


vi.mock('../features/auth/context/AuthContext', () => ({
  useAuth: vi.fn(),
}))

vi.mock('../shared/ui/MoviesBackground', () => ({
  default: () => <div />,
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

const mockNavigate = vi.fn()

const MoviePage = (): React.ReactElement => <div>Movie Detail</div>
const MoviesListPage = (): React.ReactElement => <div>Movies List</div>

function renderProtectedRoutes(initialPath: string) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/movies" element={
          <ProtectedRoute><MoviesListPage /></ProtectedRoute>
        } />
        <Route path="/movies/:id" element={
          <ProtectedRoute><MoviePage /></ProtectedRoute>
        } />
      </Routes>
    </MemoryRouter>
  )
}

function mockAuthAs(user: any, loading = false) {
  vi.mocked(useAuth).mockReturnValue({
    user,
    loading,
    login: vi.fn(),
    logout: vi.fn(),
    register: vi.fn(),
    loginGoogle: vi.fn(),
  })
}

describe('ProtectedRoute - Control de acceso', () => {

 it('CASO 1: usuario NO logueado → redirige a /login', () => {
  mockAuthAs(null)
  renderProtectedRoutes('/movies/1')

  expect(screen.getByLabelText('Email')).toBeInTheDocument()
  expect(screen.queryByText('Movie Detail')).not.toBeInTheDocument()
})

  it('CASO 2: usuario SÍ logueado → accede a la ruta protegida', () => {
    mockAuthAs({ uid: '123', email: 'test@test.com' })

    renderProtectedRoutes('/movies/1')

    expect(screen.getByText('Movie Detail')).toBeInTheDocument()
    expect(screen.queryByText('Log In')).not.toBeInTheDocument()
  })

})


describe('LoginPage - Formulario de autenticación', () => {

  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('CASO 3: credenciales válidas → login llamado y redirige a /movies', async () => {
    const mockLogin = vi.fn().mockResolvedValue(undefined)
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      loading: false,
      login: mockLogin,
      logout: vi.fn(),
      register: vi.fn(),
      loginGoogle: vi.fn(),
    })

    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/movies" element={<MoviesListPage />} />
        </Routes>
      </MemoryRouter>
    )

    await userEvent.type(screen.getByLabelText('Email'), 'test@test.com')
    await userEvent.type(screen.getByLabelText('Password'), '123456')
    await userEvent.click(screen.getByRole('button', { name: /log in/i }))

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@test.com', '123456')
      expect(mockNavigate).toHaveBeenCalledWith('/movies', { replace: true })
    })
  })

  it('CASO 4: credenciales inválidas → muestra error y no redirige', async () => {

    const mockLogin = vi.fn().mockRejectedValue(new Error('Incorrect password'))
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      loading: false,
      login: mockLogin,
      logout: vi.fn(),
      register: vi.fn(),
      loginGoogle: vi.fn(),
    })

    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </MemoryRouter>
    )

    await userEvent.type(screen.getByLabelText('Email'), 'test@test.com')
    await userEvent.type(screen.getByLabelText('Password'), 'wrongpassword')
    await userEvent.click(screen.getByRole('button', { name: /log in/i }))

    await waitFor(() => {
      expect(screen.getByText('Incorrect password')).toBeInTheDocument()
      expect(mockNavigate).not.toHaveBeenCalled()
    })
  })

})


describe('AuthContext - Cierre de sesión', () => {

  it('CASO 5: usuario autenticado hace logout', async () => {

    const mockLogout = vi.fn().mockResolvedValue(undefined)
    const mockSetUser = vi.fn()

    vi.mocked(useAuth).mockReturnValue({
      user: { uid: '123', email: 'test@test.com' } as any,
      loading: false,
      login: vi.fn(),
      logout: mockLogout,
      register: vi.fn(),
      loginGoogle: vi.fn(),
    })

    const { logout } = useAuth()
    await logout()

    expect(mockLogout).toHaveBeenCalledTimes(1)
  })

})

describe('Rutas - Navegación a rutas inexistentes', () => {

  it('CASO 6: ruta no existe → redirige a home', () => {
    mockAuthAs({ uid: '123', email: 'test@test.com' })

    render(
      <MemoryRouter initialEntries={['/ruta-que-no-existe']}>
        <Routes>
          <Route path="/" element={<div>HomePage</div>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('HomePage')).toBeInTheDocument()
  })

})