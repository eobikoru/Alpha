import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InsightAnimate = () => {
  return (
    <div className="grid grid-cols-1 mt-9 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold w-16 h-4 rounded-md bg-gray-300 animate-pulse"></p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Tool Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold w-16 h-4 rounded-md bg-gray-300 animate-pulse"></p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Consultation Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold w-16 h-4 rounded-md bg-gray-300 animate-pulse"></p>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsightAnimate;
