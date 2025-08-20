import React, { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "./AuthContext";
import Notes from "./pages/Notes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./theme.css";

// Simple hash-based router to avoid adding react-router dependency
function useHashRoute() {
  const [route, setRoute] = useState(window.location.hash || "#/notes");
  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash || "#/notes");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  return [route, setRoute];
}

function RouterView() {
  const [route] = useHashRoute();
  const { user, initializing } = useAuth();

  if (initializing) {
    return <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>Loading...</div>;
  }

  // Auth pages
  if (route.startsWith("#/login")) return <Login />;
  if (route.startsWith("#/register")) return <Register />;

  // Guarded routes
  if (!user) {
    window.location.hash = "#/login";
    return null;
  }
  return <Notes />;
}

// PUBLIC_INTERFACE
export default function App() {
  /** App entry point with auth provider and simple routing. */
  return (
    <AuthProvider>
      <RouterView />
    </AuthProvider>
  );
}
