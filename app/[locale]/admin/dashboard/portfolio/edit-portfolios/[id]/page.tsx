"use client";
import { DashboardTitle } from "@/customComponents/dashboardComponent/tags/dashboardTitle";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
// import { submitPortfolio } from "@/requests/portfolio"; // Assuming you have this function
import { useParams } from "next/navigation";
import { useFetchPortfolio } from "@/hooks/dashboard/useFetchPortfolio";
import PageLoader from "@/customComponents/pageLoader";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import { editPortfolio } from "@/requests/admin/editPortfolio";
import Loader from "@/customComponents/loader";
import { useToast } from "@/hooks/use-toast";
import withAuth from "@/app/hocs/withAuth";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// Validation Schema

function EditPortfolioPage() {
  const params = useParams<{ id: string }>();
  const locale = Cookies.get("NEXT_LOCALE") || "en";
  const t = useTranslations("portfolio");
  const { toast } = useToast();
  const [mainImagePreview, setMainImagePreview] = useState<File | null>(null);
  const { loading, portfolioData, error } = useFetchPortfolio(params?.id); // Use 'portfolioData' not 'portfolioById'
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const [content, setContent] = useState(""); // Quill content state
  const validationSchema = Yup.object({
    title: Yup.string().required(t("Title is required")),
    content: Yup.string().required(t("Content is required")),
    keywords: Yup.string().required(t("Keywords are required")),
    description: Yup.string().required(t("Description is required")),
    status: Yup.string().required(t("Status is required")),
    client: Yup.string().required(t("Client name is required")),
    startDate: Yup.string().required(t("Start date is required")),
    endDate: Yup.string().required(t("End date is required")),
    websiteLink: Yup.string()
      .url(t("Must be a valid URL"))
      .required(t("Website link is required")),
    lang: Yup.string().required(t("lang_required")),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: portfolioData
      ? {
          title:
            locale === "en"
              ? portfolioData.title_en
              : portfolioData.title_ar || "",
          content:
            locale === "en"
              ? portfolioData.content_en
              : portfolioData.content_ar || "",
          keywords:
            locale === "en"
              ? portfolioData.keywords_en
              : portfolioData.keywords_ar || "",
          description:
            locale === "en"
              ? portfolioData.description_en
              : portfolioData.description_ar || "",
          status: portfolioData.status || "",
          client: portfolioData.client || "",
          startDate: portfolioData.start_date || "",
          endDate: portfolioData.end_date || "",
          websiteLink: portfolioData.website_link || "",
          mainImage: null,
          lang: "en", // default to English, update according to your logic
        }
      : {
          title: "",
          content: "",
          keywords: "",
          description: "",
          status: "",
          client: "",
          startDate: "",
          endDate: "",
          websiteLink: "",
          mainImage: null,
          lang: "",
        },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("id", params.id);
      formData.append("title", values.title);
      formData.append("content", values.content);
      formData.append("keywords", values.keywords);
      formData.append("description", values.description);
      formData.append("status", values.status);
      formData.append("client", values.client);
      formData.append("start_date", values.startDate);
      formData.append("end_date", values.endDate);
      formData.append("website_link", values.websiteLink);
      formData.append("lang", values.lang);
      if (values.mainImage) {
        formData.append("image", values.mainImage);
      }

      const token = localStorage.getItem("authToken");

      try {
        setIsPosting(true);
        const response = await editPortfolio(formData, token ? token : "");

        if (response.data && response.success) {
          toast({
            title: t("portfolio_updated_successfully"),
            description: t("portfolio_updated_successfully_you_can_check_it"),
          });
          formik.resetForm();
          setIsPosting(false);
          // Additional actions on success, such as redirecting
        } else {
          toast({
            variant: "destructive",
            title: t("portfolio_update_failed"),
            description: response?.error || t("An unexpected error occurred."),
          });
          setIsPosting(false);
        }
      } catch (error: unknown) {
        console.error("Error submitting portfolio", error);
        setIsPosting(false);

        // Check if the error is an instance of Error to safely access `message`
        const errorMessage =
          error instanceof Error
            ? error.message
            : t("An unexpected error occurred.");
        toast({
          variant: "destructive",
          title: t("portfolio_update_failed"),
          description: errorMessage,
        });
      }
    },
  });

  // Handle main image upload
  const handleMainImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      setMainImagePreview(file);
      formik.setFieldValue("mainImage", file);
    }
  };

  const handleContentChange = (value: string) => {
    setContent(value);
    formik.setFieldValue("content", value);
  };

  if (loading) return <PageLoader />;
  if (error) return <div>Error loading portfolio data</div>;

  return (
    <div className="w-full flex flex-col gap-5 capitalize ">
      <DashboardTitle title="Edit Project" />
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle>Edit project</CardTitle>
          <CardDescription>Update the project information.</CardDescription>
        </CardHeader>
        <form onSubmit={formik.handleSubmit}>
          <CardContent>
            <div className="flex flex-col w-full gap-4">
              {/* Title */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  placeholder="Project title"
                />
                {formik.errors.title && formik.touched.title && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.title}
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={5}
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  placeholder="Project description"
                />
                {formik.errors.description && formik.touched.description && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.description}
                  </div>
                )}
              </div>

              {/* ReactQuill for Content */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="content">{t("Content")}</Label>
                <ReactQuill
                  value={content}
                  onChange={handleContentChange}
                  modules={{
                    toolbar: [
                      [{ header: "1" }, { header: "2" }, { font: [] }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["bold", "italic", "underline"],
                      ["link"],
                    ],
                  }}
                  formats={[
                    "header",
                    "font",
                    "list",
                    "bold",
                    "italic",
                    "underline",
                    "link",
                  ]}
                  placeholder="Project content"
                />
                {formik.errors.content && formik.touched.content && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.content}
                  </div>
                )}
              </div>

              {/* Keywords */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="keywords">Keywords</Label>
                <Textarea
                  id="keywords"
                  name="keywords"
                  rows={3}
                  onChange={formik.handleChange}
                  value={formik.values.keywords}
                  placeholder="Keywords related to the project"
                />
                {formik.errors.keywords && formik.touched.keywords && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.keywords}
                  </div>
                )}
              </div>

              {/* Client */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="client">Client Name</Label>
                <Input
                  id="client"
                  name="client"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.client}
                  placeholder="Client name"
                />
                {formik.errors.client && formik.touched.client && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.client}
                  </div>
                )}
              </div>

              {/* Status */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="status">Status</Label>
                <Select
                  onValueChange={(value) =>
                    formik.setFieldValue("status", value)
                  }
                  value={formik.values.status}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                  </SelectContent>
                </Select>
                {formik.errors.status && formik.touched.status && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.status}
                  </div>
                )}
              </div>

              {/* Start Date */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  onChange={formik.handleChange}
                  value={formik.values.startDate}
                />
                {formik.errors.startDate && formik.touched.startDate && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.startDate}
                  </div>
                )}
              </div>

              {/* End Date */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  onChange={formik.handleChange}
                  value={formik.values.endDate}
                />
                {formik.errors.endDate && formik.touched.endDate && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.endDate}
                  </div>
                )}
              </div>

              {/* Website Link */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="websiteLink">Website Link</Label>
                <Input
                  id="websiteLink"
                  name="websiteLink"
                  type="url"
                  onChange={formik.handleChange}
                  value={formik.values.websiteLink}
                  placeholder="https://"
                />
                {formik.errors.websiteLink && formik.touched.websiteLink && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.websiteLink}
                  </div>
                )}
              </div>

              {/* Main Image Upload */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="mainImage">Main Image</Label>
                <Input
                  type="file"
                  id="mainImage"
                  accept="image/*"
                  onChange={handleMainImageChange}
                />
                {mainImagePreview && (
                  <div className="mt-2 relative w-48 h-48">
                    <Image
                      fill
                      src={URL.createObjectURL(mainImagePreview)}
                      alt="Main preview"
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                )}
              </div>

              {/* Language Selection */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="lang">Language</Label>
                <Select
                  name="lang"
                  value={formik.values.lang}
                  onValueChange={(value) => formik.setFieldValue("lang", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ar">Arabic</SelectItem>
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
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button disabled={isPosting} type="submit">
              {isPosting ? <Loader size={14} /> : "Save"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default withAuth(EditPortfolioPage);
