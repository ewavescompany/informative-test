import BentoGrids from "@/customComponents/homeComponents/bentoGrids";
import Mission from "@/customComponents/homeComponents/mission";
import Vission from "@/customComponents/homeComponents/vission";
import Stats from "@/customComponents/homeComponents/stats";
import TeamSection from "@/customComponents/homeComponents/teamSection";
import Testomonials from "@/customComponents/homeComponents/testomonials";
import BlogSection from "@/customComponents/homeComponents/blogSection";
import Contactus from "@/customComponents/homeComponents/contactus";
import VideoSection from "@/customComponents/homeComponents/videoSection";
import Navbar from "@/customComponents/layoutComponents/navbar";
import Footer from "@/customComponents/layoutComponents/footer";
import { clientBaseServerUrl, serverUrls } from "@/constants/urls";
import axios from "axios";
import { homeInterface } from "@/interfaces/clientInterface";

async function homeDataRequest() {
  try {
    const response = await axios(`${clientBaseServerUrl}${serverUrls.home}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response;

    return data.data as homeInterface;
  } catch (error) {
    console.error("Failed to fetch :", error);
    throw error;
  }
}

export default async function Home() {
  const res = await homeDataRequest();

  return (
    <>
      <Navbar logo={res.logo} />
      <div className="min-h-screen flex flex-col gap-10">
        <VideoSection settings={res.setting} />
        <div className="flex flex-col gap-10 px-8 pb-20 sm:px-20 py-4 sm:py-10 ">
          <BentoGrids />
          {/* <Services /> */}
          <Mission mission={res.mission[0]} />
          <Vission vission={res.vission[0]} />
          <Stats stats={res.stats[0]} />
          <TeamSection team={res.team} />
          <Testomonials testimonials={res.testimonials} />
          <BlogSection blogs={res.blogs} />
          <Contactus />
        </div>
      </div>
      <Footer />
    </>
  );
}
