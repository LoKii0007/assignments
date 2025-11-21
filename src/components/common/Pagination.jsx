import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/context/AppContext";
import { THEMES } from "@/utils/constants";

function Pagination({
  startPage,
  setStartPage,
  totalPages,
  setTotalPages,
  currentPage,
  setCurrentPage,
  loadNextPage,
  totalOrderCount,
  className,
  displayCount,
}) {
  const maxVisiblePages = 5;
  const { theme } = useAppContext();

  const handlePageBtn = (page) => {
    setCurrentPage(page);
    loadNextPage(page);
  };

  const handlePrevRange = () => {
    if (currentPage > 1) {
      loadNextPage(currentPage - 1);
    }
  };

  const handleNextRange = () => {
    if (currentPage < totalPages) {
      loadNextPage(currentPage + 1);
    }
  };

  useEffect(() => {
    const computedPages = Math.max(
      1,
      Math.ceil(totalOrderCount / displayCount)
    );
    setTotalPages(computedPages);

    if (currentPage > computedPages) {
      setCurrentPage(computedPages);
      loadNextPage(computedPages);
      setStartPage(Math.max(1, computedPages - maxVisiblePages + 1));
    }
  }, [
    totalOrderCount,
    displayCount,
    setTotalPages,
    currentPage,
    setCurrentPage,
    loadNextPage,
    setStartPage,
  ]);

  // Don't render pagination if there's only one page
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={cn(``, className)}>
      <div className="page-right flex items-center gap-2">
        {/* ----------prev button ------- */}

        <button
          className="p-1 hover:bg-[#1C1C1C08] rounded-[8px] duration-200 hover:ease-in ease-out transition-all"
          onClick={handlePrevRange}
          disabled={currentPage === 1}
        >
          <img className="w-5 h-5" src={theme === THEMES.LIGHT ? "/icons/chevronLeft.svg" : "/icons/darkTheme/chevronLeft.svg"} alt="" />
        </button>

        {/* ----------page buttons ------- */}
        <div className="flex gap-2">
          {Array.from(
            {
              length: Math.min(maxVisiblePages, totalPages - startPage + 1),
            },
            (_, index) => (
              <button
                disabled={currentPage === startPage + index}
                key={index}
                onClick={() => handlePageBtn(startPage + index)}
                className={`text-sm text-primary-dark dark:text-primary-light leading-[20px] tracking-0 w-7 h-7 rounded-[8px] ${
                  currentPage === startPage + index
                    ? "bg-[#1C1C1C0D] dark:bg-[#FFFFFF1A] "
                    : "hover:bg-[#1C1C1C08] dark:hover:bg-tertiary-dark duration-200 hover-transition"
                }`}
              >
                {startPage + index}
              </button>
            )
          )}
          {startPage + maxVisiblePages - 1 < totalPages && (
            <>
              <div className="mx-2 flex items-center justify-center">...</div>
              <button
                onClick={() => handlePageBtn(totalPages)}
                className={`text-sm text-primary-dark dark:text-primary-light leading-[20px] tracking-0 w-7 h-7 rounded-[8px] ${
                  currentPage === totalPages
                    ? "bg-[#1C1C1C0D] dark:bg-[#FFFFFF1A] "
                    : "hover:bg-[#1C1C1C08] dark:hover:bg-tertiary-dark duration-200 hover-transition"
                }`}
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        {/* ----------next button ------- */}

        <button
          className="p-1 hover:bg-[#1C1C1C08] dark:hover:bg-tertiary-dark rounded-[8px] duration-200 hover-transition"
          onClick={handleNextRange}
          disabled={currentPage === totalPages}
        >
          <img
            className="w-5 h-5 rotate-180"
            src={theme === THEMES.LIGHT ? "/icons/chevronLeft.svg" : "/icons/darkTheme/chevronLeft.svg"}
            alt=""
          />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
