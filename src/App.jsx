import { Outlet } from 'react-router-dom';
import Navigation from '@/components/Navigation';

function App() {

  return (
    <div className='flex h-full flex-col'>
      <Navigation />
      <main className='flex-1 p-6'>
        <Outlet />
      </main>
    </div>
  )
}

export default App
