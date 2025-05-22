import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./layouts/RootLayout";
import "./App.css";
import HomePage from "./Pages/HomePage";
import FilterPage from "./Pages/FilterPage";
import DetailCarPage from "./Pages/DetailCarPage";
import PaymentPage from "./Pages/PaymentPage";
import LoginPage from "./Pages/LoginPage";
import SingupPage from "./Pages/SingupPage";
import BookedCarsPage from "./Pages//BookedCarsPage";
import ProtectedRoute from "./layouts/protectedLayout";
import FavoriteCarsPage from "./Pages/FavoriteCarsPage";
import { AuthContextProvider } from "./contexts/auth-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserProfilePage from "./Pages/UserProfilePage";

const client = new QueryClient();

function App() {
    const router = createBrowserRouter([
        {
            Component: RootLayout,
            children: [
                {
                    path: "/",
                    Component: HomePage,
                },
                {
                    path: "/filter",
                    Component: FilterPage,
                },
                {
                    path: "/:id_vehicle",
                    Component: DetailCarPage,
                },
                {
                    path: "/booking",
                    Component: PaymentPage,
                },

                {
                    path: "/login",
                    Component: LoginPage,
                },
                {
                    path: "/signup",
                    Component: SingupPage,
                },

                {
                    Component: ProtectedRoute,
                    children: [
                        {
                            path: "/user/bookings",
                            Component: BookedCarsPage,
                        },
                        {
                            path: "/user/favorites",
                            Component: FavoriteCarsPage,
                        },
                        {
                            path: "/user/profile",
                            Component: UserProfilePage,
                        },
                    ],
                },
            ],
        },
    ]);

    return (
        <QueryClientProvider client={client}>
            <AuthContextProvider>
                <RouterProvider router={router} />
            </AuthContextProvider>
        </QueryClientProvider>
    );
}

export default App;
