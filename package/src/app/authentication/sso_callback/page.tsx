import { AuthJWTLSKey } from "@/app/global";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SSOCallback = () => {
    const searchParams = useSearchParams()
    const idToken = searchParams.get('id') || '';
    const router = useRouter();
    useEffect(()=>{
        localStorage.setItem(AuthJWTLSKey, idToken);
        router.push("/");
    }) 
}

export default SSOCallback;