import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Consultation = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Manage Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label htmlFor="availability">Set Your Availability</Label>
              <Textarea
                id="availability"
                placeholder="e.g., Mon-Fri, 9AM-5PM UTC"
              />
            </div>
            <div>
              <Label htmlFor="consultationPrice">Hourly Rate (in ETH)</Label>
              <Input
                id="consultationPrice"
                type="number"
                step="0.01"
                placeholder="0.5"
              />
            </div>
            <Button type="submit">Update Availability</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Consultation;
