"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormProcedureCard } from "./FormStep";
import { Save } from "lucide-react";
import { Repair } from "@/classes/Repair";
import { StepPreviewPanel } from "./StepPreviewPanel";
import { RepairDetailsPanel } from "./RepairDetailsPanel";
import ProcedureForm from "./ProcedureForm";

type imageData = {
  url: string;
  caption: string;
};

// Define the form data structure
export type ProcedureStep = {
  images: imageData[];
  instructions: string;
};

// Main component for the repair form, which manages the overall state and layout of the form, including the side panel and step navigation.
export function RepairForm({
  onSubmit = () => {},
  enableSubmit,
}: {
  onSubmit: (repairData: Repair) => void;
  enableSubmit: boolean;
}) {
  // State for tracking current step and form data
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<ProcedureStep[]>([
    { images: [], instructions: "" },
  ]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [type, setType] = useState("");
  const [visibility, setVisibility] = useState<"public" | "organization">(
    "public",
  );

  // Add a new step to the form
  const addStep = () => {
    setSteps([...steps, { images: [], instructions: "" }]);
    setCurrentStep(steps.length);
  };

  // Remove the current step
  const removeStep = () => {
    if (steps.length <= 1) return;

    const newSteps = [...steps];
    newSteps.splice(currentStep, 1);
    setSteps(newSteps);
    setCurrentStep(Math.min(currentStep, newSteps.length - 1));
  };

  // Update the current step's data
  const updateCurrentStep = (data: Partial<ProcedureStep>) => {
    const newSteps = [...steps];
    newSteps[currentStep] = { ...newSteps[currentStep], ...data };
    setSteps(newSteps);
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Form submitted:", steps);
    // In a real app, you would send this data to your backend
    onSubmit(new Repair());
    alert("Form submitted successfully!");
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-80 flex flex-col gap-6 h-fit">
        <RepairDetailsPanel
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          category={category}
          setCategory={setCategory}
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
          type={type}
          setType={setType}
          visibility={visibility}
          setVisibility={setVisibility}
        />
        <StepPreviewPanel
          steps={steps}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </div>
      <div className="flex-1 space-y-6">
        <h1 className="text-2xl font-bold">Repair Form</h1>
        <ProcedureForm
          currentStep={currentStep}
          steps={steps}
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
