"use client";
import React from "react";
import { CircleUser } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import SidebarSheet from "./sidebarSheet";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import Cookies from "js-cookie"; // For saving the selected language

function Header() {
  const currentLang = Cookies.get("NEXT_LOCALE") || "en"; // Get the current language from cookies or default to "en"

  const handleLanguageChange = (lang: string) => {
    // Update the language in cookies
    Cookies.set("NEXT_LOCALE", lang);

    // Get the current path and replace the language part in the URL
    const newPath = window.location.pathname.replace(/^\/(en|ar)/, `/${lang}`);

    // Reload the page to apply the new language
    window.location.href = newPath;
  };

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <SidebarSheet />
      <div className="w-full flex-1">
        {/* Language Select Box */}
        <Select
          value={currentLang}
          onValueChange={(value) => handleLanguageChange(value)}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="ar">Arabic</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

export default Header;
