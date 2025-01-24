'use client'
import { Box, CardContent, Stack, Typography } from "@mui/material";
import { LiteYoutubeEmbed } from "react-lite-yt-embed"

const Guide = () =>  {
  const id = 'dQw4w9WgXcQ';
    return(
        <>
        <Stack>
          <Typography variant="h3" fontWeight="700" mt="-20px">Copy trade setup guide</Typography>
          <LiteYoutubeEmbed id={id}></LiteYoutubeEmbed>
        </Stack>
        </>
        )
}

export default Guide;