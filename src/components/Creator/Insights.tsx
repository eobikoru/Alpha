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
// import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const data = [
  { name: "Jan", earnings: 4000 },
  { name: "Feb", earnings: 3000 },
  { name: "Mar", earnings: 5000 },
  { name: "Apr", earnings: 4500 },
  { name: "May", earnings: 6000 },
  { name: "Jun", earnings: 5500 },
];

const Insights = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Earnings Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
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
      <div className="grid grid-cols-1 mt-9 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$28,000</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tool Purchases</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">152</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Consultations Booked</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">24</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Insights;
