import { MissionVisionType, NewTypes, OpportunityTypes, ProgrammingAreasTypes, ProjectCardTypes, PublicationType } from "./types"

export const NavItemsList = [
  {
    label: "Home",
    path: "/"
  },
  {
    label: "About",
    path: "/about"
  },
  {
    label: "Programming Areas",
    path: "/programs"
  },
  {
    label: "projects",
    path: "/projects"
  },
  {
    label: "our expertise",
    path: "/our-expertise"
  },
  {
    label: "media & publications",
    path: "/media"
  },
  {
    label: "opportunities",
    path: "/opportunities"
  }
]

export const ProgrammingAreas: ProgrammingAreasTypes[] = [
  {
    sn: "01",
    title: "Governance & Accountability",
    description: "We open the black box of Nigerian governance. Our work spans open-data advocacy, freedom of information practice, budget literacy and citizen-led monitoring of campaign promises at state level — from the YouthGovTracka platform and its 36 state focal points to community budget workshops and debt and tax justice debates.",
    project: "governance",
    image: "/images/program/governance.jpg"
  },
  {
    sn: "02",
    title: "Education Advocacy",
    description: "Nigeria carries one of the world's largest out-of-school populations. We campaign on out-of-school children and girl-child education, and we build new literacies into classrooms — including climate literacy through the Climate Champs Flashcards Project, which certified 26 teachers in Abuja as Climate Literacy Ambassadors.",
    project: "education",
    image: "/images/program/education.jpg"
  },
  {
    sn: "03",
    title: "Gender Justice & Digital Rights",
    description: "We work on gender-based violence where it actually happens — in communities and on platforms. That means community dialogue with traditional and religious leaders, and survivor-centred digital infrastructure through HerSafeSpace for women and girls facing online abuse, image-based abuse and sextortion.",
    project: "gender",
    image: "/images/program/gender.jpg"
  },
  {
    sn: "04",
    title: "Civic & Electoral Participation",
    description: "Young Nigerians are the largest voting bloc and the least represented. We run voter registration campaigns, civic education, election situation rooms and youth mobilisation — and through Space for Her we move women from the audience to the ballot.",
    project: "civic",
    image: "/images/program/civic.jpg"
  },
  {
    sn: "05",
    title: "Climate & Sustainable Development",
    description: "We localise the Sustainable Development Goals across Nigeria's 774 local government areas, translating global targets into local government plans and community monitoring — and we take climate education into schools and local communities.",
    project: "climate",
    image: "/images/program/climate.jpg"
  },
  {
    sn: "06",
    title: "CivicTech & AI",
    description: "We don't only campaign for better tools — we build them. YouthGovTracka puts gubernatorial promises and budget data in public hands. HerSafeSpace gives survivors of online abuse a secure app and an encrypted vault they control. Alongside the platforms we run AI literacy training for parents, communities and young people with the Patrick J. McGovern Foundation, and we have taken a validated AI curriculum into state partnerships in Kwara and Osun.",
    project: "civictech",
    image: "/images/program/civictech.jpg"
  },
  {
    sn: "07",
    title: "Research & Development",
    description: "Our advocacy runs on evidence we generate ourselves. In 2026 we published Technology, Artificial Intelligence and Civic Engagement in Africa with a companion brief on why AI-supported civic technologies are not yet transforming participation. The same function produces our curricula, validates them with education stakeholders, and carries the monitoring and evaluation that tells us whether a programme actually worked.",
    project: "research",
    image: "/images/program/research.jpg"
  }
]

