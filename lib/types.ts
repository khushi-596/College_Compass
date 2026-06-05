export interface College {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  placements: number;
  description: string;
}

export interface Course {
  id: string;
  name: string;
  duration: string;
  fees: number;
  collegeId: string;
}

export interface CollegeDetail extends College {
  courses: Course[];
}
