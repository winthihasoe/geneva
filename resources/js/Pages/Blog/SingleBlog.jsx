import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Grid2,
} from "@mui/material";
import BackButton from "@/Components/BackButton";

function SingleBlog() {
    return (
        <AppLayout>
            <Head title="Single Blog" />
            <Container maxWidth="lg">
                <BackButton />
                {/* Blog Title */}
                <Typography
                    variant="h3"
                    color="primary"
                    fontFamily={"Lilita One"}
                    gutterBottom
                >
                    Osteoporosis in Elderly
                </Typography>
                {/* Main Image */}
                <Card sx={{ mb: 4 }}>
                    <CardMedia
                        component="img"
                        height="300"
                        image="/images/blogContent/osteoporosis.jpeg" // Replace with actual image path
                        alt="Elderly osteoporosis"
                    />
                </Card>
                {/* Blog Content */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="body1" color="textSecondary">
                        Osteoporosis is a common condition in elderly
                        individuals, characterized by weakened bones that are
                        more prone to fractures. It often develops due to
                        age-related bone density loss and hormonal changes,
                        particularly in postmenopausal women. Here’s an overview
                        of the condition:
                    </Typography>
                </Box>
                {/* Causes Section */}
                <Grid2 container spacing={4} alignItems="center">
                    {/* Text Content */}

                    <Grid2 size={{ xs: 12, md: 8 }}>
                        <Typography
                            variant="h5"
                            color="primary"
                            fontWeight="bold"
                        >
                            Causes of Osteoporosis
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            1. Aging:
                            <ul>
                                <li>
                                    Bone density naturally decreases with age as
                                    the body's ability to form new bone slows
                                    down.
                                </li>
                            </ul>
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            2. Hormonal Changes:
                            <ul>
                                <li>
                                    Reduced levels of estrogen (in women) and
                                    testosterone (in men) accelerate bone loss.
                                </li>
                                <li>Thyroid disorders can also contribute.</li>
                            </ul>
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            3. Nutritional Deficiencies:
                            <ul>
                                <li>
                                    Lack of calcium and vitamin D in the diet
                                    weakens bones over time.
                                </li>
                            </ul>
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            4. Sedentary Lifestyle:
                            <ul>
                                <li>
                                    Physical inactivity reduces bone strength
                                    and density.
                                </li>
                            </ul>
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            5. Other Risk Factors
                            <ul>
                                <li>Family history of osteoporosis.</li>
                                <li>
                                    Smoking and excessive alcohol consumption.
                                </li>
                                <li>
                                    Chronic medical conditions (e.g., rheumatoid
                                    arthritis, kidney disease).
                                </li>
                                <li>Long-term use of corticosteroids.</li>
                            </ul>
                        </Typography>
                    </Grid2>
                    {/* Side Image */}
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <Card sx={{ mb: 2 }}>
                            <CardMedia
                                component="img"
                                height="180"
                                image="/images/SingleBlog/exercise.jpeg" // Replace with actual image path
                                alt="Caption A"
                            />
                            <CardContent>
                                <Typography
                                    variant="caption"
                                    color="textSecondary"
                                    align="center"
                                    display="block"
                                >
                                    Caption A
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardMedia
                                component="img"
                                height="180"
                                image="/images/SingleBlog/supine.jpeg" // Replace with actual image path
                                alt="Caption A"
                            />
                            <CardContent>
                                <Typography
                                    variant="caption"
                                    color="textSecondary"
                                    align="center"
                                    display="block"
                                >
                                    Caption B
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid2>
                </Grid2>
                <Typography variant="body1" color="textSecondary">
                    Symptoms
                    <ul>
                        <li>
                            Early stages often have no symptoms (silent
                            disease).
                        </li>
                        <li>Common Signs Include:</li>
                        <li>
                            Back pain (from fractured or collapsed vertebrae).
                        </li>
                        <li> Loss of height over time.</li>{" "}
                        <li>Stooped posture (kyphosis). </li>
                        <li>
                            Frequent bone fractures, even from minor falls or
                            stresses.
                        </li>
                    </ul>
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Diagnosis
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    1. Bone Density Test (DEXA Scan):{" "}
                </Typography>
                <ul>
                    <li>
                        Measures bone mineral density (BMD) and compares it to
                        the norm for your age and sex.
                    </li>
                </ul>
                <Typography variant="body1" color="textSecondary">
                    2. Blood Tests: (DEXA Scan):
                </Typography>
                <ul>
                    <li>
                        Evaluate levels of calcium, vitamin D, and other
                        markers.
                    </li>
                </ul>
                <Typography variant="body1" color="textSecondary">
                    3. X-rays:
                </Typography>
                <ul>
                    <li>May show fractures or bone thinning.</li>
                </ul>
                <Typography variant="body1" color="textSecondary">
                    3. X-rays:
                </Typography>
                <ul>
                    <li>May show fractures or bone thinning.</li>
                </ul>
                <Typography variant="body1" color="textSecondary">
                    Complications
                </Typography>

                <ul>
                    <li>
                        Fractures: Hip, spine, and wrist fractures are common.
                    </li>
                    <li>
                        Loss of Mobility: Fractures can lead to long-term
                        disability and reduced quality of life.{" "}
                    </li>
                    <li>
                        Chronic Pain: From repeated fractures and vertebral
                        collapse.
                    </li>
                </ul>
                <Typography variant="body1" color="textSecondary">
                    Management and Treatment
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Lifestyle Changes:
                </Typography>
                <ul>
                    <li>
                        Diet: High in calcium (dairy, leafy greens, fortified
                        products.
                    </li>
                </ul>
            </Container>
        </AppLayout>
    );
}

export default SingleBlog;
