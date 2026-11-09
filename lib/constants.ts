import { MissionVisionType, NewTypes, OpportunityTypes, ProgrammingAreasTypes, ProjectCardTypes, PublicationType } from "./types"

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "");

export const NavItemsList = [
  {
    label: "Home",
    path: "/"
  },
  {
    label: "About Us",
    path: "/about",
    children: [
      { label: "Our Story", path: "/about#story" },
      { label: "Mission & Vision", path: "/about#mission-vision" },
      { label: "Our Team", path: "/about#team" },
      { label: "Governance & Accountability", path: "/about#governance" },
    ],
  },
  {
    label: "Our Work",
    path: "/projects",
    children: [
      { label: "Thematic Areas", path: "/programs" },
      { label: "Programmes & Projects", path: "/projects" },
      { label: "Where We Work", path: "/where-we-work" },
      { label: "Our Impact", path: "/our-impact" },
      { label: "Impact Stories", path: "/impact-stories" },
      { label: "Space for Her", path: "/space-for-her" },
    ],
  },
  {
    label: "Research & Resources",
    path: "/publications",
    children: [
      { label: "Publications", path: "/publications" },
      { label: "Civic Technology Tools", path: "/civic-technology" },
      { label: "Our Expertise", path: "/our-expertise" },
    ],
  },
  {
    label: "News & Insights",
    path: "/news",
    children: [
      { label: "Newsroom", path: "/news" },
      { label: "Blog", path: "/blog" },
    ],
  },
  {
    label: "Opportunities",
    path: "/opportunities"
  }
]

const projectAreaNames: Record<string, string> = {
  civictech: "AI & digital rights",
  "digital-rights": "AI & digital rights",
  gender: "Gender justice",
  governance: "Governance & democracy",
  climate: "Climate & environment",
  education: "Education & youth",
  research: "Research & technology",
  coalition: "Coalition",
};

const projectAreaShortNames: Record<string, string> = {
  "gender justice & women economic empowerment": "Gender justice",
  "good governance, democracy & accountability": "Governance & democracy",
  "ai literacy, digital rights & inclusion": "AI & digital rights",
  "research, innovation and technology": "Research & technology",
  "education and youth development": "Education & youth",
  "climate change & environmental sustainability": "Climate & environment",
};

export const getProjectAreaLabels = (
  category?: string,
  thematicAreas?: string[],
): string[] => {
  if (thematicAreas?.length) {
    return thematicAreas.map((area) => projectAreaShortNames[area.toLowerCase()] ?? area);
  }
  if (!category) return [];
  return [projectAreaNames[category.toLowerCase()] ?? category];
};

export const ProgrammingAreas: ProgrammingAreasTypes[] = [
  {
    sn: "01",
    title: "Gender Justice & Women Economic Empowerment",
    description: "Preventing gender-based violence and technology-facilitated abuse, advancing women’s rights, and building the economic independence that makes those rights usable.",
    project: "gender",
    image: "/images/program/gender.jpg"
  },
  {
    sn: "02",
    title: "Good Governance, Democracy & Accountability",
    description: "Civic engagement, electoral integrity, fiscal accountability and the practical skills citizens need to hold institutions to account.",
    project: "governance",
    image: "/images/program/governance.jpg"
  },
  {
    sn: "03",
    title: "AI Literacy, Digital Rights & Inclusion",
    description: "Responsible AI adoption, digital skills and online safety — built for low bandwidth, local languages and people without a computer science degree.",
    project: "civictech",
    image: "/images/program/civictech.jpg"
  },
  {
    sn: "04",
    title: "Research, Innovation and Technology",
    description: "Original evidence that informs policy, and the civic technology we design and run ourselves rather than campaigning for others to build it.",
    project: "research",
    image: "/images/program/research.jpg"
  },
  {
    sn: "05",
    title: "Education and Youth Development",
    description: "Equitable and inclusive learning, skills and the opportunities that let young people act on them.",
    project: "education",
    image: "/images/program/education.jpg"
  },
  {
    sn: "06",
    title: "Climate Change & Environmental Sustainability",
    description: "Climate awareness and environmental responsibility, taken into classrooms and communities.",
    project: "climate",
    image: "/images/program/climate.jpg"
  }
]

