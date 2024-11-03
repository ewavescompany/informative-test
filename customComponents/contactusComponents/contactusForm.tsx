"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import SlideComponent from "../reavelAnimation/slideComponent";
import { useTranslations } from "next-intl";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useToast } from "@/hooks/use-toast"; // Assuming a custom hook for toasts
// Adjust the import as per your request file path
import { Button } from "@/components/ui/button";
import { sendContactMessage } from "@/requests/generic/postContact";

import Loader from "../loader";

function ContactusForm() {
  const t = useTranslations("contactus");
  const { toast } = useToast();

  const [loading, setLoading] = useState<boolean>(false);
  // Form validation schema with localization
  const validationSchema = Yup.object({
    fullName: Yup.string().required(t("full_name_required")),
    email: Yup.string().email(t("email_invalid")).required(t("email_required")),
    subject: Yup.string().required(t("subject_required")),
    message: Yup.string()
      .min(10, t("message_min"))
      .required(t("message_required")),
  });


  
  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("fname", values.fullName);
      formData.append("subject", values.subject);
      formData.append("message", values.message);
      try {
        setLoading(true);
        const res = await sendContactMessage(formData);
        console.log(res);
        toast({ title: t("success"), description: t("message_sent") });
        formik.resetForm();
        setLoading(false);
      } catch (error) {
        toast({
          variant: "destructive",
          title: t("error"),
          description: t("send_failed"),
        });
        setLoading(false);
        console.error("Error sending message:", error);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full h-full flex flex-col gap-8"
    >
      <SlideComponent dir="right">
        <Input
          name="fullName"
          placeholder={t("full_name")}
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="placeholder:text-lg text-lg w-full h-14 focus-visible:ring-0 rounded-none focus:outline-none focus:ring-0 shadow-none border-0 border-b-2 border-b-grayblack/50 duration-500"
        />
        {formik.touched.fullName && formik.errors.fullName && (
          <div className="text-red-500 text-sm">{formik.errors.fullName}</div>
        )}
      </SlideComponent>
      <SlideComponent dir="left">
        <Input
          name="email"
          placeholder={t("email")}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="placeholder:text-lg text-lg w-full h-14 focus-visible:ring-0 rounded-none focus:outline-none focus:ring-0 shadow-none border-0 border-b-2 border-b-grayblack/50 duration-500"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        )}
      </SlideComponent>
      <SlideComponent dir="right">
        <Input
          name="subject"
          placeholder={t("subject")}
          value={formik.values.subject}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="placeholder:text-lg text-lg w-full h-14 focus-visible:ring-0 rounded-none focus:outline-none focus:ring-0 shadow-none border-0 border-b-2 border-b-grayblack/50 duration-500"
        />
        {formik.touched.subject && formik.errors.subject && (
          <div className="text-red-500 text-sm">{formik.errors.subject}</div>
        )}
      </SlideComponent>
      <SlideComponent dir="left">
        <Textarea
          name="message"
          placeholder={t("message")}
          value={formik.values.message}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          rows={3}
          className="placeholder:text-lg text-lg w-full focus-visible:ring-0 rounded-none focus:outline-none focus:ring-0 shadow-none border-0 border-b-2 border-b-grayblack/50 duration-500"
        />
        {formik.touched.message && formik.errors.message && (
          <div className="text-red-500 text-sm">{formik.errors.message}</div>
        )}
      </SlideComponent>
      <Button
        disabled={loading}
        variant={"default"}
        size={"lg"}
        type="submit"
        className="mt-4 w-fit"
      >
        {loading ? <Loader size={14} /> : t("send")}
      </Button>
    </form>
  );
}

export default ContactusForm;
