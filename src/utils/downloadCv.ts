/**
 * CV download helper.
 *
 * Privacy (security audit 2026-10-11, M-01): region detection is done 100%
 * locally via the browser timezone — no IP geolocation, no third-party call,
 * the visitor's IP address is never sent anywhere. This previously called
 * https://ipapi.co/json/; it was replaced to remove both the external
 * dependency and the undisclosed IP disclosure.
 */
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

  // Local heuristic: America/Montreal -> Quebec CV, anything else -> Ontario CV.
  // Falls back to the site language when the timezone is unavailable.
  let isQuebec = false;
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    isQuebec = timeZone === "America/Montreal";
  } catch {
    isQuebec = false;
  }

  if (isQuebec) {
    // In Quebec: use French Montreal if site is FR, English Montreal if site is EN
    triggerDownload(
      language === "fr" ? "resume-qc-fr.pdf" : "resume-qc-en.pdf",
    );
  } else {
    // Rest of Canada/World: French visitors get the Quebec French CV,
    // English visitors get the Oshawa English CV
    triggerDownload(
      language === "fr" ? "resume-qc-fr.pdf" : "resume-on-en.pdf",
    );
  }
};
