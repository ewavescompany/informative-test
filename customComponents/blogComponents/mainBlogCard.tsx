import Cookies from "js-cookie";
import { blogsInterface } from "@/interfaces/clientInterface";
import { imagesPath } from "@/constants/urls";
import { formatDateForPortfolio } from "@/utility/generic";
import Link from "next/link";
function MainBlogCard({ blog }: { blog: blogsInterface }) {
  const locale = Cookies.get("NEXT_LOCALE") || "en";

  return (
    <div className="w-full h-full flex flex-col gap-3 xl:max-w-5xl lg:max-w-3xl max-w-full">
      <div className="w-full h-full overflow-hidden rounded-2xl max-h-[60vh]">
        <Link href={`/${locale}/client/blogs/${blog.id}`}>
          <img
            src={`${imagesPath}blogs/${blog.image}`}
            alt="blog img"
            className="hover:scale-125 duration-500 object-center w-full h-full"
          />
        </Link>
      </div>
      <span className="text-gray-500 uppercase font-medium text-sm">
        {locale === "en" ? blog.tags_en : blog.tags_ar}
      </span>
      <h4 className="text-grayblack xl:text-4xl font-bold">
        {locale === "en" ? blog.title_en : blog.title_ar}
      </h4>
      <div className="w-fit flex flex-row gap-5 items-center justify-center font-medium">
        <h5>{formatDateForPortfolio(blog.created_at)}</h5>
      </div>
      <p className="text-gray-500 line-clamp-3">
        {locale === "en" ? blog.description_en : blog.description_ar}
      </p>
    </div>
  );
}

export default MainBlogCard;
