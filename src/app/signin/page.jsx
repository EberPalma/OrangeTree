'use client'
import { useSession, signIn, signOut } from "next-auth/react";

export default function Signin({ params }){
    //const callbackURL = params.callbackURL;
    const {data:session} = useSession();
    if(session){
        return < >
            <span>Signed in as: {session.user.email}</span><br />
            <button onClick={()=>{ signOut()}}>Sign out</button>
        </ >
    }else {
        return < >
            <span>You are not signed in</span><br />
            <button onClick={()=>{ signIn()}}>Sign in</button>
        </>
    }
}