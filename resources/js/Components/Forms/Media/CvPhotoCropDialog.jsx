import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slider,
    Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import {
    CV_PHOTO_OUTPUT_HEIGHT,
    CV_PHOTO_OUTPUT_WIDTH,
} from "./cvPhotoFrame";

const FRAME_WIDTH = 240;
const FRAME_HEIGHT = 320;

function coverScale(imageWidth, imageHeight) {
    return Math.max(FRAME_WIDTH / imageWidth, FRAME_HEIGHT / imageHeight);
}

function clampOffset(x, y, displayWidth, displayHeight) {
    return {
        x: Math.min(0, Math.max(FRAME_WIDTH - displayWidth, x)),
        y: Math.min(0, Math.max(FRAME_HEIGHT - displayHeight, y)),
    };
}

export default function CvPhotoCropDialog({ imageUrl, open, onCancel, onConfirm }) {
    const imageRef = useRef(null);
    const dragRef = useRef(null);
    const [baseScale, setBaseScale] = useState(1);
    const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 });
    const [zoom, setZoom] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);

    const displayWidth = naturalSize.width * baseScale * zoom;
    const displayHeight = naturalSize.height * baseScale * zoom;

    const placeImage = (image, nextZoom = 1) => {
        const scale = coverScale(image.naturalWidth, image.naturalHeight);
        const width = image.naturalWidth * scale * nextZoom;
        const height = image.naturalHeight * scale * nextZoom;
        setNaturalSize({
            width: image.naturalWidth,
            height: image.naturalHeight,
        });
        setBaseScale(scale);
        setZoom(nextZoom);
        setOffset({
            x: (FRAME_WIDTH - width) / 2,
            y: (FRAME_HEIGHT - height) / 2,
        });
    };

    const handleZoom = (event, nextZoom) => {
        if (!naturalSize.width) {
            return;
        }
        const previousWidth = naturalSize.width * baseScale * zoom;
        const previousHeight = naturalSize.height * baseScale * zoom;
        const nextWidth = naturalSize.width * baseScale * nextZoom;
        const nextHeight = naturalSize.height * baseScale * nextZoom;
        const centerX = (FRAME_WIDTH / 2 - offset.x) / previousWidth;
        const centerY = (FRAME_HEIGHT / 2 - offset.y) / previousHeight;

        setZoom(nextZoom);
        setOffset(
            clampOffset(
                FRAME_WIDTH / 2 - centerX * nextWidth,
                FRAME_HEIGHT / 2 - centerY * nextHeight,
                nextWidth,
                nextHeight
            )
        );
    };

    const handlePointerDown = (event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        dragRef.current = {
            x: event.clientX,
            y: event.clientY,
            originX: offset.x,
            originY: offset.y,
        };
        setDragging(true);
    };

    const handlePointerMove = (event) => {
        if (!dragRef.current) {
            return;
        }
        const nextX = dragRef.current.originX + (event.clientX - dragRef.current.x);
        const nextY = dragRef.current.originY + (event.clientY - dragRef.current.y);
        setOffset(clampOffset(nextX, nextY, displayWidth, displayHeight));
    };

    const handlePointerUp = () => {
        dragRef.current = null;
        setDragging(false);
    };

    const handleConfirm = () => {
        const image = imageRef.current;
        if (!image?.naturalWidth) {
            return;
        }

        const scale = (naturalSize.width * baseScale * zoom) / image.naturalWidth;
        const sourceX = -offset.x / scale;
        const sourceY = -offset.y / scale;
        const sourceWidth = FRAME_WIDTH / scale;
        const sourceHeight = FRAME_HEIGHT / scale;
        const canvas = document.createElement("canvas");
        canvas.width = CV_PHOTO_OUTPUT_WIDTH;
        canvas.height = CV_PHOTO_OUTPUT_HEIGHT;
        const context = canvas.getContext("2d");
        context.drawImage(
            image,
            sourceX,
            sourceY,
            sourceWidth,
            sourceHeight,
            0,
            0,
            canvas.width,
            canvas.height
        );
        canvas.toBlob(
            (blob) => {
                if (blob) {
                    onConfirm(blob);
                }
            },
            "image/jpeg",
            0.9
        );
    };

    return (
        <Dialog
            open={open}
            onClose={(event, reason) => {
                if (reason === "backdropClick") {
                    return;
                }
                onCancel();
            }}
            maxWidth="xs"
            fullWidth
            disableRestoreFocus
        >
            <DialogTitle>Adjust photo</DialogTitle>
            <DialogContent>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Drag the photo inside the frame, then zoom until the face sits well.
                    This is the same shape used on the CV.
                </Typography>
                <Box
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    sx={{
                        width: FRAME_WIDTH,
                        height: FRAME_HEIGHT,
                        mx: "auto",
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: "12px",
                        border: "2px solid",
                        borderColor: "primary.main",
                        bgcolor: "#1a1a1a",
                        cursor: dragging ? "grabbing" : "grab",
                        touchAction: "none",
                        userSelect: "none",
                    }}
                >
                    <img
                        ref={imageRef}
                        src={imageUrl}
                        alt="Adjust profile photo"
                        draggable={false}
                        onLoad={(event) => placeImage(event.currentTarget)}
                        style={{
                            position: "absolute",
                            left: offset.x,
                            top: offset.y,
                            width: displayWidth || "100%",
                            height: displayHeight || "100%",
                            maxWidth: "none",
                            pointerEvents: "none",
                        }}
                    />
                </Box>
                <Box sx={{ px: 1, mt: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                        Zoom
                    </Typography>
                    <Slider
                        size="small"
                        min={1}
                        max={3}
                        step={0.01}
                        value={zoom}
                        disabled={!naturalSize.width}
                        onChange={handleZoom}
                        aria-label="Zoom photo"
                    />
                </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onCancel} color="inherit">
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleConfirm}>
                    Use this photo
                </Button>
            </DialogActions>
        </Dialog>
    );
}
