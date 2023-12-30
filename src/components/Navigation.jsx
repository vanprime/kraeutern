import * as React from "react"
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';
import { useGames } from '@/providers/games-provider';

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "./ui/button";


const Navigation = () => {

    const { games, loading, error } = useGames();

    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link to="/games">
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            All Games
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    {loading ?
                        <div className="flex space-x-3">
                            <Skeleton className="rounded-md h-4 w-[8ch] p-3" />
                            <Skeleton className="rounded-md h-4 w-[8ch] p-3" />
                            <Skeleton className="rounded-md h-4 w-[8ch] p-3" />
                        </div>
                        : (
                            <>
                                <NavigationMenuTrigger>Game</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid gap-2 p-4 lg:grid-cols-[1fr] md:whitespace-nowrap">
                                        {games.map(game => (
                                            <ListItem
                                                key={game.id}
                                                title={game.name}
                                                to={`/games/${game.slug}`}
                                            >
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </>
                        )}
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link to="/buzzern" className={navigationMenuTriggerStyle()}>
                        <NavigationMenuLink>
                            Buzzer
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default Navigation;


const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"