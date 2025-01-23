"use client"

import React from "react";
import { useState } from "react";
import CheckoutMsg from "./OverPaymentTime";
import Checkout from "./Checkout";
import { CountdownTimerProps } from "./CountdownTimer";



const QrPayment = () => {
    const [overtime, setOvertime] = useState(false);
    const[checkoutComplete, setCheckoutComplete] = useState(false);
    const countdownProp: CountdownTimerProps = {initialMinutes: 1, onComplete: () =>{
        setOvertime(true);
    }}    
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
                        <Checkout countdown={countdownProp} onCheckoutComplete={onCheckoutComplete}></Checkout>
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