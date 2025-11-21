import React, { useCallback, useEffect, useState } from "react";
import Pagination from "../../common/Pagination";
import { useAppContext } from "@/context/AppContext";
import { THEMES } from "@/utils/constants";
import {
  getStatusTextColor,
  getStatusBgColor,
  getStatusDarkTextColor,
  getStatusDarkBgColor,
} from "@/utils/helpers";

const ProductList = ({ productList }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const [displayCount, setDisplayCount] = useState(10);
  const [totalOrderCount, setTotalOrderCount] = useState(productList.length);
  const [totalPages, setTotalPages] = useState(
    Math.max(1, Math.ceil(productList.length / displayCount))
  );
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [isAllChecked, setIsAllChecked] = useState(false);
  const { theme } = useAppContext();

  const getCheckboxImage = (isChecked) => {
    if (isChecked) {
      return theme === THEMES.LIGHT
        ? "/icons/checkboxTicked.svg"
        : "/icons/darkTheme/checkboxTicked.svg";
    } else {
      return theme === THEMES.LIGHT
        ? "/icons/checkbox.svg"
        : "/icons/darkTheme/checkbox.svg";
    }
  };

  const loadNextPage = useCallback(
    (page) => {
      const totalAvailablePages = Math.max(
        1,
        Math.ceil(productList.length / displayCount)
      );
      const safePage = Math.min(Math.max(page, 1), totalAvailablePages);

      setCurrentPage(safePage);
      setPaginatedProducts(
        productList.slice(
          (safePage - 1) * displayCount,
          safePage * displayCount
        )
      );
    },
    [productList, displayCount]
  );

  useEffect(() => {
    loadNextPage(1);
  }, [loadNextPage]);

  useEffect(() => {
    setTotalOrderCount(productList.length);
  }, [productList]);

  //? individual checkbox toggle
  const handleCheckboxToggle = (productId) => {
    setCheckedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  //? all checkbox toggle
  const handleSelectAll = () => {
    if (isAllChecked) {
      setCheckedItems(new Set());
      setIsAllChecked(false);
    } else {
      const allIds = new Set(paginatedProducts.map((p) => p.id));
      setCheckedItems(allIds);
      setIsAllChecked(true);
    }
  };

  //? update all checkbox
  useEffect(() => {
    if (paginatedProducts.length > 0) {
      const allChecked = paginatedProducts.every((p) => checkedItems.has(p.id));
      setIsAllChecked(allChecked);
    }
  }, [checkedItems, paginatedProducts]);

  return (
    <div className="flex flex-col font-[Inter] gap-3">
      <table className="w-full ">
        <thead>
          <tr className="text-left border-b border-[#1C1C1C33] dark:border-[#FFFFFF33] text-xs text-[#1C1C1C66] dark:text-[#FFFFFF66] leading-[18px] tracking-0">
            <th className="py-2 px-3">
              <label
                htmlFor="select-all-checkbox"
                className="cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  handleSelectAll();
                }}
              >
                <img
                  key={`select-all-${isAllChecked}-${theme}`}
                  className="w-4 h-4"
                  src={getCheckboxImage(isAllChecked)}
                  alt=""
                />
              </label>
              <input
                type="checkbox"
                id="select-all-checkbox"
                className="hidden"
                checked={isAllChecked}
                onChange={handleSelectAll}
              />
            </th>
            <th className="py-2 px-3">Order ID</th>
            <th className="py-3 pe-3">User</th>
            <th className="py-2 px-3">Project</th>
            <th className="py-2 px-3">Address</th>
            <th className="py-2 px-3">Date</th>
            <th className="py-2 px-3">Status</th>
          </tr>
        </thead>
        <tbody className="text-xs text-primary-dark leading-[18px] tracking-0 dark:text-primary-light">
          {paginatedProducts.map((product) => {
            return (
              <tr
                key={product.id}
                className="border-b border-[#1C1C1C0D] dark:border-[#FFFFFF1A]"
              >
                <td className="py-2 px-3 ">
                  <label
                    htmlFor={`checkbox-${product.id}`}
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCheckboxToggle(product.id);
                    }}
                  >
                    <img
                      key={`checkbox-${product.id}-${checkedItems.has(
                        product.id
                      )}-${theme}`}
                      className="w-4 h-4"
                      src={getCheckboxImage(checkedItems.has(product.id))}
                      alt=""
                    />
                  </label>
                  <input
                    type="checkbox"
                    id={`checkbox-${product.id}`}
                    className="hidden"
                    checked={checkedItems.has(product.id)}
                    onChange={() => handleCheckboxToggle(product.id)}
                  />
                </td>
                <td className="py-2 px-3 ">{product.id}</td>
                <td className="py-2 px-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={product.avatar}
                      alt={product.user}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-sm text-primary-dark">
                      {product.user}
                    </span>
                  </div>
                </td>
                <td className="py-2 px-3">{product.project}</td>
                <td className="py-2 px-3">{product.address}</td>
                <td className="py-2 px-3">
                  <span className="flex items-center gap-1 ">
                    <img
                      src={
                        theme === THEMES.LIGHT
                          ? "/icons/calendarBlank.svg"
                          : "/icons/darkTheme/calendarBlank.svg"
                      }
                      alt=""
                      className="w-4 h-4"
                    />
                    {product.date}
                  </span>
                </td>
                <td className="py-2 px-3 flex items-center">
                  <div className="w-4 h-4 flex justify-center items-center">
                    <div
                      style={{
                        backgroundColor:
                          theme === THEMES.LIGHT
                            ? getStatusBgColor(product.status)
                            : getStatusDarkBgColor(product.status),
                      }}
                      className="w-1.5 h-1.5 rounded-full"
                    ></div>
                  </div>
                  <p
                    style={{
                      color:
                        theme === THEMES.LIGHT
                          ? getStatusTextColor(product.status)
                          : getStatusDarkTextColor(product.status),
                    }}
                  >
                    {product.status}
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="w-full flex items-center justify-end">
        <Pagination
          startPage={startPage}
          setStartPage={setStartPage}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalOrderCount={totalOrderCount}
          displayCount={displayCount}
          loadNextPage={loadNextPage}
        />
      </div>
    </div>
  );
};

export default ProductList;
