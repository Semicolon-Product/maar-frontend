import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { saveAs } from "file-saver";
import type { IndividualActivity } from "@/components/types/superadminType";

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
  const total = data?.activities?.reduce((total:number, item:IndividualActivity) => total + (item.point || 0), 0)
  // Title
  doc.setFontSize(16);
  doc.text(`${data.name} Activity Report` , 14, 20);


  // Basic Info
  doc.setFontSize(12);
  doc.text(`Name: ${data.name}`, 14, 30);
  doc.text(`Roll No: ${data.roll_no}`, 14, 38);
  doc.text(`Total Points: ${total}`, 14, 46);
  doc.text(`Verified: ${data?.status ? "Yes" : "No"}`, 14, 54);

  // Table
  let finalY = 62;
  autoTable(doc, {
    startY: finalY,
    head: [["Sr.No", "Activity Serial No", "Activity", "Date", "Points", "Document"]],
    body: data.activities.map((item: any, index: number) => [
      index,
      item.activity_serial_no,
      item.activity_name,
      item.uploaded_at,
      item.point,
      item.document_url,
    ]),
    theme: "striped",
    didDrawPage: (data) => {
      finalY = data.cursor?.y ?? finalY; // Track where the table ends
    },
  });

  // Insert each image below the table
  for (let i = 0; i < data.activities.length; i++) {
    const activity = data.activities[i];

    if (activity.link) {
      try {
        const imageData = await getImageBase64FromUrl(activity.link);

        // Check space; add page if needed
        if (finalY > 250) {
          doc.addPage();
          finalY = 20;
        }

        doc.setFontSize(11);
        doc.text(`${activity.serialNo}. ${activity.name} - Certificate:`, 14, finalY + 10);
        doc.addImage(imageData, "PNG", 14, finalY + 14, 60, 40);
        finalY += 60;
      } catch (error) {
        console.warn(`Image load failed for ${activity.name}`);
      }
    }
  }

  // === Signature Section ===
  if (data.signature) {
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();

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

  // Save the PDF using FileSaver (more reliable in Edge/Firefox)
  const pdfBlob = doc.output("blob");
  saveAs(pdfBlob, `${data.roll_no}_report.pdf`);
};