export const Projects: ProjectCardTypes[] = [
  {
    id: "1",
    category: "civictech",
    status: "active",
    title: "SheBuildsAI",
    context: "A fellowship bringing young women into artificial intelligence. Cohort 1 is under way.",
    desc: "Canada Fund for Local Initiatives · Ongoing",
    period: "Ongoing",
    funder: "Canada Fund for Local Initiatives",
    thematicAreas: ["AI Literacy, Digital Rights & Inclusion", "Gender Justice & Women Economic Empowerment"],
    on2026Register: true,
  },
  {
    id: "2",
    category: "gender",
    status: "active",
    title: "HerSafeSpace 2.0 — platform",
    context: "A 24-month programme on technology-facilitated gender-based violence: a secure mobile app, a web platform for referrals and case management, and an encrypted vault where survivors keep control of their own evidence.",
    desc: "24 months · Kano & Osun States",
    period: "24 months",
    location: "Kano & Osun States",
    thematicAreas: ["Gender Justice & Women Economic Empowerment", "AI Literacy, Digital Rights & Inclusion"],
    image: "/images/program/gender.jpg"
  },
  {
    id: "3",
    category: "governance",
    status: "active",
    title: "Strengthening Digital Integrity and Inclusive Participation for Nigeria 2027",
    context: "Strengthening resilient information ecosystems and democratic governance — building capacity to prevent, detect and respond to disinformation, and to promote fact-checking and the responsible use of AI in electoral and public information environments.",
    desc: "April 2026 – March 2027 · EU Support to ECOWAS",
    period: "April 2026 – March 2027",
    funder: "EU Support to ECOWAS in Peace, Security and Governance (Lot 1)",
    thematicAreas: ["Governance & Democracy", "AI Literacy, Digital Rights & Inclusion"],
  },
  {
    id: "4",
    category: "civictech",
    status: "active",
    title: "AI Literacy for Everyday People",
    context: "Workshops for parents, communities and young people on practical AI use and risk, plus a validated AI curriculum for schools and a state partnership to localise AI education in Osun.",
    desc: "Patrick J. McGovern Foundation · Ongoing",
    image: "/images/program/education.jpg"
  },
  {
    id: "5",
    category: "gender",
    status: "active",
    title: "Stand Up Against GBV, Kwara",
    context: "A high-level statewide platform moving the state from pledges to delivery, built on three pillars: accountability, arts-based advocacy and collaboration, with emirs, obas and state actors in the room.",
    desc: "Ford Foundation · Statewide, Kwara",
    image: "/images/hero.jpg"
  },
  {
    id: "6",
    category: "gender",
    status: "active",
    title: "Community Townhalls on GBV",
    context: "Dialogues in Kwara communities — Agbarere, Ganmo, Pakata, Ita Merin, Eyenkorin — bringing women, young people, men, traditional and religious leaders into the same room to confront gender-based violence, online and off.",
    desc: "Urgent Action Fund · Multi-community, Kwara State",
    image: "/images/who-we-are.jpg"
  },
  {
    id: "7",
    category: "gender",
    status: "ongoing",
    title: "Community Townhalls on GBV",
    context: "Dialogues in Kwara communities — Agbarere, Ganmo, Pakata, Ita Merin, Eyenkorin — bringing women, young people, men, traditional and religious leaders into the same room to confront gender-based violence, online and off.",
    desc: "With Urgent Action Fund · Multi-community, Kwara State",
    image: "/images/who-we-are.jpg"
  },
  {
    id: "8",
    category: "gender",
    status: "active",
    title: "Stand Up Against GBV, Kwara",
    context: "A high-level statewide platform moving the state from pledges to delivery — 2025: Commitments. 2026: Community Action. Built on three pillars: accountability, arts-based advocacy and collaboration, with emirs, obas and state actors signing on.",
    desc: "Supported by the Ford Foundation · Statewide, Kwara",
    image: "/images/program/climate.jpg"
  },
  {
    id: "9",
    category: "gender",
    status: "recurring",
    title: "Youth Artivism Festival",
    context: "Voices in Colour — young artists, poets and performers making the case against gender-based violence through work the public actually stops to look at.",
    desc: "Marking OWA@65 · Art for change",
    image: "/images/who-we-are.jpg"
  },
  {
    id: "10",
    category: "gender",
    status: "completed",
    title: "Padded Girls",
    context: "Menstrual health and dignity for schoolgirls, closing the gap that keeps girls out of the classroom for a week every month.",
    desc: "Closed out March 2024",
    image: "/images/program/climate.jpg"
  },
  {
    id: "11",
    category: "coalition",
    status: "ongoing",
    title: "CSO Consultative Platform",
    context: "Convening civil society organisations for joint learning, shared advocacy positions and coordinated engagement with government.",
    desc: "July 2025 onwards",
    image: "/images/who-we-are.jpg"
  },
  {
    id: "12",
    category: "research",
    status: "published",
    title: "Reimagining Civic Engagement",
    context: "Original research on technology, artificial intelligence and civic engagement in Africa, launched to national press in Abuja with a companion brief on why AI-supported civic technologies are not yet transforming participation.",
    desc: "May 2026 · Abuja",
    image: "/images/program/climate.jpg"
  }
];

