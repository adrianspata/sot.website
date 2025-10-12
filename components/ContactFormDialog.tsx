import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
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
import { schema, postContactSubmit } from "../endpoints/contact/submit_POST.schema";
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
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: postContactSubmit,
    onSuccess: (data) => {
      console.log("Form submitted successfully:", data);
      setIsSuccess(true);
    },
    onError: (error) => {
      console.error("Form submission error:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    },
  });

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    mutation.mutate(data);
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
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "SENDING..." : "SEND MAIL"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};