"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";

import { Button } from "@/components/ui/button";
import LinkButton from "../links/linkButton";
function HorizontalCardComponent({
  title,
  jobTitle,
  imgUrl,
  descrption,
  onDelete,
  editUrl,
}: {
  shortDescrption?: string;
  title: string;
  jobTitle: string;
  imgUrl: string;
  descrption?: string;
  editUrl: string;
  onDelete: (id: number) => void;
}) {
  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="grid grid-cols-4 gap-x-1.5 items-center">
        <img
          src={imgUrl}
          className="w-full h-full aspect-square rounded-full max-w-[75px] max-h-[75px]"
          alt="blog image"
        />
        <div className="flex flex-col gap-y-1.5 col-span-3">
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="text-primary">{jobTitle}</CardDescription>
        </div>
      </CardHeader>
      <div className="flex flex-col gap-y-1.5">
        <CardContent className="flex flex-col gap-y-1.5">
          <CardDescription className="">{descrption}</CardDescription>
        </CardContent>
        <CardFooter className="flex justify-end flex-row gap-x-1.5">
          <Button
            onClick={() => onDelete(1)}
            variant="destructive"
            type="button"
          >
            Delete
          </Button>
          <LinkButton className="space-x-1.5 h-9 px-4 py-2" url={editUrl}>
            Edit
          </LinkButton>
        </CardFooter>
      </div>
    </Card>
  );
}

export default HorizontalCardComponent;
