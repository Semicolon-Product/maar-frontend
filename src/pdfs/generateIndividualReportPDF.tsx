import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Helper to load image from URL and return base64 data
const getImageBase64FromUrl = async (url: string): Promise<string> => {
  const res = await fetch(url);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const generateIndividualReportPDF = async (data: any) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(16);
  doc.text("Individual Student Activity Report", 14, 20);

  // Basic Info
  doc.setFontSize(12);
  doc.text(`Name: ${data.name}`, 14, 30);
  doc.text(`Roll No: ${data.rollNo}`, 14, 38);
  doc.text(`Total Points: ${data.points}`, 14, 46);
  doc.text(`Verified: ${data.verified ? "Yes" : "No"}`, 14, 54);

  // Table
  let finalY = 62;
  autoTable(doc, {
    startY: finalY,
    head: [["S.No", "Activity", "Date", "Points", "Document"]],
    body: data.activities.map((item: any) => [
      item.serialNo,
      item.name,
      item.date,
      item.points,
      item.docs,
    ]),
    theme: "striped",
    didDrawPage: (data) => {
      finalY = data.cursor?.y ?? finalY; // Track where the table ends
    },
  });

  // Insert each image below the table
  for (let i = 0; i < data.activities.length; i++) {
    const activity = data.activities[i];
    const imageData = await getImageBase64FromUrl(activity.link);

    // Check space; add page if needed
    if (finalY > 250) {
      doc.addPage();
      finalY = 20;
    }

    doc.setFontSize(11);
    doc.text(`${activity.serialNo}. ${activity.name} - Certificate:`, 14, finalY + 10);
    doc.addImage(imageData, "PNG", 14, finalY + 14, 60, 40); // Adjust size as needed
    finalY += 60;
  }

  // === Signature Section ===
  if (data.signature) {
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();

    // If not enough space, add new page
    if (finalY > pageHeight - 50) {
      doc.addPage();
      finalY = 20;
    }

    try {
      const signatureImg = await getImageBase64FromUrl(data.signature);
      const imgWidth = 50;
      const imgHeight = 25;
      const x = pageWidth - imgWidth - 20;
      const y = pageHeight - imgHeight - 20;

      doc.setFontSize(12);
      doc.text("Signature:", x, y - 5);
      doc.addImage(signatureImg, "PNG", x, y, imgWidth, imgHeight);
    } catch (err) {
      console.error("Failed to load signature image", err);
    }
  }

  // Save the PDF
  doc.save(`${data.rollNo}_report.pdf`);
};