export const News: NewTypes[] = [
  {
    id: "1",
    date: "2026-05-15T10:00:00Z",
    title: "Kwara moves from commitments to community action on gender-based violence",
    content: "Emirs, obas and state actors gathered for BBYDI's high-level statewide event, taking the 2025 commitments into a 2026 delivery agenda built on accountability, arts-based advocacy and collaboration. Supported by the Ford Foundation.",
    publisher: "BBYDI"
  },
  {
    id: "2",
    date: "2026-04-10T14:30:00Z",
    title: "BBYDI launches research on technology, AI and civic engagement in Africa",
    content: "The report and its companion brief were presented to national press in Abuja, setting out an emerging framework for AI-supported civic participation on the continent.",
    publisher: "BBYDI"
  },
  {
    id: "3",
    date: "2026-03-05T09:15:00Z",
    title: "AI Literacy Workshop for parents, communities and youth held in Kwara",
    content: "Supported by the Patrick J. McGovern Foundation, participants received certificates after training on practical AI use and online risk.",
    publisher: "BBYDI"
  },
  {
    id: "4",
    date: "2026-02-20T11:45:00Z",
    title: "Youth Artivism marks the Ford Foundation at 65",
    content: "Young artists and advocates used creative practice to make the case for civic participation.",
    publisher: "BBYDI"
  },
  {
    id: "5",
    date: "2026-01-15T16:00:00Z",
    title: "Osun govt partners BBYDI to localise AI education for schools",
    content: "The state government signalled readiness to collaborate on AI literacy across its school system.",
    publisher: "BBYDI"
  },
  {
    id: "6",
    date: "2025-12-10T09:30:00Z",
    title: "Teachers trained as Climate Literacy Ambassadors in Abuja",
    content: "Twenty-six teachers completed the Climate Champs Flashcards training and returned to their schools as ambassadors.",
    publisher: "BBYDI"
  },
  {
    id: "7",
    date: "2025-11-05T14:00:00Z",
    title: "Community engagement on gender-based violence reaches Agbarere",
    content: "Community leaders, women's groups and young people met to confront GBV in their own terms and language.",
    publisher: "BBYDI"
  },
  {
    id: "8",
    date: "2025-10-01T10:30:00Z",
    title: "Budget Literacy Workshop equips citizens to question public spending",
    content: "A practical session on reading budget documents and turning them into advocacy.",
    publisher: "BBYDI"
  }
];

export const Publications: PublicationType[] = [
  {
    id: "1",
    title: "Technology, AI and Civic Engagement in Africa",
    desc: "Research report · May 2026 · flagship"
  },
  {
    id: "2",
    title: "Why AI-Supported Civic Technologies Are Not Yet Transforming Participation",
    desc: "Policy brief · May 2026"
  },
  {
    id: "3",
    title: "HerSafeSpace Digital Safety Manual",
    desc: "Manual · online gender-based violence, protection, reporting and recovery"
  },
  {
    id: "4",
    title: "Office of the Citizen Toolkit",
    desc: "Toolkit · available in major Nigerian languages · digital & print"
  },
  {
    id: "5",
    title: "Menu of Commitment",
    desc: "Advocacy resource · local language translations · radio campaign"
  },
  {
    id: "6",
    title: "Climate Champs Flashcards",
    desc: "Classroom resource · teacher edition"
  },
  {
    id: "7",
    title: "AI Literacy Curriculum",
    desc: "Curriculum · validated with education stakeholders"
  },
  {
    id: "8",
    title: "Space for Her Curriculum",
    desc: "Six-week fellowship curriculum · summary edition"
  }
];

export const MissionVisionApproach: MissionVisionType[] = [
  {
    id: "1",
    track: "Mission",
    title: "What we are here to do",
    desc: "To build a more inclusive and accountable society by equipping young people, women and marginalised communities with the knowledge, tools and platforms to drive change."
  },
  {
    id: "2",
    track: "Vision",
    title: "Where we are going",
    desc: "A Nigeria where youth are not only heard but lead; where girls are safe, informed and free; and where communities shape policies, not just react to them.",
    // cta: {
    //   text: "Draft wording — confirm"
    // }
  },
  {
    id: "3",
    track: "Approach",
    title: "How we work",
    desc: "Non-partisan. Evidence-first. In coalition. We publish our data, name our funders, and measure what we claim."
  }
];

