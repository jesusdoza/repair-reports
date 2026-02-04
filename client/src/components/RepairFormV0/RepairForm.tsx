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

  // Navigate to previous step
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Navigate to next step
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
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
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Repair Form</h1>
      <div className="flex ">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered bg-white"
        />
      </div>
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
        {steps.map((_, index) => (
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
    </div>
  );
}
