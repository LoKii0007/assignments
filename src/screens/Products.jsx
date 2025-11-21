import React, { useState, useEffect } from "react";
import ProductsList from "../components/pages/products/ProductsList";
import { FilterDialog } from "../components/FilterDialog";

const orderTemplates = [
  {
    user: "Natali Craig",
    project: "Landing Page",
    address: "Meadow Lane, Oakland",
    date: "Just now",
    status: "In Progress",
  },
  {
    user: "Kate Morrison",
    project: "CRM Admin pages",
    address: "Larry, San Francisco",
    date: "A minute ago",
    status: "Complete",
  },
  {
    user: "Drew Cano",
    project: "Client Project",
    address: "Bagwell Avenue, Ocala",
    date: "1 hour ago",
    status: "Pending",
  },
  {
    user: "Orlando Diggs",
    project: "Admin Dashboard",
    address: "Washburn, Baton Rouge",
    date: "Yesterday",
    status: "Approved",
  },
  {
    user: "Andi Lane",
    project: "App Landing Page",
    address: "Nest Lane, Olivette",
    date: "Feb 2, 2023",
    status: "Rejected",
  },
  {
    user: "Koray Okumus",
    project: "UX Audit",
    address: "Roosevelt Ave, Queens",
    date: "Today, 9:45 AM",
    status: "In Progress",
  },
  {
    user: "Lana Steiner",
    project: "Product Website",
    address: "Westheimer Rd, Houston",
    date: "Today, 7:30 AM",
    status: "Approved",
  },
  {
    user: "Carolyn Baldwin",
    project: "Marketing Emails",
    address: "12th St, Austin",
    date: "2 hours ago",
    status: "Complete",
  },
  {
    user: "Devon Lane",
    project: "Geo Portal",
    address: "Bright St, Denver",
    date: "Mar 10, 2023",
    status: "Pending",
  },
  {
    user: "Courtney Henry",
    project: "Pitch Deck",
    address: "Howard St, Chicago",
    date: "Apr 18, 2023",
    status: "Rejected",
  },
];

const sampleProducts = Array.from({ length: 50 }, (_, idx) => {
  const template = orderTemplates[idx % orderTemplates.length];
  const numericId = (9801 + idx).toString().padStart(4, "0");

  return {
    id: `#CM${numericId}`,
    ...template,
    avatar: `/images/contact-${((idx % 5) + 1).toString()}.png`,
  };
});

const Products = () => {
  const [productList, setProductList] = useState(sampleProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState(null);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(productList);
  const [isFilterAppplied, setIsFilterAppplied] = useState(false);

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
        <h1 className="text-sm font-semibold text-primary-dark leading-[20px] tracking-0 shrink-0">
          Order List
        </h1>
        <div className="flex flex-col gap-3">
          <div className="filter-section w-full p-2 gap-4 bg-[#F7F9FB] flex justify-between items-center rounded-[8px]">
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-[#E5ECF6] rounded-[4px] duration-200 hover:ease-in ease-out transition-all">
                <img className="h-5 w-5" src="/icons/plus.svg" alt="" />
              </button>
              <FilterDialog
                onApply={handleStatusFilterApply}
                selectedStatuses={selectedStatuses}
                isFilterApplied={isFilterAppplied}
              />
              <button
                onClick={() => handleSortToggle()}
                className="p-1 hover:bg-[#E5ECF6] rounded-[4px] duration-200 hover:ease-in ease-out transition-all"
              >
                <img className="h-5 w-5" src="/icons/updown.svg" alt="" />
              </button>
            </div>
            <div className="relative flex items-center">
              <img
                className="w-4 h-4 absolute left-2"
                src="/icons/search.svg"
                alt=""
              />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-2 py-1 ps-7 border border-[#1C1C1C1A] bg-[#FFFFFF66] text-[#1C1C1C33] rounded-[8px] text-sm w-40 focus:outline-none focus:ring-1 focus:ring-[#1C1C1C]"
              />
            </div>
          </div>

          <ProductsList productList={filteredProducts} />
        </div>
      </div>
    </>
  );
};

export default Products;
