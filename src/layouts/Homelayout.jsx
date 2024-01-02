import { Outlet } from "react-router-dom";
import Gamelogo from '@/assets/gamelogo.png'
import Footer from '@/components/Footer';
import { Loader2 } from "lucide-react";
import { useGamestateContext } from "@/providers/gamestate-provider";

const Homelayout = () => {

    const { loading } = useGamestateContext();

    return (
        <>
            <main className="flex p-6 min-h-[100dvh]">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 ">
                    <div className='md:col-span-2 flex flex-1 items-center bg-[#e4b7dd] rounded-3xl'>
                        <img className='w-[600px] m-auto' src={Gamelogo} alt="Game logo" />
                    </div >
                    {loading ? (
                        <div className="flex flex-1 flex-col h-full w-full justify-between">
                            <Loader2 className="m-auto animate-spin" />
                        </div>
                    ) : (

                        <div className="p-4 rounded-3xl flex flex-col flex-1 border-2">
                            <Outlet />
                        </div>
                    )}
                </div>
            </main >
            <Footer />
        </>
    );
};


export default Homelayout;