
import { Subject, Grade, Difficulty, BloomLevel, Question, Topic, PaperSettings, QuestionPaper } from '../types/types';

// Mock topics data - in a real application, this would come from an API or database
export const topics: Topic[] = [
  // Physics 11th
  { id: 'phys11-1', name: 'Physical World', subject: 'Physics', grade: '11' },
  { id: 'phys11-2', name: 'Units and Measurements', subject: 'Physics', grade: '11' },
  { id: 'phys11-3', name: 'Motion in a Straight Line', subject: 'Physics', grade: '11' },
  { id: 'phys11-4', name: 'Motion in a Plane', subject: 'Physics', grade: '11' },
  { id: 'phys11-5', name: 'Laws of Motion', subject: 'Physics', grade: '11' },
  { id: 'phys11-6', name: 'Work, Energy and Power', subject: 'Physics', grade: '11' },
  
  // Physics 12th
  { id: 'phys12-1', name: 'Electric Charges and Fields', subject: 'Physics', grade: '12' },
  { id: 'phys12-2', name: 'Electrostatic Potential and Capacitance', subject: 'Physics', grade: '12' },
  { id: 'phys12-3', name: 'Current Electricity', subject: 'Physics', grade: '12' },
  { id: 'phys12-4', name: 'Moving Charges and Magnetism', subject: 'Physics', grade: '12' },
  { id: 'phys12-5', name: 'Electromagnetic Waves', subject: 'Physics', grade: '12' },
  
  // Chemistry 11th
  { id: 'chem11-1', name: 'Some Basic Concepts of Chemistry', subject: 'Chemistry', grade: '11' },
  { id: 'chem11-2', name: 'Structure of Atom', subject: 'Chemistry', grade: '11' },
  { id: 'chem11-3', name: 'Classification of Elements and Periodicity', subject: 'Chemistry', grade: '11' },
  { id: 'chem11-4', name: 'Chemical Bonding and Molecular Structure', subject: 'Chemistry', grade: '11' },
  { id: 'chem11-5', name: 'States of Matter', subject: 'Chemistry', grade: '11' },
  
  // Chemistry 12th
  { id: 'chem12-1', name: 'Solid State', subject: 'Chemistry', grade: '12' },
  { id: 'chem12-2', name: 'Solutions', subject: 'Chemistry', grade: '12' },
  { id: 'chem12-3', name: 'Electrochemistry', subject: 'Chemistry', grade: '12' },
  { id: 'chem12-4', name: 'Chemical Kinetics', subject: 'Chemistry', grade: '12' },
  { id: 'chem12-5', name: 'Surface Chemistry', subject: 'Chemistry', grade: '12' },
  
  // Biology 11th
  { id: 'bio11-1', name: 'Diversity in Living World', subject: 'Biology', grade: '11' },
  { id: 'bio11-2', name: 'Structural Organization in Plants and Animals', subject: 'Biology', grade: '11' },
  { id: 'bio11-3', name: 'Cell Structure and Function', subject: 'Biology', grade: '11' },
  { id: 'bio11-4', name: 'Plant Physiology', subject: 'Biology', grade: '11' },
  { id: 'bio11-5', name: 'Human Physiology', subject: 'Biology', grade: '11' },
  
  // Biology 12th
  { id: 'bio12-1', name: 'Reproduction', subject: 'Biology', grade: '12' },
  { id: 'bio12-2', name: 'Genetics and Evolution', subject: 'Biology', grade: '12' },
  { id: 'bio12-3', name: 'Biology and Human Welfare', subject: 'Biology', grade: '12' },
  { id: 'bio12-4', name: 'Biotechnology and Its Applications', subject: 'Biology', grade: '12' },
  { id: 'bio12-5', name: 'Ecology and Environment', subject: 'Biology', grade: '12' },
  
  // Mathematics 11th
  { id: 'math11-1', name: 'Sets', subject: 'Mathematics', grade: '11' },
  { id: 'math11-2', name: 'Relations and Functions', subject: 'Mathematics', grade: '11' },
  { id: 'math11-3', name: 'Trigonometric Functions', subject: 'Mathematics', grade: '11' },
  { id: 'math11-4', name: 'Principle of Mathematical Induction', subject: 'Mathematics', grade: '11' },
  { id: 'math11-5', name: 'Complex Numbers and Quadratic Equations', subject: 'Mathematics', grade: '11' },
  
  // Mathematics 12th
  { id: 'math12-1', name: 'Relations and Functions', subject: 'Mathematics', grade: '12' },
  { id: 'math12-2', name: 'Inverse Trigonometric Functions', subject: 'Mathematics', grade: '12' },
  { id: 'math12-3', name: 'Matrices', subject: 'Mathematics', grade: '12' },
  { id: 'math12-4', name: 'Determinants', subject: 'Mathematics', grade: '12' },
  { id: 'math12-5', name: 'Continuity and Differentiability', subject: 'Mathematics', grade: '12' },
];

