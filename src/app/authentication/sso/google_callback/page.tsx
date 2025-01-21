"use client";

import { AuthJWTLSKey } from "@/app/global";
import { setCookie } from 'cookies-next/client';
import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/navigation'
import { useEffect } from "react";

const SSOCallback = () => {
    const searchParams = useSearchParams()
    const idToken = searchParams.get('id') || '';
    const router = useRouter();
    useEffect( () => {        
        // localStorage.setItem(AuthJWTLSKey, idToken);
        // const cookieStore = cookies();
        setCookie(AuthJWTLSKey, idToken, {maxAge: 86400*7 });
        router.push("/");
    }) 
}

export default SSOCallback;
