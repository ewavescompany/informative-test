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
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { updateTestimonial } from "@/requests/admin/updateTestimonial"; // Import the update request function
import { useTranslations } from "next-intl";
import { useFetchTestimonial } from "@/hooks/dashboard/fetchTestimonialById"; // Hook to fetch testimonial
import { useParams } from "next/navigation"; // Assuming you're using next/navigation for getting the ID
import PageLoader from "@/customComponents/pageLoader";
import Loader from "@/customComponents/loader";
import Cookies from "js-cookie";
// import withAuth from "@/app/hocs/withAuth";
function EditTestimonialPage() {
  const params = useParams<{ id: string }>(); // Get the testimonial ID from the URL params
  const { testimonial, loading } = useFetchTestimonial(params?.id);
  const { toast } = useToast();
  const locale = Cookies.get("NEXT_LOCALE") || "en";
  const t = useTranslations("testimonials");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<File | null>(null);

  // Form validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required(t("name_required")),
    message: Yup.string().required(t("message_required")),
    company: Yup.string().required(t("company_required")),
    lang: Yup.string().required(t("language_required")),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: testimonial
      ? {
          name: testimonial?.name || "",
          message:
            locale === "en"
              ? testimonial?.message_en
              : testimonial?.message_ar || "",
          company: testimonial?.company || "",
          lang: "",
          image: null,
        }
      : {
          name: "",
          message: "",
          company: "",
          lang: "en",
          image: null,
        },
    enableReinitialize: true, // Allow form to be reinitialized when the testimonial data is fetched
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("message", values.message);
      formData.append("company", values.company);
      formData.append("lang", values.lang);
      formData.append("id", params.id);
      if (values.image) {
        formData.append("image", values.image); // Append image if available
      }

      const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
      try {
        setIsLoading(true); // Set loading state
        const response = await updateTestimonial(formData, token || "");
        console.log(response);
        toast({
          title: t("testimonial_updated_successfully"),
          description: t("testimonial_updated_check"),
        });
        setIsLoading(false);
      } catch (error) {
        toast({
          variant: "destructive",
          title: t("testimonial_update_failed"),
        });
        console.error("Failed to update testimonial:", error);
      } finally {
        setIsLoading(false); // Reset loading state
      }
    },
  });

  // Handle image change and preview
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      setPreviewImage(file);
      formik.setFieldValue("image", file); // Update formik state with the image
    }
  };

  if (loading) return <PageLoader />; // Display loader while fetching the data

  return (
    <div className="w-full flex flex-col gap-5 capitalize">
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle>{t("edit_testimonial")}</CardTitle>
          <CardDescription>
            {t("fill_form_to_edit_testimonial")}
          </CardDescription>
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
            <Button disabled={isLoading} type="submit">
              {isLoading ? <Loader size={14} /> : t("submit")}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default EditTestimonialPage;
