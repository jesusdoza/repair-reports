import { ProcedureStep } from "./RepairForm";

export type StepPreviewPanelProps = {
  steps: ProcedureStep[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
};

// Component for previewing the steps in a side panel, allowing users to quickly navigate between steps and see a summary of each step.
export function StepPreviewPanel({
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
