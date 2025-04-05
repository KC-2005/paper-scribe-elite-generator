
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QuestionPaper, Question } from '@/types/types';
import { Download, Printer, RotateCcw } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface PaperPreviewProps {
  paper: QuestionPaper;
  onReset: () => void;
}

const PaperPreview: React.FC<PaperPreviewProps> = ({ paper, onReset }) => {
  const paperRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleDownloadPDF = async () => {
    if (!paperRef.current) return;
    
    toast.info('Preparing PDF download...');
    
    try {
      const canvas = await html2canvas(paperRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${paper.settings.subject}-${paper.settings.grade}-question-paper.pdf`);
      
      toast.success('PDF downloaded successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF. Please try again.');
    }
  };
  
  const calculateTotalMarks = (questions: Question[]): number => {
    return questions.reduce((total, question) => total + question.marks, 0);
  };
  
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold font-heading">Paper Preview</h2>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onReset} className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            <span>Reset</span>
          </Button>
          <Button variant="outline" onClick={handlePrint} className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            <span>Print</span>
          </Button>
          <Button onClick={handleDownloadPDF} className="bg-blue-700 hover:bg-blue-800 flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Download PDF</span>
          </Button>
        </div>
      </div>
      
      <Card className="p-8 max-w-4xl mx-auto shadow-md paper-shadow">
        <div ref={paperRef} className="question-paper">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold uppercase mb-1">{paper.settings.schoolName}</h1>
            <h2 className="text-xl font-semibold mb-1">{paper.settings.examTitle}</h2>
            <div className="flex justify-center gap-8 text-base">
              <p><strong>Subject:</strong> {paper.settings.subject}</p>
              <p><strong>Class:</strong> {paper.settings.grade}th Grade</p>
              <p><strong>Time:</strong> {paper.settings.duration} minutes</p>
              <p><strong>Max. Marks:</strong> {calculateTotalMarks(paper.questions)}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-center border-b-2 border-gray-400 pb-1 uppercase font-bold">General Instructions</h2>
            <ol className="list-decimal pl-5 mt-2 space-y-1">
              <li>All questions are compulsory.</li>
              <li>The question paper consists of {paper.questions.length} questions.</li>
              <li>Marks are indicated against each question.</li>
              <li>Please write neatly and do not exceed the space provided.</li>
              <li>Draw diagrams wherever necessary.</li>
            </ol>
          </div>
          
          <div className="space-y-6">
            {paper.questions.map((question, index) => (
              <div key={question.id} className="question">
                <div className="flex">
                  <span className="question-number">{index + 1}.</span>
                  <div>
                    <div dangerouslySetInnerHTML={{ __html: question.text }} />
                    <div className="text-sm text-gray-600 mt-1">
                      [{question.marks} marks] <span className="italic">[{question.difficulty}]</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {paper.settings.includeAnswers && (
            <div className="mt-10 pt-4 border-t-2 border-gray-300">
              <h2 className="text-center border-b-2 border-gray-400 pb-1 uppercase font-bold mb-4">Answer Key</h2>
              <div className="space-y-4">
                {paper.questions.map((question, index) => (
                  <div key={`answer-${question.id}`} className="question">
                    <div className="flex">
                      <span className="question-number">{index + 1}.</span>
                      <div>
                        <div className="font-medium">{question.text}</div>
                        <div className="pl-2 mt-1 text-gray-700">{question.answer}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default PaperPreview;
