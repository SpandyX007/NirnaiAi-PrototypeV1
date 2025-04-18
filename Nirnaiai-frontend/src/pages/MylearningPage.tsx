import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Paper,
  LinearProgress,
  Divider,
  Card,
  CardContent,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
  CircularProgress,
  Chip,
  Stack,
  Snackbar,
  Alert,
  SelectChangeEvent
} from '@mui/material';
import {
  QuestionAnswer as QuizIcon,
  NavigateNext as NextIcon,
  Refresh as RestartIcon,
  EmojiEvents as TrophyIcon,
  Settings as SettingsIcon,
  School as DifficultyIcon,
  Tag as TopicIcon,
  Numbers as NumberIcon
} from '@mui/icons-material';
import { generateQuestionsWithGemini, getSampleQuestions } from './geminiService';

// Define types
type Difficulty = 'easy' | 'medium' | 'hard';
type TopicId = string;

interface Topic {
  value: TopicId;
  label: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  topic: TopicId;
}

const MyLearningQuizApp: React.FC = () => {
  // Quiz configuration
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [numQuestions, setNumQuestions] = useState<number>(5);
  const [selectedTopics, setSelectedTopics] = useState<TopicId[]>(['constitutional_law']);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showSetup, setShowSetup] = useState<boolean>(true);
  
  // Quiz state
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [answered, setAnswered] = useState<boolean>(false);

  // Available topics
  const topics: Topic[] = [
    { value: 'constitutional_law', label: 'Constitutional Law' },
    { value: 'criminal_law', label: 'Criminal Law' },
    { value: 'civil_law', label: 'Civil Law' },
    { value: 'contract_law', label: 'Contract Law' },
    { value: 'human_rights', label: 'Human Rights' },
    { value: 'international_law', label: 'International Law' },
    { value: 'legal_history', label: 'Legal History' },
    { value: 'legal_procedure', label: 'Legal Procedure' },
  ];

  const fetchQuestions = async (): Promise<void> => {
    if (selectedTopics.length === 0) {
      setError("Please select at least one topic");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Try to get questions from Gemini API
      let questions: QuizQuestion[] = [];
      try {
        questions = await generateQuestionsWithGemini(difficulty, numQuestions, selectedTopics);
      } catch (apiError) {
        console.error("API error:", apiError);
        // If API fails, fall back to sample questions
        questions = getSampleQuestions(difficulty, numQuestions, selectedTopics);
      }
      
      if (questions.length > 0) {
        setQuizQuestions(questions);
        setShowSetup(false);
        resetQuiz();
      } else {
        setError("Failed to generate questions. Please try again.");
      }
    } catch (err) {
      console.error("Error generating questions:", err);
      setError("Failed to generate questions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetQuiz = (): void => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setShowResults(false);
    setAnswered(false);
  };

  const handleTopicChange = (event: SelectChangeEvent<TopicId[]>): void => {
    const {
      target: { value },
    } = event;
    
    // On autofill we get a stringified value.
    const topicValues = typeof value === 'string' ? value.split(',') as TopicId[] : value;
    setSelectedTopics(topicValues);
  };

  const handleAnswerSelect = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedAnswer(event.target.value);
  };

  const handleSubmitAnswer = (): void => {
    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setAnswered(true);
  };

  const handleNextQuestion = (): void => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
      setAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const handleRestartQuiz = (): void => {
    setShowSetup(true);
    resetQuiz();
  };

  const handleStartNewQuiz = (): void => {
    resetQuiz();
    setShowSetup(false);
  };

  const progress = quizQuestions.length > 0 ? ((currentQuestion) / quizQuestions.length) * 100 : 0;

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <QuizIcon color="primary" />
        Test Your Knowledge
      </Typography>
      
      {showSetup ? (
        <Card elevation={3}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <SettingsIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Quiz Setup</Typography>
            </Box>
            
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
              <DifficultyIcon color="action" sx={{ mr: 1 }} />
              <FormControl fullWidth>
                <InputLabel id="difficulty-label">Difficulty</InputLabel>
                <Select
                  labelId="difficulty-label"
                  value={difficulty}
                  label="Difficulty"
                  onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                >
                  <MenuItem value="easy">Easy</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="hard">Hard</MenuItem>
                </Select>
                <FormHelperText>Select the challenge level</FormHelperText>
              </FormControl>
            </Box>
            
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
              <NumberIcon color="action" sx={{ mr: 1 }} />
              <FormControl fullWidth>
                <InputLabel id="questions-label">Number of Questions</InputLabel>
                <Select
                  labelId="questions-label"
                  value={numQuestions}
                  label="Number of Questions"
                  onChange={(e) => setNumQuestions(Number(e.target.value))}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                </Select>
                <FormHelperText>How many questions do you want?</FormHelperText>
              </FormControl>
            </Box>
            
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'flex-start' }}>
              <TopicIcon color="action" sx={{ mr: 1, mt: 1 }} />
              <FormControl fullWidth>
                <InputLabel id="topics-label">Topics</InputLabel>
                <Select
                  labelId="topics-label"
                  multiple
                  value={selectedTopics}
                  onChange={handleTopicChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip 
                          key={value} 
                          label={topics.find(topic => topic.value === value)?.label} 
                          size="small"
                        />
                      ))}
                    </Box>
                  )}
                >
                  {topics.map((topic) => (
                    <MenuItem key={topic.value} value={topic.value}>
                      {topic.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Select at least one topic</FormHelperText>
              </FormControl>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button 
                variant="contained" 
                size="large"
                onClick={fetchQuestions}
                disabled={isLoading || selectedTopics.length === 0}
                sx={{ minWidth: 200 }}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : "Generate Quiz"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      ) : quizQuestions.length > 0 && !showResults ? (
        <Card elevation={3}>
          <CardContent>
            <Box sx={{ mb: 3 }}>
              <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 5 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="body2">Question {currentQuestion + 1} of {quizQuestions.length}</Typography>
                <Typography variant="body2">Score: {score}</Typography>
              </Box>
            </Box>

            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Topic: {topics.find(t => t.value === quizQuestions[currentQuestion].topic)?.label}
            </Typography>

            <Typography variant="h6" gutterBottom>
              {quizQuestions[currentQuestion].question}
            </Typography>

            <FormControl component="fieldset" sx={{ width: '100%', mt: 2 }}>
              <RadioGroup value={selectedAnswer} onChange={handleAnswerSelect}>
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <Paper 
                    key={index} 
                    elevation={1} 
                    sx={{ 
                      mb: 1, 
                      bgcolor: answered ? 
                        option === quizQuestions[currentQuestion].correctAnswer ? 
                          'rgba(76, 175, 80, 0.1)' : 
                          option === selectedAnswer ? 'rgba(244, 67, 54, 0.1)' : 'inherit' 
                        : 'inherit',
                      border: answered ?
                        option === quizQuestions[currentQuestion].correctAnswer ?
                          '1px solid #4caf50' :
                          option === selectedAnswer ? '1px solid #f44336' : '1px solid #e0e0e0'
                        : '1px solid #e0e0e0',
                    }}
                  >
                    <FormControlLabel 
                      value={option} 
                      control={<Radio />} 
                      label={option} 
                      disabled={answered}
                      sx={{ width: '100%', margin: 0, padding: 1 }}
                    />
                  </Paper>
                ))}
              </RadioGroup>
            </FormControl>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              {!answered ? (
                <Button 
                  variant="contained" 
                  onClick={handleSubmitAnswer} 
                  disabled={!selectedAnswer}
                  sx={{ minWidth: 120 }}
                >
                  Submit
                </Button>
              ) : (
                <Button 
                  variant="contained" 
                  endIcon={<NextIcon />} 
                  onClick={handleNextQuestion}
                  sx={{ minWidth: 120 }}
                >
                  {currentQuestion < quizQuestions.length - 1 ? 'Next' : 'See Results'}
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      ) : showResults ? (
        <Card elevation={3}>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <TrophyIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Quiz Completed!
            </Typography>
            <Typography variant="h6" gutterBottom>
              Your Score: {score} out of {quizQuestions.length}
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              {score === quizQuestions.length 
                ? "Perfect score! You're a legal expert!" 
                : score >= quizQuestions.length / 2 
                  ? "Good job! You have a solid understanding of legal concepts."
                  : "Keep learning! Review some legal and constitutional basics."}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
              <Chip 
                icon={<DifficultyIcon />} 
                label={`Difficulty: ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}`} 
                variant="outlined" 
              />
              <Chip 
                icon={<TopicIcon />} 
                label={`Topics: ${selectedTopics.length}`} 
                variant="outlined" 
              />
            </Box>
            <Divider sx={{ my: 3 }} />
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button 
                variant="outlined" 
                startIcon={<RestartIcon />} 
                onClick={handleStartNewQuiz}
              >
                Retry Same Quiz
              </Button>
              <Button 
                variant="contained" 
                startIcon={<SettingsIcon />} 
                onClick={handleRestartQuiz}
              >
                New Quiz Settings
              </Button>
            </Box>
          </CardContent>
        </Card>
      ) : null}
      
      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MyLearningQuizApp;