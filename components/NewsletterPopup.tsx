"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "./Button";
import { submitToWeb3Forms } from "../helpers/newsletter";
import styles from "../styles/components/NewsletterPopup.module.css";

export const NewsletterPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    useEffect(() => {
        const checkVisibility = () => {
            // Check if cookie consent is given
            const hasCookieConsent = localStorage.getItem("cookie_consent");
            // Check if popup already seen in session
            const hasSeenPopup = sessionStorage.getItem("newsletter_popup_seen");

            if (hasCookieConsent && !hasSeenPopup) {
                // Delay appearance slightly
                const timer = setTimeout(() => {
                    setIsVisible(true);
                }, 2000);
                return () => clearTimeout(timer);
            }
        };

        checkVisibility();

        // Listen for cookie consent updates
        window.addEventListener("cookie_consent_updated", checkVisibility);
        return () => window.removeEventListener("cookie_consent_updated", checkVisibility);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        sessionStorage.setItem("newsletter_popup_seen", "true");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("submitting");
        try {
            await submitToWeb3Forms(email);
            setStatus("success");

            // Close popup after delay
            setTimeout(() => {
                handleClose();
            }, 3000);
        } catch (error) {
            setStatus("error");
            console.error("Popup subscription error:", error);
        }
    };

    if (!isVisible) return null;

    return (
        <div className={styles.popupOverlay}>
            <button onClick={handleClose} className={styles.closeButton} aria-label="Close">
                <X size={24} />
            </button>

            {status === "success" ? (
                <div className={styles.successMessage}>
                    <p>THANK YOU, NO DISCOUNTS THOUGH</p>
                </div>
            ) : (
                <>
                    <h3 className={styles.title}>
                        SUBSCRIBE FOR FIRST-HAND ACCESS TO NEW RELEASES AND UPDATES
                    </h3>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor="popup-email">
                                EMAIL
                            </label>
                            <input
                                id="popup-email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.input}
                                required
                                placeholder="EMAIL"
                            />
                        </div>
                        <Button
                            type="submit"
                            className={styles.submitButton}
                            disabled={status === "submitting"}
                        >
                            {status === "submitting" ? "SUBSCRIBING..." : "SUBSCRIBE"}
                        </Button>
                        {status === "error" && (
                            <p style={{ color: "red", fontSize: "0.8rem" }}>
                                Something went wrong. Please try again.
                            </p>
                        )}
                    </form>
                </>
            )}
        </div>
    );
};
