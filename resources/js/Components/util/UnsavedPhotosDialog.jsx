import { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import {
    discardAndLeave,
    stayOnPage,
    subscribeLeaveDialog,
} from "@/hooks/useLeaveGuard";

export default function UnsavedPhotosDialog() {
    const [open, setOpen] = useState(false);

    useEffect(() => subscribeLeaveDialog(setOpen), []);

    return (
        <Dialog open={open} onClose={stayOnPage}>
            <DialogTitle>Photos are not uploaded</DialogTitle>
            <DialogContent>
                <Typography variant="body2">
                    These photos are not saved yet. Stay on this page, or
                    discard them and leave.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={stayOnPage}
                    sx={{ fontSize: { xs: 12, sm: 14 } }}
                >
                    Stay
                </Button>
                <Button
                    color="error"
                    onClick={discardAndLeave}
                    sx={{ fontSize: { xs: 12, sm: 14 } }}
                >
                    Discard changes
                </Button>
            </DialogActions>
        </Dialog>
    );
}
