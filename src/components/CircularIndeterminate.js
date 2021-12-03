import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
    return (
        <Box sx={{
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            zIndex: 10000,
            background: "rgba(255,255,255,.7)",
            display: "flex",
            alignContent: "center",
            justifyContent: "center"
        }}>
            <CircularProgress sx={{ height: "fit-content", margin: "auto" }} />
        </Box>
    );
}
