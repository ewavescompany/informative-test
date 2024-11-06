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
import { useFetchMission } from "@/hooks/dashboard/useFetchMission";
import PageLoader from "@/customComponents/pageLoader";
import { useTranslations } from "next-intl"; // For translations
import { useToast } from "@/hooks/use-toast"; // For displaying success and error toasts
import Cookies from "js-cookie";
import { updateMissionData } from "@/requests/admin/updateMissionData";
// import withAuth from "@/app/hocs/withAuth";
// Yup validation schema

function Page() {
  const { missionData, loading, error } = useFetchMission(); // Use the hook

  const [isPosting, setIsPosting] = useState<boolean>(false);
  const { toast } = useToast();
  const t = useTranslations("mission"); // For translations
  const locale = Cookies.get("NEXT_LOCALE") || "en"; // Get locale
  const validationSchema = Yup.object({
    title: Yup.string().required(t("mission_title_required")),
    subTitle: Yup.string().required(t("sub_mission_title_required")),
    missionDescription: Yup.string()
      .min(20, t("mission_description_min"))
      .required(t("mission_description_required")),
    lang: Yup.string().required(t("language_required")),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: missionData
      ? {
          title:
            locale === "en"
              ? missionData?.title_en
              : missionData?.title_ar || "",
          subTitle:
            locale === "en"
              ? missionData?.sub_title_en
              : missionData?.sub_title_ar || "",
          missionImg: null,
          missionDescription:
            locale === "en"
              ? missionData?.description_en
              : missionData?.description_ar || "",
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
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("sub_title", values.subTitle);
      formData.append("description", values.missionDescription);
      formData.append("lang", values.lang);
      if (values.missionImg) formData.append("image", values.missionImg);
      try {
        setIsPosting(true);
        const res = await updateMissionData(formData, token ? token : ""); // Call the update request function
        console.log(res);
        // Show success toast
        setIsPosting(false);
        toast({
          title: t("update"),
          description: t("mission_updated_successfully"),
        });
      } catch (error) {
        setIsPosting(false);
        // Show error toast
        toast({
          variant: "destructive",
          title: t("error_message"),
          description: t("mission_update_failed"),
        });
        console.error("Failed to update stats:", error);
      }
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
      <DashboardTitle title={t("update_your_mission")} />
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle>{t("update_the_mission")}</CardTitle>
          <CardDescription>
            {t("fill_in_the_form_for_your_mission")}
          </CardDescription>
        </CardHeader>
        <form onSubmit={formik.handleSubmit}>
          <CardContent>
            <div className="flex flex-col w-full gap-4">
              {/* Title */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">{t("mission_title")}</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  placeholder={t("enter_mission_title")}
                />
                {formik.errors.title && formik.touched.title && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.title}
                  </div>
                )}
              </div>

              {/* SubTitle */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="subTitle">{t("sub_mission_title")}</Label>
                <Input
                  id="subTitle"
                  name="subTitle"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.subTitle}
                  placeholder={t("enter_sub_mission_title")}
                />
                {formik.errors.subTitle && formik.touched.subTitle && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.subTitle}
                  </div>
                )}
              </div>

              {/* Mission Image */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="missionImg">{t("mission_image")}</Label>
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
                  {t("mission_description")}
                </Label>
                <Textarea
                  id="missionDescription"
                  name="missionDescription"
                  rows={5}
                  onChange={formik.handleChange}
                  value={formik.values.missionDescription}
                  placeholder={t("enter_mission_description")}
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
            <Button type="submit" disabled={isPosting}>
              {isPosting ? "Updating..." : t("update")}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Page;
