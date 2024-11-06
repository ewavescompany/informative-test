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
import { useTranslations } from "next-intl"; // Import the request function
import Loader from "@/customComponents/loader";
import { useToast } from "@/hooks/use-toast";
import { useFetchTeamMember } from "@/hooks/dashboard/useFetchTeamMember"; // Hook to fetch the team member by ID
import { useParams } from "next/navigation"; // Assuming you're using next/navigation for getting the ID
import PageLoader from "@/customComponents/pageLoader";
import Cookies from "js-cookie";
import { updateTeamMember } from "@/requests/admin/updateTeamMember";
import withAuth from "@/app/hocs/withAuth";
function TeamEditForm() {
  const params = useParams<{ id: string }>(); // Get the team member ID from the URL params
  const { teamMember, loading } = useFetchTeamMember(params.id); // Fetch team member data
  const t = useTranslations("team"); // Access translations for the 'team' namespace
  const { toast } = useToast();
  const [previewImage, setPreviewImage] = useState<File | null>(null); // Preview for image
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const locale = Cookies.get("NEXT_LOCALE") || "en";
  const validationSchema = Yup.object({
    name: Yup.string().required(t("name_required")),
    position: Yup.string().required(t("position_required")),
    lang: Yup.string().required(t("language_required")),
  });

  const formik = useFormik({
    initialValues: teamMember
      ? {
          name: locale === "en" ? teamMember.name_en : teamMember.name_ar || "", // Pre-fill the values from fetched team member
          position:
            locale === "en"
              ? teamMember.position_en
              : teamMember.position_ar || "",
          lang: locale,
          image: null, // Reset the image on edit
        }
      : {
          name: "",
          position: "",
          lang: "", // Default to 'en'
          image: null,
        },
    enableReinitialize: true, // Enable reinitializing when the data changes
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("id", params.id);
      formData.append("name", values.name);
      formData.append("position", values.position);
      formData.append("lang", values.lang);
      if (values.image) {
        formData.append("image", values.image);
      }

      const token = localStorage.getItem("authToken");
      try {
        setIsLoading(true);
        const response = await updateTeamMember(formData, token || "");
        console.log("-----------: ", response); // Call the API request function

        if (response.success) {
          toast({
            title: t("team_member_updated_successfully"),
            description: t("team_member_updated_successfully_you_can_check_it"),
          });
        }
        if (!response.success) {
          toast({
            variant: "destructive",
            title: t("team_member_updating_failed"),
            description: response.error,
          });
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        toast({
          variant: "destructive",
          title: t("team_member_updating_failed"),
        });
        setIsLoading(false);
      }
    },
  });

  // Handle image change and preview
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      setPreviewImage(file);
      formik.setFieldValue("image", file); // Update Formik state
    }
  };

  if (loading) {
    return <PageLoader />; // Display loader while fetching the data
  }

  return (
    <div className="w-full flex flex-col gap-5 capitalize">
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle>{t("edit_team_member")}</CardTitle>
          <CardDescription>{t("fill_form_to_edit_member")}</CardDescription>
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

export default withAuth(TeamEditForm);
