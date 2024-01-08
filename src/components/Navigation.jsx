import { Home, LayoutDashboard, Users, Wallpaper } from "lucide-react";
import * as React from "react"
import { Link } from 'react-router-dom';


const Navigation = () => {

    const navLinks = [
        {
            name: "Home",
            href: "/",
            icon: <Home className="mr-[1ch] h-4 w-4" />
        },
        {
            name: "Dashboard",
            href: "/dashboard",
            icon: <LayoutDashboard className="mr-[1ch] h-4 w-4" />
        },
        {
            name: "Join a Team",
            href: "/buzzern",
            icon: <Users className="mr-[1ch] h-4 w-4" />
        },
        {
            name: "Buzzer Canvas",
            href: "/buzzern/blank",
            icon: <Wallpaper className="mr-[1ch] h-4 w-4" />
        }
    ]

    return (
        <nav className="mx-6 py-4 border-b-2 gap-6 sm:gap-4 whitespace-nowrap flex flex-wrap">
            {navLinks.map(link => (
                <Link
                    key={link.href}
                    to={link.href}
                    className="flex items-center hover:underline p-2"
                >
                    {link.icon && link.icon}
                    <span className="hidden sm:block">
                        {link.name}
                    </span>
                </Link>
            ))}
        </nav>
    )
};

export default Navigation;