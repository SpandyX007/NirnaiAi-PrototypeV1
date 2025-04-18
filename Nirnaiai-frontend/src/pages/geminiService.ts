// geminiService.ts

// Types
export type Difficulty = 'easy' | 'medium' | 'hard';
export type TopicId = string;

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  topic: TopicId;
}

interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

// This is where the actual API integration with Gemini would happen
// Replace API_KEY with your actual Gemini API key when implementing
const API_KEY = 'AIzaSyDborNKyQdkM4546d3KbBkUl26Tjo1hHKM';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export const generateQuestionsWithGemini = async (
  difficulty: Difficulty, 
  numQuestions: number, 
  topics: TopicId[]
): Promise<QuizQuestion[]> => {
  try {
    // Format topic names for better readability in the prompt
    const formattedTopics = topics.map(topic => 
      topic.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    ).join(', ');
    
    // Craft a prompt for Gemini to generate quiz questions
    const prompt = `Generate ${numQuestions} multiple-choice questions about ${formattedTopics} at a ${difficulty} difficulty level.
    
For each question, provide:
1. A clear question
2. Exactly 4 possible answers, with only one being correct
3. The correct answer
4. The topic category for the question

Format the response as a JSON array, where each question is an object with the following structure:
{
  "question": "Question text here?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": "The correct option",
  "topic": "${topics[0]}" // Use the topic value from the original list
}

The questions should be factually accurate and focus on important concepts in ${formattedTopics}.
For difficulty level ${difficulty}:
- Easy: Focus on basic definitions, fundamental concepts, and widely known facts
- Medium: Include more specific details, require some analysis, and test deeper understanding
- Hard: Cover complex concepts, require application of knowledge, test edge cases and nuanced understanding

Make sure each question has exactly one correct answer, and that all answers are plausible.`;

    // Call the Gemini API
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: GeminiResponse = await response.json();
    
    // Extract the generated content from the response
    const generatedText = data.candidates[0].content.parts[0].text;
    
    // Parse the JSON response from Gemini
    let questions: QuizQuestion[] = [];
    
    // Find JSON content (sometimes the AI wraps it in markdown code blocks)
    const jsonMatch = generatedText.match(/```json\s*([\s\S]*?)\s*```/) || 
                      generatedText.match(/```\s*([\s\S]*?)\s*```/) ||
                      [null, generatedText];
                      
    const jsonContent = jsonMatch[1] || generatedText;
    
    try {
      questions = JSON.parse(jsonContent);
    } catch (e) {
      console.error("Failed to parse JSON from Gemini response:", e);
      throw new Error("Invalid response format from Gemini");
    }
    
    // Validate the questions
    questions = questions.filter(q => 
      q.question && 
      q.options && 
      Array.isArray(q.options) && 
      q.options.length === 4 &&
      q.correctAnswer && 
      q.options.includes(q.correctAnswer) &&
      q.topic
    );
    
    return questions;
    
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};

// Fallback to sample questions if API call fails or for testing
export const getSampleQuestions = (
  difficulty: Difficulty, 
  numQuestions: number, 
  topics: TopicId[]
): QuizQuestion[] => {
  // Sample questions based on difficulty and topics
  const questionsByDifficulty: Record<Difficulty, QuizQuestion[]> = {
    easy: [
      {
        question: "Which document begins with 'We the People'?",
        options: ["Declaration of Independence", "U.S. Constitution", "Bill of Rights", "Magna Carta"],
        correctAnswer: "U.S. Constitution",
        topic: "constitutional_law"
      },
      {
        question: "What is the minimum age requirement to become President of the United States?",
        options: ["30 years", "35 years", "40 years", "45 years"],
        correctAnswer: "35 years",
        topic: "constitutional_law"
      },
      {
        question: "Which legal document guarantees the right to a speedy trial?",
        options: ["First Amendment", "Fourth Amendment", "Sixth Amendment", "Eighth Amendment"],
        correctAnswer: "Sixth Amendment",
        topic: "constitutional_law"
      },
      {
        question: "What is a misdemeanor?",
        options: ["A serious crime", "A minor crime", "A traffic violation", "A civil wrong"],
        correctAnswer: "A minor crime",
        topic: "criminal_law"
      },
      {
        question: "Which of these is NOT a type of contract?",
        options: ["Bilateral", "Unilateral", "Mandatory", "Void"],
        correctAnswer: "Mandatory",
        topic: "contract_law"
      },
      {
        question: "What does 'plaintiff' mean in a legal context?",
        options: ["The accused person", "The person who files a lawsuit", "The lawyer", "The judge"],
        correctAnswer: "The person who files a lawsuit",
        topic: "civil_law"
      },
      {
        question: "What is the purpose of a deposition?",
        options: ["To sentence a criminal", "To gather sworn testimony", "To select a jury", "To pass a new law"],
        correctAnswer: "To gather sworn testimony",
        topic: "legal_procedure"
      },
      {
        question: "The Universal Declaration of Human Rights was adopted in what year?",
        options: ["1945", "1948", "1952", "1964"],
        correctAnswer: "1948",
        topic: "human_rights"
      }
    ],
    medium: [
      {
        question: "What is the legal doctrine of 'stare decisis'?",
        options: ["Double jeopardy protection", "Following established precedents", "Right to remain silent", "Presumption of innocence"],
        correctAnswer: "Following established precedents",
        topic: "legal_history"
      },
      {
        question: "Which amendment protects against unreasonable searches and seizures?",
        options: ["Second Amendment", "Fourth Amendment", "Fifth Amendment", "Sixth Amendment"],
        correctAnswer: "Fourth Amendment",
        topic: "constitutional_law"
      },
      {
        question: "What is 'mens rea' in criminal law?",
        options: ["A criminal record", "Intent to commit a crime", "Physical evidence", "A legal defense"],
        correctAnswer: "Intent to commit a crime",
        topic: "criminal_law"
      },
      {
        question: "What is required for a valid contract?",
        options: ["Offer, acceptance, consideration, legal capacity", "Written document, signatures, notarization", "Lawyer approval, court filing", "Verbal agreement only"],
        correctAnswer: "Offer, acceptance, consideration, legal capacity",
        topic: "contract_law"
      },
      {
        question: "What is the principle of 'sovereign immunity'?",
        options: ["Diplomatic protection", "Government cannot be sued without consent", "Presidential powers", "International law exemptions"],
        correctAnswer: "Government cannot be sued without consent",
        topic: "international_law"
      },
      {
        question: "What is a 'writ of habeas corpus'?",
        options: ["Court order to release from unlawful detention", "Search warrant", "Right to a speedy trial", "Power to pardon"],
        correctAnswer: "Court order to release from unlawful detention",
        topic: "legal_procedure"
      }
    ],
    hard: [
      {
        question: "What Supreme Court case established judicial review?",
        options: ["Marbury v. Madison", "Plessy v. Ferguson", "Brown v. Board of Education", "Roe v. Wade"],
        correctAnswer: "Marbury v. Madison",
        topic: "constitutional_law"
      },
      {
        question: "What is the 'Rule Against Perpetuities' concerned with?",
        options: ["Double jeopardy", "Future property interests", "Criminal sentencing", "Tax evasion"],
        correctAnswer: "Future property interests",
        topic: "civil_law"
      },
      {
        question: "What is the 'blue sky law'?",
        options: ["Environmental regulation", "Aviation rights", "Securities regulation", "Maritime law"],
        correctAnswer: "Securities regulation",
        topic: "legal_history"
      },
      {
        question: "In international law, what is 'opinio juris'?",
        options: ["Legal opinion from a judge", "Belief that an action is legally obligatory", "International court judgment", "Global treaty provision"],
        correctAnswer: "Belief that an action is legally obligatory",
        topic: "international_law"
      },
      {
        question: "What is the doctrine of 'promissory estoppel'?",
        options: ["Breach of contract remedy", "Prevention of promise withdrawal when relied upon", "Marriage law principle", "Commercial lease requirement"],
        correctAnswer: "Prevention of promise withdrawal when relied upon",
        topic: "contract_law"
      },
      {
        question: "What is the 'exclusionary rule' in U.S. law?",
        options: ["Rule barring specific evidence at trial", "Rule excluding certain people from jury duty", "Rule preventing double prosecution", "Rule limiting court jurisdiction"],
        correctAnswer: "Rule barring specific evidence at trial",
        topic: "criminal_law"
      }
    ]
  };
  
  // Filter questions based on selected topics
  const allQuestions = questionsByDifficulty[difficulty].filter(q => topics.includes(q.topic));
  
  // Select random questions up to the requested number
  const selectedQuestions: QuizQuestion[] = [];
  const availableQuestions = [...allQuestions];
  
  // If we don't have enough questions, return what we have
  const count = Math.min(numQuestions, availableQuestions.length);
  
  for (let i = 0; i < count; i++) {
    if (availableQuestions.length === 0) break;
    
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    selectedQuestions.push(availableQuestions[randomIndex]);
    availableQuestions.splice(randomIndex, 1);
  }
  
  return selectedQuestions;
};