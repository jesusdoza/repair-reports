"use client";

import { useRef, type ChangeEvent } from "react";
// import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Camera, X, ImagePlus } from "lucide-react";

type RepairProcedureCardProps = {
  step: {
    images: string[];
    notes: string;
  };
  onChange: (data: { images?: string[]; notes?: string }) => void;
};

// This component represents a single step in the repair form, allowing users to upload images and add notes about the repair process.
export function FormProcedureCard({
  step,
  onChange,
}: RepairProcedureCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle image upload
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newImages = [...step.images];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target?.result) {
          newImages.push(event.target.result as string);
          onChange({ images: newImages });
        }
      };

      reader.readAsDataURL(file);
    }

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Remove an image
  const removeImage = (index: number) => {
    const newImages = [...step.images];
    newImages.splice(index, 1);
    onChange({ images: newImages });
  };

  // Update notes
  const updateNotes = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange({ notes: e.target.value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Photos</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Add photos of the circuit board before, during, and after repair.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {step.images.map((image, index) => (
            <div
              key={index}
              className="relative group">
              <div className="aspect-square relative overflow-hidden rounded-md border">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Repair image ${index + 1}`}
                  className="object-cover"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeImage(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          <div
            className="aspect-square flex items-center justify-center rounded-md border border-dashed cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => fileInputRef.current?.click()}>
            <div className="flex flex-col items-center gap-1 text-muted-foreground">
              <ImagePlus className="h-8 w-8" />
              <span className="text-sm">Add Image</span>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => fileInputRef.current?.click()}>
          <Camera className="h-4 w-4 mr-2" />
          Upload Photos
        </Button>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Repair Notes</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Document the issues found and repairs performed on the circuit board.
        </p>
        <Textarea
          placeholder="Describe the repair process, components replaced, and any other relevant details..."
          className="min-h-[150px]"
          value={step.notes || ""}
          onChange={updateNotes}
        />
      </div>
    </div>
  );
}
