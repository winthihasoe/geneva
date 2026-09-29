import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { router } from "@inertiajs/react";
import Compressor from "compressorjs";
import {
    Box,
    Button,
    Dialog,
    IconButton,
    LinearProgress,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import YesOrNoModal from "@/Components/util/YesOrNoModal";
import useLeaveGuard from "@/hooks/useLeaveGuard";

const MAX_BYTES = 10 * 1024 * 1024;
const LONGEST_EDGE = 1600;

function isHeic(file) {
    return /heic|heif/i.test(file.type) || /\.heic$|\.heif$/i.test(file.name);
}

function isAllowedPhoto(file) {
    if (isHeic(file)) {
        return true;
    }

    if (/image\/(jpeg|png|webp)/i.test(file.type)) {
        return true;
    }

    return /\.(jpe?g|png|webp)$/i.test(file.name);
}

async function readableFile(file) {
    if (!isHeic(file)) {
        return file;
    }

    const heic2any = (await import("heic2any")).default;
    const converted = await heic2any({
        blob: file,
        toType: "image/jpeg",
        quality: 0.92,
    });
    const blob = Array.isArray(converted) ? converted[0] : converted;
    const baseName = file.name.replace(/\.(heic|heif)$/i, "") || "page";

    return new File([blob], `${baseName}.jpg`, { type: "image/jpeg" });
}

function compressDocumentPhoto(file) {
    return new Promise((resolve, reject) => {
        new Compressor(file, {
            quality: 0.7,
            maxWidth: LONGEST_EDGE,
            maxHeight: LONGEST_EDGE,
            mimeType: "image/jpeg",
            convertSize: 0,
            success(result) {
                resolve(new File([result], "page.jpg", { type: "image/jpeg" }));
            },
            error: reject,
        });
    });
}

function DocumentPreviewDialog({ images, index, onClose, onIndex }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const image = index === null ? null : images[index];
    const hasNeighbors = images.length > 1;

    useEffect(() => {
        if (index === null) {
            return undefined;
        }

        const onKey = (event) => {
            if (event.key === "ArrowRight" && index < images.length - 1) {
                onIndex(index + 1);
            }
            if (event.key === "ArrowLeft" && index > 0) {
                onIndex(index - 1);
            }
        };

        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [images.length, index, onIndex]);

    return (
        <Dialog
            open={index !== null}
            onClose={onClose}
            fullScreen={fullScreen}
            fullWidth
            maxWidth="md"
        >
            <Box
                sx={{
                    position: "relative",
                    bgcolor: "grey.900",
                    minHeight: fullScreen ? "100%" : "70vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: { xs: 1, sm: 8 },
                    py: 2,
                }}
            >
                <IconButton
                    aria-label="Close preview"
                    onClick={onClose}
                        sx={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            color: "common.white",
                            bgcolor: "rgba(0,0,0,0.45)",
                            width: 48,
                            height: 48,
                            zIndex: 2,
                        }}
                >
                    <CloseIcon />
                </IconButton>
                {hasNeighbors && (
                    <IconButton
                        aria-label="Previous photo"
                        disabled={index === 0}
                        onClick={() => onIndex(index - 1)}
                        sx={{
                            position: "absolute",
                            left: 8,
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "common.white",
                            bgcolor: "rgba(0,0,0,0.45)",
                            width: 56,
                            height: 56,
                            zIndex: 1,
                        }}
                    >
                        <ChevronLeftIcon sx={{ fontSize: 36 }} />
                    </IconButton>
                )}
                {image && (
                    <Box
                        component="img"
                        src={image.src}
                        alt={image.alt}
                        sx={{
                            maxWidth: "100%",
                            maxHeight: fullScreen ? "100%" : "80vh",
                            objectFit: "contain",
                        }}
                    />
                )}
                {hasNeighbors && (
                    <IconButton
                        aria-label="Next photo"
                        disabled={index === images.length - 1}
                        onClick={() => onIndex(index + 1)}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "common.white",
                            bgcolor: "rgba(0,0,0,0.45)",
                            width: 56,
                            height: 56,
                            zIndex: 1,
                        }}
                    >
                        <ChevronRightIcon sx={{ fontSize: 36 }} />
                    </IconButton>
                )}
                {image && (
                    <Typography
                        variant="caption"
                        sx={{
                            position: "absolute",
                            bottom: 12,
                            color: "common.white",
                        }}
                    >
                        {index + 1} / {images.length}
                    </Typography>
                )}
            </Box>
        </Dialog>
    );
}

