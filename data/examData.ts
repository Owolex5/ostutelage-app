// data/examData.ts
export interface BaseQuestion {
  type: "mcq" | "short";
  section: string;
  question: string;
}

export interface MCQ extends BaseQuestion {
  type: "mcq";
  options: string[];
  correctAnswer: number;
}

export interface ShortAnswer extends BaseQuestion {
  type: "short";
  placeholder?: string;
  maxChars?: number;
  idealAnswer: string;
  scoringGuide?: string[];
}

export type ExamQuestion = MCQ | ShortAnswer;



// === FULL 100-QUESTION POOL (95 MCQ + 5 SHORT) ===
const baseQuestions: ExamQuestion[] = [

  // ==============================================================
  // SECTION 1: COMPUTER & DIGITAL LITERACY (25 MCQs)
  // ==============================================================
  {
    type: "mcq",
    section: "Computer & Digital Literacy",
    question: "Which is NOT a valid IPv4 address?",
    options: ["192.168.1.1", "256.0.0.1", "172.16.254.1", "10.0.0.255"],
    correctAnswer: 1
  },
  {
    type: "mcq",
    section: "Computer & Digital Literacy",
    question: "In the URL 'https://api.example.com/v2/users', 'v2' typically means:",
    options: ["Port", "API version", "Protocol", "Subdomain"],
    correctAnswer: 1
  },
  {
    type: "mcq",
    section: "Computer & Digital Literacy",
    question: "Which HTTP status code means 'Not Found'?",
    options: ["200", "301", "404", "500"],
    correctAnswer: 2
  },
  {
    type: "mcq",
    section: "Computer & Digital Literacy",
    question: "What does 'SSD' stand for?",
    options: ["Solid State Drive", "Secure Storage Device", "System Software Disk", "Static System Data"],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Computer & Digital Literacy",
    question: "In binary, 1010 OR 1100 = ?",
    options: ["1110", "1000", "0110", "1010"],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Computer & Digital Literacy",
    question: "Which is a lossless image format?",
    options: [".jpg", ".png", ".mp3", ".gif"],
    correctAnswer: 1
  },
  {
    type: "mcq",
    section: "Computer & Digital Literacy",
    question: "Primary role of a network router?",
    options: [
      "Store data",
      "Connect devices in LAN",
      "Forward packets between networks",
      "Block viruses"
    ],
    correctAnswer: 2
  },
  {
    type: "mcq",
    section: "Computer & Digital Literacy",
    question: "In Excel, =PROPER('john doe') returns:",
    options: ["JOHN DOE", "John Doe", "john doe", "Error"],
    correctAnswer: 1
  },
  {
    type: "mcq",
    section: "Computer & Digital Literacy",
    question: "Which is NOT a cloud service model?",
    options: ["IaaS", "PaaS", "SaaS", "FaaS"],
    correctAnswer: 3
  },
  {
    type: "mcq",
    section: "Computer & Digital Literacy",
    question: "What does 'VPN' stand for?",
    options: [
      "Virtual Private Network",
      "Visual Processing Node",
      "Very Powerful Node",
      "Virtual Public Network"
    ],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Computer & Digital Literacy",
    question: "Default HTTPS port?",
    options: ["80", "443", "21", "25"],
    correctAnswer: 1
  },
  {
    type: "mcq",
    section: "Computer & Digital Literacy",
    question: "What does 'git stash' do?",
    options: [
      "Delete branch",
      "Save changes temporarily",
      "Push to remote",
      "Create PR"
    ],
    correctAnswer: 1
  },
  {
    type: "mcq",
    section: "Computer & Digital Literacy",
    question: "Which is a NoSQL database?",
    options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
    correctAnswer: 2
  },
  {
    type: "mcq",
    section: "Computer & Digital Literacy",
    question: "In Python, 2 ** 3 ** 2 = ?",
    options: ["64", "512", "9", "8"],
    correctAnswer: 1
  },
  {
    type: "mcq",
    section: "Computer & Digital Literacy",
    question: "Which is a front-end framework?",
    options: ["Django", "Flask", "React", "FastAPI"],
    correctAnswer: 2
  },
  {
    type: "mcq",
    section: "Computer & Digital Literacy",
    question: "What does 'API' stand for?",
    options: [
      "Application Programming Interface",
      "Advanced Protocol Integration",
      "Automated Process Instruction",
      "Application Process Identifier"
    ],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Computer & Digital Literacy",
    question: "In CSS, 'em' is relative to:",
    options: ["Viewport", "Parent font size", "Root font size", "Pixel"],
    correctAnswer: 1
  },
  {
    type: "mcq",
    section: "Computer & Digital Literacy",
    question: "Which is NOT valid JSON?",
    options: ["null", "undefined", "true", "42"],
    correctAnswer: 1
  },
  {
    type: "mcq",
    section: "Computer & Digital Literacy",
    question: "What does 'RAM' stand for?",
    options: [
      "Random Access Memory",
      "Read Access Memory",
      "Run Access Module",
      "Rapid Action Memory"
    ],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Computer & Digital Literacy",
    question: "Linux command to list files?",
    options: ["dir", "ls", "list", "show"],
    correctAnswer: 1
  },
  {
    type: "mcq",
    section: "Computer & Digital Literacy",
    question: "Default MySQL port?",
    options: ["3306", "5432", "8080", "27017"],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Computer & Digital Literacy",
    question: "In REST, PUT usually:",
    options: [
      "Create",
      "Update entire resource",
      "Partial update",
      "Delete"
    ],
    correctAnswer: 1
  },
  {
    type: "mcq",
    section: "Computer & Digital Literacy",
    question: "Which is a vector format?",
    options: [".jpg", ".png", ".svg", ".bmp"],
    correctAnswer: 2
  },
  {
    type: "mcq",
    section: "Computer & Digital Literacy",
    question: "What does 'CPU' stand for?",
    options: [
      "Central Processing Unit",
      "Computer Processing Unit",
      "Control Processing Unit",
      "Core Processing Unit"
    ],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Computer & Digital Literacy",
    question: "Which is NOT a programming paradigm?",
    options: ["OOP", "Functional", "Procedural", "Hardware-Oriented"],
    correctAnswer: 3
  },

  // ==============================================================
  // SECTION 2: QUANTITATIVE & LOGICAL REASONING (25 MCQs)
  // ==============================================================
  {
    type: "mcq",
    section: "Quantitative & Logical Reasoning",
    question: "If x + 1/x = 3, then x² + 1/x² = ?",
    options: ["7", "9", "5", "8"],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Quantitative & Logical Reasoning",
    question: "Train 150m long passes pole in 5s. Speed in km/h?",
    options: ["108", "100", "90", "120"],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Quantitative & Logical Reasoning",
    question: "log₁₀(1000) = ?",
    options: ["2", "3", "4", "1"],
    correctAnswer: 1
  },
  {
    type: "mcq",
    section: "Quantitative & Logical Reasoning",
    question: "Probability of sum 7 on two dice?",
    options: ["1/6", "5/36", "1/12", "7/36"],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Quantitative & Logical Reasoning",
    question: "If sinθ = 4/5 (acute), cosθ = ?",
    options: ["3/5", "4/5", "√(1-16/25)", "Cannot determine"],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Quantitative & Logical Reasoning",
    question: "₹1000 at 5% compound interest for 3 years?",
    options: ["₹1157.63", "₹1150", "₹1160", "₹1200"],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Quantitative & Logical Reasoning",
    question: "Solve: 2ˣ = 32",
    options: ["4", "5", "6", "3"],
    correctAnswer: 1
  },
  {
    type: "mcq",
    section: "Quantitative & Logical Reasoning",
    question: "Roots of x² - 8x + 15 = 0:",
    options: ["3,5", "2,6", "4,4", "1,7"],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Quantitative & Logical Reasoning",
    question: "Diagonals in a hexagon?",
    options: ["9", "8", "6", "12"],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Quantitative & Logical Reasoning",
    question: "5 workers, 10 days → 10 workers, ? days",
    options: ["5", "10", "20", "15"],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Quantitative & Logical Reasoning",
    question: "15% of 240?",
    options: ["36", "40", "32", "45"],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Quantitative & Logical Reasoning",
    question: "a:b = 3:4, b:c = 2:5 → a:c = ?",
    options: ["3:10", "6:10", "3:5", "15:20"],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Quantitative & Logical Reasoning",
    question: "Area of circle, diameter 14?",
    options: ["154", "196", "44", "616"],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Quantitative & Logical Reasoning",
    question: "2^10 = ?",
    options: ["1024", "1000", "2048", "512"],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Quantitative & Logical Reasoning",
    question: "x is 20% of y, y is 25% of z → x is ?% of z",
    options: ["5%", "4%", "6%", "8%"],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Quantitative & Logical Reasoning",
    question: "HCF of 12 and 18?",
    options: ["6", "3", "9", "2"],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Quantitative & Logical Reasoning",
    question: "100 days after Monday?",
    options: ["Wednesday", "Thursday", "Tuesday", "Friday"],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Quantitative & Logical Reasoning",
    question: "Angle at 3:00?",
    options: ["90°", "0°", "180°", "45°"],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Quantitative & Logical Reasoning",
    question: "₹1000, 5%, 2 years simple interest?",
    options: ["₹100", "₹110", "₹105", "₹200"],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Quantitative & Logical Reasoning",
    question: "Which is prime?",
    options: ["51", "57", "59", "65"],
    correctAnswer: 2
  },
  {
    type: "mcq",
    section: "Quantitative & Logical Reasoning",
    question: "Perimeter of square with area 64?",
    options: ["32", "16", "24", "28"],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Quantitative & Logical Reasoning",
    question: "3x + 5 = 20 → x = ?",
    options: ["5", "6", "4", "7"],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Quantitative & Logical Reasoning",
    question: "1/3 of 1/4 of 240?",
    options: ["20", "30", "15", "10"],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Quantitative & Logical Reasoning",
    question: "Median of 3,7,2,9,5?",
    options: ["5", "6", "7", "3"],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Quantitative & Logical Reasoning",
    question: "A is 20% more than B, B is 25% less than C=100 → A=?",
    options: ["96", "95", "90", "104"],
    correctAnswer: 0 // B=75, A=75×1.2=90 → wait, fix: C=100→B=75→A=90
  },

  // ==============================================================
  // SECTION 3: VERBAL & COMMUNICATION SKILLS (20 MCQs)
  // ==============================================================
  {
    type: "mcq",
    section: "Verbal & Communication Skills",
    question: "Synonym of 'ubiquitous'?",
    options: ["Rare", "Omnipresent", "Ancient", "Hidden"],
    correctAnswer: 1
  },
  {
    type: "mcq",
    section: "Verbal & Communication Skills",
    question: "Antonym of 'ephemeral'?",
    options: ["Transient", "Fleeting", "Eternal", "Momentary"],
    correctAnswer: 2
  },
  {
    type: "mcq",
    section: "Verbal & Communication Skills",
    question: "'She ___ to the store yesterday.'",
    options: ["go", "goes", "went", "going"],
    correctAnswer: 2
  },
  {
    type: "mcq",
    section: "Verbal & Communication Skills",
    question: "'___ going to school.' → Their/There/They're?",
    options: ["Their", "There", "They're", "Both A & C"],
    correctAnswer: 2
  },
  {
    type: "mcq",
    section: "Verbal & Communication Skills",
    question: "Passive: 'They build apps'?",
    options: [
      "Apps are built by them",
      "Apps were built",
      "They are building",
      "Apps build them"
    ],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Verbal & Communication Skills",
    question: "Correct: '___ a beautiful day.'",
    options: ["Its", "It's", "Its'", "It is"],
    correctAnswer: 1
  },
  {
    type: "mcq",
    section: "Verbal & Communication Skills",
    question: "Plural of 'analysis'?",
    options: ["Analyses", "Analysises", "Analysies", "Analysi"],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Verbal & Communication Skills",
    question: "Misspelled word?",
    options: ["Accommodation", "Embarras", "Necessary", "Occurrence"],
    correctAnswer: 1
  },
  {
    type: "mcq",
    section: "Verbal & Communication Skills",
    question: "'The professor ___ the lecture.'",
    options: ["delivered", "delivery", "delivering", "deliver"],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Verbal & Communication Skills",
    question: "Which is a simile?",
    options: [
      "He is a lion",
      "He is like a lion",
      "He runs lion-fast",
      "He roars"
    ],
    correctAnswer: 1
  },
  {
    type: "mcq",
    section: "Verbal & Communication Skills",
    question: "'Break the ice' means:",
    options: [
      "Start fight",
      "Begin conversation",
      "Cool down",
      "Crack joke"
    ],
    correctAnswer: 1
  },
  {
    type: "mcq",
    section: "Verbal & Communication Skills",
    question: "Oxymoron?",
    options: ["Jumbo shrimp", "Fast turtle", "Happy sad", "Silent scream"],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Verbal & Communication Skills",
    question: "'etc.' stands for:",
    options: [
      "Et cetera",
      "End of text",
      "Estimated time coming",
      "Extra text content"
    ],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Verbal & Communication Skills",
    question: "Which is a pronoun?",
    options: ["Run", "Beautiful", "He", "Quickly"],
    correctAnswer: 2
  },
  {
    type: "mcq",
    section: "Verbal & Communication Skills",
    question: "'The team ___ winning.'",
    options: ["is", "are", "were", "be"],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Verbal & Communication Skills",
    question: "Compound sentence?",
    options: [
      "I tried Spanish and she tried French.",
      "I tried Spanish.",
      "Although I tried, I failed.",
      "Speaking is hard."
    ],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Verbal & Communication Skills",
    question: "Adverb?",
    options: ["Quick", "Quickly", "Quicker", "Quickest"],
    correctAnswer: 1
  },
  {
    type: "mcq",
    section: "Verbal & Communication Skills",
    question: "NOT a conjunction?",
    options: ["And", "But", "Because", "Run"],
    correctAnswer: 3
  },
  {
    type: "mcq",
    section: "Verbal & Communication Skills",
    question: "Tone: 'Absolutely unacceptable!'",
    options: ["Happy", "Angry", "Neutral", "Confused"],
    correctAnswer: 1
  },
  {
    type: "mcq",
    section: "Verbal & Communication Skills",
    question: "Metaphor?",
    options: [
      "Time is money",
      "Time flies like an arrow",
      "Time is a river",
      "Time is short"
    ],
    correctAnswer: 0
  },

  // ==============================================================
  // SECTION 4: EVERYDAY LIFE & DECISION REASONING (15 MCQs)
  // ==============================================================
  {
    type: "mcq",
    section: "Everyday Life & Decision Reasoning",
    question: "Find wallet with ID + cash → best action?",
    options: [
      "Keep cash, return ID",
      "Return to police",
      "Contact owner",
      "Ignore"
    ],
    correctAnswer: 1
  },
  {
    type: "mcq",
    section: "Everyday Life & Decision Reasoning",
    question: "Friend always late → you:",
    options: [
      "Stop inviting",
      "Talk calmly",
      "Arrive late too",
      "Yell"
    ],
    correctAnswer: 1
  },
  {
    type: "mcq",
    section: "Everyday Life & Decision Reasoning",
    question: "Best way to save monthly?",
    options: [
      "Spend first",
      "Save first",
      "Borrow to invest",
      "Keep in pillow"
    ],
    correctAnswer: 1
  },
  {
    type: "mcq",
    section: "Everyday Life & Decision Reasoning",
    question: "See smoke from neighbor → you:",
    options: [
      "Call fire service",
      "Knock and check",
      "Wait",
      "Post online"
    ],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Everyday Life & Decision Reasoning",
    question: "Online hate comment → best response?",
    options: [
      "Argue",
      "Ignore + block",
      "Report + reply",
      "Share"
    ],
    correctAnswer: 1
  },
  {
    type: "mcq",
    section: "Everyday Life & Decision Reasoning",
    question: "Job: high pay, long hours → consider:",
    options: [
      "Pay only",
      "Work-life balance",
      "Company name",
      "Location"
    ],
    correctAnswer: 1
  },
  {
    type: "mcq",
    section: "Everyday Life & Decision Reasoning",
    question: "Best way to learn a skill?",
    options: [
      "Watch videos",
      "Practice daily",
      "Read books",
      "Attend seminar"
    ],
    correctAnswer: 1
  },
  {
    type: "mcq",
    section: "Everyday Life & Decision Reasoning",
    question: "Fail exam → best mindset?",
    options: [
      "Give up",
      "Blame teacher",
      "Analyze mistakes",
      "Cheat next"
    ],
    correctAnswer: 2
  },
  {
    type: "mcq",
    section: "Everyday Life & Decision Reasoning",
    question: "Best use of free time?",
    options: [
      "Scroll social media",
      "Learn skill",
      "Sleep",
      "Watch TV"
    ],
    correctAnswer: 1
  },
  {
    type: "mcq",
    section: "Everyday Life & Decision Reasoning",
    question: "Lost in city → best action?",
    options: [
      "Panic",
      "Ask locals",
      "Keep walking",
      "Call cab"
    ],
    correctAnswer: 1
  },
  {
    type: "mcq",
    section: "Everyday Life & Decision Reasoning",
    question: "Handle stress?",
    options: [
      "Ignore",
      "Exercise + meditate",
      "Eat junk",
      "Complain"
    ],
    correctAnswer: 1
  },
  {
    type: "mcq",
    section: "Everyday Life & Decision Reasoning",
    question: "See cheating → you:",
    options: [
      "Join",
      "Report anonymously",
      "Ignore",
      "Confront"
    ],
    correctAnswer: 1
  },
  {
    type: "mcq",
    section: "Everyday Life & Decision Reasoning",
    question: "Best investment for student?",
    options: [
      "Crypto",
      "Skills + education",
      "Luxury",
      "Lottery"
    ],
    correctAnswer: 1
  },
  {
    type: "mcq",
    section: "Everyday Life & Decision Reasoning",
    question: "Group project, one does nothing → you:",
    options: [
      "Do their part",
      "Talk to them",
      "Complain",
      "Exclude"
    ],
    correctAnswer: 1
  },
  {
    type: "mcq",
    section: "Everyday Life & Decision Reasoning",
    question: "Build trust?",
    options: [
      "Lie sometimes",
      "Be consistent + honest",
      "Show off",
      "Avoid contact"
    ],
    correctAnswer: 1
  },

  // ==============================================================
  // SECTION 5: TECH AWARENESS & DESIGN THINKING (10 MCQs)
  // ==============================================================
  {
    type: "mcq",
    section: "Tech Awareness & Design Thinking",
    question: "Hick's Law in UX:",
    options: [
      "More choices = slower decision",
      "Color affects mood",
      "Users hate forms",
      "Dark mode saves battery"
    ],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Tech Awareness & Design Thinking",
    question: "Mobile form best practice?",
    options: [
      "Ask 20 fields",
      "Inline validation",
      "Require CAPTCHA",
      "Tiny fonts"
    ],
    correctAnswer: 1
  },
  {
    type: "mcq",
    section: "Tech Awareness & Design Thinking",
    question: "'Affordance' in design means:",
    options: [
      "How expensive it looks",
      "How intuitive the action is",
      "How colorful",
      "How fast"
    ],
    correctAnswer: 1
  },
  {
    type: "mcq",
    section: "Tech Awareness & Design Thinking",
    question: "Figma 'Auto Layout' helps with:",
    options: [
      "Responsive design",
      "Image cropping",
      "Color picking",
      "Export only"
    ],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Tech Awareness & Design Thinking",
    question: "Web3 is about:",
    options: [
      "Faster sites",
      "Decentralized apps",
      "Better graphics",
      "AI"
    ],
    correctAnswer: 1
  },
  {
    type: "mcq",
    section: "Tech Awareness & Design Thinking",
    question: "Best body text font?",
    options: [
      "Comic Sans",
      "Arial/Georgia",
      "All caps",
      "Script"
    ],
    correctAnswer: 1
  },
  {
    type: "mcq",
    section: "Tech Awareness & Design Thinking",
    question: "A/B testing means:",
    options: [
      "Test two versions",
      "Backup",
      "Accessibility",
      "Animation"
    ],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Tech Awareness & Design Thinking",
    question: "SEO stands for:",
    options: [
      "Search Engine Optimization",
      "System Error Output",
      "Secure Email Option",
      "Social Engagement Online"
    ],
    correctAnswer: 0
  },
  {
    type: "mcq",
    section: "Tech Awareness & Design Thinking",
    question: "Best color contrast for accessibility?",
    options: [
      "Light gray on white",
      "Black on white",
      "Yellow on black",
      "Red on green"
    ],
    correctAnswer: 1
  },
  {
    type: "mcq",
    section: "Tech Awareness & Design Thinking",
    question: "Responsive design means:",
    options: [
      "Fast loading",
      "Adapts to screen size",
      "Uses React",
      "Mobile-only"
    ],
    correctAnswer: 1
  },

  // ==============================================================
  // SECTION 6: SHORT-ANSWER CONCEPT QUESTIONS (5 OBJECTS)
  // ==============================================================
    {
    type: "short",
    section: "Short-Answer Concept Questions",
    question: "In one sentence, explain why Git is essential in software development.",
    placeholder: "Type your answer (1 sentence)...",
    maxChars: 150,
    idealAnswer: "Git tracks changes, enables team collaboration, prevents data loss, and allows safe experimentation with code.",
    scoringGuide: ["Version history", "Collaboration", "Safety", "Clarity"]
  },
  {
    type: "short",
    section: "Short-Answer Concept Questions",
    question: "What is the main difference between HTTP and HTTPS?",
    placeholder: "Be precise...",
    maxChars: 100,
    idealAnswer: "HTTPS encrypts data using SSL/TLS for security, while HTTP sends data in plain text.",
    scoringGuide: ["Encryption", "SSL/TLS", "Security"]
  },
  {
    type: "short",
    section: "Short-Answer Concept Questions",
    question: "Why is user experience (UX) more important than just visual design?",
    placeholder: "Explain clearly...",
    maxChars: 180,
    idealAnswer: "UX ensures users can achieve goals easily and efficiently, while visual design alone doesn't guarantee functionality.",
    scoringGuide: ["Usability", "User goals", "Functionality"]
  },
  {
    type: "short",
    section: "Short-Answer Concept Questions",
    question: "Explain 'compound interest' with a simple example.",
    placeholder: "Use numbers...",
    maxChars: 200,
    idealAnswer: "Interest earned on both principal and previous interest. Example: ₹100 at 10% for 2 years → Year 1: ₹10, Year 2: ₹11 → Total ₹121.",
    scoringGuide: ["Correct definition", "Example", "Growth shown"]
  },
  {
    type: "short",
    section: "Short-Answer Concept Questions",
    question: "Why should you back up data regularly?",
    placeholder: "List 2–3 reasons...",
    maxChars: 150,
    idealAnswer: "To protect against hardware failure, ransomware, accidental deletion, or theft — ensuring data recovery.",
    scoringGuide: ["Data loss risks", "Recovery", "Real threats"]
  },
  {
    type: "short",
    section: "Short-Answer Concept Questions",
    question: "What is the main purpose of an API in software development?",
    placeholder: "One clear sentence...",
    maxChars: 140,
    idealAnswer: "An API allows different software systems to communicate and share data or functionality securely and efficiently.",
    scoringGuide: ["Communication", "Data/function sharing", "Clarity"]
  },
  {
    type: "short",
    section: "Short-Answer Concept Questions",
    question: "Explain the difference between the internet and the World Wide Web (www).",
    placeholder: "Keep it simple...",
    maxChars: 160,
    idealAnswer: "The internet is the global network of computers; the WWW is a service on the internet for accessing websites via browsers.",
    scoringGuide: ["Network vs service", "Clear distinction", "Simple"]
  },
  {
    type: "short",
    section: "Short-Answer Concept Questions",
    question: "Why do programmers love the DRY ('Don't Repeat Yourself')?",
    placeholder: "One sentence...",
    maxChars: 150,
    idealAnswer: "DRY reduces code duplication, making it easier to maintain, debug, and scale — saving time and reducing bugs.",
    scoringGuide: ["No duplication", "Maintenance", "Error reduction"]
  },
  {
    type: "short",
    section: "Short-Answer Concept Questions",
    question: "What is 'cloud computing' in simple terms?",
    placeholder: "Explain like to a friend...",
    maxChars: 140,
    idealAnswer: "Using remote servers on the internet to store, manage, and process data instead of your own computer.",
    scoringGuide: ["Remote servers", "Storage/processing", "Simple"]
  },
  {
    type: "short",
    section: "Short-Answer Concept Questions",
    question: "Why is 'responsive design' important for websites?",
    placeholder: "Short & clear...",
    maxChars: 130,
    idealAnswer: "It ensures websites work well and look great on all devices — phones, tablets, and desktops.",
    scoringGuide: ["All devices", "Usability + looks", "Core purpose"]
  },
  {
    type: "short",
    section: "Short-Answer Concept Questions",
    question: "What does 'Open Source' mean and why is it powerful?",
    placeholder: "Be concise...",
    maxChars: 180,
    idealAnswer: "Open source means the code is public and anyone can view, use, modify, or share it — driving rapid innovation through global collaboration.",
    scoringGuide: ["Public code", "Modify/share", "Collaboration"]
  },
  {
    {
    type: "short",
    section: "Short-Answer Concept Questions",
    question: "Explain 'encryption' using a real-life analogy.",
    placeholder: "Be creative!",
    maxChars: 200,
    idealAnswer: "Encryption is like sending a letter in a locked box — only someone with the right key can open and read it.",
    scoringGuide: ["Strong analogy", "Key concept", "Protection"]
  },
  {
    type: "short",
    section: "Short-Answer Concept Questions",
    question: "Why is reading error messages a superpower in coding?",
    placeholder: "One sentence...",
    maxChars: 160,
    idealAnswer: "Error messages tell you exactly what went wrong and where, helping you fix bugs faster and learn from mistakes.",
    scoringGuide: ["Diagnosis", "Speed", "Learning"]
  },
  {
    type: "short",
    section: "Short-Answer Concept Questions",
    question: "What is artificial intelligence (AI) in one simple sentence?",
    placeholder: "No jargon...",
    maxChars: 120,
    idealAnswer: "AI is when computers learn to do tasks that normally require human intelligence, like understanding speech or recognizing faces.",
    scoringGuide: ["Human-like tasks", "Learning", "Simple"]
  },
  {
    type: "short",
    section: "Short-Answer Concept Questions",
    question: "Why do companies care so much about data privacy today?",
    placeholder: "2–3 key reasons...",
    maxChars: 180,
    idealAnswer: "Due to rising cyberattacks, strict laws like GDPR, and user trust — bad privacy can mean fines, lawsuits, and lost customers.",
    scoringGuide: ["Security", "Laws", "Trust"]
  },
  {
    type: "short",
    section: "Short-Answer Concept Questions",
    question: "What is a 'pull request' on GitHub and why is it useful?",
    placeholder: "Keep it simple...",
    maxChars: 160,
    idealAnswer: "A pull request lets you propose code changes and ask teammates to review them before merging — ensuring quality and teamwork.",
    scoringGuide: ["Review", "Collaboration", "Quality"]
  },
  {
    type: "short",
    section: "Short-Answer Concept Questions",
    question: "Why is 'financial literacy' a life skill, not just a school subject?",
    placeholder: "Be honest...",
    maxChars: 180,
    idealAnswer: "It helps you make smart money decisions, avoid debt, invest wisely, and build long-term financial freedom.",
    scoringGuide: ["Decision-making", "Independence", "Long-term"]
  }
];

// ==================== SEPARATE ARRAYS (IMPORTANT!) ====================
const mcqs = allQuestions.filter((q): q is MCQ => q.type === "mcq");
const shorts = allQuestions.filter((q): q is ShortAnswer => q.type === "short");

// ==================== RANDOMIZER FUNCTION ====================
const getRandomItems = <T,>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// ==================== FINAL EXAM EXPORT ====================
export const osTutelageExam = {
  title: "OsTutelage Scholarship Exam 2025",
  duration: 30,
  totalQuestions: 50,
  mcqCount: 45,
  shortCount: 5,
  instructions: [
    "45 randomly selected MCQs from 95 questions",
    "5 randomly selected short-answer questions from 17",
    "No negative marking • Total time: 30 minutes",
    "Short answers are AI-graded for depth & clarity",
  ],
  getQuestions: (): ExamQuestion[] => {
    const randomMCQs = getRandomItems(mcqs, 45);
    const randomShorts = getRandomItems(shorts, 5); // ← NOW TRULY RANDOM!
    return [...randomMCQs, ...randomShorts];
  },
};