export const ImpactStories = [
  {
    category: "Gender justice",
    name: "Mogaji Alalubosa",
    title: "The Mogaji who rewrote the rules",
    story:
      "He came to the statewide GBV event as one of four hundred. He went home and built something: a Community Marriage Agreement compulsory for intending couples, a GBV Reporting Desk, and five inaugurated ambassadors. Six couples have signed. A survivor used the Desk to report harassment and the case reached the police.",
    location: "Alalubosa, Kwara State",
  },
  {
    category: "Governance & democracy",
    name: "Hajia Adenike Lambe",
    title: "The Iyaloja who had never seen a budget",
    story:
      "Kwara’s Iyaloja General had heard market women complain about taxes that seemed to vanish, and had no way to answer them. After the Budget Literacy Workshop she ran her own step-down sessions for market association leaders across the state, in language traders understood.",
    location: "Kwara State",
  },
  {
    category: "Governance & democracy",
    name: "Okolowo road drivers",
    title: "The drivers who got a dangerous road onto the budget",
    story:
      "They had watched accidents happen for years and felt helpless. Budget literacy training taught them that road maintenance has a line item, that named officials are responsible, and that citizens have procedures. Officials inspected the site and the Governor promised to include it in the 2026 budget.",
    location: "Okolowo, Kwara State",
  },
  {
    category: "AI & digital rights",
    name: "Mrs Alli Barakat",
    title: "The teacher who stopped racing the clock",
    story:
      "Outdated textbooks, hours on assessment questions, late nights on lesson plans. After the AI literacy training she generated a poster on natural selection live in class. “AI has become my partner in educational progress. It has freed me to focus on what I love most: actually teaching.”",
    location: "Kwara State",
  },
  {
    category: "Governance & democracy",
    name: "JONAPWD Kwara",
    title: "A seat at the budget table",
    story:
      "Members of the disability rights network felt invisible in government planning. After the budget literacy workshop they wrote formally to the Ministry of Economic Planning requesting inclusion. The Ministry agreed. For the first time, persons with disabilities will take part in the 2026 budget formulation.",
    location: "Kwara State",
  },
  {
    category: "AI & digital rights",
    name: "Mrs Sururoh Adesina",
    title: "From seizing phones to guiding children",
    story:
      "Her approach to her children’s online life had been to take the phone away, without asking what they were doing. A community dialogue changed her mind. “We parents must guide our children, not just seize their phones.”",
    location: "Ifon, Osun State",
  },
];

export const Policies = [
  {
    id: "01",
    title: "Child Safeguarding Policy",
    desc: ""
  },
  {
    id: "02",
    title: "Anti-Fraud & Whistleblowing Policy",
    desc: ""
  },
  {
    id: "03",
    title: "PSEAH Policy",
    desc: ""
  },
  {
    id: "04",
    title: "Data Protection Policy",
    desc: ""
  },
];

export const AccountabilityData = [
  { text: "2025", topic: "Annual Report 2025" },
  { text: "2024", topic: "Annual Report 2024" },
  { text: "2023", topic: "Annual Report 2023" },
  { text: "FIN", topic: "Audited Financials" }
];

export const OurExpertiseData = [
  {
    id: "01",
    title: "Research & evidence generation",
    desc: "Data-driven, evidence-based analysis of government accountability and transparency, from needs assessments to policy briefs."
  },
  {
    id: "02",
    title: "Curriculum design & training",
    desc: "Multi-week curricula delivered to cohorts of women in politics, youth focal points, teachers and community advocates."
  },
  {
    id: "03",
    title: "Civic technology",
    desc: "Public-facing platforms and toolkits — accountability trackers, chatbots, translated citizen toolkits, secure survivor infrastructure."
  },
  {
    id: "04",
    title: "Community mobilisation",
    desc: "Grassroots dialogue with traditional rulers, religious leaders, market associations and community groups across Nigeria."
  },
  {
    id: "05",
    title: "Coalition building & convening",
    desc: "Bringing civil society, media, government and traditional institutions into shared advocacy platforms."
  },
  {
    id: "06",
    title: "Campaigns & public engagement",
    desc: "Radio, local-language translation, grassroots outreach and social campaigns that reach beyond the capital."
  },
];

