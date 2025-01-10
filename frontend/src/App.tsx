import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './styles/App.css'
import AvailableGroups from './components/AvailableGroups'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AvailableGroups />
    </QueryClientProvider>
  )
}

export default App
