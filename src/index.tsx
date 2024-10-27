import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StarWarsContextProvider } from "./store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CharacterDetails from "./components/CharacterDetails";
import ErrorState from "./components/atoms/ErrorState";
const FavoritesList = lazy(() => import(".//components/FavoritesList"));
const CharacterList = lazy(() => import(".//components/CharacterList"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback="Loading...">
        <App />
      </Suspense>
    ),
    errorElement: <ErrorState />,
    children: [
      {
        index: true, // default child route
        element: <CharacterList />,
      },
      {
        path: "character/:characterId",
        element: (
          <Suspense fallback="Loading...">
            <CharacterDetails />
          </Suspense>
        ),
      },
      {
        path: "favorites",
        element: (
          <Suspense fallback="Loading...">
            <FavoritesList />
          </Suspense>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <StarWarsContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </StarWarsContextProvider>
  </React.StrictMode>
);
