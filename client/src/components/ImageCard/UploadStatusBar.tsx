import { Check } from "lucide-react";

export default function StatusBar({
  status,
  progress,
  errorMessages,
}: {
  status: string | "UPLOADING" | "ERROR" | "SUCCESS";
  progress: number;
  errorMessages?: string[];
}) {
  return (
    <div data-testid="upload-status-bar">
      <section className=" flex flex-col items-center h-1/8">
        {/* upload progress bar */}
        {status == "UPLOADING" && (
          <section data-testid="status">
            <span className="loading loading-spinner text-accent"></span>
            <progress
              className="progress progress-accent w-56"
              value={progress}
              max="100"></progress>
          </section>
        )}

        {/* uploaded success badge */}
        {status == "SUCCESS" && (
          <section
            data-testid="status"
            className="badge bg-green-500 text-black absolute left-0">
            <Check className=" text-slate-800" /> <h3>uploaded</h3>
          </section>
        )}

        {/* error alert strip */}
        {status == "ERROR" && (
          <section
            role="alert"
            data-testid="status"
            className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {errorMessages
              ? errorMessages.map((text: string) => {
                  return <span>{text}</span>;
                })
              : ""}
          </section>
        )}
      </section>
    </div>
  );
}
