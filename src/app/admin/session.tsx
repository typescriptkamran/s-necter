"use client"
import {PropsWithChildren} from "react";
import {signIn, useSession} from "next-auth/react";
import {Button} from "@/components/generic/Button";

 const SessionWrapper = ({children}: PropsWithChildren) => {
    const {status} = useSession()
    return status === "authenticated" ? children : <div className="flex w-full h-dvh flex-col gap-4 justify-center items-center">

        <p className="bold text-4xl text-natural-golden/80">Restricted Route</p>
         <Button onClick={() => signIn()}>Sign In</Button>
    </div>

}
export default SessionWrapper