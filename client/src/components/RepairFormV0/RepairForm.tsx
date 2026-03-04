"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FormProcedureCard } from "./FormStep";
import { Save, Plus, Trash2 } from "lucide-react";
import { Repair } from "@/classes/Repair";

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
        <ProcedureFormCard
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

type ProcedureFormCardProps = {
  currentStep: number;
  steps: ProcedureStep[];
  addStep: () => void;
  removeStep: () => void;
  updateCurrentStep: (data: Partial<ProcedureStep>) => void;
  FormStep: React.ComponentType<{
    step: ProcedureStep;
    onChange: (data: Partial<ProcedureStep>) => void;
  }>;
};

//main procedure form card component that contains the form for editing a single step, as well as buttons to add/remove steps and navigate between them
function ProcedureFormCard({
  currentStep,
  steps,
  addStep,
  removeStep,
  updateCurrentStep,
  FormStep,
}: ProcedureFormCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            Step {currentStep + 1} of {steps.length}
          </h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={removeStep}
              disabled={steps.length <= 1}>
              <Trash2 className="h-4 w-4 mr-1" />
              Remove Step
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={addStep}>
              <Plus className="h-4 w-4 mr-1" />
              Add Step
            </Button>
          </div>
        </div>
        <FormStep
          step={steps[currentStep]}
          onChange={updateCurrentStep}
        />
      </CardContent>
    </Card>
  );
}

// Panel for editing extra data (title, description, etc.)
type RepairDetailsPanelProps = {
  title: string;
  setTitle: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  manufacturer: string;
  setManufacturer: (v: string) => void;
  type: string;
  setType: (v: string) => void;
  visibility: "public" | "organization";
  setVisibility: (v: "public" | "organization") => void;
};

// Component for editing the repair details, such as title, description, category, etc.
function RepairDetailsPanel({
  title,
  setTitle,
  description,
  setDescription,
  category,
  setCategory,
  manufacturer,
  setManufacturer,
  type,
  setType,
  visibility,
  setVisibility,
}: RepairDetailsPanelProps) {
  return (
    <section className="bg-card border border-border rounded-xl shadow p-4 flex flex-col gap-4">
      <h2 className="text-lg font-semibold mb-2">Repair Details</h2>
      <label htmlFor="title">
        Title
        <input
          id="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full bg-gray-100"
        />
      </label>

      <label htmlFor="description">
        Description
        <textarea
          id="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea textarea-bordered w-full bg-gray-100"
          rows={2}
        />
      </label>
      <label htmlFor="category">
        Category
        <input
          id="category"
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input input-bordered w-full bg-gray-100"
        />
      </label>

      <label htmlFor="manufacturer">
        Manufacturer
        <input
          id="manufacturer"
          type="text"
          placeholder="Manufacturer"
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target.value)}
          className="input input-bordered w-full bg-gray-100"
        />
      </label>

      <label htmlFor="type">
        Type
        <input
          id="type"
          type="text"
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="input input-bordered w-full bg-gray-100"
        />
      </label>

      <div className="flex items-center gap-2">
        <label
          htmlFor="visibility"
          className="font-medium">
          Visibility:
          <select
            id="visibility"
            value={visibility}
            onChange={(e) =>
              setVisibility(e.target.value as "public" | "organization")
            }
            className="select select-bordered bg-gray-100">
            <option value="public">Public</option>
            <option value="organization">Organization</option>
          </select>
        </label>
      </div>
    </section>
  );
}

type StepPreviewPanelProps = {
  steps: ProcedureStep[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
};

// Component for previewing the steps in a side panel, allowing users to quickly navigate between steps and see a summary of each step.
function StepPreviewPanel({
  steps,
  currentStep,
  setCurrentStep,
}: StepPreviewPanelProps) {
  return (
    <section className="bg-card border border-border rounded-xl shadow p-4 flex flex-col gap-4">
      <h2 className="text-lg font-semibold mb-2">Step Preview</h2>
      <ul className="space-y-2">
        {steps.map((step, idx) => (
          <li
            key={idx}
            className={`p-2 rounded border ${idx === currentStep ? "border-primary bg-primary/10" : "border-border bg-muted/50"} cursor-pointer transition-colors`}
            onClick={() => setCurrentStep(idx)}>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-primary">Step {idx + 1}</span>
              <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                {step.instructions?.slice(0, 30) || "No instructions"}
              </span>
              {step.images && step.images.length > 0 && (
                <span className="badge badge-accent">
                  {step.images.length} image
                  {step.images.length > 1 ? "s" : ""}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
