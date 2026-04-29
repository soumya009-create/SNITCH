import AppRoutes from "./app.routes"
import { AuthProvider } from './auth/context.tsx'
import { ProductProvider } from './products/product.context.tsx'

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <AppRoutes />
      </ProductProvider>
    </AuthProvider>
  )
}

export default App
