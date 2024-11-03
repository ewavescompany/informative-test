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
import { useTranslations } from "next-intl"; // For translations
import { submitTeamMember } from "@/requests/admin/team"; // Import the request function
import Loader from "@/customComponents/loader";
import { useToast } from "@/hooks/use-toast";
import withAuth from "@/app/hocs/withAuth";

function TeamAddForm() {
  const t = useTranslations("team"); // Access translations for the 'team' namespace
  const { toast } = useToast();
  const [previewImage, setPreviewImage] = useState<File | null>(null); // Preview for image
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const validationSchema = Yup.object({
    name: Yup.string().required(t("name_required")),
    position: Yup.string().required(t("position_required")),
    lang: Yup.string().required(t("language_required")),
    image: Yup.mixed().required(t("image_required")),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      position: "",
      lang: "", // Default to 'en'
      image: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();

      // Append other fields
      formData.append("name", values.name);
      formData.append("position", values.position);
      formData.append("lang", values.lang);

      // Append image only if it's not null
      if (values.image) {
        formData.append("image", values.image); // Append the image to FormData
      }

      const token = localStorage.getItem("authToken");
      try {
        setIsLoading(true);
        const response = await submitTeamMember(formData, token ? token : ""); // Call the API request function
        console.log("Team member added successfully:", response);
        toast({
          title: t("team_member_added_successfully"),
          description: t("team_member_added_successfully_you_can_check_it"),
        });
        setIsLoading(false);
      } catch (error) {
        toast({
          variant: "destructive",
          title: t("team_member_adding_failed"),
        });
        setIsLoading(false);
        console.error("Failed to submit team member:", error);
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
          <CardTitle>{t("add_team_member")}</CardTitle>
          <CardDescription>{t("fill_form_to_add_member")}</CardDescription>
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

              {/* Position */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="position">{t("position")}</Label>
                <Input
                  id="position"
                  name="position"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.position}
                  placeholder={t("position_placeholder")}
                />
                {formik.errors.position && formik.touched.position && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.position}
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

              {/* Language Selection */}
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

export default withAuth(TeamAddForm);
