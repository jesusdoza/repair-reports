"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FormProcedureCard } from "./FormStep";
import { Save } from "lucide-react";
import { Repair } from "@/classes/Repair";
import { StepPreviewPanel } from "./StepPreviewPanel";
import { RepairDetailsPanel } from "./RepairDetailsPanel";
import ProcedureForm from "./ProcedureForm";
import AvailableOptionsMulti from "../AvailableOptions/AvailableOptionsMulti";

type imageData = {
  url: string;
  caption: string;
};

// Define the form data structure
export type ProcedureStep = {
  images: imageData[];
  instructions: string;
};

export type RepairFormData = {
  title: string;
  description: string;
  category: string;
  manufacturer: string;
  type: string;
  visibility: "public" | "organization";
  procedures: ProcedureStep[];
};

// Main component for the repair form, which manages the overall state and layout of the form, including the side panel and step navigation.
export function RepairForm({
  onSubmit = () => {},
  enableSubmit,
}: {
  onSubmit: (repairData: Repair) => void;
  enableSubmit: boolean;
}) {
  // Initialize form data with default values
  const [formData, setFormData] = useState<RepairFormData>({
    title: "",
    description: "",
    category: "",
    manufacturer: "",
    type: "",
    visibility: "public",
    procedures: [{ images: [], instructions: "" }],
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [procedures, setProcedures] = useState<ProcedureStep[]>([
    { images: [], instructions: "" },
  ]);

  useEffect(() => {
    // log steps whenever they change
    console.log("Current form data:", formData);
  }, [formData]);

  // Add a new step to the form
  const addStep = () => {
    setProcedures([...procedures, { images: [], instructions: "" }]);
    setCurrentStep(procedures.length);
  };

  // Remove the current step
  const removeStep = () => {
    if (procedures.length <= 1) return;

    const newSteps = [...procedures];
    newSteps.splice(currentStep, 1);
    setProcedures(newSteps);
    setCurrentStep(Math.min(currentStep, newSteps.length - 1));
  };

  // Update the current step's data
  const updateCurrentStep = (data: Partial<ProcedureStep>) => {
    const newSteps = [...procedures];
    newSteps[currentStep] = { ...newSteps[currentStep], ...data };
    setProcedures(newSteps);
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Form submitted:", procedures);
    // In a real app, you would send this data to your backend
    onSubmit(new Repair());
    alert("Form submitted successfully!");
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-80 flex flex-col gap-6 h-fit">
        <RepairDetailsPanel
          title={formData?.title || ""}
          setTitle={(title) =>
            setFormData((prev) => ({ ...prev, title: title }))
          }
          description={formData?.description || ""}
          setDescription={(description) =>
            setFormData((prev) => ({ ...prev, description: description }))
          }
          category={formData?.category || ""}
          setCategory={(category) =>
            setFormData((prev) => ({ ...prev, category: category }))
          }
          manufacturer={formData?.manufacturer || ""}
          setManufacturer={(manufacturer) =>
            setFormData((prev) => ({ ...prev, manufacturer: manufacturer }))
          }
          type={formData?.type || ""}
          setType={(type) => setFormData((prev) => ({ ...prev, type: type }))}
          visibility={formData?.visibility || "public"}
          setVisibility={(visibility) =>
            setFormData((prev) => ({ ...prev, visibility: visibility }))
          }
        />
        <StepPreviewPanel
          steps={procedures}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </div>
      <div className="flex-1 space-y-6">
        <h1 className="text-2xl font-bold">Repair Form</h1>
        <ProcedureForm
          currentStep={currentStep}
          steps={procedures}
          addStep={addStep}
          removeStep={removeStep}
          updateCurrentStep={updateCurrentStep}
          FormStep={FormProcedureCard}
        />
        {/* submit button */}
        <div className="flex flex-col gap-2">
          <Button
            onClick={handleSubmit}
            disabled={!enableSubmit}
            className="w-full">
            <Save className="h-4 w-4 mr-2" />
            Save Documentation
          </Button>
        </div>
      </div>
    </div>
  );
}
