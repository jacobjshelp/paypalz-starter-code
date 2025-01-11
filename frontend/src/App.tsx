import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './styles/App.css'
import AvailableGroups from './components/AvailableGroups'
import { UserContext, UserInfo } from './contexts/UserContext'
import { useState } from 'react'

function App() {
  const [info, setInfo] = useState<UserInfo | null>(null)

  const queryClient = new QueryClient()

  return (
    <UserContext.Provider value={{ info, setInfo }}>
      <QueryClientProvider client={queryClient}>
        <AvailableGroups />
      </QueryClientProvider>
    </UserContext.Provider>
  )
}

export default App
