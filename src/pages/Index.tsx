
import React, { useState } from 'react';
import { PaperSettings, QuestionPaper } from '@/types/types';
import { generateQuestions, createQuestionPaper } from '@/services/questionService';
import Header from '@/components/Header';
import PaperConfigForm from '@/components/PaperConfigForm';
import PaperPreview from '@/components/PaperPreview';
import AIInfoBanner from '@/components/AIInfoBanner';
import { toast } from '@/components/ui/sonner';

const Index: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [questionPaper, setQuestionPaper] = useState<QuestionPaper | null>(null);

  const handleGeneratePaper = async (settings: PaperSettings) => {
    setIsLoading(true);
    
    try {
      toast.info('Generating question paper. This may take a moment...');
      
      const questions = await generateQuestions(settings);
      const paper = createQuestionPaper(settings, questions);
      
      setQuestionPaper(paper);
      toast.success('Question paper generated successfully!');
    } catch (error) {
      console.error('Error generating paper:', error);
      toast.error('Failed to generate question paper. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setQuestionPaper(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto py-8 px-4">
        {!questionPaper ? (
          <>
            <div className="max-w-4xl mx-auto mb-8">
              <h1 className="text-3xl font-heading font-bold mb-4 text-blue-800">
                Question Paper Generator
              </h1>
              <p className="text-gray-600 mb-6">
                Generate customized question papers for 11th and 12th-grade students in Physics, 
                Chemistry, Biology, and Mathematics. Simply configure your requirements and let 
                our AI create a balanced paper for you.
              </p>
              
              <AIInfoBanner />
            </div>
            
            <div className="max-w-4xl mx-auto">
              <PaperConfigForm onSubmit={handleGeneratePaper} isLoading={isLoading} />
            </div>
          </>
        ) : (
          <PaperPreview paper={questionPaper} onReset={handleReset} />
        )}
      </main>
      
      <footer className="bg-gray-100 border-t py-6 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>PaperScribe Elite Generator © {new Date().getFullYear()} | Advanced Question Paper Generation System</p>
          <p className="mt-1">For educational purposes only</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
