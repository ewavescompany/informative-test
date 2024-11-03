"use client";
import LinkButton from "@/customComponents/dashboardComponent/links/linkButton";
import { DashboardTitle } from "@/customComponents/dashboardComponent/tags/dashboardTitle";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import CardComponent from "@/customComponents/dashboardComponent/cards/cardComponent";
import { useShowDialog } from "@/hooks/useShowDialog";
import { DeleteDialog } from "@/customComponents/dashboardComponent/dialog/deleteDialog";
import { useTranslations } from "next-intl";
import useFetchBlogs from "@/hooks/dashboard/useFetchBlogs"; // Custom hook for fetching blogs
import PageLoader from "@/customComponents/pageLoader";
import { BlogInterface } from "@/interfaces/dashboardInterface";
import Cookies from "js-cookie";
import { dashboardBaseServerUrl, imagesPath } from "@/constants/urls";
import withAuth from "@/app/hocs/withAuth";

function Page() {
  const t = useTranslations("blogs");
  const locale = Cookies.get("NEXT_LOCALE") || "en";
  const { isOpen, openDialog, closeDialog } = useShowDialog();
  const [active, setActive] = useState<number>();

  // Use custom hook to fetch blogs data
  const { blogs, loading, setBlogs } = useFetchBlogs();
  console.log(blogs);

  function handleOpenDialog(value: number) {
    setActive(value);
    openDialog();
  }

  function removeBlog(value: number) {
    setBlogs((prevBlogs) => {
      if (prevBlogs && prevBlogs.data) {
        return {
          ...prevBlogs, // Spread the existing structure
          data: prevBlogs.data.filter((blog) => blog?.id !== value), // Filter out the blog from the data array
        };
      }
      return prevBlogs; // Return the original if structure doesn't match
    });
    setActive(0); // Reset active state
  }

  if (loading) {
    return <PageLoader />; // Display loading state
  }
  return (
    <>
      <div className="w-full flex flex-col gap-5 capitalize">
        <div className="flex flex-row items-center justify-between">
          <DashboardTitle title={t("all_blogs")} />
          <LinkButton
            url={`/${locale}/admin/dashboard/blogs/add-blogs`}
            className="space-x-1.5 h-9 px-4 py-2"
          >
            <span>{t("add_blog")}</span>
            <Plus size={14} />
          </LinkButton>
        </div>

        {/* Display loading, error, or blogs */}
        {blogs?.data && blogs?.data.length > 0 && !loading && (
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
            {blogs &&
              blogs?.data?.map((blog: BlogInterface, index: number) => (
                <CardComponent
                  key={index}
                  onDelete={() => handleOpenDialog(blog.id)}
                  editUrl={`/${locale}/admin/dashboard/blogs/edit-blogs/${blog.id}`} // Assuming you have an edit page
                  imgUrl={`${imagesPath}blogs/${blog?.image}`} // Fallback to a default image
                  title={locale === "en" ? blog.title_en : blog.title_ar}
                  descrption={
                    locale === "en" ? blog.description_en : blog.description_ar
                  }
                />
              ))}
          </div>
        )}
        {blogs?.data && blogs?.data.length === 0 && !loading && (
          <div className="w-full h-full min-h-full flex flex-col items-center justify-center">
            <h4 className="text-2xl">{t("no_blogs")}</h4>
          </div>
        )}
      </div>

      <DeleteDialog
        removeAction={removeBlog}
        deleteUrl={`${dashboardBaseServerUrl}/blogs/delete`}
        activeId={active ? active : 0}
        isShown={isOpen}
        handleClose={closeDialog}
      />
    </>
  );
}

export default withAuth(Page);
