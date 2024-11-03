"use client";

import LinkButton from "@/customComponents/dashboardComponent/links/linkButton";
import { DashboardTitle } from "@/customComponents/dashboardComponent/tags/dashboardTitle";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import CardComponent from "@/customComponents/dashboardComponent/cards/cardComponent";
import { useShowDialog } from "@/hooks/useShowDialog";
import { DeleteDialog } from "@/customComponents/dashboardComponent/dialog/deleteDialog";
import { useFetchTeamMembers } from "@/hooks/dashboard/useFetchTeamMembers"; // Hook to fetch team members
import { useTranslations } from "next-intl"; // For translations
import { dashboardBaseServerUrl, imagesPath } from "@/constants/urls"; // Adjust the path to your constants
import Cookies from "js-cookie";
import PageLoader from "@/customComponents/pageLoader";
import withAuth from "@/app/hocs/withAuth";
function Page() {
  const { teamMembers, loading, error, setTeamMembers } = useFetchTeamMembers(); // Add setTeamMembers for update
  const t = useTranslations("team"); // Access translations for the team page
  const locale = Cookies.get("NEXT_LOCALE") || "en";
  const { isOpen, openDialog, closeDialog } = useShowDialog();
  const [active, setActive] = useState<number | null>(null);

  function handleOpenDialog(value: number) {
    setActive(value);
    openDialog();
  }

  // Function to remove a team member
  async function removeTeam(id: number) {
    setTeamMembers((prevMembers) =>
      prevMembers.filter((member) => member.id !== id)
    );
  }

  if (loading) return <PageLoader />;
  if (error)
    return (
      <div>
        {t("error_message")}: {error}
      </div>
    );

  return (
    <>
      <div className="w-full flex flex-col gap-5 capitalize">
        <div className="flex flex-row items-center justify-between">
          <DashboardTitle title={t("all_members")} />
          <LinkButton
            url={`/${locale}/admin/dashboard/team/add-team`}
            className="space-x-1.5 h-9 px-4 py-2"
          >
            <span>{t("add_member")}</span>
            <Plus />
          </LinkButton>
        </div>

        {teamMembers && teamMembers.length > 0 && (
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
            {teamMembers.map((member, index) => (
              <CardComponent
                key={index}
                onDelete={() => handleOpenDialog(member.id)}
                editUrl={`/${locale}/admin/dashboard/team/edit-team/${member.id}`}
                imgUrl={`${imagesPath}/team/${member.image}`} // Correct image path
                title={locale === "en" ? member.name_en : member.name_ar}
                shortDescrption={
                  locale === "en" ? member.position_en : member.position_ar
                }
              />
            ))}
          </div>
        )}
      </div>

      <DeleteDialog
        removeAction={removeTeam}
        deleteUrl={`${dashboardBaseServerUrl}/team/delete`}
        activeId={active ? active : 0}
        isShown={isOpen}
        handleClose={closeDialog}
      />
    </>
  );
}

export default withAuth(Page);
