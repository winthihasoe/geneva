import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TitleCenter from "@/Components/Typo/TitleCenter";
import ExperienceCard from "@/Pages/Experience/components/ExperienceCard";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm, usePage } from "@inertiajs/inertia-react";
import { router } from "@inertiajs/react";

function Experiences({ experiences: initialExperiences, cvId }) {
    const [isAdding, setIsAdding] = useState(false);
    const [experienceList, setExperienceList] = useState(initialExperiences);
    const { data, setData, post, errors, setError } = useForm({
        experience: "",
    });

    // Handle adding a new experience
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.experience.store", cvId), {
            onError: (errors) => {
                setError(errors);
            },
            onSuccess: () => {
                setData({ experience: "" });
                setIsAdding(false);
            },
        });
    };

    // Handle drag-and-drop reordering
    const handleDragEnd = (result) => {
        if (!result.destination) return; // If dropped outside, do nothing

        const reorderedList = [...experienceList];
        const [movedItem] = reorderedList.splice(result.source.index, 1);
        reorderedList.splice(result.destination.index, 0, movedItem);

        // Update local state
        setExperienceList(
            reorderedList.map((exp, index) => ({
                ...exp,
                order: index, // Update order property locally
            }))
        );
    };

    // Save the updated order to the server
    const saveOrder = () => {
        router.post(route("admin.experience.reorder", cvId), {
            experiences: experienceList.map((exp) => ({
                id: exp.id,
                order: exp.order,
            })),
            preserveScroll: true,
            onError: (errors) => {
                console.error("Failed to save order:", errors);
            },
            onSuccess: () => {
                console.log("Order saved successfully!");
            },
        });
    };

    return (
        <Box my={4}>
            <TitleCenter>Experiences</TitleCenter>
            {isAdding ? (
                <form onSubmit={handleSubmit}>
                    <Box
                        sx={{
                            border: "5px dotted",
                            borderColor: "primary.main",
                            p: { xs: 1, sm: 2, md: 3 },
                            borderRadius: 5,
                        }}
                    >
                        <TextField
                            value={data.experience}
                            onChange={(e) =>
                                setData({ experience: e.target.value })
                            }
                            fullWidth
                            multiline
                            placeholder="Describe experience"
                            required
                        />
                        {errors?.experience && (
                            <Typography color="error">
                                {errors.experience}
                            </Typography>
                        )}
                        <Box textAlign={"center"} my={2}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ borderRadius: 20 }}
                            >
                                Save
                            </Button>{" "}
                            <Button
                                onClick={() => setIsAdding(false)}
                                variant="outlined"
                                sx={{ borderRadius: 20 }}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </form>
            ) : (
                <Box textAlign={"center"} my={2}>
                    <Button
                        onClick={() => setIsAdding(true)}
                        variant="contained"
                        sx={{ borderRadius: 20 }}
                    >
                        Add new experience
                    </Button>
                </Box>
            )}
            <Box>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="experiences">
                        {(provided) => (
                            <Box
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {experienceList
                                    .sort((a, b) => {
                                        if (a.order === b.order) {
                                            // Secondary sort by `id` if `order` is the same
                                            return a.id - b.id;
                                        }
                                        return a.order - b.order; // Primary sort by `order`
                                    })
                                    .map((exp, index) => (
                                        <Draggable
                                            key={exp.id}
                                            draggableId={exp.id.toString()}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <Box
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    sx={{
                                                        p: 1,
                                                    }}
                                                >
                                                    <ExperienceCard exp={exp} />
                                                </Box>
                                            )}
                                        </Draggable>
                                    ))}
                                {provided.placeholder}
                            </Box>
                        )}
                    </Droppable>
                </DragDropContext>
            </Box>
            {experienceList?.length > 0 && (
                <Box textAlign={"center"} mt={4}>
                    <Button
                        onClick={saveOrder}
                        variant="contained"
                        sx={{ borderRadius: 20 }}
                    >
                        Save Order
                    </Button>
                </Box>
            )}
        </Box>
    );
}

export default Experiences;
