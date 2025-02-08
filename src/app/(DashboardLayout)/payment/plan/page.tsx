"use client"

import React from "react";
import { useState } from "react";
import CheckoutMsg from "./OverPaymentTime";
import Checkout from "./Checkout";
import { CountdownTimerProps } from "./CountdownTimer";



const QrPayment = () => {
    const [overtime, setOvertime] = useState(false);
    const[checkoutComplete, setCheckoutComplete] = useState(false);
       
    const onCheckoutComplete = () =>{
        setCheckoutComplete(true);
    }
    return(
        <>
        {
            !checkoutComplete ? (
                <>
                { !overtime ? 
                    (
                        <Checkout  onComplete={onCheckoutComplete} onExire={()=>{setOvertime(true)}}></Checkout>
                    ):
                    <CheckoutMsg message="Payment order expired" imageUrl="/images/products/empty-shopping-bag.gif" ></CheckoutMsg>
                }
                </>
            ): 
            (<>
                <CheckoutMsg message="Payment complete" imageUrl="/images/products/complete.png" ></CheckoutMsg>
            </>)
        }
        

        
        </>
    );
};

export default QrPayment;