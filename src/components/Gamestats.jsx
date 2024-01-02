import { prettyDate, prettyKey } from '@/lib/utils';
import { useGamestateContext } from '@/providers/gamestate-provider';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

function GameStats() {

    const { gameRoom } = useGamestateContext();
    const [prettyRoom, setPrettyRoom] = useState({});

    const prettyStats = (key) => {
        switch (key) {
            case "room_id":
                return null
            case "team_id":
                return "Buzzered by"
            case "buzzed":
                return "Buzzer active"
            case "amount_buzzered":
                return "Times buzzered"
            default:
                return prettyKey(key)
        }
    }

    const prepareData = (gameRoom) => ({
        created_by: gameRoom.created_by,
        created_at: prettyDate(gameRoom.created_at, true),
        last_update: prettyDate(gameRoom.updated_at, false, true),
        buzzered_by: gameRoom.team_id === 0 ? "Nobody" : `Team ${gameRoom.team_id}`,
        buzzer_active: gameRoom.buzzed ? "Yes" : "No",
        amount_buzzered: gameRoom.amount_buzzered,
    });

    useEffect(() => {
        if (gameRoom) {
            setPrettyRoom(prepareData(gameRoom));
        }
    }, [gameRoom])

    return (
        <div className='flex flex-wrap gap-4 justify-start'>
            {Object.entries(prettyRoom).map(([key, value]) => (
                <div
                    key={key}
                    className="p-2"
                >
                    <p className="text-sm text-muted-foreground">{prettyStats(key)}</p>
                    <motion.p
                        key={`${key}-${value}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.0 }}
                    >
                        {value}
                    </motion.p>
                </div>
            ))}
        </div>
    );
}

export default GameStats;