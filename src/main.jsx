import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner"
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Home from "@/pages/Home.jsx";
import "@fontsource/rubik"; // Defaults to weight 400
import "@fontsource/rubik/600.css"
import "@fontsource/rubik/800.css"
import Games from "./pages/Games.jsx";
import GameDetail from "./pages/GameDetail.jsx";
import Navlayout from "./layouts/Navlayout.jsx";
import { GamesProvider } from "@/providers/games-provider.jsx";
import Teamselect from "@/pages/Teamselect.jsx";
import Buzzer from "@/pages/Buzzer.jsx";
import Buzzerlayout from "@/layouts/Buzzerlayout.jsx";
import { GamestateProvider } from "./providers/gamestate-provider.jsx";
import { ThemeProvider } from '@/providers/theme-provider';

const baseUrl = '/kraeutern/'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/buzzern",
        element: <Buzzerlayout />,
        children: [
          {
            index: true,
            element: <Teamselect />,
          },
          {
            path: ":team_id/*",
            element: <Buzzer />,
          },
        ]
      },
      {
        path: "games",
        element: <Navlayout />,
        children: [
          {
            index: true,
            element: <Games />,
          },
          {
            // Fixed: Make this path relative to 'games'
            path: ":gameSlug/*",
            element: <GameDetail />,
          },
        ]
      },
    ],
  },
], { basename: baseUrl });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <GamesProvider>
        <GamestateProvider>
          <RouterProvider router={router} />
        </GamestateProvider>
      </GamesProvider>
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>
);
