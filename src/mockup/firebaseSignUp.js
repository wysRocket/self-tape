export const defaultWorkDay = () => {
  const janOffset = new Date(new Date().getFullYear(), 0, 1).getTimezoneOffset * 60000;
  let offset = new Date().getTimezoneOffset() * 60000;
  if (offset !== janOffset) {
    offset += 60 * 60 * 1000;
  }
  return { from: 1548320400000 + offset, to: 1548352800000 + offset };
};

const firebaseSignUp = [
  {
    rating: 0,
    ratingSum: 0,
    configured: false,
    studioName: '',
    image: '',
    setup: [
      '',
      '',
      '',
      '',
    ],
    location: {
      latitude: 0,
      longitude: 0,
    },
    locations: '',
    phone: '',
    address: {
      apartmentNumber: '',
      city: '',
      street: '',
      zip: '',
    },
    totalReviews: 0,
    bio: '',
    agent: '',
    manager: '',
    webSite: '',
    iMdb: '',
    instagram: '',
    membership: {
      dateEnd: '',
      key: false,
      active: true,
      id: '',
      memberNumber: '',
    },
    workWeek: [
      {
        active: false,
        name: 'Sunday',
        workHours: [defaultWorkDay()],
      },
      {
        active: true,
        name: 'Monday',
        workHours: [defaultWorkDay()],
      },
      {
        active: true,
        name: 'Tuesday',
        workHours: [defaultWorkDay()],
      },
      {
        active: true,
        name: 'Wednesday',
        workHours: [defaultWorkDay()],
      },
      {
        active: true,
        name: 'Thursday',
        workHours: [defaultWorkDay()],
      },
      {
        active: true,
        name: 'Friday',
        workHours: [defaultWorkDay()],
      },
      {
        active: false,
        name: 'Saturday',
        workHours: [defaultWorkDay()],
      },
    ],
    prices: [
      {
        uid: '15Min', value: 15, name: ':15 Min', units: '$', maxValue: 150, duration: 15, removable: true, enabled: true, type: 'price',
      },
      {
        uid: '30Min', value: 30, name: ':30 Min', units: '$', maxValue: 150, duration: 30, removable: true, enabled: true, type: 'price',
      },
      {
        uid: '60Min', value: 60, name: ':60 Min', units: '$', maxValue: 150, duration: 60, removable: true, enabled: true, type: 'price',
      },
      {
        uid: 'CancelFee', value: 50, name: 'Cancel Fee', units: '%', maxValue: 80, duration: 0, removable: true, enabled: true, type: 'price',
      },
      {
        uid: 'coaching', value: 100, name: 'Coaching', units: '$', maxValue: 150, duration: 60, removable: false, enabled: true, type: 'service', description: 'This is per hour rate.',
      },
      {
        uid: 'justAReader', value: 100, name: 'Just-A-Reader', units: '$', maxValue: 150, duration: 60, removable: false, enabled: true, type: 'service', description: 'This is per hour rate. Message me and we can coordinate me coming to you.',
      },
    ],
  },
  {
    rating: 0,
    ratingSum: 0,
    configured: false,
    studioName: '',
    image: '',
    setup: [
      '',
      '',
      '',
      '',
    ],
    location: {
      latitude: 0,
      longitude: 0,
    },
    locations: '',
    phone: '',
    address: {
      apartmentNumber: '',
      city: '',
      street: '',
      zip: '',
    },
    totalReviews: 0,
    bio: '',
    agent: '',
    manager: '',
    webSite: '',
    iMdb: '',
    instagram: '',
    membership: {
      dateEnd: '',
      key: false,
      active: true,
      id: '',
      memberNumber: '',
    },
    workWeek: [
      {
        active: false,
        name: 'Sunday',
        workHours: [defaultWorkDay()],
      },
      {
        active: true,
        name: 'Monday',
        workHours: [defaultWorkDay()],
      },
      {
        active: true,
        name: 'Tuesday',
        workHours: [defaultWorkDay()],
      },
      {
        active: true,
        name: 'Wednesday',
        workHours: [defaultWorkDay()],
      },
      {
        active: true,
        name: 'Thursday',
        workHours: [defaultWorkDay()],
      },
      {
        active: true,
        name: 'Friday',
        workHours: [defaultWorkDay()],
      },
      {
        active: false,
        name: 'Saturday',
        workHours: [defaultWorkDay()],
      },
    ],
    prices: [
      {
        uid: '15Min', value: 15, name: ':15 Min', units: '$', maxValue: 150, duration: 15, removable: true, enabled: true, type: 'price',
      },
      {
        uid: '30Min', value: 30, name: ':30 Min', units: '$', maxValue: 150, duration: 30, removable: true, enabled: true, type: 'price',
      },
      {
        uid: '60Min', value: 60, name: ':60 Min', units: '$', maxValue: 150, duration: 60, removable: true, enabled: true, type: 'price',
      },
      {
        uid: 'CancelFee', value: 50, name: 'Cancel Fee', units: '%', maxValue: 80, duration: 0, removable: true, enabled: true, type: 'price',
      },
      {
        uid: 'coaching', value: 100, name: 'Coaching', units: '$', maxValue: 150, duration: 60, removable: false, enabled: true, type: 'service', description: 'This is per hour rate.',
      },
      {
        uid: 'justAReader', value: 100, name: 'Just-A-Reader', units: '$', maxValue: 150, duration: 60, removable: false, enabled: true, type: 'service', description: 'This is per hour rate. Message me and we can coordinate me coming to you.',
      },
    ],
  },
];
export default firebaseSignUp;
