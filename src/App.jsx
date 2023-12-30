import { Outlet } from 'react-router-dom';

function App() {

  return (
    <div className='flex min-h-dvh flex-col'>
      <Outlet />
    </div>
  )
}

export default App
