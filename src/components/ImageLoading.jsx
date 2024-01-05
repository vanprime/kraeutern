import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import Gamelogo from '@/assets/gamelogo.png'

export const ImageLoading = ({ urlString, alt, className }) => {

    if (!urlString) return null;

    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = urlString;
        img.onload = () => setIsLoaded(true);
        img.onerror = () => setHasError(true);
    }, [urlString]);

    if (hasError) {
        return (
            <img
                src={Gamelogo}
                alt={alt ? alt : 'Kraeutern.'}
                className="aspect-square object-cover rounded-xl"
            />
        )
    }

    return isLoaded ? (
        <motion.img
            key={urlString}
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
            transition={{ duration: 0.15 }}
            src={urlString}
            alt={alt}
            className={cn(className)}
        />
    ) : (
        <div className="aspect-square object-cover rounded-xl flex items-center justify-center">
            <Loader2 className='animate-spin text-3xl' />
        </div>
    );

}

export default ImageLoading;