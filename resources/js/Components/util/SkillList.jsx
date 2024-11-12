import React, { useState } from "react";
import Typography from "@mui/material/Typography";

const SkillList = ({ skills }) => {
    const [showAll, setShowAll] = useState(false);

    // Determine how many skills to display based on `showAll`
    const visibleSkills = showAll ? skills : skills.slice(0, 4);

    return (
        <div>
            {visibleSkills.map((skill, index) => (
                <Typography
                    key={index}
                    mb={1}
                    fontSize={{
                        xs: 10,
                        sm: 13,
                        md: 13,
                    }}
                >
                    <img
                        src="/images/green_mark.png"
                        alt="Green check mark"
                        style={{
                            width: 13,
                            height: 13,
                            marginRight: "3px",
                        }}
                    />{" "}
                    {skill}
                </Typography>
            ))}

            {skills.length > 4 && (
                <Typography
                    onClick={() => setShowAll(!showAll)}
                    sx={{
                        cursor: "pointer",
                        color: "primary.main",
                        fontSize: 10,
                        marginTop: "5px",
                    }}
                >
                    {showAll ? "Show Less" : "Show More"}
                </Typography>
            )}
        </div>
    );
};

export default SkillList;
