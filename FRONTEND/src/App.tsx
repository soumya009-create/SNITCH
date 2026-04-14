import AppRoutes from "./app.routes"
import { AuthProvider } from './auth/context.tsx'
function App() {


  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
