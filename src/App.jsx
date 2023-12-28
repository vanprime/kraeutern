import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@/providers/theme-provider';
import { useEffect, useState } from 'react';
import Overshooter from '@/components/Overshooter';
import { supabase } from '@/lib/supabaseClient';

function App() {

  const [overshooterVisible, setOvershooterVisible] = useState(false);
  const [teamId, setTeamId] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
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

    // Realtime subscription using Supabase v2 channel
    const mySubscription = supabase.channel('buzzer')
      .on('postgres_changes', { event: '*', schema: 'public' }, payload => {
        console.log('Buzzer activated:', payload);
        setTeamId(payload.new.team_id); // Assuming 'teamId' is a field in your buzzer table
        setOvershooterVisible(true);
      })
      .subscribe();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      supabase.removeChannel(mySubscription);
    };
  }, [overshooterVisible]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Overshooter
        teamId={teamId}
        isVisible={overshooterVisible}
        close={() => {
          setTeamId(null);
          setOvershooterVisible(false);
        }} />
      <div className='flex min-h-dvh flex-col'>
        <Outlet />
      </div>
    </ThemeProvider>
  )
}

export default App
