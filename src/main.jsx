import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner"
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Home from "@/pages/Home.jsx";
import "@fontsource/rubik"; // Defaults to weight 400
import "@fontsource/rubik/300.css"
import "@fontsource/rubik/500.css"
import "@fontsource/rubik/600.css"
import "@fontsource/rubik/800.css"
import GameDetail from "./pages/GameDetail.jsx";
import Navlayout from "./layouts/Navlayout.jsx";
import { GamesProvider } from "@/providers/games-provider.jsx";
import Teamselect from "@/pages/Teamselect.jsx";
import Buzzer from "@/pages/Buzzer.jsx";
import Buzzerlayout from "@/layouts/Buzzerlayout.jsx";
import { GamestateProvider } from "./providers/gamestate-provider.jsx";
import { ThemeProvider } from '@/providers/theme-provider';
import NotFoundPage from "@/pages/NotFoundPage.jsx";
import AuthPage from "@/pages/Auth.jsx";
import { AuthProvider } from "@/providers/auth-provider.jsx";
import Host from "@/pages/Host.jsx";
import Blank from "@/pages/Blank.jsx";
import Homelayout from "@/layouts/Homelayout.jsx";

export const baseUrl = '/kraeutern/'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homelayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
        ]
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
          {
            path: "blank",
            element: <Blank />,
          },
        ]
      },
      {
        path: "host",
        element: <Navlayout />,
        children: [
          {
            index: true,
            element: <Host />,
          },
        ]
      },
      {
        path: "games",
        element: <Navlayout />,
        children: [
          {
            path: ":gameSlug/*",
            element: <GameDetail />,
          },
        ]
      },
      {
        path: "auth",
        element: <Navlayout />,
        children: [
          {
            index: true,
            element: <AuthPage />,
          },
        ]
      },
      {
        path: "*",
        element: <Navlayout />,
        children: [
          {
            path: "*",
            element: <NotFoundPage />,
          },
        ]
      }
    ],
  },
], { basename: baseUrl });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <GamesProvider>
          <GamestateProvider>
            <RouterProvider router={router} />
          </GamestateProvider>
        </GamesProvider>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
