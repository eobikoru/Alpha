import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constant/constant";
import { useAccount, useReadContract } from "wagmi";
import InsightAnimate from "./InsightAnimate";
import Loader from "../Loader";

const chartData = [
  { name: "Jan", earnings: 4000 },
  { name: "Feb", earnings: 3000 },
  { name: "Mar", earnings: 5000 },
  { name: "Apr", earnings: 4500 },
  { name: "May", earnings: 6000 },
  { name: "Jun", earnings: 5500 },
];

const Insights = () => {
  const { address, isConnected } = useAccount();

  const { data, isLoading } = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "getCreatorEarnings",
    args: [address],
  });

  const { totalEarnings, toolSales, consultationRevenue }: any = data || {};

  console.log(data, address, isLoading);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Earnings Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="earnings" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      {isLoading ? (
        <>
          <InsightAnimate />
          <Loader loading={true} />
        </>
      ) : (
        <div className="grid grid-cols-1 mt-9 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold font-mono">{totalEarnings}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Tool Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold font-mono">{toolSales}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Consultation Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold font-mono">
                {consultationRevenue}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Insights;
