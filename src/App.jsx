import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@/providers/theme-provider';
import { useEffect, useState } from 'react';
import Overshooter from '@/components/Overshooter';
import { supabase } from '@/lib/supabaseClient';

function App() {

  const [overshooterVisible, setOvershooterVisible] = useState(false);
  const [teamId, setTeamId] = useState(null);

  const insertBuzzerReset = async () => {
    console.log('Inserting buzzer reset');
    try {
      const { data, error } = await supabase
        .from('buzzer')
        .update({ team_id: 0, buzzed: false }) // update these fields
        .eq('id', 'e87d4fdb-d2f0-4166-b1f5-99843d64302b'); // where id equals this value

      if (error) {
        console.error('Error inserting buzzer press:', error);
        throw error;
      }
    } catch (err) {
      // Handle any errors here
      console.error('Error in insertBuzzerPress:', err);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {

      if (event.key === '0') {
        insertBuzzerReset();
      }

      if (!overshooterVisible) {
        if (event.key >= '1' && event.key <= '4') {
          setTeamId(event.key);
          setOvershooterVisible(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown); 1

    // Realtime subscription using Supabase v2 channel
    const mySubscription = supabase.channel('buzzer')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'buzzer' }, payload => {
        if (payload.new.buzzed === true) {
          setTeamId(payload.new.team_id);
          setOvershooterVisible(true);
        } else {
          setOvershooterVisible(false);
        }
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
        isVisible={overshooterVisible} />
      <div className='flex min-h-dvh flex-col'>
        <Outlet />
      </div>
    </ThemeProvider>
  )
}

export default App
