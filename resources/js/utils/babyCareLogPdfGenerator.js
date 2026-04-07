import jsPDF from "jspdf";
import customFontBase64 from "./customFontBase64.js";
import { genevaCareLogsGeneratedLine } from "./genevaCareLogStrings.js";

export const generateBabyCareLogPDF = async (formData) => {
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
        const primaryColor = [135, 92, 209]; // theme palette.primary.main #875cd1
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
                    `Care Log - ${formData.firstName || "Baby"} (Continued)`,
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
            currentY += 5;
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

            // Draw header row
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
        pdf.setFontSize(18);
        pdf.setTextColor(...primaryColor);
        const headerText = "BABY CARE LOG";
        const headerX = (pageWidth - pdf.getTextWidth(headerText)) / 2;
        pdf.text(headerText, headerX, currentY);

        currentY += 8;
        pdf.setFontSize(10);
        pdf.setTextColor(...lightGray);
        const subtitleLines = pdf.splitTextToSize(
            genevaCareLogsGeneratedLine(),
            contentWidth
        );
        subtitleLines.forEach((line) => {
            const lineX = (pageWidth - pdf.getTextWidth(line)) / 2;
            pdf.text(line, lineX, currentY);
            currentY += 5;
        });

        // Header line
        pdf.setDrawColor(...primaryColor);
        pdf.line(margin, currentY + 3, pageWidth - margin, currentY + 3);
        currentY += 15;

        // Basic Information
        addTitle("Basic Information", 14);

        const basicInfo = [
            [
                `Child Name: ${formData.firstName || "Not specified"} ${
                    formData.lastName || ""
                }`,
                `Date: ${formData.date || "Not specified"}`,
            ],
            [
                `Age: ${formData.age || "Not specified"}`,
                `Weight: ${
                    formData.weight ? formData.weight + " kg" : "Not specified"
                }`,
            ],
            [
                `Height: ${
                    formData.height ? formData.height + " cm" : "Not specified"
                }`,
                ``,
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
        currentY += 8;

        // Helper function to format table data
        const formatTableData = (data, type) => {
            if (!data || data.length === 0) return [];

            return data
                .filter((item) => {
                    switch (type) {
                        case "feeding":
                            return (
                                item.time ||
                                item.type ||
                                item.amount ||
                                item.notes
                            );
                        case "foodOffered":
                            return (
                                item.mealTime ||
                                item.foodOffer ||
                                item.quantity ||
                                item.texture ||
                                item.reaction
                            );
                        case "diaper":
                            return item.time || item.content || item.notes;
                        case "toileting":
                            return (
                                item.time ||
                                item.toiletAttempt ||
                                item.result ||
                                item.type ||
                                item.reaction ||
                                item.notes
                            );
                        case "sleep":
                            return (
                                item.timeStarted ||
                                item.timeEnded ||
                                item.duration ||
                                item.notes
                            );
                        case "activities":
                            return (
                                item.time ||
                                item.activity ||
                                item.duration ||
                                item.details
                            );
                        case "hygiene":
                            return (
                                item.time ||
                                item.activity ||
                                item.products ||
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
                        case "feeding":
                            return [
                                item.time || "-",
                                item.type || "-",
                                item.amount
                                    ? `${item.amount} ${
                                          item.amount_unit || "ml"
                                      }`
                                    : "-",
                                item.notes || "None",
                            ];
                        case "foodOffered":
                            return [
                                item.mealTime || "-",
                                item.foodOffer || "-",
                                item.quantity || "-",
                                item.texture || "-",
                                item.reaction || "None",
                            ];
                        case "diaper":
                            return [
                                item.time || "-",
                                item.content || "-",
                                item.notes || "None",
                            ];
                        case "toileting":
                            return [
                                item.time || "-",
                                item.toiletAttempt || "-",
                                item.result || "-",
                                item.type || "-",
                                item.reaction || "-",
                                item.notes || "None",
                            ];
                        case "sleep":
                            return [
                                item.timeStarted || "-",
                                item.timeEnded || "-",
                                item.duration || "-",
                                item.notes || "None",
                            ];
                        case "activities":
                            return [
                                item.time || "-",
                                item.activity || "-",
                                item.duration || "-",
                                item.details || "None",
                            ];
                        case "hygiene":
                            return [
                                item.time || "-",
                                item.activity || "-",
                                item.products || "-",
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
                currentY += 8;
            }
        };

        // Feeding Records
        const feedingData = formatTableData(formData.feeding, "feeding");
        addSection(
            "Feeding Records",
            feedingData,
            ["Time", "Type", "Amount", "Notes"],
            [35, 40, 35, 70],
            "No feeding records found"
        );

        // Food Offered Records
        const foodOfferedData = formatTableData(
            formData.foodOffered,
            "foodOffered"
        );
        addSection(
            "Food Offered",
            foodOfferedData,
            ["Meal Time", "Food", "Quantity", "Texture", "Reaction"],
            [30, 35, 30, 30, 55],
            "No food offered records found"
        );

        // Diaper Changes
        const diaperData = formatTableData(formData.diaperChanges, "diaper");
        addSection(
            "Diaper Changes",
            diaperData,
            ["Time", "Content", "Notes"],
            [40, 40, 100],
            "No diaper change records found"
        );

        // Toileting and Training Records
        const toiletingData = formatTableData(formData.toileting, "toileting");
        addSection(
            "Toileting and Training Report",
            toiletingData,
            ["Time", "Attempt", "Result", "Type", "Reaction", "Notes"],
            [25, 25, 25, 25, 35, 45],
            "No toileting training records found"
        );

        // Sleep Records
        const sleepData = formatTableData(formData.sleep, "sleep");
        addSection(
            "Sleep Records",
            sleepData,
            ["Start Time", "End Time", "Duration", "Notes"],
            [35, 35, 35, 75],
            "No sleep records found"
        );

        // Activities
        const activitiesData = formatTableData(
            formData.activities,
            "activities"
        );
        addSection(
            "Activities",
            activitiesData,
            ["Time", "Activity", "Duration", "Notes"],
            [35, 40, 35, 70],
            "No activity records found"
        );

        // Hygiene & Grooming
        const hygieneData = formatTableData(formData.hygiene, "hygiene");
        addSection(
            "Hygiene & Grooming",
            hygieneData,
            ["Time", "Activity", "Products", "Notes"],
            [35, 40, 40, 65],
            "No hygiene records found"
        );

        // Health & Behavior
        addTitle("Health & Behavior", 14);
        addText(`Mood: ${formData.mood || "Not specified"}`);
        addText(`Symptoms: ${formData.symptoms || "None reported"}`);
        addText(`Medications: ${formData.medications || "None given"}`);
        currentY += 5;

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
                ])
                .filter((row) => row.some((cell) => cell !== "-"));

            if (vitalData.length > 0) {
                addTable(
                    ["Time", "Temperature", "Pulse", "Respiratory"],
                    vitalData,
                    [40, 40, 40, 60]
                );
            } else {
                addText("No vital signs recorded", 10, lightGray);
                currentY += 8;
            }
        } else {
            addText("No vital signs recorded", 10, lightGray);
            currentY += 8;
        }

        // Additional Notes
        addTitle("Additional Notes", 14);
        addText(formData.additionalNotes || "No additional notes");
        currentY += 5;

        // Requested Supplies
        const suppliesData = formatTableData(
            formData.requestedSupplies,
            "supplies"
        );
        addSection(
            "Requested Supplies",
            suppliesData,
            ["Item", "Quantity", "Purpose", "Priority"],
            [40, 25, 65, 50],
            "No supply requests found"
        );

        // Signatures
        addNewPageIfNeeded(60);
        addTitle("Signatures", 14);

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
            guardianY += 5;
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
        const dateStr = new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        const footerText = `Generated by Geneva Care Logs system on ${dateStr}.`;
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
