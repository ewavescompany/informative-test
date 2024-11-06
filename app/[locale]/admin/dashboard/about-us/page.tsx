"use client";
import { DashboardTitle } from "@/customComponents/dashboardComponent/tags/dashboardTitle";
import React from "react";
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
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useFormik } from "formik";
import * as Yup from "yup";
// import withAuth from "@/app/hocs/withAuth";
import { useFetchAboutus } from "@/hooks/dashboard/useFetchAboutus";
import { useTranslations } from "next-intl";
import Cookies from "js-cookie";
import { updateAbout } from "@/requests/admin/updateAbout";
import { useToast } from "@/hooks/use-toast";

function Page() {
  const locale = Cookies.get("NEXT_LOCALE") || "en"; // Get locale
  const { toast } = useToast();
  const t = useTranslations("aboutus");
  const aboutUsData = useFetchAboutus();

  const validationSchema = Yup.object({
    about: Yup.string().required(t("about_required")),
    lang: Yup.string().required(t("lang_required")),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: aboutUsData?.aboutData
      ? {
          about:
            locale === "en"
              ? aboutUsData.aboutData?.content_en
              : aboutUsData.aboutData?.content_ar,
          lang: "",
        }
      : {
          about: "",
          lang: "",
        },
    validationSchema,
    onSubmit: async (values) => {
      const token = localStorage.getItem("authToken");
      const formData = new FormData();
      formData.append("content", values.about);
      formData.append("lang", values.lang);

      try {
        const response = await updateAbout(formData, token ?? "");
        console.log("Update successful:", response);
        toast({
          title: t("aboutus_updated_successfully"),
          description: t("about_us_updated"),
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: t("aboutus_updated_failed"),
          description: t("please_try_again"),
        });
        console.error("Error updating about us:", error);
      }
    },
  });

  return (
    <div className="w-full flex flex-col gap-5 capitalize">
      <DashboardTitle title={t("update_about_us")} />
      <form onSubmit={formik.handleSubmit}>
        <Card className="w-full h-full">
          <CardHeader>
            <CardTitle>{t("update_company_about")}</CardTitle>
            <CardDescription>{t("fill_about_form")}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-1.5">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="about">{t("about_us_description")}</Label>
              <Textarea
                id="about"
                name="about"
                rows={5}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.about}
                placeholder={t("about_placeholder")}
              />
              {formik.errors.about && formik.touched.about && (
                <div className="text-red-500 text-sm">
                  {formik.errors.about}
                </div>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="lang">{t("language_select")}</Label>
              <Select
                name="lang"
                value={formik.values.lang}
                onValueChange={(value) => formik.setFieldValue("lang", value)}
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
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Button variant="outline" type="button">
              {t("cancel")}
            </Button>
            <Button type="submit">{t("update")}</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default Page;
