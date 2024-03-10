import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import Auth from "./components/Auth";
import { View, Text } from "react-native";
import { Session } from "@supabase/supabase-js";
import GoogleAuthButton from "./components/GoogleAuth";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View>
      <Auth />
      <GoogleAuthButton />
      <Text>Test</Text>
      {session?.user && <Text>{session.user.id}</Text>}
      <Text>{session?.user.email}</Text>
    </View>
  );
}
