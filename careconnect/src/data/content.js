export const content = {
  nav: {
    logo: 'CareConnect',
    logoTag: '+',
    links: [
      { text: 'Home', href: 'home' },
      { text: 'Services', href: 'services' },
      { text: 'Pharmacy', href: 'pharmacy' },
      { text: 'Insurance', href: 'insurance' },
      { text: 'Testimonials', href: 'testimonials' },
      { text: 'Contact', href: 'contact' }
    ],
    cta: { text: 'Book Appointment', href: 'appointment' }
  },

  hero: {
    title: 'Professional Nursing & Home Care at Your Doorstep',
    subtitle: 'Experience compassionate, certified healthcare services tailored to your needs in the comfort of your home.',
    buttons: [
      { text: 'Book Appointment', type: 'primary', href: 'appointment' },
      { text: 'View Services', type: 'outline', href: 'services' }
    ],
    image: 'https://images.unsplash.com/photo-1581056771392-8a90ddb76831?q=80&w=2070&auto=format&fit=crop',
    stats: [
      { number: '500+', label: 'Happy Families' },
      { number: '24/7', label: 'Availability' },
      { number: '100+', label: 'Certified Nurses' },
      { number: '15+', label: 'Years Experience' }
    ]
  },

  features: {
    title: 'Why Choose Us',
    subtitle: 'We provide the highest standard of care with compassion and professionalism',
    items: [
      {
        icon: 'fa-user-md',
        title: 'Certified Nurses',
        description: 'All our nurses are licensed, experienced, and background verified.',
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2070&auto=format&fit=crop'
      },
      {
        icon: 'fa-clock',
        title: '24/7 Support',
        description: 'Round-the-clock assistance whenever you need us.',
        image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=2070&auto=format&fit=crop'
      },
      {
        icon: 'fa-wallet',
        title: 'Affordable Care',
        description: 'Competitive pricing with transparent billing.',
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop'
      },
      {
        icon: 'fa-star',
        title: 'Trusted Professionals',
        description: 'Thousands of happy families trust us.',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop'
      }
    ]
  },

  // New Pharmacy Section
  pharmacy: {
    title: 'Pharmacy Services',
    subtitle: 'Medicines delivered to your doorstep with expert consultation',
    features: [
      {
        icon: 'fa-truck',
        title: 'Fast Delivery',
        description: 'Free delivery within 2 hours in your locality',
        color: '#FF6B6B'
      },
      {
        icon: 'fa-prescription-bottle',
        title: 'Prescription Medicines',
        description: 'All prescription and OTC medicines available',
        color: '#4ECDC4'
      },
      {
        icon: 'fa-pills',
        title: 'Ayurvedic & Wellness',
        description: 'Traditional and modern wellness products',
        color: '#45B7D1'
      },
      {
        icon: 'fa-head-side-medical',
        title: 'Health Consultation',
        description: 'Free pharmacist consultation on call',
        color: '#96CEB4'
      },
      {
        icon: 'fa-calendar-check',
        title: 'Medicine Refill',
        description: 'Schedule automatic refills for regular medicines',
        color: '#FFE194'
      },
      {
        icon: 'fa-shield-alt',
        title: 'Genuine Products',
        description: '100% authentic medicines with quality guarantee',
        color: '#B0A8B9'
      }
    ],
    stats: [
      { number: '10k+', label: 'Medicines Available' },
      { number: '2hr', label: 'Fast Delivery' },
      { number: '24/7', label: 'Pharmacist Support' },
      { number: '500+', label: 'Happy Customers' }
    ]
  },

  // New Insurance Section
  insurance: {
    title: 'Insurance Partners',
    subtitle: 'We accept all major insurance providers for cashless treatment',
    partners: [
      {
        name: 'Star Health Insurance',
        logo: 'https://via.placeholder.com/150x80?text=Star+Health',
        coverage: 'Comprehensive health coverage',
        cashless: true
      },
      {
        name: 'ICICI Lombard',
        logo: 'https://via.placeholder.com/150x80?text=ICICI+Lombard',
        coverage: 'Home care and nursing covered',
        cashless: true
      },
      {
        name: 'HDFC Ergo',
        logo: 'https://via.placeholder.com/150x80?text=HDFC+Ergo',
        coverage: 'Senior citizen plans',
        cashless: true
      },
      {
        name: 'Bajaj Allianz',
        logo: 'https://via.placeholder.com/150x80?text=Bajaj+Allianz',
        coverage: 'Complete family floater',
        cashless: true
      },
      {
        name: 'New India Assurance',
        logo: 'https://via.placeholder.com/150x80?text=New+India',
        coverage: 'Government approved plans',
        cashless: true
      },
      {
        name: 'Care Health Insurance',
        logo: 'https://via.placeholder.com/150x80?text=Care+Health',
        coverage: 'Critical illness cover',
        cashless: true
      }
    ],
    features: [
      'Cashless Treatment',
      'Direct Billing to Insurance',
      'Zero Paperwork',
      'All Major Insurers Accepted',
      'Claim Assistance',
      'Senior Citizen Plans'
    ]
  },

  nursingServices: {
    title: 'Nursing Services',
    subtitle: 'Specialized medical care by skilled registered nurses',
    items: [
      {
        icon: 'fa-stethoscope',
        title: 'Skilled Nursing Care',
        description: 'Clinical care, monitoring & treatments by RNs.',
        image: 'https://images.unsplash.com/photo-1584516150909-c43483ee7932?q=80&w=2070&auto=format&fit=crop',
        features: ['Wound Care', 'Medication Management', 'Health Monitoring'],
        price: 'From $45/hr'
      },
      {
        icon: 'fa-syringe',
        title: 'Post-Surgery Care',
        description: 'Wound management, pain control & recovery support.',
        image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=2070&auto=format&fit=crop',
        features: ['Pain Management', 'Incision Care', 'Recovery Support'],
        price: 'From $50/hr'
      },
      {
        icon: 'fa-user-plus',
        title: 'Elderly Nursing Care',
        description: 'Geriatric assessments & daily medical attention.',
        image: 'https://images.pexels.com/photos/7551622/pexels-photo-7551622.jpeg?auto=compress&cs=tinysrgb&w=600',
        features: ['Geriatric Care', 'Medication Management', 'Fall Prevention'],
        price: 'From $42/hr'
      },
      {
        icon: 'fa-baby',
        title: 'Pediatric Nursing',
        description: 'Gentle care for children with medical needs.',
        image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=600',
        features: ['Pediatric Care', 'Developmental Support', 'Parent Education'],
        price: 'From $48/hr'
      },
      {
        icon: 'fa-heartbeat',
        title: 'Chronic Disease Management',
        description: 'Care for diabetes, BP, cardiac conditions.',
        image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2070&auto=format&fit=crop',
        features: ['Diabetes Care', 'BP Monitoring', 'Cardiac Support'],
        price: 'From $44/hr'
      },
      {
        icon: 'fa-pills',
        title: 'Medication Administration',
        description: 'Accurate medication and IV antibiotics.',
        image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=2070&auto=format&fit=crop',
        features: ['Medication Setup', 'IV Therapy', 'Injections'],
        price: 'From $38/hr'
      },
      {
        icon: 'fa-droplet',
        title: 'IV Therapy',
        description: 'IV fluids, electrolytes at home.',
        image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2070&auto=format&fit=crop',
        features: ['IV Fluids', 'Electrolytes', 'Medication Infusion'],
        price: 'From $55/hr'
      }
    ]
  },

  homeCareServices: {
    title: 'Home Care Services',
    subtitle: 'Compassionate assistance for daily living',
    items: [
      {
        icon: 'fa-hand-sparkles',
        title: 'Personal Hygiene Assistance',
        description: 'Bathing, grooming, oral care with dignity.',
        image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=2070&auto=format&fit=crop',
        features: ['Bathing', 'Grooming', 'Oral Care'],
        price: 'From $25/hr'
      },
      {
        icon: 'fa-wheelchair',
        title: 'Mobility Support',
        description: 'Transfer, walking, fall prevention.',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop',
        features: ['Transfer Help', 'Walking Support', 'Fall Prevention'],
        price: 'From $30/hr'
      },
      {
        icon: 'fa-utensils',
        title: 'Meal Preparation',
        description: 'Nutritious meals according to diet plans.',
        image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=2070&auto=format&fit=crop',
        features: ['Meal Planning', 'Cooking', 'Diet Management'],
        price: 'From $20/hr'
      },
      {
        icon: 'fa-comment-dots',
        title: 'Companionship Care',
        description: 'Friendly conversation, emotional support.',
        image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop',
        features: ['Conversation', 'Activities', 'Emotional Support'],
        price: 'From $22/hr'
      },
      {
        icon: 'fa-hospital-user',
        title: 'Post-Hospitalization Care',
        description: 'Smooth transition from hospital to home.',
        image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2070&auto=format&fit=crop',
        features: ['Recovery Support', 'Medication Reminders', 'Follow-up Care'],
        price: 'From $35/hr'
      },
      {
        icon: 'fa-bone',
        title: 'Physiotherapy Support',
        description: 'Guided exercises & pain relief.',
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop',
        features: ['Exercises', 'Pain Management', 'Mobility Training'],
        price: 'From $40/hr'
      },
      {
        icon: 'fa-moon',
        title: 'Respite Care',
        description: 'Temporary relief for family caregivers.',
        image: 'https://images.unsplash.com/photo-1543269664-56d93c1b41a6?q=80&w=2070&auto=format&fit=crop',
        features: ['Short-term Care', 'Emergency Backup', 'Family Relief'],
        price: 'From $28/hr'
      }
    ]
  },

  testimonials: {
    title: 'What Our Clients Say',
    subtitle: 'Real stories from families who trusted us',
    items: [
      {
        quote: "The nurse assigned to my mother was exceptional - professional, caring, and always on time.",
        author: "Rina D.",
        role: "Daughter of Patient",
        rating: 5,
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop'
      },
      {
        quote: "After my knee replacement, the caregiver helped me regain my confidence and independence.",
        author: "Vikram S.",
        role: "Patient",
        rating: 5,
        image: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=2070&auto=format&fit=crop'
      },
      {
        quote: "The nurse they sent is now like family to us. Exceptional service and compassion.",
        author: "Sunita M.",
        role: "Family Caregiver",
        rating: 5,
        image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=2070&auto=format&fit=crop'
      }
    ]
  },

  cta: {
    title: 'Ready to Get Care?',
    subtitle: 'Speak with a care coordinator today for a free consultation.',
    buttonText: 'Book Free Consultation'
  },

  formOptions: {
    services: [
      'Skilled Nursing',
      'Elderly Care',
      'Personal Hygiene',
      'Mobility Support',
      'Meal Preparation',
      'Companionship',
      'Physiotherapy',
      'Post-Surgery',
      'IV Therapy',
      'Medication Admin',
      'Pharmacy Delivery', // Added pharmacy option
      'Insurance Claim' // Added insurance option
    ],
    serviceTypes: [
      'Nursing Services',
      'Home Care Services',
      'Pharmacy Services',
      'Insurance Assistance',
      'Both Nursing & Home Care'
    ]
  },

  footer: {
    about: '123 Wellness Avenue, Health City, HC 12345',
    phone: '+91 74830 68353',
    phone2: '08213 156014',
    email: 'enquire@cuure.health',
    quickLinks: [
      { text: 'About Us', href: '#' },
      { text: 'Services', href: 'services' },
      { text: 'Pharmacy', href: 'pharmacy' },
      { text: 'Insurance', href: 'insurance' },
      { text: 'Careers', href: '#' },
      { text: 'Blog', href: '#' }
    ],
    legal: [
      { text: 'Privacy Policy', href: '#' },
      { text: 'Terms of Service', href: '#' },
      { text: 'HIPAA Compliance', href: '#' }
    ],
    social: [
      { icon: 'fa-facebook-f', href: '#' },
      { icon: 'fa-instagram', href: '#' },
      { icon: 'fa-linkedin-in', href: '#' },
      { icon: 'fa-twitter', href: '#' }
    ]
  }
};