import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
interface DropdownItem {
  href: string;
  label: string;
}

// Props for DropdownNavItem
interface DropdownNavItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  items: DropdownItem[];
}

// Props for SidebarLink

// Reusable DropdownMenu Component
export const DropdownNavItem: React.FC<DropdownNavItemProps> = ({
  icon: Icon,
  label,
  items,
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="ghost"
        className="w-full justify-between px-3 py-2 font-medium"
      >
        <span className="flex flex-row gap-3">
          <Icon className="h-4 w-4" />
          {label}
        </span>

        <ChevronDown className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      {items.map((item, index) => (
        <DropdownMenuItem key={index} className="">
          <Link href={item.href} className="flex w-full items-center ">
            <span className="ltr:mr-auto rtl:ml-auto">{item.label}</span>
          </Link>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);
