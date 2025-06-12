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

export const generateAllReports = async (students: any[], teacherSignatureUrl: string) => {
  const doc = new jsPDF();

  const teacherSignature = await getImageBase64FromUrl(teacherSignatureUrl);

  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    if (i > 0) doc.addPage();

    doc.setFontSize(16);
    doc.text("Student Activity Report", 14, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${student.name}`, 14, 30);
    doc.text(`Roll No: ${student.rollNo}`, 14, 38);
    doc.text(`Total Points: ${student.points}`, 14, 46);
    doc.text(`Verified: ${student.verified ? "Yes" : "No"}`, 14, 54);

    // Table
    let finalY = 62;
    autoTable(doc, {
      startY: finalY,
      head: [["S.No", "Activity", "Date", "Points", "Document"]],
      body: student.activities.map((item: any) => [
        item.serialNo,
        item.name,
        item.date,
        item.points,
        item.docs,
      ]),
      theme: "striped",
      didDrawPage: (data) => {
        finalY = data.cursor?.y ?? finalY;
      },
    });

    // Insert images from activity.link
    for (let j = 0; j < student.activities.length; j++) {
      const activity = student.activities[j];
      if (activity.link) {
        try {
          const imageData = await getImageBase64FromUrl(activity.link);

          if (finalY > 250) {
            doc.addPage();
            finalY = 20;
          }

          doc.setFontSize(11);
          doc.text(
            `${activity.serialNo}. ${activity.name} - Certificate:`,
            14,
            finalY + 10
          );
          doc.addImage(imageData, "PNG", 14, finalY + 14, 60, 40);
          finalY += 60;
        } catch (error) {
          console.warn(`Could not load image for ${activity.name}`, error);
        }
      }
    }

    // 🧑‍🎓 Add Student Signature (bottom-right of their page)
    if (student.signature) {
      try {
        const studentSignature = await getImageBase64FromUrl(student.signature);
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const sigWidth = 50;
        const sigHeight = 25;
        const sigX = pageWidth - sigWidth - 20;
        const sigY = pageHeight - sigHeight - 20;

        doc.setFontSize(12);
        doc.text("Student Signature:", sigX, sigY - 5);
        doc.addImage(studentSignature, "PNG", sigX, sigY, sigWidth, sigHeight);
      } catch (error) {
        console.warn(`Could not load student signature for ${student.name}`, error);
      }
    }
  }

  // 🧑‍🏫 Add Teacher Signature at END of the DOCUMENT
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

  // Save the full report
  doc.save("All_Students_Report.pdf");
};
