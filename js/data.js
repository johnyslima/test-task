export const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "marketing", label: "Marketing", color: "#03CEA4" },
  { id: "management", label: "Management", color: "#5A87FC" },
  { id: "hr", label: "HR & Recruiting", color: "#F89828" },
  { id: "design", label: "Design", color: "#F52F6E" },
  { id: "development", label: "Development", color: "#7772F1" },
];

export const COURSES = [
  {
    id: 1,
    title: "The Ultimate Google Ads Training Course",
    category: "marketing",
    price: 100,
    author: "Jerome Bell",
    image: "images/cards/card-08.jpg",
  },
  {
    id: 2,
    title: "Product Management Fundamentals",
    category: "management",
    price: 480,
    author: "Marvin McKinney",
    image: "images/cards/card-06.jpg",
  },
  {
    id: 3,
    title: "HR Management and Analytics",
    category: "hr",
    price: 200,
    author: "Leslie Alexander Li",
    image: "images/cards/card-03.jpg",
  },
  {
    id: 4,
    title: "Brand Management & PR Communications",
    category: "marketing",
    price: 530,
    author: "Kristin Watson",
    image: "images/cards/card-09.jpg",
  },
  {
    id: 5,
    title: "Graphic Design Basic",
    category: "design",
    price: 500,
    author: "Guy Hawkins",
    image: "images/cards/card-02.jpg",
  },
  {
    id: 6,
    title: "Business Development Management",
    category: "management",
    price: 400,
    author: "Dianne Russell",
    image: "images/cards/card-01.jpg",
  },
  {
    id: 7,
    title: "High-load Software Architecture",
    category: "development",
    price: 600,
    author: "Brooklyn Simmons",
    image: "images/cards/card-04.jpg",
  },
  {
    id: 8,
    title: "Human Resources - Selection and Recruitment",
    category: "hr",
    price: 150,
    author: "Kathryn Murphy",
    image: "images/cards/card-07.jpg",
  },
  {
    id: 9,
    title: "User Experience, Human-centered Design",
    category: "design",
    price: 240,
    author: "Cody Fisher",
    image: "images/cards/card-05.jpg",
  },
  {
    id: 10,
    title: "Digital Marketing Strategy",
    category: "marketing",
    price: 320,
    author: "Dianne Russell",
    image: "images/cards/card-01.jpg",
  },
  {
    id: 11,
    title: "Agile Project Management",
    category: "management",
    price: 350,
    author: "Guy Hawkins",
    image: "images/cards/card-02.jpg",
  },
  {
    id: 12,
    title: "Talent Acquisition Essentials",
    category: "hr",
    price: 180,
    author: "Leslie Alexander Li",
    image: "images/cards/card-03.jpg",
  },
  {
    id: 13,
    title: "Social Media Marketing",
    category: "marketing",
    price: 290,
    author: "Brooklyn Simmons",
    image: "images/cards/card-04.jpg",
  },
  {
    id: 14,
    title: "UI/UX Design Advanced",
    category: "design",
    price: 420,
    author: "Cody Fisher",
    image: "images/cards/card-05.jpg",
  },
  {
    id: 15,
    title: "Leadership and Team Building",
    category: "management",
    price: 450,
    author: "Marvin McKinney",
    image: "images/cards/card-06.jpg",
  },
  {
    id: 16,
    title: "Full-Stack Web Development",
    category: "development",
    price: 550,
    author: "Kathryn Murphy",
    image: "images/cards/card-07.jpg",
  },
  {
    id: 17,
    title: "Employee Engagement Programs",
    category: "hr",
    price: 220,
    author: "Jerome Bell",
    image: "images/cards/card-08.jpg",
  },
  {
    id: 18,
    title: "Mobile App Development",
    category: "development",
    price: 380,
    author: "Kristin Watson",
    image: "images/cards/card-09.jpg",
  },
];

export const coursesByCategory = CATEGORIES.reduce((acc, category) => {
  if (category.id === "all") {
    return acc;
  }

  acc[category.id] = COURSES.filter(
    (course) => course.category === category.id,
  );
  return acc;
}, {});

export function getCategoryLabel(categoryId) {
  const category = CATEGORIES.find((item) => item.id === categoryId);
  return category ? category.label : categoryId;
}
