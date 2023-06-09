import dayjs from "dayjs";
import React, { useMemo } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { shoppingList } from "../../interface";

interface props {
  shoppingLists: shoppingList[] | undefined;
}

const MonthlySummary = ({ shoppingLists }: props) => {
  const formattedShoppingLists = useMemo(() => {
    const dateArr = Array.from(
      new Set(
        shoppingLists?.map((shoppingList) =>
          dayjs(shoppingList.createdAt).format("MMMM, YYYY")
        )
      )
    );

    return dateArr.map((date) => {
      const items = shoppingLists?.filter(
        (shoppingList) =>
          dayjs(shoppingList.createdAt).format("MMMM, YYYY") === date
      );

      const totalItemsArr = items?.map((shoppingList) => {
        return shoppingList.items.reduce((currentTotal, list) => {
          return currentTotal + list.quantity;
        }, 0);
      });

      const totalItemsPerMonth = totalItemsArr?.reduce(
        (currentTotal, value) => {
          return currentTotal + value;
        },
        0
      );
      return {
        date,
        items: totalItemsPerMonth,
      };
    });
  }, [shoppingLists]);

  console.log(formattedShoppingLists);

  return (
    <div>
      <h2 className="mb-8 text-2xl font-medium">Monthly Summary</h2>

      <div className=" w-full h-[320px]">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart
            data={formattedShoppingLists}
            width={800}
            height={300}
            margin={{ right: 5, left: -30, top: 5, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              dataKey="items"
              type="monotone"
              activeDot={{ r: 8 }}
              stroke="#F9A109"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlySummary;
