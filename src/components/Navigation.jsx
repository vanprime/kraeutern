import * as React from "react"
import { Link } from 'react-router-dom';


const Navigation = () => {

    const navLinks = [
        {
            name: "Home",
            href: "/",
        },
        {
            name: "Dashboard",
            href: "/host",
        },
        {
            name: "Join a Team",
            href: "/buzzern",
        },
        {
            name: "Buzzer Canvas",
            href: "/buzzern/blank",
        }
    ]

    return (
        <nav className="mx-6 py-4 border-b-2 space-x-4 whitespace-nowrap flex flex-wrap">
            {navLinks.map(link => (
                <Link
                    key={link.href}
                    to={link.href}
                    className="hover:underline"
                >
                    {link.name}
                </Link>
            ))}
        </nav>
    )
};

export default Navigation;