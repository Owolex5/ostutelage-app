interface Course {
  name: string;
  duration: string;
  outcome: string;
  fee: string;
}

interface SchoolDetails {
  overview: string;
  careerOutcomes: string[];
  tools: string[];
  learningStyle: string[];
  courses: Course[];
  shortCourses: Course[];
  fees: string;
  whyChoose: string[];
  level: string; // Added level property
}

export interface School {
  id: string;
  title: string;
  description: string;
  image: string;
  details: SchoolDetails;
}

export const schoolsData: School[] = [
  {
    id: "software-engineering-frontend-php-laravel",
    title: "School of Software Engineering",
    description:
      "Master the art of building cutting-edge applications with skills in frontend, PHP/Laravel, web, mobile, cloud, and Web3 technologies. Our curriculum blends theory, hands-on projects, and mentorship to prepare you for high-demand tech roles.",
    image: "/images/schools/osoftware.jpg",
    details: {
      overview:
        "Learn modern programming languages, frontend frameworks, PHP/Laravel, and blockchain technologies while working on real-world projects. Graduates will deploy scalable applications, create engaging user interfaces, collaborate in agile teams, and excel in software, frontend, PHP/Laravel, and Web3 development.",
      careerOutcomes: [
        "Fullstack Engineer",
        "Backend Developer",
        "Frontend Developer",
        "Mobile App Developer",
        "Web3 Developer",
        "Cloud/DevOps Engineer",
        "PHP/Laravel Developer",
      ],
      tools: [
        "JavaScript/TypeScript",
        "React & Next.js",
        "Vue.js & Angular",
        "PHP & Laravel",
        "Solidity & Web3.js",
        "PostgreSQL & MongoDB",
        "Docker & Kubernetes",
        "AWS & Firebase",
      ],
      learningStyle: [
        "Live virtual classes",
        "Hands-on projects",
        "One-on-one mentorship",
        "Capstone project reviewed by industry experts",
      ],
      courses: [
        {
          name: "Fullstack Web Development",
          duration: "10 months",
          outcome:
            "Build scalable apps using React, Node.js, PHP/Laravel, and cloud platforms for web development.",
          fee: "₦650,000",
        },
        {
          name: "Backend Engineering",
          duration: "5 months",
          outcome:
            "Master server-side engineering, database design, and scalability with Node.js, PHP/Laravel, and databases.",
          fee: "₦350,000",
        },
        {
          name: "Frontend Development",
          duration: "6 months",
          outcome:
            "Create responsive and interactive user interfaces with React, Vue.js, and modern frontend tools.",
          fee: "₦400,000",
        },
        {
          name: "Mobile Development",
          duration: "7 months",
          outcome:
            "Create cross-platform mobile apps with Flutter and React Native, integrated with APIs.",
          fee: "₦450,000",
        },
        {
          name: "Web3 Development",
          duration: "6 months",
          outcome:
            "Develop decentralized applications using Solidity, Web3.js, and blockchain technologies.",
          fee: "₦400,000",
        },
        {
          name: "PHP/Laravel Development",
          duration: "5 months",
          outcome:
            "Build robust, scalable web applications using PHP and the Laravel framework.",
          fee: "₦400,000",
        },
      ],
      shortCourses: [
        {
          name: "Intro to JavaScript",
          duration: "6 weeks",
          outcome: "Learn the fundamentals of coding and programming logic with JavaScript.",
          fee: "₦150,000",
        },
        {
          name: "APIs & Databases",
          duration: "6 weeks",
          outcome: "Understand how apps communicate with APIs and manage data efficiently.",
          fee: "₦150,000",
        },
        {
          name: "Intro to Web3",
          duration: "4 weeks",
          outcome: "Get started with blockchain basics and smart contract development.",
          fee: "₦175,000",
        },
        {
          name: "Intro to PHP/Laravel",
          duration: "6 weeks",
          outcome: "Learn the basics of PHP and Laravel for building dynamic web applications.",
          fee: "₦160,000",
        },
        {
          name: "Intro to Frontend Development",
          duration: "6 weeks",
          outcome: "Master HTML, CSS, and JavaScript for building modern web interfaces.",
          fee: "₦160,000",
        },
      ],
      fees: "₦150,000 – ₦700,000 depending on course",
      whyChoose: [
        "Industry-relevant curriculum with frontend, PHP/Laravel, and Web3 focus",
        "Portfolio-based learning with real projects",
        "Global job placement support",
        "Flexible payment options and scholarships",
      ],
      level: "Intermediate", // Added level
    },
  },
  {
    id: "data-science",
    title: "School of Data Science & AI/ML",
    description:
      "Transform raw data into actionable insights with expertise in Data Analytics, Machine Learning, and AI. Prepare for high-impact roles in data-driven industries.",
    image: "/images/schools/data-sc.webp",
    details: {
      overview:
        "Master Python, R, SQL, and machine learning frameworks through real-world datasets. Build intelligent systems and drive business decisions with cutting-edge data science techniques.",
      careerOutcomes: [
        "Data Scientist",
        "Machine Learning Engineer",
        "AI Researcher",
        "Business Intelligence Analyst",
        "Data Engineer",
      ],
      tools: [
        "Python, R",
        "TensorFlow, PyTorch, Scikit-learn",
        "SQL & NoSQL Databases",
        "Pandas & NumPy",
        "Tableau & PowerBI",
        "AWS SageMaker & Google Cloud AI",
      ],
      learningStyle: [
        "Case study-driven approach",
        "Hands-on labs with real-world datasets",
        "Capstone AI/ML project",
        "Guidance from industry data scientists",
      ],
      courses: [
        {
          name: "Data Science with Python",
          duration: "6 months",
          outcome:
            "Master Python, statistics, and visualization for actionable business insights.",
          fee: "₦400,000",
        },
        {
          name: "Machine Learning & AI",
          duration: "6 months",
          outcome:
            "Build intelligent systems with deep learning and neural networks.",
          fee: "₦500,000",
        },
        {
          name: "Business Analytics",
          duration: "5 months",
          outcome:
            "Use data-driven insights to support organizational strategy and decisions.",
          fee: "₦400,000",
        },
      ],
      shortCourses: [
        {
          name: "Advanced Excel for Data",
          duration: "4 weeks",
          outcome: "Leverage Excel for quick data analysis and visualization.",
          fee: "₦80,000",
        },
        {
          name: "SQL for Beginners",
          duration: "5 weeks",
          outcome: "Write effective queries for relational databases.",
          fee: "₦120,000",
        },
      ],
      fees: "₦80,000 – ₦500,000 depending on course",
      whyChoose: [
        "Hands-on practice with real industry datasets",
        "Cutting-edge AI and machine learning curriculum",
        "Career mentorship from data professionals",
        "Globally recognized certifications",
      ],
      level: "Intermediate", // Added level
    },
  },
  {
    id: "cybersecurity",
    title: "School of Cybersecurity",
    description:
      "Protect digital infrastructure with skills in ethical hacking, digital forensics, and secure systems design. Thrive in the fast-growing field of cybersecurity.",
    image: "/images/schools/secs.jpg",
    details: {
      overview:
        "Learn to identify vulnerabilities, defend networks, and respond to cyber incidents. Gain hands-on experience with industry-standard tools and global security practices.",
      careerOutcomes: [
        "Cybersecurity Analyst",
        "Ethical Hacker (Pen Tester)",
        "Security Consultant",
        "Digital Forensics Expert",
        "Network Security Engineer",
      ],
      tools: [
        "Wireshark, Nmap, Burp Suite",
        "Linux Security",
        "Kali Linux",
        "SIEM Tools (Splunk, ELK)",
        "Firewalls & IDS/IPS",
      ],
      learningStyle: [
        "Hands-on labs simulating attacks",
        "Guided ethical hacking sessions",
        "Digital forensic case studies",
        "Capstone project on securing systems",
      ],
      courses: [
        {
          name: "Ethical Hacking",
          duration: "5 months",
          outcome:
            "Master penetration testing and vulnerability assessments for modern apps.",
          fee: "₦450,000",
        },
        {
          name: "Cybersecurity & Networking",
          duration: "6 months",
          outcome:
            "Learn secure networking, firewalls, and cloud security to protect infrastructures.",
          fee: "₦600,000",
        },
        {
          name: "Digital Forensics",
          duration: "4 months",
          outcome:
            "Specialize in evidence collection, malware analysis, and incident response.",
          fee: "₦300,000",
        },
      ],
      shortCourses: [
        {
          name: "Network Security Basics",
          duration: "5 weeks",
          outcome: "Understand securing networks and data flows.",
          fee: "₦120,000",
        },
        {
          name: "Incident Response",
          duration: "6 weeks",
          outcome: "Learn to handle and mitigate cyberattacks effectively.",
          fee: "₦150,000",
        },
      ],
      fees: "₦120,000 – ₦800,000 depending on course",
      whyChoose: [
        "Learn from cybersecurity experts",
        "Practical, hands-on penetration testing labs",
        "Access to real security tools used in industry",
        "Job-ready certifications (CompTIA, CEH, CISSP)",
      ],
      level: "Intermediate", // Added level
    },
  },
  {
    id: "design",
    title: "School of Design",
    description:
      "Become a world-class designer in UI/UX, graphics, and product design. Blend creativity with modern tools to create stunning digital products.",
    image: "/images/schools/designx.webp",
    details: {
      overview:
        "Master design thinking, user research, and prototyping to create delightful user experiences. Build a professional portfolio with industry-standard tools.",
      careerOutcomes: [
        "UI/UX Designer",
        "Product Designer",
        "Graphic Designer",
        "Interaction Designer",
        "Creative Director",
      ],
      tools: [
        "Figma",
        "Adobe Photoshop, Illustrator",
        "Sketch",
        "InVision",
        "Miro & Whimsical",
      ],
      learningStyle: [
        "Project-based learning",
        "Portfolio creation",
        "Peer design reviews",
        "Mentorship from senior designers",
      ],
      courses: [
        {
          name: "UI/UX Design",
          duration: "6 months",
          outcome:
            "Learn wireframing, prototyping, and user research for digital experiences.",
          fee: "₦300,000",
        },
        {
          name: "Product Design",
          duration: "5 months",
          outcome:
            "Design products from ideation to delivery, focusing on usability and business goals.",
          fee: "₦350,000",
        },
        {
          name: "Graphics Design",
          duration: "3 months",
          outcome:
            "Develop visual communication skills with Adobe tools and branding principles.",
          fee: "₦250,000",
        },
      ],
      shortCourses: [
        {
          name: "Figma Essentials",
          duration: "4 weeks",
          outcome: "Design and prototype user interfaces with Figma.",
          fee: "₦120,000",
        },
        {
          name: "Adobe Illustrator Basics",
          duration: "5 weeks",
          outcome: "Learn vector graphics for branding and visuals.",
          fee: "₦120,000",
        },
      ],
      fees: "₦120,000 – ₦400,000 depending on course",
      whyChoose: [
        "Practical, hands-on projects",
        "Portfolio that stands out to employers",
        "Access to professional design tools",
        "Exposure to real-world client briefs",
      ],
      level: "Beginner", // Added level
    },
  },
  {
    id: "digital-skills",
    title: "School of Digital Skills",
    description:
      "Develop in-demand skills like project management, digital marketing, and freelancing for digital careers without coding.",
    image: "/images/schools/digs.jpg",
    details: {
      overview:
        "Gain expertise in leadership, marketing, and freelancing to thrive in today’s digital workplace. Build practical skills through real-world projects and industry mentorship.",
      careerOutcomes: [
        "Project Manager",
        "Digital Marketing Specialist",
        "Freelancer/Consultant",
        "Social Media Manager",
        "Agile Scrum Master",
      ],
      tools: [
        "Trello & Jira",
        "Google Analytics",
        "Meta Ads Manager",
        "SEMrush",
        "Notion & Asana",
      ],
      learningStyle: [
        "Case studies & group projects",
        "Role-play and simulations",
        "Portfolio of campaigns and project plans",
        "Industry-led mentorship",
      ],
      courses: [
        {
          name: "Project Management",
          duration: "6 months",
          outcome:
            "Master agile methodologies and project execution for leading teams.",
          fee: "₦350,000",
        },
        {
          name: "Digital Marketing",
          duration: "3 months",
          outcome:
            "Learn SEO, paid ads, social media, and content marketing strategies.",
          fee: "₦200,000",
        },
        {
          name: "Freelancing Mastery",
          duration: "3 months",
          outcome:
            "Package skills, win clients, and manage freelance projects successfully.",
          fee: "₦250,000",
        },
      ],
      shortCourses: [
        {
          name: "Agile & Scrum Basics",
          duration: "4 weeks",
          outcome: "Get familiar with agile frameworks and sprint planning.",
          fee: "₦175,000",
        },
        {
          name: "Social Media Marketing",
          duration: "5 weeks",
          outcome:
            "Master content creation, analytics, and growth strategies for businesses.",
          fee: "₦120,000",
        },
      ],
      fees: "₦120,000 – ₦500,000 depending on course",
      whyChoose: [
        "Learn from industry practitioners",
        "Career-focused curriculum for the workplace",
        "Practical assignments with real business cases",
        "Globally relevant digital certifications",
      ],
      level: "Beginner", // Added level
    },
  },
];