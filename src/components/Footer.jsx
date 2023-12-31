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
        <footer class="mx-6 my-4 border-t-2 text-slate-500">
            <div class="w-full mx-auto py-4 px-6 md:flex md:items-center md:justify-between">
                <span class="text-sm font-semibold  sm:text-center">
                    Das Kräuterkoordinationskomitee.
                </span>
                <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-foreground-muted sm:mt-0">
                    {footerLinks.map((link) => (
                        <li>
                            <Link to={link.href} className="hover:underline me-4 md:me-6">{link.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    );
}

export default Footer;