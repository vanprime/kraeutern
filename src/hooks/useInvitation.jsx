import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useGamestateContext } from '@/providers/gamestate-provider';

const useInvitation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { handleManualJoinGameRoom } = useGamestateContext();

    // Parse URL query params
    const params = new URLSearchParams(location.search);
    const invite = params.get('invite');

    async function handleInvitation() {

        try {
            const success = await handleManualJoinGameRoom(invite);
            if (success) {
                toast("Joining Game", { description: `Joining Game ${invite}` });
                navigate(`/buzzern`);
            } else {
                return
            }
        } catch (error) {
            console.error('Error joining game room:', error);
            // Remove the invite parameter from the URL
            params.delete('invite');
            navigate(location.pathname, { replace: true });
        }
    }

    useEffect(() => {
        if (!invite) return;
        handleInvitation();
    }, []);

    return;
};

export default useInvitation;