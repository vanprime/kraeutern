import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@/providers/theme-provider';

function App() {

  const referrer = document.referrer;

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className='flex min-h-dvh flex-col'>
        {referrer && <h1>{referrer}</h1>}
        <Outlet />
      </div>
    </ThemeProvider>
  )
}

export default App
