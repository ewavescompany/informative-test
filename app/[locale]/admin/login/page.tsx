import Image from "next/image";

import imgUrl from "../../../../public/login.jpg";
import SignInForm from "@/customComponents/dashboardComponent/forms/signInForm";
export default function page() {
  return (
    <div className="w-full lg:grid lg:grid-cols-2 h-screen">
      <SignInForm />
      <div className="hidden bg-muted lg:block max-h-screen">
        <Image
          src={imgUrl}
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
