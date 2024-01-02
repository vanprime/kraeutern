import { useGamestateContext } from "@/providers/gamestate-provider";
import Overshooter from "@/components/Overshooter";

function Blank() {
    const { overshooterVisible, activeTeamId } = useGamestateContext();

    return (
        <>
            <Overshooter />
        </>
    );
}

export default Blank;