"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslations } from "next-intl"; // Translation hook
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Import Shadcn select components
import { useToast } from "@/hooks/use-toast"; // Toast for success or failure
import { useFetchSettings } from "@/hooks/dashboard/useFetchSettings";
import PageLoader from "@/customComponents/pageLoader";
import Cookies from "js-cookie";
import { updateSettings } from "@/requests/admin/updateSettings";
// import withAuth from "@/app/hocs/withAuth";
// Yup validation schema

function SettingsPage() {
  const { setting, loading, error } = useFetchSettings();

  const t = useTranslations("settings"); // For translations
  const { toast } = useToast(); // To show success or error messages
  const locale = Cookies.get("NEXT_LOCALE") || "en";

  const validationSchema = Yup.object({
    domain: Yup.string().required(t("domain_required")),
    title: Yup.string().required(t("title_required")),
    description: Yup.string().required(t("description_required")),
    keywords: Yup.string().required(t("keywords_required")),
    maint_mode: Yup.string().required(t("maint_mode_required")),
    lang: Yup.string().required(t("lang_required")),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: setting
      ? {
          domain: setting.domain,
          title: locale === "en" ? setting.title_en : setting.title_ar || "",
          description:
            locale === "en"
              ? setting.description_en
              : setting.description_ar || "",
          keywords:
            locale === "en" ? setting.keywords_en : setting.keywords_ar || "",
          maint_mode: setting.maint_mode === "1" ? "on" : "off",
          facebook: setting.social_facebook,
          twitter: setting.social_x,
          insta: setting.social_insta,
          linkedin: setting.social_linkedin,
          snap: setting.social_snap,
          tiktok: setting.social_tiktok,
          lang: "en",
        }
      : {
          domain: "",
          title: "",
          description: "",
          keywords: "",
          maint_mode: "off",
          facebook: "",
          twitter: "",
          insta: "",
          linkedin: "",
          snap: "",
          tiktok: "",
          lang: "en",
        },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("domain", values.domain);
        if (values.title) formData.append("title", values.title);
        if (values.description)
          formData.append("description", values.description);
        if (values.keywords) formData.append("keywords", values.keywords);
        formData.append(
          "maint_mode",
          values.maint_mode === "on" ? "on" : "off"
        );
        formData.append("facebook", values.facebook);
        formData.append("default_lang", "en");
        formData.append("twitter", values.twitter);
        formData.append("insta", values.insta);
        formData.append("linkedin", values.linkedin);
        formData.append("snap", values.snap);
        formData.append("tiktok", values.tiktok);
        formData.append("lang", values.lang);
        const token = localStorage.getItem("authToken");
        const res = await updateSettings(formData, token ? token : "");
        console.log(res);
        toast({
          title: t("form_success"),
        });
      } catch (error) {
        console.log(error);
        toast({
          variant: "destructive",
          title: t("form_failure"),
        });
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
      <h1 className="text-2xl font-bold">{t("update_settings")}</h1>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        {/* Domain */}
        <div>
          <Label htmlFor="domain">{t("domain")}</Label>
          <Input
            id="domain"
            name="domain"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.domain}
            placeholder={t("domain")}
          />
          {formik.errors.domain && formik.touched.domain && (
            <div className="text-red-500">{formik.errors.domain}</div>
          )}
        </div>

        {/* Title */}
        <div>
          <Label htmlFor="title">{t("title")}</Label>
          <Input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.title ? formik.values.title : ""}
            placeholder={t("title")}
          />
          {formik.errors.title && formik.touched.title && (
            <div className="text-red-500">{formik.errors.title}</div>
          )}
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">{t("description")}</Label>
          <Input
            id="description"
            name="description"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.description ? formik.values.description : ""}
            placeholder={t("description")}
          />
          {formik.errors.description && formik.touched.description && (
            <div className="text-red-500">{formik.errors.description}</div>
          )}
        </div>

        {/* Keywords */}
        <div>
          <Label htmlFor="keywords">{t("keywords")}</Label>
          <Input
            id="keywords"
            name="keywords"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.keywords ? formik.values.keywords : ""}
            placeholder={t("keywords")}
          />
          {formik.errors.keywords && formik.touched.keywords && (
            <div className="text-red-500">{formik.errors.keywords}</div>
          )}
        </div>

        {/* Maintenance Mode (Select Box) */}
        <div>
          <Label htmlFor="maint_mode">{t("maint_mode")}</Label>
          <Select
            name="maint_mode"
            value={formik.values.maint_mode}
            onValueChange={(value) => formik.setFieldValue("maint_mode", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t("maint_mode")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="on">{t("on")}</SelectItem>
              <SelectItem value="off">{t("off")}</SelectItem>
            </SelectContent>
          </Select>
          {formik.errors.maint_mode && formik.touched.maint_mode && (
            <div className="text-red-500">{formik.errors.maint_mode}</div>
          )}
        </div>

        <hr />
        {/* Social Links */}
        <h3>{t("social_links")}</h3>
        <div>
          <Label htmlFor="facebook">{t("facebook")}</Label>
          <Input
            id="facebook"
            name="facebook"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.facebook}
            placeholder={t("facebook")}
          />
        </div>

        <div>
          <Label htmlFor="twitter">{t("twitter")}</Label>
          <Input
            id="twitter"
            name="twitter"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.twitter}
            placeholder={t("twitter")}
          />
        </div>

        <div>
          <Label htmlFor="insta">{t("insta")}</Label>
          <Input
            id="insta"
            name="insta"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.insta}
            placeholder={t("insta")}
          />
        </div>

        <div>
          <Label htmlFor="linkedin">{t("linkedin")}</Label>
          <Input
            id="linkedin"
            name="linkedin"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.linkedin}
            placeholder={t("linkedin")}
          />
        </div>

        <div>
          <Label htmlFor="snap">{t("snap")}</Label>
          <Input
            id="snap"
            name="snap"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.snap}
            placeholder={t("snap")}
          />
        </div>

        <div>
          <Label htmlFor="tiktok">{t("tiktok")}</Label>
          <Input
            id="tiktok"
            name="tiktok"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.tiktok}
            placeholder={t("tiktok")}
          />
        </div>

        {/* Language (Select Box) */}
        <div>
          <Label htmlFor="lang">{t("language")}</Label>
          <Select
            name="lang"
            value={formik.values.lang}
            onValueChange={(value) => formik.setFieldValue("lang", value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("language")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ar">Arabic</SelectItem>
            </SelectContent>
          </Select>
          {formik.errors.lang && formik.touched.lang && (
            <div className="text-red-500">{formik.errors.lang}</div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            type="button"
            onClick={() => formik.resetForm()}
          >
            {t("cancel")}
          </Button>
          <Button type="submit">{t("update")}</Button>
        </div>
      </form>
    </div>
  );
}

export default SettingsPage;
