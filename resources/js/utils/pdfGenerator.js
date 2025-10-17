import jsPDF from "jspdf";
import customFontBase64 from "./customFontBase64.js";

export const generateCareLogPDF = async (formData) => {
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

        const addPageNumber = () => {
            const pageNum = pdf.internal.getNumberOfPages();
            pdf.setFontSize(9);
            pdf.setTextColor(...lightGray);
            pdf.text(
                `Page ${pageNum}`,
                pageWidth - margin - 15,
                pageHeight - 8
            );
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
            const tableHeight = (rows.length + 1) * 8 + 10;
            addNewPageIfNeeded(tableHeight);

            const startY = currentY;
            let x = margin;

            // Header row
            pdf.setFillColor(...primaryColor);
            pdf.rect(margin, currentY, contentWidth, 8, "F");

            pdf.setFontSize(10);
            pdf.setTextColor(255, 255, 255); // White text

            headers.forEach((header, index) => {
                pdf.text(header, x + 2, currentY + 5.5);
                x += columnWidths[index];
            });

            currentY += 8;

            // Data rows
            pdf.setTextColor(...textColor);
            pdf.setFontSize(9);

            rows.forEach((row, rowIndex) => {
                x = margin;

                // Alternate row colors
                if (rowIndex % 2 === 0) {
                    pdf.setFillColor(245, 245, 245);
                    pdf.rect(margin, currentY, contentWidth, 7, "F");
                }

                row.forEach((cell, cellIndex) => {
                    const cellText = pdf.splitTextToSize(
                        cell || "N/A",
                        columnWidths[cellIndex] - 4
                    );
                    pdf.text(cellText[0] || "", x + 2, currentY + 5);
                    x += columnWidths[cellIndex];
                });

                currentY += 7;
            });

            // Table border
            pdf.setDrawColor(200, 200, 200);
            pdf.rect(margin, startY, contentWidth, currentY - startY);

            // Column borders
            x = margin;
            columnWidths.forEach((width) => {
                x += width;
                if (x < margin + contentWidth) {
                    pdf.line(x, startY, x, currentY);
                }
            });

            currentY += 12; // Increased from 5 to 12 for more space after table
        };

        // Start generating PDF content

        // Main Header
        pdf.setFontSize(20);
        pdf.setTextColor(...primaryColor);
        const headerText = "NEWBORN BABY DAILY CARE LOG";
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
                `Date: ${formData.date || "Not specified"}`,
                `Baby Name: ${formData.firstName || "Not specified"} ${
                    formData.lastName || ""
                }`,
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
                        case "feeding":
                            return (
                                item.time ||
                                item.type ||
                                item.amount ||
                                item.notes
                            );
                        case "diaper":
                            return item.time || item.content || item.notes;
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
                                item.time || "N/A",
                                item.type || "N/A",
                                item.amount
                                    ? `${item.amount} ${
                                          item.amount_unit || "ml"
                                      }`
                                    : "N/A",
                                item.notes || "None",
                            ];
                        case "diaper":
                            return [
                                item.time || "N/A",
                                item.content || "N/A",
                                item.notes || "None",
                            ];
                        case "sleep":
                            return [
                                item.timeStarted || "N/A",
                                item.timeEnded || "N/A",
                                item.duration || "N/A",
                                item.notes || "None",
                            ];
                        case "activities":
                            return [
                                item.time || "N/A",
                                item.activity || "N/A",
                                item.duration || "N/A",
                                item.details || "None",
                            ];
                        case "hygiene":
                            return [
                                item.time || "N/A",
                                item.activity || "N/A",
                                item.products || "N/A",
                                item.notes || "None",
                            ];
                        case "supplies":
                            return [
                                item.item || "N/A",
                                item.quantity || "N/A",
                                item.purpose || "N/A",
                                item.priority || "N/A",
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

        // Feeding Records
        const feedingData = formatTableData(formData.feeding, "feeding");
        addSection(
            "Feeding Records",
            feedingData,
            ["Time", "Type", "Amount", "Notes"],
            [35, 40, 35, 70],
            "No feeding records found"
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
        currentY += 5; // Add space before vital signs

        // Vital Signs
        addTitle("Vital Signs", 12);
        if (
            formData.vitalSigns?.times &&
            formData.vitalSigns.times.length > 0
        ) {
            const vitalData = formData.vitalSigns.times
                .map((time, index) => [
                    time || "N/A",
                    formData.vitalSigns.temperature[index]
                        ? `${formData.vitalSigns.temperature[index]}°${
                              formData.vitalSigns.temperatureUnit[index] || "C"
                          }`
                        : "N/A",
                    formData.vitalSigns.pulseRate[index]
                        ? `${formData.vitalSigns.pulseRate[index]}/min`
                        : "N/A",
                    formData.vitalSigns.respiratoryRate[index]
                        ? `${formData.vitalSigns.respiratoryRate[index]}/min`
                        : "N/A",
                ])
                .filter((row) => row.some((cell) => cell !== "N/A"));

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
        addTitle("Signatures", 14);
        addNewPageIfNeeded(60); // More space needed for signature images

        // Caregiver section
        pdf.setFontSize(11);
        pdf.setTextColor(...primaryColor);
        pdf.text("Caregiver Information", margin, currentY);
        currentY += 8;

        pdf.setFontSize(10);
        pdf.setTextColor(...textColor);
        addText(`Name: ${formData.caregiverName || "Not provided"}`);

        // Add caregiver signature image
        addSignatureImage(formData.caregiverSignature, "Signature", 60, 20);

        currentY += 5;

        // Guardian section
        pdf.setFontSize(11);
        pdf.setTextColor(...primaryColor);
        pdf.text("Guardian Information", margin, currentY);
        currentY += 8;

        pdf.setFontSize(10);
        pdf.setTextColor(...textColor);

        // Add guardian signature image
        addSignatureImage(formData.guardianSignature, "Signature", 60, 20);
        addText(`Comment: ${formData.guardianComment || "No comment"}`);

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
