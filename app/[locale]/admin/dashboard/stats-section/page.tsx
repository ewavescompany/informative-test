"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
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
import { useFetchStats } from "@/hooks/dashboard/useFetchStats"; // Hook to fetch stats
import { updateStats } from "@/requests/admin/updateStats"; // Request function to update stats
import PageLoader from "@/customComponents/pageLoader";
import { useTranslations } from "next-intl";
import { useToast } from "@/hooks/use-toast"; // Assuming you have a toast hook
import Cookies from "js-cookie";
import withAuth from "@/app/hocs/withAuth";
// Validation Schema using Yup

function StatsPage() {
  const { stats, loading, error } = useFetchStats(); // Fetch stats hook
  const t = useTranslations("stats");
  const { toast } = useToast(); // Initialize toast
  const locale = Cookies.get("NEXT_LOCALE") || "en";
  const validationSchema = Yup.object({
    title: Yup.string().required(t("title_required")),
    sub_title: Yup.string().required(t("subtitle_required")),
    stat1: Yup.number().required(t("stat1_required")),
    stat2: Yup.number().required(t("stat2_required")),
    stat3: Yup.number().required(t("stat3_required")),
    stat4: Yup.number().required(t("stat4_required")),
    lang: Yup.string().required(t("language_required")),
  });

  const formik = useFormik({
    initialValues: stats
      ? {
          title: locale === "en" ? stats?.title_en : stats?.title_ar || "",

          sub_title:
            locale === "en" ? stats?.sub_title_en : stats?.sub_title_ar || "",
          stat1: stats?.stat1 || "",
          stat2: stats?.stat2 || "",
          stat3: stats?.stat3 || "",
          stat4: stats?.stat4 || "",
          lang: "",
        }
      : {
          title: "",
          sub_title: "",
          stat1: "",
          stat2: "",
          stat3: "",
          stat4: "",
          lang: "",
        },
    validationSchema,
    enableReinitialize: true, // Enable re-initialization when stats are fetched
    onSubmit: async (values) => {
      const token = localStorage.getItem("authToken");
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("sub_title", values.sub_title);
      formData.append("stat1", values.stat1);
      formData.append("stat2", values.stat2);
      formData.append("stat3", values.stat3);
      formData.append("stat4", values.stat4);
      formData.append("lang", values.lang);
      try {
        const res = await updateStats(formData, token ? token : ""); // Call the update request function
        console.log(res);
        // Show success toast
        toast({
          title: t("success"),
          description: t("stats_updated_successfully"),
        });
      } catch (error) {
        // Show error toast
        toast({
          variant: "destructive",
          title: t("error"),
          description: t("stats_update_failed"),
        });
        console.error("Failed to update stats:", error);
      }
    },
  });

  if (loading) return <PageLoader />;
  if (error)
    return (
      <div>
        {t("error")}: {error}
      </div>
    );

  return (
    <div className="w-full flex flex-col gap-5 capitalize">
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle>{t("manage_stats")}</CardTitle>
        </CardHeader>
        <form onSubmit={formik.handleSubmit}>
          <CardContent>
            <div className="flex flex-col space-y-4">
              {/* Title */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">{t("title")}</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  placeholder={t("title_placeholder")}
                />
                {formik.touched.title &&
                  typeof formik.errors.title === "string" && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.title}
                    </div>
                  )}
              </div>

              {/* Subtitle */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="sub_title">{t("sub_title")}</Label>
                <Input
                  id="sub_title"
                  name="sub_title"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.sub_title}
                  placeholder={t("sub_title_placeholder")}
                />
                {formik.touched.sub_title &&
                  typeof formik.errors.sub_title === "string" && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.sub_title}
                    </div>
                  )}
              </div>

              {/* Stat 1: Businesses served */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="stat1">{t("businesses_served")}</Label>
                <Input
                  id="stat1"
                  name="stat1"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.stat1}
                  placeholder={t("businesses_served_placeholder")}
                />
                {formik.touched.stat1 &&
                  typeof formik.errors.stat1 === "string" && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.stat1}
                    </div>
                  )}
              </div>

              {/* Stat 2: Average increase in engagement */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="stat2">
                  {t("average_engagement_increase")}
                </Label>
                <Input
                  id="stat2"
                  name="stat2"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.stat2}
                  placeholder={t("average_engagement_increase_placeholder")}
                />
                {formik.touched.stat2 &&
                  typeof formik.errors.stat2 === "string" && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.stat2}
                    </div>
                  )}
              </div>

              {/* Stat 3: Countries reached */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="stat3">{t("countries_reached")}</Label>
                <Input
                  id="stat3"
                  name="stat3"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.stat3}
                  placeholder={t("countries_reached_placeholder")}
                />
                {formik.touched.stat3 &&
                  typeof formik.errors.stat3 === "string" && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.stat3}
                    </div>
                  )}
              </div>

              {/* Stat 4: Campaigns launched annually */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="stat4">
                  {t("campaigns_launched_annually")}
                </Label>
                <Input
                  id="stat4"
                  name="stat4"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.stat4}
                  placeholder={t("campaigns_launched_annually_placeholder")}
                />
                {formik.touched.stat4 &&
                  typeof formik.errors.stat4 === "string" && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.stat4}
                    </div>
                  )}
              </div>

              {/* Language Select */}
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
            <Button type="submit">{t("submit")}</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default withAuth(StatsPage);
