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
        path: "games",
        element: <Navlayout />,
        children: [
          {
            index: true, // This renders <Games /> content at the path '/games'
            element: <Games />, // Assuming you have a component for the overview of games
          },
          {
            path: ":gameSlug", // Nested route for individual games
            element: <GameDetail />, // Component for game details
          },
        ]
      },
    ],
  },
], { basename: baseUrl });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GamesProvider>
      <RouterProvider router={router} basename={baseUrl} />
    </GamesProvider>
    <Toaster />
  </React.StrictMode>
);
