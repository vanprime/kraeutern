import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function App() {

  return (
    <>
      <Helmet>
        <title>Kräutern.</title>
      </Helmet>
      <div className='flex min-h-dvh flex-col'>
        <Outlet />
      </div>
    </>
  )
}

export default App