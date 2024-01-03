import React, { useState } from 'react';
import QRCode from "react-qr-code";
import { useGamestateContext } from '@/providers/gamestate-provider';
import { Button } from './ui/button';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import { baseUrl } from '@/main';

const GameIdQrCode = () => {

    const { gameRoom } = useGamestateContext();

    if (!gameRoom) return null;

    // Create a new URL object with the root page as the base URL
    const url = new URL(baseUrl, window.location.origin);

    // Add the 'invite' search parameter with the value of gameRoom.room_id
    url.searchParams.append('invite', gameRoom.room_id);

    function copyToClipboard() {
        try {
            navigator.clipboard.writeText(url.toString());
            toast.success('Invite copied to clipboard!',
                { description: 'You can now share it with your friends.' })
        } catch (error) {
            toast.error('Error copying to clipboard!',
                { description: error?.message })

        }
    }

    return (
        <div className="grid h-full gap-4">
            <div className="flex flex-1 aspect-square rounded">
                <QRCode
                    bgColor="transparent"
                    fgColor="#ffffff"
                    title={url.toString()}
                    style={{ height: "auto", maxWidth: "100%", width: "100%", borderRadius: "0.25rem" }}
                    value={url.toString()} />
            </div>
            <Button
                variant="secondary"
                onClick={() => copyToClipboard()}
            > Copy Link to clipboard <Copy className="ml-[1ch] h-4 w-4" /></Button>
        </div>
    );
};


export default GameIdQrCode;