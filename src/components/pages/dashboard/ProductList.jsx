import React from "react";
import { useAppContext } from "@/context/AppContext";
import { THEMES } from "@/utils/constants";

const sampleProducts = [
  {
    name: "ASOS Ridley High Waist",
    price: "$79.49",
    qty: 82,
    amount: "$6,518.18",
  },
  {
    name: "Marco Lightweight Shirt",
    price: "$128.50",
    qty: 37,
    amount: "$4,754.50",
  },
  {
    name: "Half Sleeve Shirt",
    price: "$39.99",
    qty: 64,
    amount: "$2,559.36",
  },
  {
    name: "Lightweight Jacket",
    price: "$20.00",
    qty: 184,
    amount: "$3,680.00",
  },
  {
    name: "Marco Shoes",
    price: "$79.49",
    qty: 64,
    amount: "$1,965.81",
  },
];

const ProductList = () => {
  const { theme } = useAppContext();
  return (
    <div className="bg-[#F7F9FB] dark:bg-[#FFFFFF0D] p-4 sm:p-6 rounded-[16px] space-y-1 font-[Inter] w-full overflow-x-auto">
      <h3 className="text-sm font-semibold text-primary-dark leading-[20px] tracking-0 dark:text-primary-light">
        Top Selling Products
      </h3>
      <table className="w-full">
        <thead>
          <tr className="text-left border-b border-[#1C1C1C33] dark:border-[#FFFFFF33] dark:text-[#FFFFFF66] text-xs text-[#1C1C1C66] leading-[18px] tracking-0">
            <th className="py-2 pe-3 font-medium text-ellipsis overflow-hidden whitespace-nowrap">Name</th>
            <th className="py-2 pe-3 font-medium text-ellipsis overflow-hidden whitespace-nowrap">Price</th>
            <th className="py-2 pe-3 font-medium text-ellipsis overflow-hidden whitespace-nowrap">Quantity</th>
            <th className="py-2 pe-3 font-medium text-ellipsis overflow-hidden whitespace-nowrap">Amount</th>
          </tr>
        </thead>
        <tbody className=" text-xs text-primary-dark leading-[18px] tracking-0 dark:text-primary-light">
          {sampleProducts.map((product, idx) => (
            <tr key={idx} className="">
              <td className="py-2 pe-3 text-ellipsis overflow-hidden whitespace-nowrap">{product.name}</td>
              <td className="py-2 pe-3 text-ellipsis overflow-hidden whitespace-nowrap">{product.price}</td>
              <td className="py-2 pe-3 text-ellipsis overflow-hidden whitespace-nowrap">{product.qty}</td>
              <td className="py-2 pe-3 text-ellipsis overflow-hidden whitespace-nowrap">{product.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
