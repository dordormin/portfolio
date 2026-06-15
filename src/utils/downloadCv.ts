export const handleDownloadCV = async (
  language: string,
  e: React.MouseEvent<HTMLAnchorElement>,
) => {
  e.preventDefault();

  const triggerDownload = (filename: string) => {
    const link = document.createElement("a");
    link.href = `/${filename}`;
    link.download = `Dordor_Minetdi_Resume_${filename.replace(".pdf", "")}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    const isQuebec = data.region === "Quebec" || data.region_code === "QC";

    if (isQuebec) {
      // In Quebec: use French Montreal if site is FR, English Montreal if site is EN
      triggerDownload(
        language === "fr" ? "resume-qc-fr.pdf" : "resume-qc-en.pdf",
      );
    } else {
      // Rest of Canada/World: use English Oshawa (even if site is FR)
      triggerDownload("resume-on-en.pdf");
    }
  } catch (error) {
    // Fallback if IP detection fails
    triggerDownload(
      language === "fr" ? "resume-qc-fr.pdf" : "resume-on-en.pdf",
    );
  }
};
