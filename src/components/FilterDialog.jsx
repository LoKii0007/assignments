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
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={`p-1 hover:bg-[#E5ECF6] rounded-[4px] duration-200 hover:ease-in ease-out transition-all ${
            isFilterApplied ? "bg-[#d7e4f8]" : ""
          }`}
        >
          <img className="h-5 w-5" src="/icons/funnel.svg" alt="" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md font-[Inter]">
        <DialogHeader>
          <DialogTitle className="text-sm font-semibold text-primary-dark leading-[20px] tracking-0 ">
            Filters
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <h6 className="text-sm text-primary-dark leading-[20px] tracking-0">
              Status
            </h6>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={handleAllClick}
                className={`text-xs text-primary-dark leading-[20px] tracking-0 rounded-[8px] py-1 px-2 transition-colors ${
                  isAllSelected ? "bg-primary-dark text-[#FFFFFF]" : "bg-[#F7F9FB]"
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
                    className={`text-xs text-primary-dark leading-[20px] tracking-0 rounded-[8px] py-1 px-2 transition-colors ${
                      isSelected
                        ? "bg-primary-dark text-[#FFFFFF]"
                        : "bg-[#F7F9FB]"
                    }`}
                  >
                    {status}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <DialogFooter className="flex justify-between! w-full gap-4 mt-6">
          <button
            onClick={handleReset}
            className="text-sm font-medium text-primary-dark leading-[20px] tracking-0 rounded-[8px] py-1 px-2 hover:bg-[#F7F9FB] transition-colors"
          >
            Reset
          </button>
          <div className="flex gap-4">
            <DialogClose asChild>
              <button className="text-sm font-medium text-primary-dark leading-[20px] tracking-0 rounded-[8px] py-1 px-2">
                Cancel
              </button>
            </DialogClose>
            <DialogClose asChild>
              <button
              
                onClick={handleApply}
                className="text-sm text-[#FFFFFF] leading-[20px] tracking-0 bg-primary-dark rounded-[8px] py-1 px-5"
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
