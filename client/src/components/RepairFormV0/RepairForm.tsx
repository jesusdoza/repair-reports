"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FormStep } from "./FormStep";
import { ChevronLeft, ChevronRight, Save, Plus, Trash2 } from "lucide-react";
import { Repair } from "@/classes/Repair";

type imageData = {
  url: string;
  caption: string;
};

// Define the form data structure
type RepairStep = {
  images: imageData[];
  instructions: string;
};

export function RepairForm({
  onSubmit = () => {},
  enableSubmit,
}: {
  onSubmit: (repairData: Repair) => void;
  enableSubmit: boolean;
}) {
  // State for tracking current step and form data
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<RepairStep[]>([
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
  const updateCurrentStep = (data: Partial<RepairStep>) => {
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
        <StepCard
          currentStep={currentStep}
          steps={steps}
          addStep={addStep}
          removeStep={removeStep}
          updateCurrentStep={updateCurrentStep}
          FormStep={FormStep}
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

type StepCardProps = {
  currentStep: number;
  steps: RepairStep[];
  addStep: () => void;
  removeStep: () => void;
  updateCurrentStep: (data: Partial<RepairStep>) => void;
  FormStep: React.ComponentType<{
    step: RepairStep;
    onChange: (data: Partial<RepairStep>) => void;
  }>;
};

function StepCard({
  currentStep,
  steps,
  addStep,
  removeStep,
  updateCurrentStep,
  FormStep,
}: StepCardProps) {
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

type StepNavigationProps = {
  currentStep: number;
  steps: RepairStep[];
  setCurrentStep: (step: number) => void;
  prevStep: () => void;
  nextStep: () => void;
  enableSubmit: boolean;
  handleSubmit: () => void;
};

function StepNavigation({
  currentStep,
  steps,
  setCurrentStep,
  prevStep,
  nextStep,
  enableSubmit,
  handleSubmit,
}: StepNavigationProps) {
  return (
    <>
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        <div className="flex gap-2">
          {currentStep === steps.length - 1 && (
            <Button
              disabled={!enableSubmit}
              onClick={handleSubmit}>
              <Save className="h-4 w-4 mr-1" />
              Save Documentation
            </Button>
          )}
          <Button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}>
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {steps.map((_: any, index: number) => (
          <Button
            key={index}
            variant={index === currentStep ? "default" : "outline"}
            size="icon"
            className="h-8 w-8 mx-1"
            onClick={() => setCurrentStep(index)}>
            {index + 1}
          </Button>
        ))}
      </div>
    </>
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
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input input-bordered w-full"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="textarea textarea-bordered w-full"
        rows={2}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="input input-bordered w-full"
      />
      <input
        type="text"
        placeholder="Manufacturer"
        value={manufacturer}
        onChange={(e) => setManufacturer(e.target.value)}
        className="input input-bordered w-full"
      />
      <input
        type="text"
        placeholder="Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="input input-bordered w-full"
      />
      <div className="flex items-center gap-2">
        <label className="font-medium">Visibility:</label>
        <select
          value={visibility}
          onChange={(e) =>
            setVisibility(e.target.value as "public" | "organization")
          }
          className="select select-bordered">
          <option value="public">Public</option>
          <option value="organization">Organization</option>
        </select>
      </div>
    </section>
  );
}

// Panel for previewing steps
type StepPreviewPanelProps = {
  steps: RepairStep[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
};

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
type SidePanelProps = {
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
  steps: RepairStep[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
};

function SidePanelTextInput({
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
  steps,
  currentStep,
  setCurrentStep,
}: SidePanelProps) {
  return (
    <aside className="w-full md:w-80 bg-card border border-border rounded-xl shadow p-4 flex flex-col gap-6 h-fit">
      <div>
        <h2 className="text-lg font-semibold mb-2">Repair Details</h2>
        <div className="space-y-2 bg-white/10 p-4 rounded">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full"
            rows={2}
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Manufacturer"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="input input-bordered w-full"
          />
          <div className="flex items-center gap-2">
            <label className="font-medium">Visibility:</label>
            <select
              value={visibility}
              onChange={(e) =>
                setVisibility(e.target.value as "public" | "organization")
              }
              className="select select-bordered">
              <option value="public">Public</option>
              <option value="organization">Organization</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Step Preview</h2>
        <ul className="space-y-2">
          {steps.map((step, idx) => (
            <li
              key={idx}
              className={`p-2 rounded border ${idx === currentStep ? "border-primary bg-primary/10" : "border-border bg-muted/50"} cursor-pointer transition-colors`}
              onClick={() => setCurrentStep(idx)}>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-primary">
                  Step {idx + 1}
                </span>
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
      </div>
    </aside>
  );
}
