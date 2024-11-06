"use client";
import { DashboardTitle } from "@/customComponents/dashboardComponent/tags/dashboardTitle";
import React, { useState, useEffect } from "react";
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
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Textarea } from "@/components/ui/textarea";
import Cookies from "js-cookie";
import useFetchBlogData from "@/hooks/dashboard/useFetchBlogData"; // Custom hook
import { useTranslations } from "next-intl"; // For translations
import { editBlog } from "@/requests/admin/editBlog"; // Import the editBlog function
import { useParams } from "next/navigation"; // Import correct hook for client component
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loader from "@/customComponents/loader";
// import withAuth from "@/app/hocs/withAuth";
// Validation Schema

function Page() {
  const t = useTranslations("blogForm"); // Access translations for the blog form
  const locale = Cookies.get("NEXT_LOCALE") || "en"; // Get language from cookies
  const params = useParams<{ id: string }>();

  const { blogData, loading, error } = useFetchBlogData(4, locale);
  const [content, setContent] = useState(""); // Quill content state
  const [tags, setTags] = useState<string[]>([]); // State for tags management
  const [tagInput, setTagInput] = useState(""); // For adding a new tag
  const [posting, setPosting] = useState(false);
  console.log(blogData);
  useEffect(() => {
    if (blogData) {
      setContent(locale === "en" ? blogData.content_en : blogData.content_ar);
      setTags(
        blogData
          ? locale === "en"
            ? blogData.tags_en?.split(",").map((tag: string) => tag.trim()) // Convert string to array and trim spaces
            : blogData.tags_ar?.split(",").map((tag: string) => tag.trim()) // Convert string to array and trim spaces
          : []
      );
    }
  }, [blogData, locale]);

  const validationSchema = Yup.object({
    name: Yup.string().required(t("name_required")),
    content: Yup.string().required(t("content_required")),
    tags: Yup.array().min(1, t("tag_required")),
    metaDescription: Yup.string().required(t("meta_description_required")),
    metaKeywords: Yup.string().required(t("meta_keywords_required")),
    blogLang: Yup.string().required(t("lang_required")),
  });

  const formik = useFormik({
    enableReinitialize: true, // Enable reinitialization when blogData is loaded
    initialValues: {
      blogLang: "",
      name: blogData
        ? locale === "en"
          ? blogData.title_en
          : blogData.title_ar
        : "",
      content: blogData
        ? locale === "en"
          ? blogData.content_en
          : blogData.content_ar
        : "",
      blogImg: null,
      tags: blogData
        ? locale === "en"
          ? blogData.tags_en?.split(",").map((tag: string) => tag.trim()) // Convert string to array and trim spaces
          : blogData.tags_ar?.split(",").map((tag: string) => tag.trim()) // Convert string to array and trim spaces
        : [],
      metaDescription: blogData
        ? locale === "en"
          ? blogData.description_en
          : blogData.description_ar
        : "",
      metaKeywords: blogData
        ? locale === "en"
          ? blogData.keywords_en
          : blogData.keywords_ar
        : "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("id", params.id);
      formData.append("title", values.name);
      formData.append("content", values.content);
      formData.append("description", values.metaDescription);
      formData.append("keywords", values.metaKeywords);
      formData.append("lang", values.blogLang); // Append blogLang
      formData.append("tags", values.tags.join(", "));
      if (values.blogImg) {
        formData.append("image", values.blogImg);
      }
      const token = localStorage.getItem("authToken");
      try {
        setPosting(true);
        const response = await editBlog(formData, token ? token : "");
        console.log("Blog updated successfully:", response);
        formik.resetForm();
        setPosting(false);
      } catch (error) {
        setPosting(false);
        console.error("Error updating blog:", error);
      }
    },
  });

  // Function to add a new tag
  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      const newTags = [...tags, tagInput];
      setTags(newTags);
      setTagInput("");
      formik.setFieldValue("tags", newTags); // Update Formik state with new tags
    }
  };

  // Function to remove a tag
  const handleRemoveTag = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
    formik.setFieldValue("tags", newTags); // Update Formik state with removed tag
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading blog data</div>;

  return (
    <div className="w-full flex flex-col gap-5 capitalize">
      <DashboardTitle title={t("edit_blog")} />

      {/* Language Selection */}

      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle>{t("edit_blog")}</CardTitle>
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
                    {typeof formik.errors.name === "string"
                      ? formik.errors.name
                      : JSON.stringify(formik.errors.name)}
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="tags">{t("tags")}</Label>
                <div className="flex flex-row space-x-1.5 items-center">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder={t("tag_placeholder")}
                    className="max-w-[500px] w-full"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={handleAddTag}
                  >
                    {t("tag_add")}
                  </Button>
                </div>

                <div className="flex flex-row flex-wrap space-x-1.5">
                  {tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="default"
                      className="flex flex-row space-x-1.5 h-8"
                    >
                      <span>{tag}</span>
                      <X
                        size={18}
                        onClick={() => handleRemoveTag(tag)}
                        className="cursor-pointer"
                      />
                    </Badge>
                  ))}
                </div>
                {formik.errors.tags && formik.touched.tags && (
                  <div className="text-red-500 text-sm">
                    {typeof formik.errors.tags === "string"
                      ? formik.errors.tags
                      : JSON.stringify(formik.errors.tags)}
                  </div>
                )}
              </div>

              {/* Blog Image */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="blogImg">{t("blog_image")}</Label>
                <Input
                  type="file"
                  id="blogImg"
                  onChange={(event) =>
                    formik.setFieldValue(
                      "blogImg",
                      event.currentTarget.files?.[0] || null
                    )
                  }
                />
                {formik.errors.blogImg && formik.touched.blogImg && (
                  <div className="text-red-500 text-sm">
                    {typeof formik.errors.blogImg === "string"
                      ? formik.errors.blogImg
                      : JSON.stringify(formik.errors.blogImg)}
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
                      {typeof formik.errors.metaDescription === "string"
                        ? formik.errors.metaDescription
                        : JSON.stringify(formik.errors.metaDescription)}
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
                    {typeof formik.errors.metaKeywords === "string"
                      ? formik.errors.metaKeywords
                      : JSON.stringify(formik.errors.metaKeywords)}
                  </div>
                )}
              </div>

              {/* Blog Content with React Quill */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="content">{t("content")}</Label>
                <ReactQuill
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
                    {typeof formik.errors.content === "string"
                      ? formik.errors.content
                      : JSON.stringify(formik.errors.content)}
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
            <Button type="submit" disabled={posting}>
              {posting ? <Loader size={14} /> : t("publish")}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Page;
