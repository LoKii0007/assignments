import React, { useCallback, useEffect, useState } from "react";
import Pagination from "../../common/Pagination";
import { Checkbox } from "../../ui/checkbox";

const getStatusTextColor = (status) => {
  switch (status) {
    case "In Progress":
      return "#8A8CD9";
    case "Complete":
      return "#4AA785";
    case "Pending":
      return "#59A8D4";
    case "Approved":
      return "#FFC555";
    case "Rejected":
      return "#1C1C1C66";
  }
};

const getStatusBgColor = (status) => {
  switch (status) {
    case "In Progress":
      return "#95A4FC";
    case "Complete":
      return "#A1E3CB";
    case "Pending":
      return "#B1E3FF";
    case "Approved":
      return "#FFE999";
    case "Rejected":
      return "#1C1C1C66";
  }
};

const ProductList = ({ productList }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const [displayCount, setDisplayCount] = useState(10);
  const [totalOrderCount, setTotalOrderCount] = useState(productList.length);
  const [totalPages, setTotalPages] = useState(
    Math.max(1, Math.ceil(productList.length / displayCount))
  );
  const [paginatedProducts, setPaginatedProducts] = useState([]);

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

  return (
    <div className="flex flex-col font-[Inter] gap-3">
      <table className="w-full ">
        <thead>
          <tr className="text-left border-b border-[#1C1C1C33] text-xs text-[#1C1C1C66] leading-[18px] tracking-0">
            <th className="py-2 px-3">
              <Checkbox className="shadow-none border-[1.5px] border-[#1c1c1c33] " />
            </th>
            <th className="py-2 px-3">Order ID</th>
            <th className="py-3 pe-3">User</th>
            <th className="py-2 px-3">Project</th>
            <th className="py-2 px-3">Address</th>
            <th className="py-2 px-3">Date</th>
            <th className="py-2 px-3">Status</th>
          </tr>
        </thead>
        <tbody className="text-xs text-primary-dark leading-[18px] tracking-0">
          {paginatedProducts.map((product) => {
            return (
              <tr key={product.id} className="border-b border-[#1C1C1C0D]">
                <td className="py-2 px-3 ">
                  <Checkbox className="shadow-none border-[1.5px] border-[#1c1c1c33] " />
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
                  <span className="flex items-center gap-1 text-[#1C1C1C99]">
                    <img
                      src="/icons/CalendarBlank.svg"
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
                        backgroundColor: getStatusBgColor(product.status),
                      }}
                      className="w-1.5 h-1.5 rounded-full"
                    ></div>
                  </div>
                  <span style={{ color: getStatusTextColor(product.status) }}>
                    {product.status}
                  </span>
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
