import { CardContent, Container, Typography } from "@mui/material";
import BlankCard from "../../components/shared/BlankCard";
import Image from "next/image";

export interface CheckoutMsg  {
    message: string,
    imageUrl: string
}

const CheckoutMsg = ({message, imageUrl}: CheckoutMsg) =>{
    return(
        <Container maxWidth="sm" style={{textAlign:"center"}}>
            <BlankCard>
            <CardContent>
                <Image src={imageUrl} alt="Payment QR Code" width={400} height={400} style={{objectFit:"cover"}} unoptimized/>
            </CardContent>
            <CardContent>
                <Typography variant="h2">{message}</Typography>            
            </CardContent>
            </BlankCard>
        </Container>
    )
}

export default CheckoutMsg;