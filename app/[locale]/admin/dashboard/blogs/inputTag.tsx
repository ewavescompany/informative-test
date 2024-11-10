import { useState } from "react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function InputTag({
  tags,
  setTags,
  formik,
}: {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  formik: any;
}) {
  const [tagInput, setTagInput] = useState("");
  const t = useTranslations("blogForm"); // Translation object for the selected language

  function isValidTag() {
    return tagInput && !tags.includes(tagInput);
  }

  // Function to add a new tag
  function handleAddTag() {
    if (isValidTag()) {
      const newTags = [...tags, tagInput];
      setTags(newTags);
      setTagInput("");

      formik.setFieldValue("tags", newTags); // Update Formik state with new tags
    }
  }

  // Function to remove a tag
  function handleRemoveTag(tag: string) {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);

    formik.setFieldValue("tags", newTags); // Update Formik state with removed tag
  }

  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor="tags">{t("tags")}</Label>
      <div className="flex flex-row gap-x-1.5 items-center">
        <Input
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
          placeholder={t("tag_placeholder")}
          className="max-w-[500px] w-full"
        />
        <Button
          variant="outline"
          size="sm"
          type="button"
          onClick={handleAddTag}
        >
          {t("tag_add")}
        </Button>
      </div>

      <div className="flex flex-row flex-wrap space-x-1.5">
        {tags.map((tag, index) => (
          <Badge
            key={index}
            variant="default"
            className="flex flex-row space-x-1.5 h-8"
          >
            <span>{tag}</span>
            <X
              size={18}
              onClick={() => handleRemoveTag(tag)}
              className="cursor-pointer"
            />
          </Badge>
        ))}
      </div>
      {formik.errors.tags && formik.touched.tags && (
        <div className="text-red-500 text-sm">{formik.errors.tags}</div>
      )}
    </div>
  );
}
