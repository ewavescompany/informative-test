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
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import LinkButton from "../links/linkButton";
function CardComponent({
  imgClassName,
  imgUrl,
  title,
  descrption,
  shortDescrption,
  onDelete,
  editUrl,
}: {
  imgClassName?: string;
  imgUrl: string;
  title: string;
  descrption?: string;
  shortDescrption?: string;
  editUrl: string;
  onDelete: (id: number) => void;
}) {
  const t = useTranslations("settings");
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <img
          src={imgUrl}
          className={`w-full h-full rounded-xl aspect-square ${imgClassName} `}
          alt={`blog ${title}`}
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-y-1.5">
        <CardTitle>{title}</CardTitle>
        {shortDescrption && (
          <CardDescription className="text-primary line-clamp-2">
            {shortDescrption}
          </CardDescription>
        )}
        {descrption && (
          <CardDescription className="line-clamp-2">
            {descrption}
          </CardDescription>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-1.5 mt-auto">
        <Button onClick={() => onDelete(1)} variant="destructive" type="button">
          {t("delete")}
        </Button>
        <LinkButton className="space-x-1.5 h-9 px-4 py-2" url={editUrl}>
          {t("edit")}
        </LinkButton>
      </CardFooter>
    </Card>
  );
}

export default CardComponent;
