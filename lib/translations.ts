// Translation strings for all supported languages
export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      compare: 'Compare',
      search: 'Search',
    },
    // Search & Filters
    search: {
      title: 'Find Your Dream College',
      placeholder: 'Search by college name...',
      location: 'Location',
      fees: 'Annual Fees (₹)',
      rating: 'Minimum Rating',
      minFees: 'Min Fees',
      maxFees: 'Max Fees',
      search: 'Search',
      reset: 'Reset Filters',
      noResults: 'No colleges found. Try adjusting your filters.',
    },
    // College Card
    college: {
      rating: 'Rating',
      fees: 'Annual Fees',
      placements: 'Placement Rate',
      viewDetails: 'View Details',
      compare: 'Compare',
      courses: 'Courses',
    },
    // College Details
    details: {
      overview: 'Overview',
      courses: 'Courses',
      courseName: 'Course Name',
      duration: 'Duration',
      courseFees: 'Annual Fees',
      back: 'Back to Colleges',
      compareBtn: 'Compare with Others',
      about: 'About',
    },
    // Comparison
    compare: {
      title: 'Compare Colleges',
      selectColleges: 'Select colleges to compare',
      compareBtn: 'Compare Selected',
      emptyState: 'Select 2-3 colleges to compare',
      selectAtLeast: 'Please select at least 2 colleges',
      selectMax: 'You can select maximum 3 colleges',
    },
    // Pagination
    pagination: {
      previous: 'Previous',
      next: 'Next',
      of: 'of',
    },
    // General
    general: {
      loading: 'Loading...',
      error: 'Error occurred',
      success: 'Success',
      notFound: 'Not Found',
    },
  },
  hi: {
    // Navigation
    nav: {
      home: 'होम',
      compare: 'तुलना करें',
      search: 'खोज करें',
    },
    // Search & Filters
    search: {
      title: 'अपने सपनों का कॉलेज खोजें',
      placeholder: 'कॉलेज का नाम से खोजें...',
      location: 'स्थान',
      fees: 'वार्षिक शुल्क (₹)',
      rating: 'न्यूनतम रेटिंग',
      minFees: 'न्यूनतम शुल्क',
      maxFees: 'अधिकतम शुल्क',
      search: 'खोज करें',
      reset: 'फिल्टर रीसेट करें',
      noResults: 'कोई कॉलेज नहीं मिला। अपने फिल्टर को समायोजित करने का प्रयास करें।',
    },
    // College Card
    college: {
      rating: 'रेटिंग',
      fees: 'वार्षिक शुल्क',
      placements: 'प्लेसमेंट दर',
      viewDetails: 'विवरण देखें',
      compare: 'तुलना करें',
      courses: 'पाठ्यक्रम',
    },
    // College Details
    details: {
      overview: 'परिचय',
      courses: 'पाठ्यक्रम',
      courseName: 'पाठ्यक्रम का नाम',
      duration: 'अवधि',
      courseFees: 'वार्षिक शुल्क',
      back: 'कॉलेज पर वापस जाएं',
      compareBtn: 'दूसरों के साथ तुलना करें',
      about: 'बारे में',
    },
    // Comparison
    compare: {
      title: 'कॉलेज की तुलना करें',
      selectColleges: 'तुलना के लिए कॉलेज चुनें',
      compareBtn: 'चयनित की तुलना करें',
      emptyState: 'तुलना के लिए 2-3 कॉलेज चुनें',
      selectAtLeast: 'कृपया कम से कम 2 कॉलेज चुनें',
      selectMax: 'आप अधिकतम 3 कॉलेज चुन सकते हैं',
    },
    // Pagination
    pagination: {
      previous: 'पिछला',
      next: 'अगला',
      of: 'का',
    },
    // General
    general: {
      loading: 'लोड हो रहा है...',
      error: 'त्रुटि हुई',
      success: 'सफलता',
      notFound: 'नहीं मिला',
    },
  },
  es: {
    // Navigation
    nav: {
      home: 'Inicio',
      compare: 'Comparar',
      search: 'Buscar',
    },
    // Search & Filters
    search: {
      title: 'Encuentra tu colegio ideal',
      placeholder: 'Buscar por nombre de colegio...',
      location: 'Ubicación',
      fees: 'Cuotas Anuales (₹)',
      rating: 'Calificación Mínima',
      minFees: 'Cuotas Mínimas',
      maxFees: 'Cuotas Máximas',
      search: 'Buscar',
      reset: 'Restablecer Filtros',
      noResults: 'No se encontraron colegios. Intenta ajustar tus filtros.',
    },
    // College Card
    college: {
      rating: 'Calificación',
      fees: 'Cuotas Anuales',
      placements: 'Tasa de Colocación',
      viewDetails: 'Ver Detalles',
      compare: 'Comparar',
      courses: 'Cursos',
    },
    // College Details
    details: {
      overview: 'Descripción',
      courses: 'Cursos',
      courseName: 'Nombre del Curso',
      duration: 'Duración',
      courseFees: 'Cuotas Anuales',
      back: 'Volver a Colegios',
      compareBtn: 'Comparar con Otros',
      about: 'Acerca de',
    },
    // Comparison
    compare: {
      title: 'Comparar Colegios',
      selectColleges: 'Selecciona colegios para comparar',
      compareBtn: 'Comparar Seleccionados',
      emptyState: 'Selecciona 2-3 colegios para comparar',
      selectAtLeast: 'Por favor selecciona al menos 2 colegios',
      selectMax: 'Puedes seleccionar un máximo de 3 colegios',
    },
    // Pagination
    pagination: {
      previous: 'Anterior',
      next: 'Siguiente',
      of: 'de',
    },
    // General
    general: {
      loading: 'Cargando...',
      error: 'Error ocurrido',
      success: 'Éxito',
      notFound: 'No Encontrado',
    },
  },
} as const;

export type LanguageKey = keyof typeof translations;
export type TranslationKey = string;

export function getTranslation(lang: LanguageKey, key: string): string {
  const keys = key.split('.');
  let value: any = translations[lang];

  for (const k of keys) {
    value = value?.[k];
    if (!value) return key;
  }

  return value || key;
}
