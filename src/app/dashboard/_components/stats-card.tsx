import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import React from "react";

type StatCardProps = {
  title: string;
  description: string;
  value: string | number;
  icon: React.ReactNode;
};

export function StatCard({
  title,
  description,
  value,
  icon,
}: StatCardProps) {
  // Helper function to safely add className to icon
  const renderIcon = () => {
    if (React.isValidElement(icon)) {
      return React.cloneElement(icon as React.ReactElement, {
      });
    }
    return icon;
  };

  return (
    <Card className="border border-gray-200 rounded-none bg-white shadow-none">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-medium text-gray-800 tracking-tight">
              {title}
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              {description}
            </CardDescription>
          </div>
          
          <div className="bg-gray-100 p-2 rounded-full">
            {renderIcon()}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-light text-gray-900">
            {value}
          </span>
        </div>
        
        <div className="mt-4 border-t border-gray-100 pt-3">
          <span className="text-xs text-gray-500">
            Atualizado recentemente
          </span>
        </div>
      </CardContent>
    </Card>
  );
}