import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";

import { createContext, useContext, useEffect, useState } from "react";

// Typen für Contextvalue definieren
type AuthContext = {
  session: Session | null;
  isLoading: boolean;
  signOut: () => void;
};

// ? Warum null, und warum behaupten wir, mit "!" dass das zum Context passt?
// * Hier würde eigentlich ein Defaultwert reinkommen. Da es aber keinen sinnvollen Defaultwert gibt den wir eintragen können
// * bevor der AuthContextProvider läuft, dient das hier als reiner Platzhalter.
const authContext = createContext<AuthContext>(null!);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // hier kommt die Session die wir von Supabase erhalten rein
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // * wenn der Context lädt, wollen wir supabase fragen ob wir bereits eingeloggt sind.
    // * Das Ergebnis wird dann im State gespeichert damit wir es als context value weitergeben können
    supabase.auth.getSession().then((result) => {
      console.log(result);
      if (result.data) {
        setSession(result.data.session);
      } else {
        setSession(null);
      }
      setLoading(false);
    });

    // * Damit der context direkt auf login und logout reagiert, geben wir supabase eine callback-funktion die
    // * immer ausgeführt werden soll wenn sich der loginstatus ändert (und die dann den sessionstate neu setzt)
    const listener = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // * Wenn der Context unmountet werden sollte (also die Komponente nicht mehr gerendert wird), beenden wir den Listener.
    return () => {
      listener.data.subscription.unsubscribe();
    };
  }, []);

  // * Für mehr Convenience geben wir auch die supabase signout funktion via context weiter.
  // * (Nicht strikt notwendig.)
  const signOut = () => {
    supabase.auth.signOut();
  };

  return (
    <authContext.Provider value={{ signOut, session, isLoading: loading }}>
      {children}
    </authContext.Provider>
  );
}

export const useAuthContext = () => {
  const value = useContext(authContext);
  if (!value) {
    console.error("Heyyy, no authContext provided");
  }
  return value;
};
