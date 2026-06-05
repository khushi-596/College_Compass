const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const collegesData = [
  {
    name: 'IIT Bombay',
    location: 'Mumbai, Maharashtra',
    fees: 200000,
    rating: 4.8,
    placements: 95,
    description: 'One of the premier engineering institutes in India, IIT Bombay is known for its rigorous curriculum and top-notch faculty.',
    courses: [
      { name: 'Computer Science and Engineering', duration: '4 years', fees: 50000 },
      { name: 'Mechanical Engineering', duration: '4 years', fees: 50000 },
      { name: 'Electrical Engineering', duration: '4 years', fees: 50000 },
    ],
  },
  {
    name: 'IIT Delhi',
    location: 'Delhi, Delhi',
    fees: 180000,
    rating: 4.75,
    placements: 94,
    description: 'IIT Delhi is a leading institute offering world-class engineering education with strong industry connections.',
    courses: [
      { name: 'Electronics and Communication', duration: '4 years', fees: 45000 },
      { name: 'Civil Engineering', duration: '4 years', fees: 45000 },
      { name: 'Chemical Engineering', duration: '4 years', fees: 45000 },
    ],
  },
  {
    name: 'NIT Trichy',
    location: 'Tiruchirappalli, Tamil Nadu',
    fees: 120000,
    rating: 4.5,
    placements: 92,
    description: 'NIT Trichy is a prestigious National Institute of Technology with excellent placement records.',
    courses: [
      { name: 'Computer Science', duration: '4 years', fees: 30000 },
      { name: 'Electronics Engineering', duration: '4 years', fees: 30000 },
      { name: 'Production Engineering', duration: '4 years', fees: 30000 },
    ],
  },
  {
    name: 'BITS Pilani',
    location: 'Pilani, Rajasthan',
    fees: 350000,
    rating: 4.7,
    placements: 96,
    description: 'BITS Pilani is a private institution known for quality education and excellent global placements.',
    courses: [
      { name: 'Computer Science', duration: '4 years', fees: 87500 },
      { name: 'Electronics and Instrumentation', duration: '4 years', fees: 87500 },
      { name: 'Mechanical Engineering', duration: '4 years', fees: 87500 },
    ],
  },
  {
    name: 'VIT Vellore',
    location: 'Vellore, Tamil Nadu',
    fees: 250000,
    rating: 4.4,
    placements: 90,
    description: 'VIT is a leading private university with strong emphasis on research and innovation.',
    courses: [
      { name: 'Computer Science Engineering', duration: '4 years', fees: 62500 },
      { name: 'Electrical and Electronics', duration: '4 years', fees: 62500 },
      { name: 'Mechanical Engineering', duration: '4 years', fees: 62500 },
    ],
  },
  {
    name: 'MIT Pune',
    location: 'Pune, Maharashtra',
    fees: 220000,
    rating: 4.3,
    placements: 88,
    description: 'MIT Pune offers quality engineering education with modern infrastructure and skilled faculty.',
    courses: [
      { name: 'Computer Science', duration: '4 years', fees: 55000 },
      { name: 'Information Technology', duration: '4 years', fees: 55000 },
      { name: 'Mechanical Engineering', duration: '4 years', fees: 55000 },
    ],
  },
  {
    name: 'Anna University',
    location: 'Chennai, Tamil Nadu',
    fees: 100000,
    rating: 4.2,
    placements: 85,
    description: 'Anna University is a major institution in south India with strong technical programs.',
    courses: [
      { name: 'Computer Science and Engineering', duration: '4 years', fees: 25000 },
      { name: 'Civil Engineering', duration: '4 years', fees: 25000 },
      { name: 'Electrical Engineering', duration: '4 years', fees: 25000 },
    ],
  },
  {
    name: 'Delhi Technological University',
    location: 'Delhi, Delhi',
    fees: 110000,
    rating: 4.3,
    placements: 87,
    description: 'DTU is a leading engineering institution in New Delhi with excellent academic programs.',
    courses: [
      { name: 'Computer Engineering', duration: '4 years', fees: 27500 },
      { name: 'Electronics and Communication', duration: '4 years', fees: 27500 },
      { name: 'Biotechnology', duration: '4 years', fees: 27500 },
    ],
  },
  {
    name: 'Manipal Institute of Technology',
    location: 'Manipal, Karnataka',
    fees: 280000,
    rating: 4.5,
    placements: 91,
    description: 'MIT Manipal is known for its global exposure and research-focused curriculum.',
    courses: [
      { name: 'Computer and Information Technology', duration: '4 years', fees: 70000 },
      { name: 'Aerospace Engineering', duration: '4 years', fees: 70000 },
      { name: 'Mechanical Engineering', duration: '4 years', fees: 70000 },
    ],
  },
  {
    name: 'Jadavpur University',
    location: 'Kolkata, West Bengal',
    fees: 95000,
    rating: 4.1,
    placements: 83,
    description: 'Jadavpur University is a premier institution in eastern India with strong engineering programs.',
    courses: [
      { name: 'Computer Science and Engineering', duration: '4 years', fees: 23750 },
      { name: 'Electronics and Electrical Communication', duration: '4 years', fees: 23750 },
      { name: 'Mechanical Engineering', duration: '4 years', fees: 23750 },
    ],
  },
  {
    name: 'SRM Institute of Science and Technology',
    location: 'Chennai, Tamil Nadu',
    fees: 240000,
    rating: 4.3,
    placements: 89,
    description: 'SRM IST is a leading private institution with excellent infrastructure and placement opportunities.',
    courses: [
      { name: 'Computer Science and Engineering', duration: '4 years', fees: 60000 },
      { name: 'Information Technology', duration: '4 years', fees: 60000 },
      { name: 'Electronics and Communication', duration: '4 years', fees: 60000 },
    ],
  },
  {
    name: 'Amrita Vishwa Vidyapeetham',
    location: 'Coimbatore, Tamil Nadu',
    fees: 260000,
    rating: 4.4,
    placements: 89,
    description: 'Amrita is a highly ranked institution with strong values and excellent academic rigor.',
    courses: [
      { name: 'Computer Science and Engineering', duration: '4 years', fees: 65000 },
      { name: 'Electronics and Communication', duration: '4 years', fees: 65000 },
      { name: 'Mechanical Engineering', duration: '4 years', fees: 65000 },
    ],
  },
];

async function main() {
  console.log('Start seeding...');
  
  for (const collegeData of collegesData) {
    const { courses, ...collegePart } = collegeData;
    
    const college = await prisma.college.upsert({
      where: { name: collegePart.name },
      update: {},
      create: {
        ...collegePart,
        courses: {
          create: courses,
        },
      },
    });
    
    console.log(`Created college with id: ${college.id}`);
  }
  
  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