// In a real app, we'd fetch this from an API
// Here we use a fake AI generation function that returns predefined questions
export const generateQuestions = async (settings: PaperSettings): Promise<Question[]> => {
  console.log('Generating questions with settings:', settings);
  
  // This would be replaced with an actual AI API call
  // For now, we'll use a mock implementation that returns predefined questions
  return new Promise((resolve) => {
    setTimeout(() => {
      const questions: Question[] = [];
      const { subject, grade, totalQuestions, difficultyDistribution, selectedTopics } = settings;
      
      // Calculate how many questions to generate for each difficulty level
      const easyCount = Math.floor(totalQuestions * (difficultyDistribution.easy / 100));
      const mediumCount = Math.floor(totalQuestions * (difficultyDistribution.medium / 100));
      const hardCount = totalQuestions - easyCount - mediumCount;
      
      // Generate easy questions
      for (let i = 0; i < easyCount; i++) {
        const topicId = selectedTopics.length > 0 
          ? selectedTopics[Math.floor(Math.random() * selectedTopics.length)]
          : topics.filter(t => t.subject === subject && t.grade === grade)[0]?.id || '';
        
        const topic = topics.find(t => t.id === topicId)?.name || '';
        
        questions.push(getMockQuestion(subject, grade, 'Easy', topic, i+1));
      }
      
      // Generate medium questions
      for (let i = 0; i < mediumCount; i++) {
        const topicId = selectedTopics.length > 0 
          ? selectedTopics[Math.floor(Math.random() * selectedTopics.length)]
          : topics.filter(t => t.subject === subject && t.grade === grade)[0]?.id || '';
        
        const topic = topics.find(t => t.id === topicId)?.name || '';
        
        questions.push(getMockQuestion(subject, grade, 'Medium', topic, easyCount+i+1));
      }
      
      // Generate hard questions
      for (let i = 0; i < hardCount; i++) {
        const topicId = selectedTopics.length > 0 
          ? selectedTopics[Math.floor(Math.random() * selectedTopics.length)]
          : topics.filter(t => t.subject === subject && t.grade === grade)[0]?.id || '';
        
        const topic = topics.find(t => t.id === topicId)?.name || '';
        
        questions.push(getMockQuestion(subject, grade, 'Hard', topic, easyCount+mediumCount+i+1));
      }
      
      // Shuffle the questions
      shuffleArray(questions);
      
      // Add correct numbering after shuffle
      questions.forEach((q, index) => {
        q.id = `q-${index+1}`;
      });
      
      resolve(questions);
    }, 1500); // Simulate network delay
  });
};

