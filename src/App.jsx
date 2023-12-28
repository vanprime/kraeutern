import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@/providers/theme-provider';
import { useEffect, useState } from 'react';
import Overshooter from '@/components/Overshooter';

function App() {

  const [overshooterVisible, setOvershooterVisible] = useState(false);
  const [teamId, setTeamId] = useState(null);

  useEffect(() => {

    const handleKeyDown = (event) => {
      console.log(`Key pressed: ${event.key}`);
      if (overshooterVisible) {
        if (event.key === '0') {
          setOvershooterVisible(false);
        }
      } else {
        if (event.key >= '1' && event.key <= '4') {
          setTeamId(event.key);
          setOvershooterVisible(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [overshooterVisible]);


  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Overshooter
        teamId={teamId}
        isVisible={overshooterVisible}
        close={() => setOvershooterVisible(false)}
      />
      <div className='flex min-h-dvh flex-col'>
        <Outlet />
      </div>
    </ThemeProvider>
  )
}

export default App
