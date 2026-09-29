import React, { useContext, useEffect, useState } from "react";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import CvContext from "@/Context/CvContext";
import CvPhotoCropDialog from "./CvPhotoCropDialog";
import { CV_PHOTO_ASPECT_RATIO } from "./cvPhotoFrame";

const frameSx = {
    width: 210,
    maxWidth: "100%",
    aspectRatio: CV_PHOTO_ASPECT_RATIO,
    border: "2px dashed gray",
    borderRadius: "12px",
    overflow: "hidden",
    position: "relative",
    marginBottom: "1rem",
    bgcolor: "grey.100",
};

async function fileToImageUrl(file) {
    const isHeic =
        /heic|heif/i.test(file.type) || /\.heic$|\.heif$/i.test(file.name);

    if (isHeic) {
        const heic2any = (await import("heic2any")).default;
        const converted = await heic2any({
            blob: file,
            toType: "image/jpeg",
            quality: 0.92,
        });
        const blob = Array.isArray(converted) ? converted[0] : converted;
        return URL.createObjectURL(blob);
    }

    return URL.createObjectURL(file);
}

const PhotoUploadField = ({ oldPhoto }) => {
    const { data, setData } = useContext(CvContext);
    const initialPhotoURL =
        typeof data.profile_photo === "string" && data.profile_photo !== ""
            ? `/storage/${data.profile_photo}`
            : oldPhoto || null;
    const [photoURL, setPhotoURL] = useState(initialPhotoURL);
    const [cropSource, setCropSource] = useState(null);
    const [cropIsNewFile, setCropIsNewFile] = useState(false);
    const [preparing, setPreparing] = useState(false);

    const handlePhotoChange = async (event) => {
        const file = event.target.files?.[0];
        event.target.value = "";
        if (!file) {
            return;
        }

        setPreparing(true);
        try {
            const url = await fileToImageUrl(file);
            // Wait until the file picker click has finished, otherwise that
            // click closes the adjust window as soon as it opens.
            window.setTimeout(() => {
                setCropIsNewFile(true);
                setCropSource(url);
                setPreparing(false);
            }, 300);
        } catch (error) {
            console.error("Could not open photo:", error);
            setPreparing(false);
        }
    };

    const closeCrop = () => {
        if (cropIsNewFile && cropSource) {
            URL.revokeObjectURL(cropSource);
        }
        setCropSource(null);
        setCropIsNewFile(false);
    };

    const openAdjust = () => {
        const currentPhoto = photoURL || oldPhoto;
        if (!currentPhoto) {
            return;
        }
        setCropIsNewFile(false);
        setCropSource(currentPhoto);
    };

    const handleCropConfirm = (blob) => {
        const file = new File([blob], "profile-photo.jpg", {
            type: "image/jpeg",
        });
        setData((prevData) => ({
            ...prevData,
            profile_photo: file,
        }));
        closeCrop();
    };

    useEffect(() => {
        if (data.profile_photo && data.profile_photo instanceof Blob) {
            const newPhotoURL = URL.createObjectURL(data.profile_photo);
            setPhotoURL(newPhotoURL);

            return () => {
                URL.revokeObjectURL(newPhotoURL);
            };
        }
    }, [data.profile_photo]);

    const hasPhoto =
        (data.profile_photo && data.profile_photo !== "") ||
        photoURL ||
        oldPhoto;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            {hasPhoto ? (
                <Box sx={frameSx}>
                    <img
                        src={photoURL || oldPhoto}
                        alt="Profile Photo"
                        style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                </Box>
            ) : (
                <Box
                    sx={{
                        ...frameSx,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Typography variant="body2" color="text.secondary">
                        No photo selected
                    </Typography>
                </Box>
            )}

            {preparing && (
                <>
                    <Typography variant="body2" sx={{ marginBottom: 1 }}>
                        Opening photo...
                    </Typography>
                    <LinearProgress
                        sx={{ width: "210px", marginBottom: "1rem" }}
                    />
                </>
            )}

            {!hasPhoto && !preparing && (
                <Button
                    variant="outlined"
                    component="label"
                    sx={{ fontSize: 12, px: 2, py: 1 }}
                >
                    Add photo
                    <input
                        type="file"
                        accept=".jpg, .jpeg, .png, .heic"
                        hidden
                        onChange={handlePhotoChange}
                    />
                </Button>
            )}

            {hasPhoto && !preparing && (
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Button variant="outlined" size="small" onClick={openAdjust}>
                        Adjust photo
                    </Button>
                    <Button variant="outlined" component="label" size="small">
                        Change Photo
                        <input
                            type="file"
                            accept=".jpg, .jpeg, .png, .heic"
                            hidden
                            onChange={handlePhotoChange}
                        />
                    </Button>
                </Box>
            )}

            <CvPhotoCropDialog
                open={Boolean(cropSource)}
                imageUrl={cropSource || ""}
                onCancel={closeCrop}
                onConfirm={handleCropConfirm}
            />
        </Box>
    );
};

export default PhotoUploadField;
