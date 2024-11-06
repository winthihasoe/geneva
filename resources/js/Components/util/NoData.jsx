import { Box, Typography } from "@mui/material";
import React from "react";

function NoData() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <img
                src="/images/Nodata.svg"
                style={{ width: 300, margin: "auto" }}
                alt="No Data"
            />
            <Typography sx={{ fontSize: 14, my: 5, textAlign: "center" }}>
                No data to show right now.
            </Typography>
        </Box>
    );
}

export default NoData;
