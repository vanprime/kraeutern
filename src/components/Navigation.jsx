import * as React from "react"
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useGames } from '@/providers/games-provider';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Terminal } from 'lucide-react';

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


const Navigation = () => {

    const { games, loading, error } = useGames();

    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Games</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ListItem
                            key={"overview"}
                            title={"Games overview"}
                            to='/games'
                        >
                            To all games
                        </ListItem>
                        {games.map(game => (
                            <ListItem
                                key={game.id}
                                title={game.name}
                                to={`/games/${game.slug}`}
                            >
                            </ListItem>
                        ))}
                        <ListItem
                            key={"buzzers"}
                            to='/buzzern'
                        >
                            Buzzern
                        </ListItem>
                        {error && (
                            <Alert>
                                <Terminal className="h-4 w-4" />
                                <AlertTitle>Oops!</AlertTitle>
                                <AlertDescription>
                                    {error}
                                </AlertDescription>
                            </Alert>
                        )}
                    </NavigationMenuContent>
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