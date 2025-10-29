import jsPDF from "jspdf";
import customFontBase64 from "./customFontBase64.js";
export const generateMaternalCareLogPDF = async (formData) => {
    try {
        // Create PDF with compression
        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
            compress: true,
        });

        // Add custom font to PDF
        pdf.addFileToVFS("CustomFont.ttf", customFontBase64);
        pdf.addFileToVFS("CustomFont.ttf", customFontBase64);
        pdf.addFont("CustomFont.ttf", "CustomFont", "normal");

        // Set the custom font as default
        pdf.setFont("CustomFont");

        // A4 dimensions in mm
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        // Margins
        const margin = 15;
        const contentWidth = pageWidth - margin * 2;
        let currentY = margin;

        // Colors from your theme
        const primaryColor = [33, 135, 92]; // #21875C
        const secondaryColor = [255, 197, 71]; // #FFC547
        const textColor = [51, 51, 51]; // Dark gray
        const lightGray = [128, 128, 128];

        // Helper functions
        const addNewPageIfNeeded = (requiredHeight) => {
            if (currentY + requiredHeight > pageHeight - margin) {
                pdf.addPage();
                currentY = margin;
                addPageHeader();
                return true;
            }
            return false;
        };

        const addPageHeader = () => {
            if (pdf.internal.getNumberOfPages() > 1) {
                pdf.setFontSize(11);
                pdf.setTextColor(...primaryColor);
                pdf.text(
                    `Care Log - ${
                        formData.firstName || "Maternal"
                    } (Continued)`,
                    margin,
                    currentY
                );
                pdf.line(
                    margin,
                    currentY + 2,
                    pageWidth - margin,
                    currentY + 2
                );
                currentY += 10;
            }
        };

        const addTitle = (title, fontSize = 16) => {
            addNewPageIfNeeded(15);
            pdf.setFontSize(fontSize);
            pdf.setTextColor(...primaryColor);
            pdf.text(title, margin, currentY);

            // Add underline
            const titleWidth = pdf.getTextWidth(title);
            pdf.setDrawColor(...secondaryColor);
            pdf.line(margin, currentY + 1, margin + titleWidth, currentY + 1);
            currentY += 5; // Reduced from 8 to 5 for less margin bottom
        };

        const addText = (text, fontSize = 10, color = textColor) => {
            pdf.setFontSize(fontSize);
            pdf.setTextColor(...color);

            // Handle long text with word wrapping
            const lines = pdf.splitTextToSize(text, contentWidth - 10);
            const lineHeight = fontSize * 0.4;

            addNewPageIfNeeded(lines.length * lineHeight + 5);

            lines.forEach((line) => {
                pdf.text(line, margin, currentY);
                currentY += lineHeight;
            });
            currentY += 3;
        };

        // Helper function to add signature image
        const addSignatureImage = (
            signatureData,
            label,
            maxWidth = 60,
            maxHeight = 20
        ) => {
            if (signatureData && typeof signatureData === "string") {
                try {
                    // Check if it's a base64 data URL
                    let base64Data = signatureData;

                    // If it doesn't start with data:image, add the prefix
                    if (!signatureData.startsWith("data:image/")) {
                        base64Data = `data:image/png;base64,${signatureData}`;
                    }

                    // Ensure we have enough space for the signature
                    addNewPageIfNeeded(maxHeight + 10);

                    // Add label
                    pdf.setFontSize(10);
                    pdf.setTextColor(...textColor);
                    pdf.text(`${label}:`, margin, currentY);
                    currentY += 6;

                    // Add signature image
                    pdf.addImage(
                        base64Data,
                        "PNG",
                        margin + 5,
                        currentY,
                        maxWidth,
                        maxHeight,
                        undefined,
                        "FAST"
                    );
                    currentY += maxHeight + 5;

                    return true;
                } catch (error) {
                    console.warn(
                        `Failed to add signature image for ${label}:`,
                        error
                    );
                    // Fallback to text
                    addText(`${label}: ✓ Signed`);
                    return false;
                }
            } else {
                addText(`${label}: Not provided`);
                return false;
            }
        };

        const addTable = (headers, rows, columnWidths) => {
            let x;

            const drawTableBorders = (startY, endY) => {
                // Outer border
                pdf.setDrawColor(200, 200, 200);
                pdf.rect(margin, startY, contentWidth, endY - startY);

                // Column borders
                let colX = margin;
                columnWidths.forEach((width) => {
                    colX += width;
                    if (colX < margin + contentWidth) {
                        pdf.line(colX, startY, colX, endY);
                    }
                });
            };

            // --- Draw header row ---
            const drawHeader = () => {
                x = margin;
                pdf.setFillColor(...primaryColor);
                pdf.rect(margin, currentY, contentWidth, 8, "F");
                pdf.setFontSize(10);
                pdf.setTextColor(255, 255, 255);
                headers.forEach((header, index) => {
                    pdf.text(header, x + 2, currentY + 5.5);
                    x += columnWidths[index];
                });
                currentY += 8;
                pdf.setTextColor(...textColor);
                pdf.setFontSize(9);
            };

            // Start table
            let segmentStartY = currentY;
            drawHeader();

            rows.forEach((row, rowIndex) => {
                // Prepare cell lines
                const cellLines = row.map((cell, cellIndex) =>
                    pdf.splitTextToSize(
                        cell || "-",
                        columnWidths[cellIndex] - 6
                    )
                );
                const maxLines = Math.max(
                    ...cellLines.map((lines) => lines.length)
                );
                const lineHeight = 5;
                const rowPadding = 2;
                let linesDrawn = 0;

                // For alternate row color
                let rowBgColor = rowIndex % 2 === 0 ? [245, 245, 245] : null;

                while (linesDrawn < maxLines) {
                    // How many lines can we fit on this page?
                    let availableLines = Math.floor(
                        (pageHeight - margin - currentY - rowPadding * 2) /
                            lineHeight
                    );
                    if (availableLines <= 0) {
                        // Draw borders for the finished segment
                        drawTableBorders(segmentStartY, currentY);

                        // Start new page/segment
                        pdf.addPage();
                        currentY = margin;
                        addPageHeader();
                        segmentStartY = currentY;
                        drawHeader();
                        availableLines = Math.floor(
                            (pageHeight - margin - currentY - rowPadding * 2) /
                                lineHeight
                        );
                    }

                    // How many lines to draw in this segment
                    const linesThisSegment = Math.min(
                        availableLines,
                        maxLines - linesDrawn
                    );
                    const segmentHeight =
                        linesThisSegment * lineHeight + rowPadding * 2;

                    // Draw background if needed
                    if (rowBgColor) {
                        pdf.setFillColor(...rowBgColor);
                        pdf.rect(
                            margin,
                            currentY,
                            contentWidth,
                            segmentHeight,
                            "F"
                        );
                    }

                    // Draw text cells for this segment
                    x = margin;
                    row.forEach((cell, cellIndex) => {
                        const lines = cellLines[cellIndex].slice(
                            linesDrawn,
                            linesDrawn + linesThisSegment
                        );
                        const cellX = x + 3;
                        let textY = currentY + rowPadding + lineHeight;
                        lines.forEach((line) => {
                            pdf.text(line, cellX, textY);
                            textY += lineHeight;
                        });
                        x += columnWidths[cellIndex];
                    });

                    currentY += segmentHeight;
                    linesDrawn += linesThisSegment;
                }
            });

            // Draw borders for the last segment
            drawTableBorders(segmentStartY, currentY);

            currentY += 10;
        };

        // Start generating PDF content

        // Main Header
        pdf.setFontSize(20);
        pdf.setTextColor(...primaryColor);
        const headerText = "MATERNAL DAILY CARE LOG";
        const headerX = (pageWidth - pdf.getTextWidth(headerText)) / 2;
        pdf.text(headerText, headerX, currentY);

        currentY += 8;
        pdf.setFontSize(10);
        pdf.setTextColor(...lightGray);
        const dateText = `Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`;
        const dateX = (pageWidth - pdf.getTextWidth(dateText)) / 2;
        pdf.text(dateText, dateX, currentY);

        // Header line
        pdf.setDrawColor(...primaryColor);
        pdf.line(margin, currentY + 3, pageWidth - margin, currentY + 3);
        currentY += 15;

        // Basic Information
        addTitle("Basic Information", 14);

        const basicInfo = [
            [
                `Name: ${formData.firstName || "Not specified"} ${
                    formData.lastName || ""
                }`,
                `Date: ${formData.date || "Not specified"}`,
            ],
            [
                `Age: ${formData.age || "Not specified"}`,
                `Gestational Age: ${
                    formData.gestationalAge || "Not specified"
                }`,
            ],
            [
                `Height: ${
                    formData.height ? formData.height + " cm" : "Not specified"
                }`,
                `Weight: ${
                    formData.weight ? formData.weight + " kg" : "Not specified"
                }`,
            ],
        ];
        currentY += 5;
        basicInfo.forEach((row) => {
            addNewPageIfNeeded(8);
            pdf.setFontSize(10);
            pdf.setTextColor(...textColor);
            pdf.text(row[0], margin, currentY);
            if (row[1]) {
                pdf.text(row[1], margin + contentWidth / 2, currentY);
            }
            currentY += 6;
        });
        currentY += 8; // Add more space after basic info

        // Helper function to format table data
        const formatTableData = (data, type) => {
            if (!data || data.length === 0) return [];

            return data
                .filter((item) => {
                    switch (type) {
                        case "hygiene":
                            return item.time || item.activity || item.notes;
                        case "medication":
                            return (
                                item.time ||
                                item.medication ||
                                item.dosage ||
                                item.route ||
                                item.notes
                            );
                        case "glucose":
                            return (
                                item.measurement_time ||
                                item.glucose_level ||
                                item.timing ||
                                item.note
                            );
                        case "mobility":
                            return (
                                item.time ||
                                item.duration ||
                                item.activity ||
                                item.notes
                            );
                        case "intake":
                            return (
                                item.meal_type ||
                                item.meal_time ||
                                item.food_items ||
                                item.amount ||
                                item.assistance_needed ||
                                item.intake_notes
                            );
                        case "output":
                            return (
                                item.output_time ||
                                item.urine_volume ||
                                item.urine_color ||
                                item.bowel_movement ||
                                item.bowel_consistency ||
                                item.output_notes
                            );
                        case "activities":
                            return (
                                item.activity ||
                                item.time ||
                                item.duration ||
                                item.notes
                            );
                        case "sleep":
                            return (
                                item.type ||
                                item.time ||
                                item.duration ||
                                item.quality ||
                                item.notes
                            );
                        case "accidents":
                            return (
                                item.time ||
                                item.description ||
                                item.severity ||
                                item.action
                            );
                        case "household":
                            return (
                                item.task ||
                                item.time ||
                                item.duration ||
                                item.notes
                            );
                        case "supplies":
                            return (
                                item.item ||
                                item.quantity ||
                                item.purpose ||
                                item.priority
                            );
                        default:
                            return true;
                    }
                })
                .map((item) => {
                    switch (type) {
                        case "hygiene":
                            return [
                                item.time || "-",
                                item.activity || "-",
                                item.notes || "None",
                            ];

                        case "medication":
                            return [
                                item.time || "-",
                                item.medication || "-",
                                item.dosage || "-",
                                item.route || "-",
                                item.notes || "None",
                            ];

                        case "glucose":
                            return [
                                item.measurement_time || "-",
                                item.glucose_level || "-",
                                item.timing || "-",
                                item.note || "None",
                            ];

                        case "intake":
                            return [
                                item.meal_type || "-",
                                item.meal_time || "-",
                                Array.isArray(item.food_items) &&
                                item.food_items.length > 0
                                    ? item.food_items.join(", ")
                                    : "-",
                                item.amount || "-",
                                item.assistance_needed ? "Yes" : "No",
                                item.intake_notes || "None",
                            ];
                        case "output":
                            return [
                                item.output_time || "-",
                                item.urine_volume || "-",
                                item.urine_color || "-",
                                item.bowel_movement || "-",
                                item.bowel_consistency || "None",
                                item.output_notes || "None",
                            ];

                        case "sleep":
                            return [
                                item.type || "-",
                                item.time || "-",
                                item.duration || "-",
                                item.quality || "-",
                                item.notes || "None",
                            ];
                        case "mobility":
                            return [
                                item.time || "-",
                                item.duration || "-",
                                item.activity || "-",
                                item.notes || "None",
                            ];

                        case "activities":
                            return [
                                item.activity || "-",
                                item.time || "-",
                                item.duration || "-",
                                item.details || "None",
                            ];

                        case "accidents":
                            return [
                                item.time || "-",
                                item.description || "-",
                                item.severity || "-",
                                item.action || "None",
                            ];

                        case "household":
                            return [
                                item.task || "-",
                                item.time || "-",
                                item.duration || "-",
                                item.notes || "None",
                            ];

                        case "supplies":
                            return [
                                item.item || "-",
                                item.quantity || "-",
                                item.purpose || "-",
                                item.priority || "-",
                            ];
                        default:
                            return [];
                    }
                });
        };

        // Function to add section with proper spacing
        const addSection = (
            title,
            data,
            headers,
            columnWidths,
            emptyMessage
        ) => {
            addTitle(title, 14);
            if (data.length > 0) {
                addTable(headers, data, columnWidths);
            } else {
                addText(emptyMessage, 10, lightGray);
                currentY += 8; // Add space after empty message
            }
        };

        // Hygiene & Grooming
        const hygieneData = formatTableData(formData.hygiene, "hygiene");
        addSection(
            "Hygiene & Grooming",
            hygieneData,
            ["Time", "Activity", "Notes"],
            [35, 45, 100],
            "No hygiene records found"
        );
        {
            formData.hygiene &&
                formData.hygiene.length > 0 &&
                (() => {
                    const anyMoisturizer = formData.hygiene.some(
                        (r) => r.moisturizer_applied
                    );
                    const anyPressure = formData.hygiene.some(
                        (r) => r.pressure_areas_checked
                    );
                    const anySkinCare = formData.hygiene.some(
                        (r) => r.skin_care_findings
                    );
                    if (!anyMoisturizer && !anyPressure && !anySkinCare)
                        return null;
                    return (
                        addTitle("Speical Skin Care", 11),
                        anyMoisturizer && addText("• Moisturizer applied."),
                        anyPressure &&
                            addText("• Pressure areas were checked."),
                        anySkinCare &&
                            addText(
                                `• Skin care findings: ${formData.hygiene
                                    .map((r) => r.skin_care_findings)
                                    .filter(Boolean)
                                    .join("; ")}`
                            ),
                        (anyMoisturizer || anyPressure || anySkinCare) &&
                            (currentY += 5) // Add space after this subsection
                    );
                })();
        }

        // Medication Records
        const medicationData = formatTableData(
            formData.medication,
            "medication"
        );
        addSection(
            "Medication Administration",
            medicationData,
            ["Time", "Medication", "Dosage", "Route", "Notes"],
            [35, 35, 35, 35, 40],
            "No medication records found"
        );

        // Health Monitoring
        addTitle("Health Monitoring", 14);
        // Vital Signs
        addTitle("Vital Signs", 12);
        if (
            formData.vitalSigns?.times &&
            formData.vitalSigns.times.length > 0
        ) {
            const vitalData = formData.vitalSigns.times
                .map((time, index) => [
                    time || "-",
                    formData.vitalSigns.temperature[index]
                        ? `${formData.vitalSigns.temperature[index]}°${
                              formData.vitalSigns.temperatureUnit[index] || "C"
                          }`
                        : "-",
                    formData.vitalSigns.pulseRate[index]
                        ? `${formData.vitalSigns.pulseRate[index]}/min`
                        : "-",
                    formData.vitalSigns.respiratoryRate[index]
                        ? `${formData.vitalSigns.respiratoryRate[index]}/min`
                        : "-",
                    formData.vitalSigns.bloodPressureSystolic[index]
                        ? `${formData.vitalSigns.bloodPressureSystolic[index]}/${formData.vitalSigns.bloodPressureDiastolic[index]} mmHg`
                        : "-",
                    formData.vitalSigns.spo2[index]
                        ? `${formData.vitalSigns.spo2[index]}%`
                        : "-",
                ])
                .filter((row) => row.some((cell) => cell !== "-"));

            if (vitalData.length > 0) {
                addTable(
                    [
                        "Time",
                        "Temperature",
                        "Pulse",
                        "Respiratory",
                        "Blood Pressure",
                        "SpO2",
                    ],
                    vitalData,
                    [30, 30, 30, 30, 30, 30]
                );
            } else {
                addText("No vital signs recorded", 10, lightGray);
                currentY += 8;
            }
        } else {
            addText("No vital signs recorded", 10, lightGray);
            currentY += 8;
        }
        addTitle("Blood Glucose Monitoring", 12);
        const bloodGlucoseData = formatTableData(
            formData.bloodGlucose,
            "glucose"
        );
        if (
            Array.isArray(formData.bloodGlucose) &&
            formData.bloodGlucose.length > 0
        ) {
            addTable(
                ["Time", "Glucose Level", "Timing", "Note"],
                bloodGlucoseData,
                [30, 60, 50, 40]
            );
        } else {
            addText("No blood glucose measurement recorded", 10, lightGray);
            currentY += 8;
        }

        // Activities
        const mobilityData = formatTableData(formData.mobility, "mobility");
        addSection(
            "Mobility & Exercises",
            mobilityData,
            ["Time", "Duration", "Activity", "Notes"],
            [35, 40, 35, 70],
            "No activity records found"
        );

        // Intake
        const intakeData = formatTableData(formData.intake, "intake");
        addSection(
            "Food Diary",
            intakeData,
            [
                "Meal Type",
                "Time",
                "Food/Drink",
                "Amount",
                "Assistance",
                "Notes",
            ],
            [30, 20, 60, 20, 20, 30],
            "No intake records found"
        );

        addTitle("Urinary & Bowel Health Records", 14);
        if (formData.output.length > 0) {
            formData.output.forEach((record, idx) => {
                // Show Recorded Time
                if (record.record_time) {
                    addText(`Recorded Time: ${record.record_time}`, 10);
                }

                // Show Urinary Frequency if available
                if (record.urine_frequency) {
                    addText(`Urinary Frequency: ${record.urine_frequency}`, 10);
                }

                // Show Blood in Urine if available
                if (record.blood_in_urine == 1) {
                    addText(
                        `Blood in Urine: ${
                            record.blood_in_urine == 1 ? "Yes" : "No"
                        }`,
                        10
                    );
                }

                // Show Pain & Discomfort at Urination if available
                if (record.pain_discomfort_urination == 1) {
                    addText(
                        `Pain & Discomfort at Urination: ${
                            record.pain_discomfort_urination == 1 ? "Yes" : "No"
                        }`,
                        10
                    );
                }

                // Show Discharge if available
                if (record.discharge == 1) {
                    addText(
                        `Discharge: ${record.discharge == 1 ? "Yes" : "No"}`,
                        10
                    );
                }

                // Show Bowel Movement Frequency if available
                if (record.bowel_movement_frequency) {
                    addText(
                        `Bowel Movement Frequency: ${record.bowel_movement_frequency}`,
                        10
                    );
                }

                // Show Blood in Stool if available
                if (record.blood_in_stool == 1) {
                    addText(
                        `Blood in Stool: ${
                            record.blood_in_stool == 1 ? "Yes" : "No"
                        }`,
                        10
                    );
                }

                // Show Other Symptoms if available
                if (record.other_symptoms) {
                    addText(`Other Symptoms: ${record.other_symptoms}`, 10);
                }

                currentY += 8;
            });
        } else {
            addText("No Urinary & Bowel Health records found", 10, lightGray);
            currentY += 8;
        }

        // Fetal Health Monitoring
        addTitle("Fetal Health Monitoring", 14);
        // Fetal Movement detected
        if (formData.fetalHealth.fetal_movement_detected) {
            addText(
                `Fetal Movement Detected: ${
                    formData.fetalHealth.fetal_movement_detected == 1
                        ? "Yes"
                        : "No"
                }`,
                10
            );
        } else {
            addText("No fetal movement recorded", 10, lightGray);
        }

        // Show Fetal Kick Count
        if (formData.fetalHealth.kick_count) {
            addText(`Fetal Kick Count: ${formData.fetalHealth.kick_count}`, 10);
        } else {
            addText("No fetal kick count recorded", 10, lightGray);
        }

        // Show Fetal Heart Sound
        if (formData.fetalHealth.fetal_heart_sound) {
            addText(
                `Fetal Heart Rate: ${formData.fetalHealth.fetal_heart_sound} bpm`,
                10
            );
        } else {
            addText("No fetal heart rate recorded", 10, lightGray);
        }

        // Show Other Symptoms if available
        if (formData.fetalHealth.notes) {
            addText(`Additional notes: ${formData.fetalHealth.notes}`, 10);
        }

        currentY += 8;

        // Activities
        const activitiesData = formatTableData(
            formData.activities,
            "activities"
        );
        addSection(
            "Activities",
            activitiesData,
            ["Activity", "Time", "Duration", "Notes"],
            [35, 40, 35, 70],
            "No activity records found"
        );

        // Sleep Records
        const sleepData = formatTableData(formData.sleep, "sleep");
        addSection(
            "Sleep Records",
            sleepData,
            ["Type", "Start Time", "Duration", "Quality", "Notes"],
            [35, 35, 35, 35, 40],
            "No sleep records found"
        );
        addText(`Sleep Issues: ${formData.sleepIssues || "None reported"}`);
        currentY += 5;

        // Emotional & Behavioral Observations
        addTitle("Emotional & Behavioral Observations", 14);
        addText(`General Mood: ${formData.emotionalMood || "Not specified"}`);
        addText(
            `Behavioral Concerns: ${
                formData.behavioralConcerns || "None reported"
            }`
        );
        addText(`Action Taken: ${formData.emotionalActionTaken || "-"}`);
        currentY += 5; // Add space

        // Accident & Emergency Situations
        const accidentData = formatTableData(formData.accidents, "accidents");
        addSection(
            "Accident & Emergency Situations",
            accidentData,
            ["Time", "Description", "Severity", "Action Taken"],
            [25, 80, 25, 50],
            "No accidents or emergencies reported"
        );

        // Household Tasks
        const householdData = formatTableData(formData.household, "household");
        addSection(
            "Household Tasks",
            householdData,
            ["Task", "Time", "Duration", "Notes"],
            [50, 30, 30, 70],
            "No household tasks recorded"
        );

        // Requested Supplies
        const suppliesData = formatTableData(formData.supplies, "supplies");
        addSection(
            "Requested Supplies",
            suppliesData,
            ["Item", "Quantity", "Purpose", "Priority"],
            [40, 25, 65, 50],
            "No supply requests found"
        );

        // Signatures
        addTitle("Signatures", 14);
        addNewPageIfNeeded(60);

        const colWidth = (contentWidth - 10) / 2;
        const leftX = margin;
        const rightX = margin + colWidth + 10;
        let sectionY = currentY;

        // Caregiver (left)
        let caregiverY = sectionY;
        pdf.setFontSize(11);
        pdf.setTextColor(...primaryColor);
        pdf.text("Caregiver Information", leftX, caregiverY);
        caregiverY += 8;

        pdf.setFontSize(10);
        pdf.setTextColor(...textColor);
        pdf.text(
            `Name: ${formData.caregiverName || "Not provided"}`,
            leftX,
            caregiverY
        );
        caregiverY += 6;

        if (
            formData.caregiverSignature &&
            typeof formData.caregiverSignature === "string" &&
            formData.caregiverSignature.trim() !== ""
        ) {
            let base64Data = formData.caregiverSignature;
            let imageType = "PNG";
            if (base64Data.startsWith("data:image/jpeg")) {
                imageType = "JPEG";
            } else if (base64Data.startsWith("data:image/png")) {
                imageType = "PNG";
            } else if (!base64Data.startsWith("data:image/")) {
                base64Data = `data:image/png;base64,${base64Data}`;
                imageType = "PNG";
            }
            pdf.addImage(
                base64Data,
                imageType,
                leftX + 5,
                caregiverY,
                60,
                20,
                undefined,
                "FAST"
            );
            caregiverY += 25;
        } else {
            pdf.text("Signature: Not provided", leftX, caregiverY);
            caregiverY += 8;
        }
        // Guardian (right)
        let guardianY = sectionY;
        pdf.setFontSize(11);
        pdf.setTextColor(...primaryColor);
        pdf.text("Client Information", rightX, guardianY);
        guardianY += 8;

        pdf.setFontSize(10);
        pdf.setTextColor(...textColor);

        if (
            formData.guardianSignature &&
            typeof formData.guardianSignature === "string" &&
            formData.guardianSignature.trim() !== ""
        ) {
            let base64Data = formData.guardianSignature;
            let imageType = "PNG";
            if (base64Data.startsWith("data:image/jpeg")) {
                imageType = "JPEG";
            } else if (base64Data.startsWith("data:image/png")) {
                imageType = "PNG";
            } else if (!base64Data.startsWith("data:image/")) {
                base64Data = `data:image/png;base64,${base64Data}`;
                imageType = "PNG";
            }
            pdf.addImage(
                base64Data,
                imageType,
                rightX + 5,
                guardianY,
                60,
                20,
                undefined,
                "FAST"
            );
            guardianY += 25;
        } else {
            pdf.text("Signature: Not provided", rightX, guardianY);
            guardianY += 8;
        }

        const commentText = `Comment: ${
            formData.guardianComment || "No comment"
        }`;
        const wrappedComment = pdf.splitTextToSize(
            commentText,
            pageWidth - rightX - margin
        );
        wrappedComment.forEach((line) => {
            pdf.text(line, rightX, guardianY);
            guardianY += 5; // Adjust line height as needed
        });

        guardianY += 8;

        // Move currentY below both columns
        currentY = Math.max(caregiverY, guardianY) + 5;

        // Add page numbers to all pages
        const totalPages = pdf.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            pdf.setFontSize(9);
            pdf.setTextColor(...lightGray);
            pdf.text(
                `Page ${i} of ${totalPages}`,
                pageWidth - margin - 25,
                pageHeight - 8
            );
        }

        // Footer
        addNewPageIfNeeded(20);
        currentY += 10;
        pdf.setFontSize(9);
        pdf.setTextColor(...lightGray);
        const footerText = "Generated by Hearty Aid Care Logs System";
        const footerX = (pageWidth - pdf.getTextWidth(footerText)) / 2;
        pdf.text(footerText, footerX, currentY);

        // Generate filename with timestamp
        const timestamp = new Date()
            .toISOString()
            .slice(0, 19)
            .replace(/[:.]/g, "-");
        const filename = `${
            formData.firstName || "Baby"
        }_Care_Log_${timestamp}.pdf`;

        // Save the PDF
        pdf.save(filename);

        return { success: true, filename, pages: totalPages };
    } catch (error) {
        console.error("Error generating PDF:", error);
        return { success: false, error: error.message };
    }
};
