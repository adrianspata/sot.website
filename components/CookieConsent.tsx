"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "./Button";
import { Switch } from "./Switch";
import styles from "./CookieConsent.module.css";

type ConsentState = {
    necessary: boolean;
    performance: boolean;
    marketing: boolean;
};

const defaultConsent: ConsentState = {
    necessary: true,
    performance: false,
    marketing: false,
};

// Check if window is defined (SSR safety)
const isBrowser = typeof window !== "undefined";

export const CookieConsent = () => {
    const [showBanner, setShowBanner] = useState(false);
    const [showPanel, setShowPanel] = useState(false);
    const [consent, setConsent] = useState<ConsentState>(defaultConsent);

    useEffect(() => {
        if (isBrowser) {
            const storedConsent = localStorage.getItem("cookie_consent");
            if (storedConsent) {
                try {
                    const parsed = JSON.parse(storedConsent);
                    setConsent(parsed);
                    // Apply consent logic here (e.g. enable scripts)
                    applyConsent(parsed);
                } catch (e) {
                    // If parse error, show banner
                    setShowBanner(true);
                }
            } else {
                setShowBanner(true);
            }
        }
    }, []);

    const applyConsent = (c: ConsentState) => {
        // This function checks the consent state and enables/disables scripts accordingly.
        // In a real implementation, you would trigger GTM or inject scripts here.
        console.log("Applying consent:", c);

        // Example:
        // if (c.performance) {
        //   window.gtag?.('consent', 'update', { 'analytics_storage': 'granted' });
        // }

        // Save to localStorage
        localStorage.setItem("cookie_consent", JSON.stringify(c));
        window.dispatchEvent(new Event("cookie_consent_updated"));
    };

    const handleAcceptAll = () => {
        const allGranted = { necessary: true, performance: true, marketing: true };
        setConsent(allGranted);
        applyConsent(allGranted);
        setShowBanner(false);
        setShowPanel(false);
    };

    const handleRejectAll = () => {
        const allRejected = { necessary: true, performance: false, marketing: false };
        setConsent(allRejected);
        applyConsent(allRejected);
        setShowBanner(false);
        setShowPanel(false);
    };

    const handleSavePreferences = () => {
        applyConsent(consent);
        setShowBanner(false);
        setShowPanel(false);
    };

    const openPanel = () => {
        setShowPanel(true);
    };

    const closePanel = () => {
        if (showBanner) {
            // If banner is valid (user hasn't consented yet), keep banner but close panel
            setShowPanel(false);
        } else {
            setShowPanel(false);
        }
    };

    // Prevent scroll when panel is open
    useEffect(() => {
        if (showPanel) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [showPanel]);

    if (!showBanner && !showPanel) return null;

    return (
        <>
            {/* Small Banner */}
            {showBanner && !showPanel && (
                <div className={styles.bannerOverlay}>
                    <div className={styles.bannerContent}>
                        <p className={styles.bannerText}>
                            SOT uses cookies to improve your experience and analyze site usage.
                            By clicking "Accept All", you consent to our use of cookies.
                            You can manage your preferences at any time.
                        </p>
                        <div className={styles.bannerActions}>
                            <Button variant="outline" onClick={openPanel} className={styles.bannerButton}>
                                PREFERENCES
                            </Button>
                            <Button variant="primary" onClick={handleAcceptAll} className={styles.bannerButton}>
                                ACCEPT ALL
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Preferences Panel */}
            {showPanel && (
                <div className={styles.panelOverlay} role="dialog" aria-modal="true">
                    <div className={styles.panel}>
                        <div className={styles.panelHeader}>
                            <h2 className={styles.panelTitle}>MANAGE CONSENT PREFERENCES</h2>
                            <button onClick={closePanel} aria-label="Close" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className={styles.panelContent}>
                            <div className={styles.section}>
                                <div className={styles.sectionInfo}>
                                    <h3 className={styles.sectionTitle}>
                                        STRICTLY NECESSARY COOKIES
                                        <span className={styles.alwaysActive}>ALWAYS ACTIVE</span>
                                    </h3>
                                    <p className={styles.sectionDescription}>
                                        These cookies are essential for the website to function properly and cannot be switched off.
                                    </p>
                                </div>
                                <Switch checked={true} disabled />
                            </div>

                            <div className={styles.section}>
                                <div className={styles.sectionInfo}>
                                    <h3 className={styles.sectionTitle}>PERFORMANCE COOKIES</h3>
                                    <p className={styles.sectionDescription}>
                                        These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.
                                    </p>
                                </div>
                                <Switch
                                    checked={consent.performance}
                                    onCheckedChange={(checked) =>
                                        setConsent((prev) => ({ ...prev, performance: checked }))
                                    }
                                />
                            </div>

                            <div className={styles.section}>
                                <div className={styles.sectionInfo}>
                                    <h3 className={styles.sectionTitle}>MARKETING COOKIES</h3>
                                    <p className={styles.sectionDescription}>
                                        These cookies may be set through our site by our advertising partners to build a profile of your interests.
                                    </p>
                                </div>
                                <Switch
                                    checked={consent.marketing}
                                    onCheckedChange={(checked) =>
                                        setConsent((prev) => ({ ...prev, marketing: checked }))
                                    }
                                />
                            </div>
                        </div>

                        <div className={styles.panelFooter}>
                            <div className={styles.footerGroup}>
                                <Button variant="outline" onClick={handleRejectAll} className={styles.panelButton}>
                                    REJECT ALL
                                </Button>
                                <Button variant="primary" onClick={handleAcceptAll} className={styles.panelButton}>
                                    ACCEPT ALL
                                </Button>
                            </div>
                            <Button variant="primary" onClick={handleSavePreferences} className={`${styles.saveButton} ${styles.panelButton}`}>
                                SAVE PREFERENCES
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
