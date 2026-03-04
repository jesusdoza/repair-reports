import { Card, CardContent } from "@/components/ui/card";
import { ProcedureStep } from "./RepairForm";
import { Button } from "../ui/button";
import { Plus, Trash2 } from "lucide-react";

type ProcedureFormProps = {
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
function ProcedureForm({
  currentStep,
  steps,
  addStep,
  removeStep,
  updateCurrentStep,
  FormStep,
}: ProcedureFormProps) {
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

export default ProcedureForm;
