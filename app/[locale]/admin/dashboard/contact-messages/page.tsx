"use client";
// import withAuth from "@/app/hocs/withAuth";
import { DashboardTitle } from "@/customComponents/dashboardComponent/tags/dashboardTitle";
import PageLoader from "@/customComponents/pageLoader";
import useFetchContactMessages from "@/hooks/dashboard/useFetchContactMessages";
import { useTranslations } from "next-intl";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactInfo } from "@/interfaces/dashboardInterface";

function Page() {
  const t = useTranslations("messages");
  const { messages, loading, error } = useFetchContactMessages();

  if (loading) return <PageLoader />; // Show loader while fetching data
  if (error)
    return (
      <div>
        {t("error")}: {error}
      </div>
    );

  return (
    <div className="w-full flex flex-col gap-5 capitalize">
      <DashboardTitle title={t("contact_us_messages")} />
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle>{t("messages")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("name")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("email")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("message")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("date")}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {messages?.map((message: ContactInfo, index: number) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {/* {message.} */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {message.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {/* {message.} */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(message.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