export const Projects: ProjectCardTypes[] = [
  {
    id: "1",
    category: "gender",
    status: "active",
    title: "Space for Her",
    context: "A six-week political leadership fellowship for women with genuine electoral ambitions. Cohort 1 selected 20 women in Kwara State in 2022; the model covers selection, intensive training, mentorship by serving politicians, and campaign support. Space for Her 2.0 targets the states where the gap is widest.",
    desc: "Rukayat Shittu → Kwara State House of Assembly, Owode-Onire, Asa LGA",
    image: "/images/who-we-are.jpg"
  },
  {
    id: "2",
    category: "digital-rights",
    status: "active",
    title: "HerSafeSpace 2.0",
    context: "A 24-month programme on technology-facilitated gender-based violence in Kano and Osun States: a secure mobile app, a web platform for referrals and case management, and an encrypted vault where survivors keep control of their own evidence. Religious and traditional leaders are engaged as allies.",
    desc: "Target: young women and girls aged 15–35",
    image: "/images/program/climate.jpg"
  },
  {
    id: "3",
    category: "education",
    status: "active",
    title: "AI Literacy for Everyday People",
    context: "Workshops for parents, communities and young people on practical AI use and risk, plus a validated AI curriculum for schools and a state partnership to localise AI education in Osun.",
    desc: "Supported by the Patrick J. McGovern Foundation",
    image: "/images/who-we-are.jpg"
  },
  {
    id: "4",
    category: "governance",
    status: "active",
    title: "YouthGovTracka",
    context: "Launched July 2023, platform live November 2023. A central hub for citizens tracking the campaign promises of state governors, backed by 36 trained Youth Focal Points and the Office of the Citizen toolkit in major Nigerian languages.",
    desc: "Reach: all 36 states",
    image: "/images/program/climate.jpg"
  },
  {
    id: "5",
    category: "climate",
    status: "completed",
    title: "Climate Champs Flashcards",
    context: "Trained 26 teachers across Abuja as Climate Literacy Ambassadors, equipping them with classroom flashcards to drive school-based climate action.",
    desc: "26 ambassadors · FCT schools",
    image: "/images/who-we-are.jpg"
  },
  {
    id: "6",
    category: "governance",
    status: "completed",
    title: "Budget Literacy Workshop",
    context: "Citizens and community advocates trained to read, interrogate and track public budgets — the practical skill that makes accountability advocacy possible.",
    desc: "August 2025 · Kwara State",
    image: "/images/program/climate.jpg"
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
    desc: "To empower young people and local communities to catalyse sustainable development from the grassroots and champion socio-political transformation across Nigeria."
  },
  {
    id: "2",
    track: "Vision",
    title: "Where we are going",
    desc: "A Nigeria where young people and women are not lobbying the decision-makers — they are the decision-makers.",
    cta: {
      text: "Draft wording — confirm"
    }
  },
  {
    id: "3",
    track: "Approach",
    title: "How we work",
    desc: "Non-partisan. Evidence-first. In coalition. We publish our data, name our funders, and measure what we claim."
  }
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
    content: "The Board of Trustees is the highest decision-making body of BBYDI, providing strategic direction and oversight. It is composed of distinguished individuals with expertise in governance, development, and youth engagement.",
  },
  {
    id: "2",
    topic: "Management team",
    content: "The Management Team is responsible for the day-to-day operations of BBYDI, implementing the strategic plans set by the Board of Trustees. It consists of experienced professionals in various fields, including program management, finance, and communications.",
  },
  {
    id: "3",
    topic: "Registration & legal status",
    content: "BBYDI is registered as a non-profit organization under the laws of Nigeria. It operates in compliance with all relevant regulations and maintains transparency and accountability in its operations.",
  },
  {
    id: "4",
    topic: "Where we work",
    content: "BBYDI operates across Nigeria, with a focus on engaging youth and local communities in various states. Our programs are designed to address the unique challenges and opportunities in each region, ensuring that our impact is both meaningful and sustainable.",
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
    path: "/governance"
  },
  {
    id: "3",
    text: "Annual reports",
    path: "/report"
  },
  {
    id: "4",
    text: "Our expertise",
    path: "/expertise"
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
    path: "/media#publications"
  },
  {
    id: "4",
    text: "Newsroom",
    path: "/media#news"
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
    path: "/partner"
  },
  {
    id: "3",
    text: "Volunteer",
    path: "/partner#volunteer"
  },
  {
    id: "4",
    text: "Contact",
    path: "/contact"
  }
];

// ================== FOOTER =============== //