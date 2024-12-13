"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Insights from "@/components/Creator/Insights";
import ManageTool from "@/components/Creator/ManageTool";
import Consultation from "@/components/LandingPage/Consultation";
import Profile from "@/components/Creator/Profile";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [activeTab, setActiveTab] = React.useState("insights");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500">
        Creator Dashboard
      </h1>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="tools">Manage Tools</TabsTrigger>
          <TabsTrigger value="consultations">Consultations</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-4">
          <Insights />
        </TabsContent>
        <TabsContent value="tools">
          <ManageTool />
        </TabsContent>
        <TabsContent value="consultations">
          <Consultation />
        </TabsContent>
        <TabsContent value="profile">
          <Profile />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
