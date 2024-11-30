import React, { useEffect, useRef, useState } from "react";

import { Box, Button } from "@mui/material";
import { useForm } from "@inertiajs/react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Import Quill's CSS
import Title from "@/Components/Typo/Title";

function ReplyMessage({ messageId, setIsReplying }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        reply: "",
    });

    const quillRef = useRef(null);

    useEffect(() => {
        const quill = new Quill(quillRef.current, {
            theme: "snow",
            placeholder: "Type your reply here...",
            modules: {
                toolbar: [
                    ["bold", "italic", "underline"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link"],
                ],
                clipboard: {
                    matchVisual: false, // Prevents pasting formatted text
                },
            },
        });

        quill.on("text-change", () => {
            setData("reply", quill.root.innerHTML);
        });

        // Override paste handler to strip formatting
        quill.clipboard.addMatcher(Node.ELEMENT_NODE, function (node, delta) {
            delta.ops = delta.ops.map((op) => {
                if (op.insert && typeof op.insert === "string") {
                    return {
                        insert: op.insert,
                    };
                }
                return op;
            });
            return delta;
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.message.reply", messageId), {
            onSuccess: () => {
                reset();
                setIsReplying(false);
            },
        });
    };

    return (
        <Box
            sx={{
                border: "2px dashed #1c90a9",
                borderRadius: 3,
                p: { xs: 1, sm: 2 },
                my: 2,
            }}
        >
            <form onSubmit={handleSubmit}>
                <Title>Reply message</Title>
                <div ref={quillRef} style={{ height: 150, marginBottom: 20 }} />
                {errors.reply && (
                    <Box sx={{ color: "red", mb: 2 }}>{errors.reply}</Box>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={processing}
                >
                    Send Reply
                </Button>
            </form>
        </Box>
    );
}

export default ReplyMessage;
