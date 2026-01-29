export const submitToWeb3Forms = async (emailToSubmit: string): Promise<void> => {
  const STORAGE_KEY = "newsletter_submitted_emails";
  
  // 1. Check if email was already submitted from this browser
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const submittedEmails: string[] = stored ? JSON.parse(stored) : [];
    
    if (submittedEmails.includes(emailToSubmit)) {
      console.log(`Email ${emailToSubmit} already submitted (client-side check). Mocking success.`);
      // Mock network delay for realism
      await new Promise(resolve => setTimeout(resolve, 500));
      return; // Return early, do not send to Web3Forms
    }
  } catch (err) {
    console.warn("Failed to check local storage for duplicates", err);
  }

  // 2. Prepare real submission
  const formData = new FormData();
  formData.append("access_key", "f81772b5-0faf-47d3-850f-e33f2b72e7ca");
  formData.append("email", emailToSubmit);
  formData.append("message", "Newsletter Signup"); // Helper field to give context in the dashboard

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      console.log(`Newsletter subscription successful for: ${emailToSubmit}`);
      
      // 3. Save to localStorage on success
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        const submittedEmails: string[] = stored ? JSON.parse(stored) : [];
        if (!submittedEmails.includes(emailToSubmit)) {
          submittedEmails.push(emailToSubmit);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(submittedEmails));
        }
      } catch (err) {
        console.warn("Failed to save email to local storage", err);
      }
      
    } else {
      console.error("Web3Forms error:", data);
      throw new Error(data.message || "Submission failed");
    }
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    throw error;
  }
};
