import { useState, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppContext } from "@/context/AppContext";
import { THEMES } from "@/utils/constants";

const STATUS_OPTIONS = [
  "In Progress",
  "Complete",
  "Pending",
  "Approved",
  "Rejected",
];

export function FilterDialog({
  onApply,
  selectedStatuses: initialSelectedStatuses = [],
  isFilterApplied,
}) {
  const { theme } = useAppContext();
  const [selectedStatuses, setSelectedStatuses] = useState(
    new Set(initialSelectedStatuses)
  );

  useEffect(() => {
    setSelectedStatuses(new Set(initialSelectedStatuses));
  }, [initialSelectedStatuses]);

  const toggleStatus = (status) => {
    setSelectedStatuses((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(status)) {
        newSet.delete(status);
      } else {
        newSet.add(status);
      }
      return newSet;
    });
  };

  const handleApply = () => {
    onApply(Array.from(selectedStatuses));
  };

  const handleAllClick = () => {
    if (selectedStatuses.size === STATUS_OPTIONS.length) {
      setSelectedStatuses(new Set());
    } else {
      setSelectedStatuses(new Set(STATUS_OPTIONS));
    }
  };

  const handleReset = () => {
    setSelectedStatuses(new Set());
    onApply([]);
  };

  const isAllSelected = selectedStatuses.size === STATUS_OPTIONS.length;

  return (
    <Dialog className="">
      <DialogTrigger asChild>
        <button
          className={`p-1 hover:bg-[#E5ECF6] rounded-[4px] dark:hover:bg-tertiary-dark hover-transition ${
            isFilterApplied ? "bg-[#d7e4f8] dark:bg-secondary-dark/50" : ""
          }`}
        >
          <img
            className="h-5 w-5"
            src={
              theme === THEMES.LIGHT
                ? "/icons/funnel.svg"
                : "/icons/darkTheme/funnel.svg"
            }
            alt=""
          />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md font-[Inter] ">
        <DialogHeader>
          <DialogTitle className="text-sm font-semibold text-primary-dark dark:text-primary-light leading-[20px] tracking-0 ">
            Filters
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <h6 className="text-sm text-primary-dark dark:text-primary-light leading-[20px] tracking-0">
              Status
            </h6>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={handleAllClick}
                className={`text-xs leading-[18px] tracking-0 rounded-[8px] py-1 px-2 hover-transition ${
                  isAllSelected
                    ? "bg-[#1c1c1c29] text-primary-dark dark:text-primary-dark dark:bg-primary-light"
                    : "bg-[#1C1C1C0D] text-primary-dark dark:text-primary-light dark:bg-[#FFFFFF1A]"
                }`}
              >
                All
              </button>
              {STATUS_OPTIONS.map((status) => {
                const isSelected = selectedStatuses.has(status);
                return (
                  <button
                    key={status}
                    onClick={() => toggleStatus(status)}
                    className={`text-xs  leading-[18px] tracking-0 rounded-[8px] py-1 px-2 hover-transition ${
                      isSelected
                        ? "bg-[#1c1c1c29] text-primary-dark dark:text-primary-dark dark:bg-primary-light"
                        : "bg-[#1C1C1C0D] text-primary-dark dark:text-primary-light dark:bg-[#FFFFFF1A]"
                    }`}
                  >
                    {status}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <DialogFooter className="flex flex-row! justify-between! w-full gap-4 mt-6">
          <button
            onClick={handleReset}
            disabled={selectedStatuses.size === 0}
            className="text-sm font-medium text-primary-dark dark:text-primary-light dark:bg-[#FFFFFF1A] hover:bg-[#1C1C1C29] dark:hover:bg-primary-dark/90 bg-[#1C1C1C0D] leading-[20px] disabled:opacity-50 disabled:cursor-not-allowed tracking-0 rounded-[8px] py-1 px-5 hover-transition"
          >
            Reset
          </button>
          <div className="flex gap-4">
            <DialogClose asChild>
              <button className="text-sm font-medium text-primary-dark dark:text-primary-light hover:bg-[#1C1C1C0D] dark:hover:bg-tertiary-dark hover-transition leading-[20px] tracking-0 rounded-[8px] py-1 px-5">
                Cancel
              </button>
            </DialogClose>
            <DialogClose asChild>
              <button
                onClick={handleApply}
                className="text-sm text-primary-light dark:text-primary-dark leading-[20px] tracking-0 bg-primary-dark dark:bg-primary-light rounded-[8px] py-1 px-5"
              >
                Apply
              </button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
