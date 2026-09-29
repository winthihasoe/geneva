import React, { useRef, useState } from "react";
import { router } from "@inertiajs/react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

export default function PerformanceExcelImport() {
    const fileInputRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [processing, setProcessing] = useState(false);

    const closeDialog = () => {
        if (processing) {
            return;
        }
        setOpen(false);
        setFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleImport = () => {
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        setProcessing(true);

        router.post(route("admin.performance-records.import"), formData, {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => {
                setProcessing(false);
                setOpen(false);
                setFile(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            },
        });
    };

    return (
        <>
            <Button
                size="small"
                variant="outlined"
                startIcon={<FileUploadOutlinedIcon />}
                sx={{ borderRadius: 20, display: { xs: "none", sm: "flex" } }}
                onClick={() => setOpen(true)}
            >
                Import Excel
            </Button>
            <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="sm">
                <DialogTitle>Import Performance Record</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                        Choose the Excel workbook. Existing people and cases are
                        updated. New rows are added. Records created only on
                        this website are not removed.
                    </Typography>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".xlsx,.xls"
                        onChange={(event) =>
                            setFile(event.target.files?.[0] || null)
                        }
                    />
                    {file && (
                        <Typography variant="body2" mt={1}>
                            {file.name}
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={closeDialog} disabled={processing}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleImport}
                        disabled={!file || processing}
                    >
                        {processing ? "Importing..." : "Import"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
