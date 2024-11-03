import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { deleteRequest } from "@/requests/admin/deleteRequest"; // Import the delete request function
import { useTranslations } from "next-intl";
import { useState } from "react";

export function DeleteDialog({
  activeId,
  isShown,
  handleClose,
  deleteUrl, // Add the URL for the delete request
  removeAction,
}: {
  isShown: boolean;
  handleClose: () => void;
  activeId: number;
  deleteUrl: string; // URL for the delete action
  removeAction: (value: number) => void;
}) {
  const { toast } = useToast();
  const t = useTranslations("deleteModal");
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    console.log(activeId, deleteUrl);
    try {
      const response = await deleteRequest(deleteUrl, activeId);
      if (response.success) {
        console.log(`Item with ID ${activeId} deleted successfully.`);
        removeAction(activeId);
        toast({
          title: t("delete_complete"),
          // description: t("delete_complete_description_blog"),
        });
      } else {
        toast({
          title: t("delete_complete"),
          // description: t("delete_complete_description_blog"),
        });
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setLoading(false);
      handleClose(); // Close dialog after delete action
    }
  };

  return (
    <Dialog open={isShown} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete confirmation</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          {/* Close button */}
          <Button type="button" onClick={handleClose} variant="secondary">
            Close
          </Button>
          {/* Delete button */}
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
