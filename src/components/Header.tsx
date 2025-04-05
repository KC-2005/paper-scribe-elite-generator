
import React from 'react';
import { FileText, BookOpen } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-800 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <FileText className="h-8 w-8 mr-2" />
          <h1 className="text-2xl font-heading font-bold">PaperScribe Elite</h1>
        </div>
        <div className="flex items-center">
          <BookOpen className="h-5 w-5 mr-1" />
          <span className="text-sm font-medium">Question Paper Generator</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
