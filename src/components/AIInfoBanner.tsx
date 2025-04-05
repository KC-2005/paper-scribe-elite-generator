
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CircleHelp, Brain, Sparkles, Layers } from 'lucide-react';

const AIInfoBanner: React.FC = () => {
  return (
    <Card className="bg-gradient-to-r from-blue-800 to-teal-700 text-white shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2 flex items-center">
              <Brain className="h-5 w-5 mr-2" />
              Powered by Advanced AI
            </h2>
            <p className="opacity-90 max-w-2xl">
              Our question paper generation system uses advanced AI algorithms to create 
              balanced, curriculum-aligned question papers. Each paper is uniquely generated 
              based on your specific requirements.
            </p>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <div className="flex flex-col items-center">
              <Sparkles className="h-6 w-6 mb-1" />
              <span className="text-sm font-medium">Smart Selection</span>
            </div>
            <div className="flex flex-col items-center">
              <Layers className="h-6 w-6 mb-1" />
              <span className="text-sm font-medium">Balanced Distribution</span>
            </div>
            <div className="flex flex-col items-center">
              <CircleHelp className="h-6 w-6 mb-1" />
              <span className="text-sm font-medium">Customizable</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIInfoBanner;