export const TopOpportunities: OpportunityTypes[] = [
  {
    id: "1",
    title: "Space for Her — next cohort",
    desc: "Six-week political leadership fellowship for women with electoral ambitions. Approximately 20 places.",
    status: "open",
    link: "#",
    location: "Kwara State",
    type: "fellowship"
  },
  {
    id: "2",
    title: "National Essay Competition",
    desc: "Run with the Patrick J. McGovern Foundation and taken through to a national grand finale. Open to Nigerian students and young writers.",
    status: "open",
    image: "/images/opportunity.jpg",
    link: "#",
  },
  {
    id: "3",
    title: "Youth Focal Point Programme",
    desc: "One focal point per state, trained through a six-week curriculum in advocacy, data analysis and civic engagement.",
    status: "closed",
    link: "#",
    location: "All 36 states",
    type: "programme"
  }
];

export const OtherOpportunities: OpportunityTypes[] = [
  {
    id: "4",
    title: "Volunteer with BBYDI",
    status: "open",
    type: "fellowship",
    location: "NationWide",
    link: "#",
    deadline: "To confirm"
  },
  {
    id: "5",
    title: "BBYDI Essay Competition",
    link: "#",
    status: "open",
    location: "Nigeria",
    deadline: "To confirm",
    type: "competition"
  },
  {
    id: "6",
    title: "Digital Safety Advocates (HerSafeSpace 2.0)",
    type: "training",
    location: "Kano & Osun States",
    link: "#",
    status: "open",
    deadline: "To confirm"
  },
  {
    id: "7",
    title: "Programme Officer — Governance",
    type: "vacancy",
    location: "Ilorin, Kwara State",
    link: "#",
    status: "open",
    deadline: "To confirm"
  },
  {
    id: "8",
    title: "Volunteer / Campus Ambassador",
    type: "volunteering",
    location: "Nationwide",
    deadline: "rolling",
    status: "open",
    link: "#"
  },
  {
    id: "9",
    title: "Youth Focal Point Programme",
    type: "fellowship",
    location: "36 states",
    link: "#",
    deadline: "Closed",
    status: "closed"
  }
];

export const Governed = [
  {
    id: "1",
    topic: "Board of Trustees",
    content: "Seven trustees hold legal responsibility for the organisation. They are listed with the rest of our people below. Biographies and declared interests to follow.",
  },
  {
    id: "2",
    topic: "Management team",
    content: "BBYDI is led by Executive Director Nurah Jimoh-Sanni, with directors for programmes, partnerships, communications and finance, and leads for community engagement and research. Full roster below.",
  },
  {
    id: "3",
    topic: "Registration & legal status",
    content: "CAC registration number and tax status. Content to supply.",
  },
  {
    id: "4",
    topic: "Where we work",
    content: "Head office in Ilorin, Kwara State, with an Abuja office and programme presence across all 36 states. Confirm office addresses.",
  }
];

// ================== FOOTER =============== //

export const Socials = [
  {
    id: "1",
    icon: "X",
    link: "#"
  },
  {
    id: "2",
    icon: "f",
    link: "#"
  },
  {
    id: "3",
    icon: "in",
    link: "#"
  },
  {
    id: "4",
    icon: "IG",
    link: "#"
  },
  {
    id: "5",
    icon: "▶",
    link: "#"
  }
];

export const Organisation = [
  {
    id: "1",
    text: "About BBYDI",
    path: "/about"
  },
  {
    id: "2",
    text: "Governance",
    path: "/about#governance"
  },
  {
    id: "3",
    text: "Annual reports",
    path: "/publications"
  },
  {
    id: "4",
    text: "Our expertise",
    path: "/our-expertise"
  }
];

export const Work = [
  {
    id: "1",
    text: "Programming areas",
    path: "/programs"
  },
  {
    id: "2",
    text: "Current projects",
    path: "/projects"
  },
  {
    id: "3",
    text: "Publications",
    path: "/publications"
  },
  {
    id: "4",
    text: "Newsroom",
    path: "/news"
  },
  {
    id: "5",
    text: "Blog",
    path: "/blog"
  }
];

export const GetInvolved = [
  {
    id: "1",
    text: "Opportunities",
    path: "/opportunities"
  },
  {
    id: "2",
    text: "Partner with us",
    path: "/partner-with-us"
  },
  {
    id: "3",
    text: "Volunteer",
    path: "/partner-with-us"
  },
  {
    id: "4",
    text: "Contact",
    path: "/partner-with-us"
  }
];

// ================== FOOTER =============== //