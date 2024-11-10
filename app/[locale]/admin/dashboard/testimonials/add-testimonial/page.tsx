"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { addTestimonial } from "@/requests/admin/testimonials"; // Import the request function
import { useTranslations } from "next-intl"; // For translations
import withAuth from "@/app/hocs/withAuth";
import { useRouter } from "next/navigation";
// Validation Schema

function AddTestimonialPage() {
  const router = useRouter();
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<File | null>(null); // Preview for image
  const { toast } = useToast();
  const t = useTranslations("testimonials");

  const validationSchema = Yup.object({
    name: Yup.string().required(t("name_required")),
    message: Yup.string().required(t("message_required")),
    company: Yup.string().required(t("company_required")),
    lang: Yup.string().required(t("language_required")),
    image: Yup.mixed().required(t("image_required")),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      message: "",
      company: "",
      lang: "en", // Default to 'en'
      image: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitLoading(true);
      const formData = new FormData();
      // Append file to FormData
      formData.append("name", values.name);
      formData.append("message", values.message);
      formData.append("company", values.company);
      formData.append("lang", values.lang);
      if (values.image) formData.append("image", values.image);
      const token = localStorage.getItem("authToken");
      try {
        const response = await addTestimonial(formData, token || "");
        console.log(response);
        if (response.data) {
          toast({
            title: t("testimonial_added_successfully"),
            description: t("testimonial_added_check"),
          });

          //navigate to show all testimonial page when request done will
          router.push("/admin/dashboard/testimonials");
        } else {
          toast({
            variant: "destructive",
            title: t("testimonial_add_failed"),
            description: response?.error,
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: t("testimonial_add_failed"),
          description: "Error happened When add testimonial",
        });
        console.error("Failed to add testimonial:", error);
      } finally {
        setIsSubmitLoading(false);
      }
    },
  });

  // Handle image change and preview
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      setPreviewImage(file); // Show preview of the image
      formik.setFieldValue("image", file); // Update Formik state
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 capitalize">
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle>{t("add_testimonial")}</CardTitle>
          <CardDescription>{t("fill_form_to_add_testimonial")}</CardDescription>
        </CardHeader>
        <form onSubmit={formik.handleSubmit}>
          <CardContent>
            <div className="flex flex-col w-full gap-4">
              {/* Name */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">{t("name")}</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  placeholder={t("name_placeholder")}
                />
                {formik.errors.name && formik.touched.name && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.name}
                  </div>
                )}
              </div>

              {/* Company */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="company">{t("company")}</Label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.company}
                  placeholder={t("company_placeholder")}
                />
                {formik.errors.company && formik.touched.company && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.company}
                  </div>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="message">{t("message")}</Label>
                <Input
                  id="message"
                  name="message"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.message}
                  placeholder={t("message_placeholder")}
                />
                {formik.errors.message && formik.touched.message && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.message}
                  </div>
                )}
              </div>

              {/* Image Upload */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="image">{t("upload_image")}</Label>
                <Input
                  className="pt-[6px]"
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {previewImage && (
                  <div className="mt-2 relative w-48 h-48">
                    <Image
                      fill
                      src={URL.createObjectURL(previewImage)}
                      alt="Image preview"
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                )}
                {formik.errors.image && formik.touched.image && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.image}
                  </div>
                )}
              </div>

              {/* Language */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="lang">{t("language_select")}</Label>
                <Select
                  name="lang"
                  value={formik.values.lang}
                  onValueChange={(value) => formik.setFieldValue("lang", value)} // Handling Formik state
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t("language_select")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>{t("language_select")}</SelectLabel>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ar">العربية</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {formik.errors.lang && formik.touched.lang && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.lang}
                  </div>
                )}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => formik.resetForm()}
            >
              {t("cancel")}
            </Button>
            <Button type="submit" disabled={isSubmitLoading}>
              {isSubmitLoading ? "loading..." : t("submit")}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default withAuth(AddTestimonialPage);
