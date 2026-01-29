import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { X } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { Button } from "./Button";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});
import styles from "./ContactFormDialog.module.css";

type ContactFormValues = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};

export const ContactFormDialog = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
  });


  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("access_key", "f81772b5-0faf-47d3-850f-e33f2b72e7ca");
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("subject", data.subject || "Contact Form Submission");
      formData.append("message", data.message);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();

      if (responseData.success) {
        console.log("Form submitted successfully:", responseData);
        setIsSuccess(true);
      } else {
        throw new Error(responseData.message || "Submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset form and success state after dialog animation completes
    setTimeout(() => {
      reset();
      setIsSuccess(false);
    }, 300);
  };

  // Reset states when dialog closes
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        reset();
        setIsSuccess(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={styles.dialogContent}>
        {isSuccess ? (
          <div className={styles.successContainer}>
            <button
              onClick={handleClose}
              className={styles.successCloseButton}
              aria-label="Close"
            >
              <X className={styles.successCloseIcon} />
            </button>
            <p className={styles.successMessage}>
              THANKS FOR REACHING OUT, WE'LL MAKE SURE TO HAVE A LOOK IF WE
              FEEL LIKE IT
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className={styles.dialogTitle}>
                CONTACT FORM
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="name">NAME</label>
                  <Input
                    id="name"
                    {...register("name")}
                    className={styles.input}
                    aria-invalid={errors.name ? "true" : "false"}
                  />
                  {errors.name && (
                    <p className={styles.error}>{errors.name.message}</p>
                  )}
                </div>
                <div className={styles.field}>
                  <label htmlFor="email">EMAIL</label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    className={styles.input}
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && (
                    <p className={styles.error}>{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="subject">SUBJECT (OPTIONAL)</label>
                <Input
                  id="subject"
                  {...register("subject")}
                  className={styles.input}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="message">MESSAGE</label>
                <Textarea
                  id="message"
                  {...register("message")}
                  className={`${styles.input} ${styles.textarea}`}
                  rows={6}
                  aria-invalid={errors.message ? "true" : "false"}
                />
                {errors.message && (
                  <p className={styles.error}>{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? "SENDING..." : "SEND MAIL"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};