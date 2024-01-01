import { Link } from "react-router-dom";

function Footer() {
    const footerLinks = [
        {
            name: 'Datenschutz',
            href: '#'
        },
        {
            name: 'Kontakt',
            href: '#'
        },
    ]

    return (
        <footer className="mx-6 my-4 border-t-2 text-slate-500">
            <div className="w-full py-4 md:flex md:items-center md:justify-between">
                <span className="text-sm font-semibold">
                    Das Kräuterkoordinationskomitee.
                </span>
                <ul className="flex flex-wrap items-center text-sm font-medium text-foreground-muted space-x-2">
                    {footerLinks.map((link) => (
                        <li key={link.name}>
                            <Link to={link.href} className="hover:underline">{link.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    );
}

export default Footer;