import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Convert image URL to base64
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

export const generateAllReports = async (
  students: any[],
  signature: string
) => {
  const doc = new jsPDF();
  const teacherSignature = await getImageBase64FromUrl(signature);

  const wrapText = (text: string, limit: number) => {
    if (!text) return "";
    if (text.length <= limit) return text;
    let result = "";
    let line = "";
    text.split(" ").forEach((word) => {
      if ((line + word).length <= limit) {
        line += (line ? " " : "") + word;
      } else {
        result += (result ? "\n" : "") + line;
        line = word;
      }
    });
    if (line) result += (result ? "\n" : "") + line;
    return result;
  };

  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    if (i > 0) doc.addPage();

    doc.setFontSize(16);
    doc.text("Student Activity Report", 14, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${student.name}`, 14, 30);
    doc.text(`Roll No: ${student.roll_no}`, 14, 38);
    doc.text(`Total Points: ${student.point}`, 14, 46);
    doc.text(`Verified: ${student.status ? "Yes" : "No"}`, 14, 54);

    let finalY = 62;

    // === Table ===
    autoTable(doc, {
      startY: finalY,
      head: [["ActivitySerialNo", "Activity", "Date", "Points"]],
      body: student.activities.map((item: any) => [
        item.activity_serial_no,
        wrapText(item.activity_name, 39),
        item.uploaded_at.split("T")[0],
        item.point,
      ]),
      theme: "striped",
      didDrawPage: (data) => {
        finalY = data.cursor?.y ?? finalY;
      },
    });

    // === Render Docs After Table ===
    for (let j = 0; j < student.activities.length; j++) {
      const activity = student.activities[j];
      if (activity.document_url) {
        if (finalY > 250) {
          doc.addPage();
          finalY = 20;
        }
        doc.setFontSize(11);
        doc.text(
          `${activity.activity_serial_no}. ${activity.activity_name} - Document:`,
          14,
          finalY + 10
        );

        // If image
        if (
          activity.document_url.endsWith(".png") ||
          activity.document_url.endsWith(".jpg") ||
          activity.document_url.endsWith(".jpeg")
        ) {
          try {
            const imageData = await getImageBase64FromUrl(
              activity.document_url
            );
            doc.addImage(imageData, "PNG", 14, finalY + 14, 60, 40);
            finalY += 60;
          } catch (error) {
            console.warn(`Could not load image for ${activity.activity_name}`);
            finalY += 12;
          }
        } else {
          // Show clickable link for PDF / others
          doc.setTextColor(0, 0, 255);
          doc.textWithLink("Open Document", 14, finalY + 14, {
            url: activity.document_url,
          });
          doc.setTextColor(0, 0, 0);
          finalY += 20;
        }
      }
    }

    // === Student Signature ===
    if (student.signature) {
      try {
        const studentSignature = await getImageBase64FromUrl(
          student.signature
        );
        if (finalY > 240) {
          doc.addPage();
          finalY = 20;
        }
        const sigWidth = 50;
        const sigHeight = 25;
        const pageWidth = doc.internal.pageSize.getWidth();
        const sigX = pageWidth - sigWidth - 20;
        const sigY = finalY + 20;

        doc.setFontSize(12);
        doc.text("Student Signature:", sigX, sigY - 5);
        doc.addImage(
          studentSignature,
          "PNG",
          sigX,
          sigY,
          sigWidth,
          sigHeight
        );
        finalY = sigY + sigHeight + 10;
      } catch (error) {
        console.warn(`Could not load student signature for ${student.name}`);
      }
    }
  }

  // === Teacher Signature Page ===
  doc.addPage();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const sigWidth = 60;
  const sigHeight = 30;
  const sigX = pageWidth - sigWidth - 20;
  const sigY = pageHeight - sigHeight - 40;

  doc.setFontSize(14);
  doc.text("Teacher Signature:", sigX, sigY - 10);
  doc.addImage(teacherSignature, "PNG", sigX, sigY, sigWidth, sigHeight);

  const todayDate = new Date().toLocaleDateString();
  doc.setFontSize(12);
  doc.text(`Date: ${todayDate}`, sigX, sigY + sigHeight + 10);

  // === Download ===
  const pdfBlob = doc.output("blob");
  const blobUrl = URL.createObjectURL(pdfBlob);
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = "All_Students_Report.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
};
