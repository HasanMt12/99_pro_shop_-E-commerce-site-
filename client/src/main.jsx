import('preline')
import '@smastrom/react-rating/style.css'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthProvider from './Context/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <QueryClientProvider client={queryClient}>
       <AuthProvider>
          
            <App />
         
        </AuthProvider>
    </QueryClientProvider>
  </>,
)
