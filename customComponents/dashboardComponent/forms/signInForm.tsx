"use client";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Loader from "@/customComponents/loader";
import { useToast } from "@/hooks/use-toast";
import { loginAdmin } from "@/requests/admin/login";
import { useTranslations } from "next-intl";

// Yup schema for form validation using translations
export default function SignInForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const t = useTranslations("login");
  const { toast } = useToast();
  const router = useRouter();

  // Yup schema for validation with translated messages
  const signInSchema = Yup.object().shape({
    email: Yup.string().email(t("email_invalid")).required(t("email_required")),
    password: Yup.string()
      .min(6, t("password_min_length"))
      .required(t("password_required")),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema, // Use Yup schema for validation
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const result = await loginAdmin(values.email, values.password);
        console.log(result);
        setLoading(false);
        if (result.success) {
          toast({
            title: t("login_complete"),
            description: t("login_complete_description"),
          });
          localStorage.setItem(
            "authToken",
            result?.data?.token ? result?.data?.token : ""
          );
          setTimeout(() => {
            router.push("dashboard");
          }, 3000);
        }
        if (!result.success) {
          toast({
            variant: "destructive",
            title: t("login_failed"),
            description: result?.error,
          });
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    },
  });

  return (
    <div className="h-full flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">{t("sign_in")}</h1>
          <p className="text-balance text-sm text-muted-foreground">
            {t("description")}
          </p>
        </div>
        <form onSubmit={formik.handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t("placeholder_email")}
              {...formik.getFieldProps("email")}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">{t("password")}</Label>
            <Input
              placeholder={t("placeholder_password")}
              id="password"
              type="password"
              {...formik.getFieldProps("password")}
            />
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
          </div>

          <Button disabled={loading} type="submit" className="w-full">
            {loading ? <Loader size={16} /> : t("sign_in")}
          </Button>
        </form>
      </div>
    </div>
  );
}
