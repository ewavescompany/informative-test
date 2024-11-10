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
import { useFormik } from "formik";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
import { sendBlog } from "@/requests/admin/addBlog"; // Import the blog request function
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
import withAuth from "@/app/hocs/withAuth";
import InputTag from "@/app/[locale]/admin/dashboard/blogs/inputTag";
import { useRouter } from "next/navigation";

interface BlogFormValues {
  name: string;
  content: string;
  blogImg: File | null;
  tags: string[];
  metaDescription: string;
  metaKeywords: string;
  blogLang: string;
}

// Page Component
function Page() {
  const router = useRouter();
  const { toast } = useToast();
  const t = useTranslations("blogForm"); // Translation object for the selected language
  const [content, setContent] = useState(""); // Quill content state
  const [tags, setTags] = useState<string[]>([]); // State for tags management
  const [loadingSubmitting, setLoadingSubmitting] = useState(false);

  // Validation Schema with translated error messages
  const validationSchema = Yup.object({
    name: Yup.string().required(t("name_required")),
    content: Yup.string().required(t("content_required")),
    tags: Yup.array().min(1, t("tag_required")),
    blogImg: Yup.mixed().required(t("blog_image_required")),
    metaDescription: Yup.string().required(t("meta_description_required")),
    metaKeywords: Yup.string().required(t("meta_keywords_required")),
    blogLang: Yup.string().required(t("lang_required")),
  });

  // Formik setup
  const formik = useFormik<BlogFormValues>({
    initialValues: {
      name: "",
      content: "",
      blogImg: null,
      tags: [],
      metaDescription: "",
      metaKeywords: "",
      blogLang: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoadingSubmitting(true);

      const formData = new FormData();
      formData.append("title", values.name);
      formData.append("content", values.content);
      formData.append("description", values.metaDescription);
      formData.append("keywords", values.metaKeywords);
      formData.append("lang", values.blogLang);
      formData.append("tags", values.tags.join(", "));
      if (values.blogImg) formData.append("image", values.blogImg);

      const token = localStorage.getItem("authToken");
      try {
        const response = await sendBlog(formData, token || "");

        if (response.success) {
          toast({
            title: t("blog_added_successfully"),
            description: t("blog_added_successfully_you_can_check_it"),
          });
          formik.resetForm();
          router.push("/admin/dashboard/blogs");

          // Reset tags state if needed
          setTags([]);
        } else {
          toast({
            variant: "destructive",
            title: t("blog_adding_failed"),
            description: response?.error,
          });
        }
      } catch (error) {
        console.error("Error submitting blog:", error);
        toast({
          variant: "destructive",
          title: t("blog_adding_failed"),
          description: "Error happened when adding blog",
        });
      } finally {
        setLoadingSubmitting(false);
      }
    },
  });

  return (
    <div className="w-full flex flex-col gap-5 capitalize ">
      <DashboardTitle title={t("add_blog")} />
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle>{t("create_blog")}</CardTitle>
          <CardDescription>{t("fill_form")}</CardDescription>
        </CardHeader>
        <form onSubmit={formik.handleSubmit}>
          <CardContent>
            <div className="flex flex-col w-full gap-4">
              {/* Blog Name */}
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

              {/* Tags */}
              <InputTag formik={formik} tags={tags} setTags={setTags} />

              {/* Blog Image */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="blogImg">{t("blog_image")}</Label>
                <Input
                  type="file"
                  id="blogImg"
                  onChange={(event) =>
                    formik.setFieldValue(
                      "blogImg",
                      event.currentTarget.files?.[0] || null // Use optional chaining to handle null
                    )
                  }
                />
                {formik.errors.blogImg && formik.touched.blogImg && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.blogImg}
                  </div>
                )}
              </div>

              {/* Blog Meta Description */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="metaDescription">{t("meta_description")}</Label>
                <Textarea
                  id="metaDescription"
                  name="metaDescription"
                  rows={5}
                  onChange={formik.handleChange}
                  value={formik.values.metaDescription}
                  placeholder={t("meta_description_placeholder")}
                />
                {formik.errors.metaDescription &&
                  formik.touched.metaDescription && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.metaDescription}
                    </div>
                  )}
              </div>

              {/* Blog Meta Keywords */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="metaKeywords">{t("meta_keywords")}</Label>
                <Textarea
                  id="metaKeywords"
                  name="metaKeywords"
                  rows={5}
                  onChange={formik.handleChange}
                  value={formik.values.metaKeywords}
                  placeholder={t("meta_keywords_placeholder")}
                />
                {formik.errors.metaKeywords && formik.touched.metaKeywords && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.metaKeywords}
                  </div>
                )}
              </div>

              {/* Blog Content with React Quill */}
              <div className="flex flex-col space-y-1.5 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-3xl">
                <Label htmlFor="content">{t("content")}</Label>
                <ReactQuill
                  style={{
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    maxWidth: "",
                  }}
                  value={content}
                  onChange={(value) => {
                    setContent(value);
                    formik.setFieldValue("content", value); // Update Formik state with Quill content
                  }}
                  modules={{
                    toolbar: [
                      [{ header: "1" }, { header: "2" }, { font: [] }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["bold", "italic", "underline"],
                      ["link", "image"],
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
                    "image",
                  ]}
                />
                {formik.errors.content && formik.touched.content && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.content}
                  </div>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="blogLang">{t("language_select")}</Label>
                <Select
                  name="blogLang"
                  value={formik.values.blogLang}
                  onValueChange={(value) =>
                    formik.setFieldValue("blogLang", value)
                  } // Handling Formik state
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
                {formik.errors.blogLang && formik.touched.blogLang && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.blogLang}
                  </div>
                )}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-4">
            <Button variant="outline" type="button">
              {t("cancel")}
            </Button>
            <Button type="submit" disabled={loadingSubmitting}>
              {loadingSubmitting ? "loading...." : t("publish")}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default withAuth(Page);