// Helper to shuffle an array
function shuffleArray<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Mock question templates
function getMockQuestion(
  subject: Subject, 
  grade: Grade, 
  difficulty: Difficulty, 
  topic: string, 
  index: number
): Question {
  const mockQuestions: Record<Subject, Record<Difficulty, string[]>> = {
    Physics: {
      'Easy': [
        'Define the principle of conservation of energy.',
        'State Newton\'s first law of motion.',
        'Define electric potential difference.',
        'What is the SI unit of electric current?',
        'Define magnetic field.',
      ],
      'Medium': [
        'Calculate the work done when a force of 10N moves an object by 5m in the direction of the force.',
        'Derive the equation for centripetal acceleration.',
        'Explain how electromagnetic induction works.',
        'Calculate the effective capacitance when three capacitors are connected in parallel.',
        'Describe the working principle of a transformer.',
      ],
      'Hard': [
        'A body of mass 2kg is thrown upwards with a velocity of 20m/s. Calculate the maximum height reached and the time taken to reach that height. Take g = 9.8m/s².',
        'Derive the expression for the magnetic field at the center of a circular current-carrying loop.',
        'A charged particle enters a region of uniform magnetic field perpendicular to its velocity. Derive the expression for its trajectory and time period.',
        'Derive the lens maker\'s formula using the concept of refraction.',
        'Explain the concept of wave-particle duality and derive de Broglie\'s wavelength equation.',
      ]
    },
    Chemistry: {
      'Easy': [
        'Define the mole concept.',
        'What is an isotope?',
        'State Boyle\'s law.',
        'Define pH scale.',
        'Name the functional group present in alcohols.',
      ],
      'Medium': [
        'Explain the concept of hybridization with an example.',
        'Calculate the pH of a solution of 0.01M HCl.',
        'Describe the structure of benzene and explain its stability.',
        'Explain the process of extraction of aluminum from its ore.',
        'Write the mechanism of esterification reaction.',
      ],
      'Hard': [
        'Derive the integrated rate equation for a first-order reaction.',
        'Calculate the cell potential for a galvanic cell using the Nernst equation.',
        'For a reaction at equilibrium, derive the relationship between ∆G° and K.',
        'Explain the concept of crystal field theory and its application in explaining the color of transition metal complexes.',
        'Calculate the pH of a buffer solution prepared by mixing 0.1M CH₃COOH and 0.1M CH₃COONa.',
      ]
    },
    Biology: {
      'Easy': [
        'Define the term tissue.',
        'Name the organelle known as the powerhouse of the cell.',
        'What is photosynthesis?',
        'Define the term gene.',
        'Name the largest part of the human brain.',
      ],
      'Medium': [
        'Explain the process of DNA replication.',
        'Describe the structure and function of nephrons in the human kidney.',
        'Explain the mechanism of hormone action.',
        'Describe the process of fertilization in flowering plants.',
        'Explain the concept of natural selection.',
      ],
      'Hard': [
        'Describe the electron transport system in mitochondria and explain how ATP is synthesized.',
        'Explain the mechanism of muscle contraction at the molecular level.',
        'Describe the mechanism of feedback inhibition in enzyme regulation.',
        'Explain the concept of co-evolution with suitable examples.',
        'Describe the role of various hormones in the menstrual cycle and explain its regulation.',
      ]
    },
    Mathematics: {
      'Easy': [
        'Define a function.',
        'State the Pythagoras theorem.',
        'Define the term vector.',
        'What is a prime number?',
        'Define the term matrix.',
      ],
      'Medium': [
        'Prove that the sum of the angles in a triangle is 180°.',
        'Find the derivative of f(x) = x³ - 3x² + 2x - 1.',
        'Solve the equation: log₂(x) + log₂(x-3) = 3.',
        'Find the area of the region bounded by y = x² and y = 4.',
        'Solve the system of linear equations: 2x + 3y = 7, 3x - 2y = 8.',
      ],
      'Hard': [
        'Prove that the function f(x) = sin(x) - x is strictly decreasing for x > 0.',
        'Evaluate the integral: ∫(0 to π/2) sin(x)·cos(x)·ln(tan(x)) dx.',
        'Find the general solution of the differential equation: d²y/dx² + 4·dy/dx + 4y = e^x.',
        'Prove that among all rectangles with a given perimeter, the square has the maximum area.',
        'Using the principle of mathematical induction, prove that n³ - n is divisible by 6 for all positive integers n.',
      ]
    }
  };

  // Determine marks based on difficulty
  const marks = difficulty === 'Easy' ? 2 : difficulty === 'Medium' ? 3 : 5;
  
  // Select a random question from the mock list
  const questionsForDifficulty = mockQuestions[subject][difficulty];
  const questionText = questionsForDifficulty[index % questionsForDifficulty.length];
  
  // Generate mock answer
  const answer = `This is a sample answer for the ${difficulty.toLowerCase()} question about ${topic} in ${subject} for grade ${grade}.`;

  // Random Bloom's taxonomy level based on difficulty
  const bloomLevelsByDifficulty = {
    'Easy': ['Knowledge', 'Comprehension'] as BloomLevel[],
    'Medium': ['Application', 'Analysis'] as BloomLevel[],
    'Hard': ['Synthesis', 'Evaluation'] as BloomLevel[]
  };
  
  const bloomLevels = bloomLevelsByDifficulty[difficulty];
  const bloomLevel = bloomLevels[Math.floor(Math.random() * bloomLevels.length)];

  return {
    id: `q-${index}`,
    text: questionText,
    subject,
    grade,
    marks,
    difficulty,
    topic,
    bloomLevel,
    answer
  };
}

export const createQuestionPaper = (settings: PaperSettings, questions: Question[]): QuestionPaper => {
  return {
    id: `paper-${Date.now()}`,
    settings,
    questions,
    createdAt: new Date().toISOString()
  };
};

// Function to get topics by subject and grade
export const getTopicsBySubjectAndGrade = (subject: Subject, grade: Grade): Topic[] => {
  return topics.filter(topic => topic.subject === subject && topic.grade === grade);
};
