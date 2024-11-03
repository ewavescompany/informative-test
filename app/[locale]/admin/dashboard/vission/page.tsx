"use client";
import { DashboardTitle } from "@/customComponents/dashboardComponent/tags/dashboardTitle";
import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useFetchVision } from "@/hooks/dashboard/useFetchVision";
import PageLoader from "@/customComponents/pageLoader";
import { useToast } from "@/hooks/use-toast"; // Import toast hook
import { useTranslations } from "next-intl"; // Import translation hook
import Cookies from "js-cookie";
import { updateVisionData } from "@/requests/admin/updateVisionData";
import Loader from "@/customComponents/loader";
import withAuth from "@/app/hocs/withAuth";

// Yup validation schema with translated error messages

function Page() {
  const { visionData, loading, error } = useFetchVision(); // Use the hook
  const [isPosting, setIsPosting] = useState<boolean>(false);
  console.log(visionData);
  const { toast } = useToast(); // Use the toast hook
  const t = useTranslations("vision"); // Use translations
  const locale = Cookies.get("NEXT_LOCALE") || "en"; // Get locale
  const validationSchema = Yup.object({
    title: Yup.string().required((t) => t("title_required")),
    subTitle: Yup.string().required((t) => t("subtitle_required")),
    missionDescription: Yup.string()
      .min(20, t("description_min"))
      .required(t("description_required")),
    lang: Yup.string().required(t("language_required")),
  });
  // Initialize Formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: visionData
      ? {
          title:
            locale === "en" ? visionData?.title_en : visionData?.title_ar || "",
          subTitle:
            locale === "en"
              ? visionData?.sub_title_en
              : visionData?.sub_title_ar || "",
          missionImg: null,
          missionDescription:
            locale === "en"
              ? visionData?.description_en
              : visionData?.description_ar || "",
          lang: "",
        }
      : {
          title: "",
          subTitle: "",
          missionImg: null,
          missionDescription: "",
          lang: "",
        },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Form values:", values);
      const token = localStorage.getItem("authToken");
      // Display success toast
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("sub_title", values.subTitle);
      formData.append("description", values.missionDescription);
      formData.append("lang", values.lang);
      if (values.missionImg) formData.append("image", values.missionImg);
      try {
        setIsPosting(true);
        const res = await updateVisionData(formData, token ? token : ""); // Call the update request function
        console.log(res);
        // Show success toast
        setIsPosting(false);
        toast({
          title: t("success"),
          description: t("vision_updated_successfully"),
        });
      } catch (error) {
        setIsPosting(false);
        // Show error toast
        toast({
          variant: "destructive",
          title: t("error_message"),
          description: t("vision_update_failed"),
        });
        console.error("Failed to update stats:", error);
      }

      // Handle form submission, e.g., send to API
    },
  });

  if (loading) return <PageLoader />; // Show loader while fetching data
  if (error)
    return (
      <div>
        {t("error")}: {error}
      </div>
    );

  return (
    <div className="w-full flex flex-col gap-5 capitalize">
      <DashboardTitle title={t("update_your_vision")} />
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle>{t("update_the_vision")}</CardTitle>
          <CardDescription>
            {t("fill_in_the_form_for_your_vision")}
          </CardDescription>
        </CardHeader>
        <form onSubmit={formik.handleSubmit}>
          <CardContent>
            <div className="flex flex-col w-full gap-4">
              {/* Title */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">{t("vision_title")}</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  placeholder={t("enter_vision_title")}
                />
                {formik.errors.title && formik.touched.title && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.title}
                  </div>
                )}
              </div>

              {/* SubTitle */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="subTitle">{t("sub_vision_title")}</Label>
                <Input
                  id="subTitle"
                  name="subTitle"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.subTitle}
                  placeholder={t("enter_sub_vision_title")}
                />
                {formik.errors.subTitle && formik.touched.subTitle && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.subTitle}
                  </div>
                )}
              </div>

              {/* Mission Image */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="missionImg">{t("vision_image")}</Label>
                <Input
                  type="file"
                  id="missionImg"
                  onChange={(event) =>
                    formik.setFieldValue(
                      "missionImg",
                      event.currentTarget.files?.[0]
                    )
                  }
                />
                {formik.errors.missionImg && formik.touched.missionImg && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.missionImg}
                  </div>
                )}
              </div>

              {/* Mission Description */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="missionDescription">
                  {t("vision_description")}
                </Label>
                <Textarea
                  id="missionDescription"
                  name="missionDescription"
                  rows={5}
                  onChange={formik.handleChange}
                  value={formik.values.missionDescription}
                  placeholder={t("enter_vision_description")}
                />
                {formik.errors.missionDescription &&
                  formik.touched.missionDescription && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.missionDescription}
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
                {formik.touched.lang &&
                  typeof formik.errors.lang === "string" && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.lang}
                    </div>
                  )}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-4">
            <Button variant="outline" type="button">
              {t("cancel")}
            </Button>
            <Button disabled={isPosting} type="submit">
              {isPosting ? <Loader size={14} /> : t("update")}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default withAuth(Page);