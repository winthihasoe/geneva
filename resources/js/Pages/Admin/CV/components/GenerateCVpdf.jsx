import { jsPDF } from "jspdf";

export const generateCVPdf = async (cv) => {
    const doc = new jsPDF("portrait", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Theme Colors
    const colors = {
        primary: [135, 92, 209], // #875cd1
        lightPurple: [147, 122, 192], // #937ac0ff
        background: [248, 245, 255], // Slightly lighter background for a cleaner look
        secondary: [167, 42, 41], // #a72a29
        white: [255, 255, 255],
        gray: [60, 60, 60], // Darker gray for better readability
        lightGray: [150, 150, 150],
        textMuted: [108, 117, 125],
    };

    const leftWidth = pageWidth * 0.38;
    const rightX = leftWidth + 6; // Reduced gap between sections
    const margin = 15; // Reduced from 10
    const contentX = leftWidth + margin;
    const contentWidth = pageWidth - leftWidth - margin * 2;

    // ================= BACKGROUNDS =================
    // Left Sidebar
    doc.setFillColor(...colors.background);
    doc.rect(0, 0, leftWidth, pageHeight, "F");

    // Top Purple Accent
    doc.setFillColor(...colors.lightPurple);
    doc.rect(0, 0, leftWidth, 110, "F");

    // Load and add logo at top right (Main Content Area)
    try {
        const logo = new Image();
        logo.src = "/images/logo/logo.png";
        await new Promise((resolve) => {
            logo.onload = resolve;
        });
        const logoWidth = 20;
        const logoHeight = (logo.height / logo.width) * logoWidth;
        doc.addImage(logo, "PNG", pageWidth - 30, 5, logoWidth, logoHeight);
    } catch (error) {
        console.error("Error loading logo:", error);
    }

    // ================= PROFILE PHOTO (Aspect Ratio Fixed) =================
    let leftY = 12; // Reduced from 15
    const photoMaxWidth = leftWidth - margin * 2;
    const photoMaxHeight = 80;

    if (cv?.profile_photo) {
        try {
            const profileImg = new Image();
            profileImg.crossOrigin = "anonymous";
            profileImg.src = `/storage/${cv?.profile_photo}`;
            await new Promise((resolve, reject) => {
                profileImg.onload = resolve;
                profileImg.onerror = reject;
            });

            // Calculate Aspect Ratio
            const imgRatio = profileImg.width / profileImg.height;
            let renderWidth = photoMaxWidth;
            let renderHeight = photoMaxWidth / imgRatio;

            if (renderHeight > photoMaxHeight) {
                renderHeight = photoMaxHeight;
                renderWidth = photoMaxHeight * imgRatio;
            }

            // Center image in the sidebar width
            const photoX = (leftWidth - renderWidth) / 2;
            doc.addImage(
                profileImg,
                "JPEG",
                photoX,
                leftY,
                renderWidth,
                renderHeight
            );
            leftY += renderHeight + 8; // Reduced from 10
        } catch (error) {
            console.error("Error loading profile photo:", error);
            leftY += 20;
        }
    }

    // ================= PERSONAL DETAILS BOX =================
    const boxMargin = 5; // Reduced from 5
    const boxWidth = leftWidth - boxMargin * 2;

    doc.setFillColor(...colors.primary);
    doc.roundedRect(boxMargin, leftY, boxWidth, 48, 2, 2, "F"); // Increased height from 45

    doc.setFontSize(13); // Increased from 10
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...colors.white);
    doc.text("PERSONAL DETAILS", boxMargin + 4, leftY + 7);

    doc.setDrawColor(...colors.white);
    doc.setLineWidth(0.2);
    doc.line(boxMargin + 4, leftY + 9, boxMargin + boxWidth - 4, leftY + 9);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    let detailY = leftY + 16;

    const calculateAge = (dob) => {
        if (!dob) return "N/A";
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        if (
            today.getMonth() < birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() &&
                today.getDate() < birthDate.getDate())
        )
            age--;
        return age;
    };

    const details = [
        `ID: ${cv?.geneva_id || "N/A"}`,
        `Age: ${calculateAge(cv?.date_of_birth)} Years`,
        `Status: ${cv?.marital_status || "N/A"}`,
        `Religion: ${cv?.religion || "N/A"}`,
        `${cv?.weight || "N/A"}kg | ${cv?.height || "N/A"}cm`,
    ];

    details.forEach((text) => {
        doc.text(text, boxMargin + 4, detailY);
        detailY += 5.5; // Increased from 5
    });

    leftY += 58; // Increased from 55

    // ================= LEFT SECTION: QUALIFICATIONS & EXP =================
    const drawLeftSection = (title, items, processFn) => {
        if (!items || items.length === 0) return;

        doc.setFontSize(13);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...colors.primary);
        doc.text(title.toUpperCase(), boxMargin + 2, leftY);

        leftY += 2;
        doc.setDrawColor(...colors.primary);
        doc.line(boxMargin + 2, leftY, leftWidth - 4, leftY); // Reduced end margin from 5
        leftY += 5;

        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...colors.gray);

        items.forEach((item) => {
            const text = processFn(item);
            const splitText = doc.splitTextToSize(text, leftWidth - 12); // Reduced from 15
            doc.text(splitText, boxMargin + 2, leftY);
            leftY += splitText.length * 4.5 + 2; // Increased line height from 4
        });
        leftY += 4; // Reduced from 5
    };

    drawLeftSection(
        "RELEVANT QUALIFICATIONS",
        cv?.certificates,
        (c) =>
            `• ${c.qualification_type ? c.qualification_type + " - " : ""}${
                c.course
            } (${new Date(c.start_date).getFullYear()})`
    );

    drawLeftSection("Experiences", cv?.experiences, (e) => `• ${e.experience}`);

    // ================= RIGHT SECTION: HEADER =================
    let rightY = 20; // Reduced from 25

    // Name
    doc.setFontSize(28); // Increased from 26
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...colors.secondary);
    const name = cv?.full_name?.toUpperCase() || "NAME";
    const nameLines = doc.splitTextToSize(name, pageWidth - rightX - margin);
    doc.text(nameLines, rightX, rightY);
    rightY += nameLines.length * 10 + 4; // Reduced spacing from 5

    // Contact
    doc.setFontSize(13);
    doc.setTextColor(...colors.primary);
    doc.text("CONTACT INFORMATION", rightX, rightY);

    doc.setDrawColor(...colors.primary);
    doc.setLineWidth(0.5);
    doc.line(rightX, rightY + 2, pageWidth - margin, rightY + 2);

    rightY += 8;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...colors.gray);
    doc.text(`Phone: 09970006670, 09980160003`, rightX, rightY);
    rightY += 5.5; // Increased from 5
    doc.text(`Viber: 09970006670`, rightX, rightY);
    rightY += 5.5; // Increased from 5
    doc.text(`Email: genevacaregivertraining@gmail.com`, rightX, rightY);
    rightY += 5.5; // Increased from 5
    doc.text(`Website: genevacaregiver.com`, rightX, rightY);

    rightY += 12; // Reduced from 15

    // ================= SKILLS SECTION =================
    doc.setFillColor(...colors.primary);
    doc.rect(rightX, rightY, 32, 9, "F"); // Increased width and height
    doc.setFontSize(13); // Increased from 10
    doc.setTextColor(...colors.white);
    doc.setFont("helvetica", "bold");
    doc.text("SKILLS", rightX + 6, rightY + 6); // Adjusted position

    rightY += 14; // Reduced from 15

    const renderSkillGroup = (title, skills) => {
        if (!skills || skills.length === 0) return;
        doc.setFontSize(11); // Increased from 10
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...colors.secondary);
        doc.text(title, rightX, rightY);
        rightY += 5.5; // Increased from 5

        doc.setFontSize(11); // Increased from 9
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...colors.gray);

        skills.forEach((skill) => {
            doc.text(`• ${skill}`, rightX + 2, rightY);
            rightY += 5.5; // Increased from 5
        });
        rightY += 4; // Reduced from 5
    };

    renderSkillGroup("Baby Care", cv?.nursing_skills_for_child);
    renderSkillGroup("Elderly Care", cv?.nursing_skills_for_elder);

    // Final border line
    doc.setDrawColor(...colors.primary);
    doc.line(rightX, rightY, pageWidth - margin, rightY);

    // Footer
    const footerY = pageHeight - 10;
    doc.setFontSize(8);
    doc.setTextColor(...colors.textMuted);
    doc.text(
        "Geneva Caregiver Training & Service - www.genevacaregiver.com",
        contentX + contentWidth / 2,
        footerY,
        { align: "center" }
    );

    // Save PDF
    doc.save(`${cv?.full_name + " CV" || "CV"}.pdf`);
};
