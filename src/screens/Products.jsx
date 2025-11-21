import React, { useState, useEffect } from "react";
import ProductsList from "../components/pages/products/ProductsList";
import { FilterDialog } from "../components/FilterDialog";
import { useAppContext } from "@/context/AppContext";
import { THEMES, users, projects, addresses, dates } from "@/utils/constants";

// Generate 50 unique products with different values
const generateUniqueProducts = () => {
  const statuses = [
    "In Progress",
    "Complete",
    "Pending",
    "Approved",
    "Rejected",
  ];

  return Array.from({ length: 50 }, (_, idx) => {
    const numericId = (9801 + idx).toString().padStart(4, "0");

    return {
      id: `#CM${numericId}`,
      user: users[idx],
      project: projects[idx],
      address: addresses[idx],
      date: dates[idx],
      status: statuses[idx % statuses.length],
      avatar: `/images/contact-${((idx % 5) + 1).toString()}.png`,
    };
  });
};

const sampleProducts = generateUniqueProducts();

const Products = () => {
  const [productList, setProductList] = useState(sampleProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState(null);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(productList);
  const [isFilterAppplied, setIsFilterAppplied] = useState(false);
  const { theme } = useAppContext();

  //? Debounce search query with 300ms delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  //? Filter products by search query
  const handleSearch = (productList) => {
    return productList.filter((product) => {
      if (!debouncedSearchQuery.trim()) {
        return true;
      }

      const query = debouncedSearchQuery.toLowerCase().trim();
      const searchableFields = [
        product.id?.toLowerCase() || "",
        product.user?.toLowerCase() || "",
        product.project?.toLowerCase() || "",
        product.address?.toLowerCase() || "",
        product.status?.toLowerCase() || "",
      ];

      return searchableFields.some((field) => field.includes(query));
    });
  };

  //? Filter products by status
  const handleStatusFilter = (productList) => {
    if (selectedStatuses.length === 0) {
      return productList;
    }
    return productList.filter((product) =>
      selectedStatuses.includes(product.status)
    );
  };

  //? Sort products by user field
  const handleSort = (filteredProducts) => {
    return [...filteredProducts].sort((a, b) => {
      if (sortOrder === null) {
        return 0; // No sorting
      }

      const userA = (a.user || "").toLowerCase();
      const userB = (b.user || "").toLowerCase();

      if (sortOrder === "asc") {
        return userA.localeCompare(userB);
      } else {
        return userB.localeCompare(userA);
      }
    });
  };

  const handleSortToggle = () => {
    if (sortOrder === null || sortOrder === "desc") {
      setSortOrder("asc");
    } else {
      setSortOrder("desc");
    }
  };

  const handleStatusFilterApply = (statuses) => {
    setSelectedStatuses(statuses);
  };

  useEffect(() => {
    let filtered = handleSearch(productList);
    filtered = handleStatusFilter(filtered);
    let sorted = handleSort(filtered);
    setFilteredProducts(sorted);
  }, [sortOrder, debouncedSearchQuery, selectedStatuses, productList]);

  useEffect(() => {
    if (selectedStatuses.length > 0 || debouncedSearchQuery.trim() !== "") {
      setIsFilterAppplied(true);
    } else {
      setIsFilterAppplied(false);
    }
  }, [selectedStatuses, debouncedSearchQuery]);

  return (
    <>
      <div className="w-full h-full p-8 flex flex-col gap-4">
        <h1 className="text-sm font-semibold text-primary-dark dark:text-primary-light leading-[20px] tracking-0 shrink-0">
          Order List
        </h1>
        <div className="flex flex-col gap-3">
          {/* //?filters */}
          <div className="filter-section w-full p-2 gap-4 bg-[#F7F9FB] dark:bg-[#FFFFFF0D] flex justify-between items-center rounded-[8px]">
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-[#E5ECF6] rounded-[4px] dark:hover:bg-tertiary-dark hover-transition">
                <img
                  className="h-5 w-5"
                  src={
                    theme === THEMES.LIGHT
                      ? "/icons/plus.svg"
                      : "/icons/darkTheme/plus.svg"
                  }
                  alt=""
                />
              </button>
              <FilterDialog
                onApply={handleStatusFilterApply}
                selectedStatuses={selectedStatuses}
                isFilterApplied={isFilterAppplied}
              />
              <button
                onClick={() => handleSortToggle()}
                className="p-1 hover:bg-[#E5ECF6] rounded-[4px] dark:hover:bg-tertiary-dark hover-transition"
              >
                <img
                  className="h-5 w-5"
                  src={
                    theme === THEMES.LIGHT
                      ? "/icons/updown.svg"
                      : "/icons/darkTheme/updown.svg"
                  }
                  alt=""
                />
              </button>
            </div>
            <div className="relative flex items-center">
              <img
                className="w-4 h-4 absolute left-2"
                src={
                  theme === THEMES.LIGHT
                    ? "/icons/search.svg"
                    : "/icons/darkTheme/search.svg"
                }
                alt=""
              />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-2 py-1 ps-7 border border-[#1C1C1C1A] dark:border-[#FFFFFF1A] bg-[#FFFFFF66] dark:bg-[#1C1C1C66] dark:text-[#FFFFFF33] text-[#1C1C1C33] rounded-[8px] text-sm w-40 focus:outline-none focus:ring-1 focus:ring-[#1C1C1C]"
              />
            </div>
          </div>
          {/* //?products list */}
          <ProductsList productList={filteredProducts} />
        </div>
      </div>
    </>
  );
};

export default Products;
