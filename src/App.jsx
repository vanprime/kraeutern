import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@/components/providers/theme-provider';

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className='flex min-h-dvh flex-col'>
        <Outlet />
      </div>
    </ThemeProvider>
  )
}

export default App