const tileImageSx = {
    width: "100%",
    aspectRatio: "210 / 297",
    objectFit: "contain",
    bgcolor: "grey.100",
    borderRadius: 2,
    border: "1px solid",
    borderColor: "divider",
    cursor: "pointer",
    display: "block",
};

function PatientDocumentSection({ patientId, kind, title, photos = [] }) {
    const [saved, setSaved] = useState(photos);
    const [queue, setQueue] = useState([]);
    const queueRef = useRef(queue);
    const [freshIds, setFreshIds] = useState(() => new Set());
    const [notice, setNotice] = useState("");
    const [previewIndex, setPreviewIndex] = useState(null);
    const [pendingDelete, setPendingDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const deletingRef = useRef(false);
    const cancelUploadsRef = useRef(false);
    const uploadControllersRef = useRef(new Map());

    queueRef.current = queue;

    const discardQueued = () => {
        cancelUploadsRef.current = true;
        uploadControllersRef.current.forEach((controller) => controller.abort());
        uploadControllersRef.current.clear();
        queueRef.current.forEach((item) => URL.revokeObjectURL(item.previewUrl));
        setQueue([]);
        setPreviewIndex(null);
    };

    useLeaveGuard(queue.length > 0, discardQueued);

    useEffect(() => {
        setSaved(photos);
    }, [photos]);

    useEffect(() => {
        const controllers = uploadControllersRef.current;

        return () => {
            cancelUploadsRef.current = true;
            controllers.forEach((controller) => controller.abort());
            controllers.clear();
            queueRef.current.forEach((item) =>
                URL.revokeObjectURL(item.previewUrl),
            );
        };
    }, []);

    const patchQueue = (id, changes) => {
        setQueue((current) =>
            current.map((item) =>
                item.id === id ? { ...item, ...changes } : item,
            ),
        );
    };

    const addFiles = async (fileList) => {
        cancelUploadsRef.current = false;
        const tooLarge = [];
        const rejected = [];
        const accepted = [];

        Array.from(fileList).forEach((file) => {
            if (file.size > MAX_BYTES) {
                tooLarge.push(file);
                return;
            }
            if (!isAllowedPhoto(file)) {
                rejected.push(file);
                return;
            }
            accepted.push(file);
        });

        const items = [];
        let unreadable = 0;

        for (const file of accepted) {
            try {
                const readable = await readableFile(file);
                items.push({
                    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
                    file: readable,
                    previewUrl: URL.createObjectURL(readable),
                    status: "ready",
                    progress: 0,
                    error: "",
                });
            } catch (error) {
                unreadable += 1;
            }
        }

        const messages = [];
        if (tooLarge.length) {
            messages.push("Each photo must be 10 MB or smaller.");
        }
        if (rejected.length) {
            messages.push("Only photos can be added.");
        }
        if (unreadable) {
            messages.push("Could not read a photo. Take it again as a JPEG.");
        }
        setNotice(messages.join(" "));

        if (items.length) {
            setQueue((current) => [...current, ...items]);
        }
    };

    const onPick = async (event) => {
        const files = Array.from(event.target.files || []);
        event.target.value = "";
        if (!files.length) {
            return;
        }
        await addFiles(files);
    };

    const removeQueued = (item) => {
        URL.revokeObjectURL(item.previewUrl);
        setQueue((current) => current.filter((entry) => entry.id !== item.id));
        setPreviewIndex(null);
    };

    const uploadItem = async (item) => {
        if (cancelUploadsRef.current) {
            return;
        }

        patchQueue(item.id, { status: "preparing", progress: 0, error: "" });

        try {
            const jpeg = await compressDocumentPhoto(item.file);
            if (cancelUploadsRef.current) {
                return;
            }

            patchQueue(item.id, { status: "uploading", progress: 0 });

            const controller = new AbortController();
            uploadControllersRef.current.set(item.id, controller);

            const body = new FormData();
            body.append("photo", jpeg, "page.jpg");

            const response = await axios.post(
                route("admin.patient.documents.store", {
                    patient: patientId,
                    kind,
                }),
                body,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    signal: controller.signal,
                    onUploadProgress: (event) => {
                        if (!event.total || cancelUploadsRef.current) {
                            return;
                        }
                        patchQueue(item.id, {
                            progress: Math.round(
                                (event.loaded / event.total) * 100,
                            ),
                        });
                    },
                },
            );

            if (cancelUploadsRef.current) {
                return;
            }

            URL.revokeObjectURL(item.previewUrl);
            setQueue((current) =>
                current.filter((entry) => entry.id !== item.id),
            );
            setSaved((current) => [...current, response.data]);
            setFreshIds((current) => new Set([...current, response.data.id]));
        } catch (error) {
            if (
                cancelUploadsRef.current ||
                error.code === "ERR_CANCELED" ||
                error.name === "CanceledError"
            ) {
                return;
            }

            const validation = error.response?.data?.errors?.photo?.[0];
            const message =
                validation ||
                error.response?.data?.message ||
                "Upload failed";
            patchQueue(item.id, {
                status: "failed",
                progress: 0,
                error: message,
            });
        } finally {
            uploadControllersRef.current.delete(item.id);
        }
    };

    const uploadReady = () => {
        cancelUploadsRef.current = false;
        const ready = queue.filter((item) => item.status === "ready");
        if (!ready.length) {
            return;
        }

        setQueue((current) =>
            current.map((item) =>
                item.status === "ready"
                    ? { ...item, status: "preparing", progress: 0, error: "" }
                    : item,
            ),
        );

        let cursor = 0;
        const workers = Math.min(2, ready.length);
        const run = async () => {
            while (cursor < ready.length) {
                const item = ready[cursor];
                cursor += 1;
                await uploadItem(item);
            }
        };

        Array.from({ length: workers }, () => run());
    };

    const confirmDelete = () => {
        if (!pendingDelete || deletingRef.current) {
            return;
        }

        deletingRef.current = true;
        setDeleting(true);

        router.delete(
            route("admin.patient.documents.destroy", {
                photo: pendingDelete.id,
            }),
            {
                preserveScroll: true,
                onSuccess: () => {
                    setFreshIds((current) => {
                        const next = new Set(current);
                        next.delete(pendingDelete.id);
                        return next;
                    });
                    setPendingDelete(null);
                    setPreviewIndex(null);
                },
                onFinish: () => {
                    deletingRef.current = false;
                    setDeleting(false);
                },
            },
        );
    };

    const images = [
        ...saved.map((photo, index) => ({
            id: `saved-${photo.id}`,
            src: photo.url,
            alt: `${title} page ${index + 1}`,
        })),
        ...queue.map((item, index) => ({
            id: `new-${item.id}`,
            src: item.previewUrl,
            alt: `${title} new page ${index + 1}`,
        })),
    ];

    const openPreview = (id) => {
        const index = images.findIndex((image) => image.id === id);
        if (index >= 0) {
            setPreviewIndex(index);
        }
    };

    const hasReady = queue.some((item) => item.status === "ready");
    const isBusy = queue.some(
        (item) => item.status === "preparing" || item.status === "uploading",
    );

    return (
        <Box
            sx={{
                mb: 3,
                p: { xs: 1.5, sm: 2 },
                boxShadow: 3,
                borderRadius: 4,
            }}
        >
            <Typography
                variant="h6"
                fontWeight="bold"
                fontFamily="Roboto Slab"
                color="primary"
            >
                {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {saved.length
                    ? `${saved.length} ${saved.length === 1 ? "page" : "pages"} saved. Add the next pages, check them, then upload.`
                    : "Photograph each page, check it, then upload."}
            </Typography>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
                <Button
                    component="label"
                    variant="outlined"
                    sx={{
                        flexDirection: "column",
                        gap: 0.5,
                        px: 3,
                        py: 1.5,
                        borderRadius: 3,
                        minWidth: 148,
                    }}
                >
                    <PhotoCameraIcon sx={{ fontSize: 48 }} />
                    Take photo
                    <input
                        hidden
                        type="file"
                        accept="image/*,.heic,.heif"
                        capture="environment"
                        onChange={onPick}
                    />
                </Button>
                <Button
                    component="label"
                    variant="outlined"
                    sx={{
                        flexDirection: "column",
                        gap: 0.5,
                        px: 3,
                        py: 1.5,
                        borderRadius: 3,
                        minWidth: 148,
                    }}
                >
                    <PhotoLibraryIcon sx={{ fontSize: 48 }} />
                    Choose photos
                    <input
                        hidden
                        type="file"
                        accept="image/*,.heic,.heif"
                        multiple
                        onChange={onPick}
                    />
                </Button>
            </Box>

            {notice && (
                <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                    {notice}
                </Typography>
            )}

            {queue.length > 0 && (
                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Ready to upload
                    </Typography>
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr 1fr",
                                md: "repeat(4, 1fr)",
                            },
                            gap: 1.5,
                        }}
                    >
                        {queue.map((item, index) => (
                            <Box key={item.id}>
                                <Box sx={{ position: "relative" }}>
                                    <Box
                                        component="img"
                                        src={item.previewUrl}
                                        alt={`${title} new page ${index + 1}`}
                                        onClick={() =>
                                            openPreview(`new-${item.id}`)
                                        }
                                        sx={tileImageSx}
                                    />
                                    {(item.status === "ready" ||
                                        item.status === "failed") && (
                                        <IconButton
                                            aria-label="Remove photo"
                                            onClick={() => removeQueued(item)}
                                            sx={{
                                                position: "absolute",
                                                top: 8,
                                                right: 8,
                                                bgcolor: "white",
                                                width: 44,
                                                height: 44,
                                            }}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    )}
                                </Box>
                                {(item.status === "preparing" ||
                                    item.status === "uploading") && (
                                    <LinearProgress
                                        variant={
                                            item.status === "preparing"
                                                ? "indeterminate"
                                                : "determinate"
                                        }
                                        value={item.progress}
                                        sx={{ mt: 0.75, borderRadius: 1 }}
                                    />
                                )}
                                {item.status === "failed" && (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            mt: 0.5,
                                        }}
                                    >
                                        <Typography
                                            variant="caption"
                                            color="error"
                                        >
                                            {item.error || "Upload failed"}
                                        </Typography>
                                        <IconButton
                                            aria-label="Upload again"
                                            color="primary"
                                            onClick={() => uploadItem(item)}
                                        >
                                            <CloudUploadIcon
                                                sx={{ fontSize: 32 }}
                                            />
                                        </IconButton>
                                    </Box>
                                )}
                            </Box>
                        ))}
                    </Box>
                    {(hasReady || isBusy) && (
                        <Button
                            variant="contained"
                            onClick={uploadReady}
                            disabled={!hasReady || isBusy}
                            sx={{ mt: 2, borderRadius: 20 }}
                        >
                            {isBusy ? "Uploading..." : "Upload"}
                        </Button>
                    )}
                </Box>
            )}

            {saved.length > 0 ? (
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr 1fr",
                            md: "repeat(4, 1fr)",
                        },
                        gap: 1.5,
                    }}
                >
                    {saved.map((photo, index) => (
                        <Box key={photo.id} sx={{ position: "relative" }}>
                            <Box
                                component="img"
                                src={photo.url}
                                alt={`${title} page ${index + 1}`}
                                onClick={() => openPreview(`saved-${photo.id}`)}
                                sx={tileImageSx}
                            />
                            <IconButton
                                aria-label="Delete photo"
                                onClick={() => setPendingDelete(photo)}
                                sx={{
                                    position: "absolute",
                                    top: 8,
                                    right: 8,
                                    bgcolor: "white",
                                    width: 44,
                                    height: 44,
                                }}
                            >
                                <DeleteOutlineIcon color="error" />
                            </IconButton>
                            {freshIds.has(photo.id) && (
                                <CheckCircleIcon
                                    color="success"
                                    sx={{
                                        position: "absolute",
                                        left: 8,
                                        bottom: 8,
                                        fontSize: 36,
                                        bgcolor: "white",
                                        borderRadius: "50%",
                                    }}
                                />
                            )}
                        </Box>
                    ))}
                </Box>
            ) : (
                queue.length === 0 && (
                    <Typography variant="body2" color="text.secondary">
                        No pages yet.
                    </Typography>
                )
            )}

            <DocumentPreviewDialog
                images={images}
                index={
                    previewIndex !== null && previewIndex >= images.length
                        ? null
                        : previewIndex
                }
                onClose={() => setPreviewIndex(null)}
                onIndex={setPreviewIndex}
            />

            <YesOrNoModal
                open={Boolean(pendingDelete)}
                onClose={() => {
                    if (!deleting) {
                        setPendingDelete(null);
                    }
                }}
                title="Delete this photo?"
                onConfirm={confirmDelete}
                confirming={deleting}
            />
        </Box>
    );
}

export default PatientDocumentSection;
