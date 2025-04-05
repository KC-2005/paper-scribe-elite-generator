
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Subject, Grade, PaperSettings, Topic } from '@/types/types';
import { getTopicsBySubjectAndGrade } from '@/services/questionService';

interface PaperConfigFormProps {
  onSubmit: (settings: PaperSettings) => void;
  isLoading: boolean;
}

const PaperConfigForm: React.FC<PaperConfigFormProps> = ({ onSubmit, isLoading }) => {
  const [settings, setSettings] = useState<PaperSettings>({
    subject: 'Physics',
    grade: '11',
    totalQuestions: 10,
    totalMarks: 30,
    difficultyDistribution: {
      easy: 30,
      medium: 50,
      hard: 20,
    },
    selectedTopics: [],
    includeAnswers: false,
    schoolName: 'Sample School',
    examTitle: 'Term Examination',
    duration: 60,
  });

  const [topics, setTopics] = useState<Topic[]>([]);
  const [activeTab, setActiveTab] = useState<string>('basic');

  // Update topics when subject or grade changes
  useEffect(() => {
    const fetchedTopics = getTopicsBySubjectAndGrade(settings.subject, settings.grade);
    setTopics(fetchedTopics);
    
    // Reset selected topics when subject or grade changes
    setSettings(prevSettings => ({
      ...prevSettings,
      selectedTopics: []
    }));
  }, [settings.subject, settings.grade]);

  const handleDifficultyChange = (value: number[], type: 'easy' | 'medium' | 'hard') => {
    const newValue = value[0] || 0;
    
    // Calculate the sum of all three values
    let { easy, medium, hard } = settings.difficultyDistribution;
    
    if (type === 'easy') easy = newValue;
    else if (type === 'medium') medium = newValue;
    else hard = newValue;
    
    const sum = easy + medium + hard;
    
    // Adjust values to ensure they sum to 100
    if (sum !== 100) {
      // If we're increasing a value, decrease the others proportionally
      if (sum > 100) {
        const excess = sum - 100;
        
        if (type === 'easy') {
          const total = medium + hard;
          if (total > 0) {
            medium = Math.max(0, medium - (excess * medium / total));
            hard = Math.max(0, hard - (excess * hard / total));
          }
        } else if (type === 'medium') {
          const total = easy + hard;
          if (total > 0) {
            easy = Math.max(0, easy - (excess * easy / total));
            hard = Math.max(0, hard - (excess * hard / total));
          }
        } else {
          const total = easy + medium;
          if (total > 0) {
            easy = Math.max(0, easy - (excess * easy / total));
            medium = Math.max(0, medium - (excess * medium / total));
          }
        }
      }
      // If we're decreasing a value, increase the others proportionally
      else if (sum < 100) {
        const deficit = 100 - sum;
        
        if (type === 'easy') {
          const total = medium + hard;
          if (total > 0) {
            medium += deficit * medium / total;
            hard += deficit * hard / total;
          } else {
            medium += deficit / 2;
            hard += deficit / 2;
          }
        } else if (type === 'medium') {
          const total = easy + hard;
          if (total > 0) {
            easy += deficit * easy / total;
            hard += deficit * hard / total;
          } else {
            easy += deficit / 2;
            hard += deficit / 2;
          }
        } else {
          const total = easy + medium;
          if (total > 0) {
            easy += deficit * easy / total;
            medium += deficit * medium / total;
          } else {
            easy += deficit / 2;
            medium += deficit / 2;
          }
        }
      }
    }
    
    setSettings(prevSettings => ({
      ...prevSettings,
      difficultyDistribution: {
        easy: Math.round(easy),
        medium: Math.round(medium),
        hard: Math.round(hard)
      }
    }));
  };

  const handleTopicChange = (topicId: string, isChecked: boolean) => {
    if (isChecked) {
      setSettings(prevSettings => ({
        ...prevSettings,
        selectedTopics: [...prevSettings.selectedTopics, topicId]
      }));
    } else {
      setSettings(prevSettings => ({
        ...prevSettings,
        selectedTopics: prevSettings.selectedTopics.filter(id => id !== topicId)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(settings);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="basic">Basic Settings</TabsTrigger>
          <TabsTrigger value="topics">Topics & Difficulty</TabsTrigger>
          <TabsTrigger value="paper">Paper Details</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="subject">Select Subject</Label>
                  <Select 
                    value={settings.subject} 
                    onValueChange={(value: Subject) => 
                      setSettings({...settings, subject: value})
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                      <SelectItem value="Biology">Biology</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="grade">Select Grade</Label>
                  <Select 
                    value={settings.grade} 
                    onValueChange={(value: Grade) => 
                      setSettings({...settings, grade: value})
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="11">11th Grade</SelectItem>
                      <SelectItem value="12">12th Grade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="totalQuestions">Number of Questions</Label>
                  <div className="flex items-center space-x-4">
                    <Input
                      id="totalQuestions"
                      type="number"
                      min="5"
                      max="50"
                      value={settings.totalQuestions}
                      onChange={(e) => setSettings({...settings, totalQuestions: parseInt(e.target.value) || 10})}
                      className="w-24"
                    />
                    <Slider 
                      min={5}
                      max={50}
                      step={1}
                      value={[settings.totalQuestions]}
                      onValueChange={(value) => setSettings({...settings, totalQuestions: value[0]})}
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="totalMarks">Total Marks</Label>
                  <div className="flex items-center space-x-4">
                    <Input
                      id="totalMarks"
                      type="number"
                      min="10"
                      max="100"
                      value={settings.totalMarks}
                      onChange={(e) => setSettings({...settings, totalMarks: parseInt(e.target.value) || 30})}
                      className="w-24"
                    />
                    <Slider 
                      min={10}
                      max={100}
                      step={5}
                      value={[settings.totalMarks]}
                      onValueChange={(value) => setSettings({...settings, totalMarks: value[0]})}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="topics" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Difficulty Distribution</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="easy-difficulty">Easy ({settings.difficultyDistribution.easy}%)</Label>
                        <span className="text-sm text-muted-foreground">
                          {settings.difficultyDistribution.easy}%
                        </span>
                      </div>
                      <Slider 
                        id="easy-difficulty"
                        min={0}
                        max={100}
                        step={5}
                        value={[settings.difficultyDistribution.easy]}
                        onValueChange={(value) => handleDifficultyChange(value, 'easy')}
                        className="flex-1"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="medium-difficulty">Medium ({settings.difficultyDistribution.medium}%)</Label>
                        <span className="text-sm text-muted-foreground">
                          {settings.difficultyDistribution.medium}%
                        </span>
                      </div>
                      <Slider 
                        id="medium-difficulty"
                        min={0}
                        max={100}
                        step={5}
                        value={[settings.difficultyDistribution.medium]}
                        onValueChange={(value) => handleDifficultyChange(value, 'medium')}
                        className="flex-1"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="hard-difficulty">Hard ({settings.difficultyDistribution.hard}%)</Label>
                        <span className="text-sm text-muted-foreground">
                          {settings.difficultyDistribution.hard}%
                        </span>
                      </div>
                      <Slider 
                        id="hard-difficulty"
                        min={0}
                        max={100}
                        step={5}
                        value={[settings.difficultyDistribution.hard]}
                        onValueChange={(value) => handleDifficultyChange(value, 'hard')}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Select Topics</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Leave all unchecked to include all topics, or select specific topics to focus on.
                  </p>
                  
                  {topics.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {topics.map(topic => (
                        <div key={topic.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={topic.id}
                            checked={settings.selectedTopics.includes(topic.id)}
                            onCheckedChange={(checked) => handleTopicChange(topic.id, checked as boolean)}
                          />
                          <label
                            htmlFor={topic.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {topic.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm italic">No topics available for the selected subject and grade.</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="paper" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="schoolName">School Name</Label>
                    <Input 
                      id="schoolName"
                      value={settings.schoolName}
                      onChange={(e) => setSettings({...settings, schoolName: e.target.value})}
                      placeholder="Enter school name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="examTitle">Exam Title</Label>
                    <Input 
                      id="examTitle"
                      value={settings.examTitle}
                      onChange={(e) => setSettings({...settings, examTitle: e.target.value})}
                      placeholder="Enter exam title"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input 
                      id="duration"
                      type="number"
                      min="15"
                      max="180"
                      value={settings.duration}
                      onChange={(e) => setSettings({...settings, duration: parseInt(e.target.value) || 60})}
                      placeholder="Enter duration in minutes"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-8">
                    <Switch 
                      id="include-answers"
                      checked={settings.includeAnswers}
                      onCheckedChange={(checked) => setSettings({...settings, includeAnswers: checked})}
                    />
                    <Label htmlFor="include-answers">Include Answer Key</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button type="submit" className="bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
          {isLoading ? 'Generating Paper...' : 'Generate Question Paper'}
        </Button>
      </div>
    </form>
  );
};

export default PaperConfigForm;
