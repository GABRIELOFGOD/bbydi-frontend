export interface TeamDataType {
  id: string;
  name: string;
  role: string;
  image?: string;
  category: "admin" | "staff"
}

export const AdminTeamData: TeamDataType[] = [
  {
    id: "1",
    name: "Nurah Jimoh-Sanni",
    role: "Executive Director",
    image: "/images/team/nurah.jpg",
    category: "admin"
  },
  {
    id: "2",
    name: "Halimat Olufade",
    role: "Programmes Director",
    image: "/images/team/halimat.jpg",
    category: "admin"
  },
  {
    id: "3",
    name: "Taibat Hussain",
    role: "Programme Specialist, TFGBV",
    category: "admin"
  },
  {
    id: "4",
    name: "Sanni Alausa-Issa",
    role: "Communications Director",
    image: "/images/team/sanni.jpg",
    category: "admin"
  },
  {
    id: "5",
    name: "Ruth Adeosun",
    role: "Finance Manager",
    image: "/images/team/ruth.jpg",
    category: "admin"
  },
  {
    id: "6",
    name: "Abideen Olasupo",
    role: "Director of Partnerships",
    image: "/images/team/abideen.jpg",
    category: "admin"
  },
];

export const StaffTeamData: TeamDataType[] = [
  {
    id: "1",
    name: "Hanifat Omolara Balogun",
    role: "Programmes Officer, TFGBV",
    image: "/images/team/hanifat.jpg",
    category: "staff"
  },
  {
    id: "2",
    name: "Oyinloye Bukola Christianah",
    role: "Programmes Officer, Women's Economic Empowerment",
    image: "/images/team/bukola.jpg",
    category: "staff"
  },
  {
    id: "3",
    name: "Olatunde Feyisayo",
    role: "Administrative Associate",
    image: "/images/team/feyisayo.jpg",
    category: "staff"
  },
  {
    id: "4",
    name: "Margaret Samuel Udobong",
    role: "Operations Associate",
    image: "/images/team/magret.jpg",
    category: "staff"
  },
  {
    id: "5",
    name: "Fatima Binta Abubakar",
    role: "Communications Associate",
    image: "/images/team/binta.jpg",
    category: "staff"
  },
  {
    id: "6",
    name: "Adebiyi Ireyimika Ipinoluwa",
    role: "Monitoring and Evaluation Associate",
    image: "/images/team/ireyimika.jpg",
    category: "staff"
  },
  {
    id: "7",
    name: "Abifarin Aduragbemi Deborah",
    role: "Programmes Intern",
    image: "/images/team/adura.jpg",
    category: "staff"
  },
  {
    id: "8",
    name: "Oyewole Oluwadamilola Love",
    role: "Operations/Admin Intern",
    image: "/images/team/damilola.jpg",
    category: "staff"
  },
  {
    id: "9",
    name: "Elizabeth Oku",
    role: "Communications Intern",
    image: "/images/team/elizabeth.jpg",
    category: "staff"
  },
  {
    id: "10",
    name: "Ahmed Adebowale",
    role: "Lead, Community Engagement",
    image: "/images/team/ahmad.jpg",
    category: "staff"
  },
  {
    id: "11",
    name: "Olayinka Ogunrinde",
    role: "Finance Officer",
    image: "/images/team/yinka.jpg",
    category: "staff"
  },
  {
    id: "12",
    name: "Abdulqadir Kawu Shuaibu",
    role: "Programmes Associate",
    image: "/images/team/quadri.jpg",
    category: "staff"
  },
  {
    id: "13",
    name: "Memijo Taiwo",
    role: "Finance Officer",
    image: "/images/team/taiwo.jpg",
    category: "staff"
  },
  {
    id: "13",
    name: "Onyeke Emmanuel Edache",
    role: "Research Associate",
    image: "/images/team/emmanuel.jpg",
    category: "staff"
  },
  {
    id: "14",
    name: "Usman Mashood Adekunle",
    role: "Community Engagement Officer",
    image: "/images/team/adekunle.jpg",
    category: "staff"
  },
  {
    id: "15",
    name: "Dr Sikiru Issa Nuhu",
    role: "Lead, Research and Training",
    image: "/images/team/sikiru.jpg",
    category: "staff"
  },
  {
    id: "16",
    name: "Ogunlaja Oluwafemi Temitope",
    role: "Communications Intern",
    image: "/images/team/temitope.jpg",
    category: "staff"
  },
]