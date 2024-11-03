"use client";
import { DashboardTitle } from "@/customComponents/dashboardComponent/tags/dashboardTitle";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

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
import { X } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitPortfolio } from "@/requests/admin/addPortfolio";
import { useToast } from "@/hooks/use-toast";
import withAuth from "@/app/hocs/withAuth";
// Validation Schema

function Page() {
  const [previewImages, setPreviewImages] = useState<File[]>([]); // To manage multiple images preview
  const [mainImagePreview, setMainImagePreview] = useState<File | null>(null);
  const t = useTranslations("portfolio");
  const { toast } = useToast();
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
    mainImage: Yup.mixed().required(t("Main image is required")),
    images: Yup.array().min(1, t("At least one image is required")),
    lang: Yup.string().required(t("lang_required")),
  });

  const formik = useFormik({
    initialValues: {
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
      images: [],
      lang: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
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
      values.images.forEach((image: File, index: number) => {
        formData.append(`images_slider[${index}]`, image);
      });
      const token = localStorage.getItem("authToken");
      try {
        const response = await submitPortfolio(formData, token ? token : "");
        console.log("Portfolio submitted successfully:", response);
        toast({
          title: t("portfolio_added_successfully"),
          description: t("portfolio_added_successfully_you_can_check_it"),
        });
        formik.resetForm();
      } catch (error) {
        console.error("Error submitting portfolio:", error);
      }
    },
  });

  // Handle image uploads (for additional images)
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (files) {
      const fileArray = Array.from(files);
      setPreviewImages((prev) => [...prev, ...fileArray]);
      formik.setFieldValue("images", [...formik.values.images, ...fileArray]);
    }
  };

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

  // Remove an additional image
  const removeImage = (index: number) => {
    const updatedImages = previewImages.filter((_, i) => i !== index);
    setPreviewImages(updatedImages);
    formik.setFieldValue("images", updatedImages);
  };

  return (
    <div className="w-full flex flex-col gap-5 capitalize ">
      <DashboardTitle title="Add Project" />
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle>{t("Create a new project")}</CardTitle>
          <CardDescription>{t("description porject")}</CardDescription>
        </CardHeader>
        <form onSubmit={formik.handleSubmit}>
          <CardContent>
            <div className="flex flex-col w-full gap-4">
              {/* Title */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">{t("Title")}</Label>
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

              {/* Content */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="content">{t("Content")}</Label>
                <Textarea
                  id="content"
                  name="content"
                  rows={5}
                  onChange={formik.handleChange}
                  value={formik.values.content}
                  placeholder="Project content"
                />
                {formik.errors.content && formik.touched.content && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.content}
                  </div>
                )}
              </div>

              {/* Keywords (TextArea) */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="keywords">{t("Keywords")}</Label>
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

              {/* Description */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">{t("Description")}</Label>
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

              {/* Client */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="client">{t("Client Name")}</Label>
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

              {/* Status (ShadCN Select Box) */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="status">{t("Status")}</Label>
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
                    <SelectItem value="completed">{t("Completed")}</SelectItem>
                    <SelectItem value="ongoing">{t("Ongoing")}</SelectItem>
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
                <Label htmlFor="startDate">{t("Start Date")}</Label>
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
                <Label htmlFor="endDate">{t("End Date")}</Label>
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
                <Label htmlFor="websiteLink">{t("Website Link")}</Label>
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
                <Label htmlFor="mainImage">{t("Main Image")}</Label>
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
                {formik.errors.mainImage && formik.touched.mainImage && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.mainImage}
                  </div>
                )}
              </div>

              {/* Additional Images Upload */}
              <div className="flex flex-col space-y-1.5 ">
                <Button
                  type="button"
                  className="w-fit"
                  size={"default"}
                  variant="outline"
                  onClick={() =>
                    document.getElementById("additionalImages")?.click()
                  }
                >
                  {t("Add Additional Images")}
                </Button>
                <Input
                  type="file"
                  id="additionalImages"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {previewImages.map((image, index) => (
                    <div key={index} className="relative w-24 h-24">
                      <Image
                        width={50}
                        height={50}
                        src={URL.createObjectURL(image)}
                        alt={`preview-${index}`}
                        className="w-full h-full object-cover rounded-md"
                      />
                      <X
                        size={20}
                        className="absolute top-0 right-0 text-red-500 cursor-pointer"
                        onClick={() => removeImage(index)}
                      />
                    </div>
                  ))}
                </div>
                {formik.errors.images && formik.touched.images && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.images}
                  </div>
                )}
              </div>

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
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit">Publish</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default withAuth(Page);
