'use client'

import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Provider({ children }) {
    //const { data: session } = useSession();

    return <SessionProvider /*session={session}*/>{children}</SessionProvider>
}