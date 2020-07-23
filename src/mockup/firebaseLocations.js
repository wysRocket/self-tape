const location1 = 'https://firebasestorage.googleapis.com/v0/b/selftape-ef381.appspot.com/o/locations%2Fwest-hollywood.jpg?alt=media&token=3b6b5b70-b761-4a24-a693-6c30cfdeb398';
const location2 = 'https://firebasestorage.googleapis.com/v0/b/selftape-ef381.appspot.com/o/locations%2FEchoPark1.jpg?alt=media&token=33d9b14f-22f2-4057-a6bd-c46ac6044085';
const location3 = 'https://firebasestorage.googleapis.com/v0/b/selftape-ef381.appspot.com/o/locations%2Flankershim.jpg?alt=media&token=b2c8f5dd-f957-4f23-925f-84fa8c169814';
const location4 = 'https://firebasestorage.googleapis.com/v0/b/selftape-ef381.appspot.com/o/locations%2FsantaMonica.jpg?alt=media&token=b1305b8e-af3d-4c81-b3aa-2f46fe6045e4';
const location5 = 'https://firebasestorage.googleapis.com/v0/b/selftape-ef381.appspot.com/o/locations%2FmidCity.jpg?alt=media&token=3269547b-3e86-4a88-8eee-f7ee8a066fe2';
const location6 = 'https://firebasestorage.googleapis.com/v0/b/selftape-ef381.appspot.com/o/locations%2FDtla.jpg?alt=media&token=3db19af1-5d9f-40b5-be77-699638c94cb9';
const location7 = 'https://firebasestorage.googleapis.com/v0/b/selftape-ef381.appspot.com/o/locations%2FKoreaTown.jpg?alt=media&token=8aab5d00-0064-41ba-bdb6-b0c4b66d0373';
const location8 = 'https://firebasestorage.googleapis.com/v0/b/selftape-ef381.appspot.com/o/locations%2FsilverLake.jpg?alt=media&token=e001f164-cf9a-4d0e-a120-996448275790';
const location9 = 'https://firebasestorage.googleapis.com/v0/b/selftape-ef381.appspot.com/o/locations%2FBurbank.jpg?alt=media&token=58b000ab-35d0-4779-a4f1-0f9a71035f9c';
const location10 = 'https://firebasestorage.googleapis.com/v0/b/selftape-ef381.appspot.com/o/locations%2FCulverCity.jpg?alt=media&token=e2bac959-814c-4495-9543-21fdfb13906a';

const firebaseLocations = [
  {
    name: 'WEST HOLLYWOOD',
    img: location1,
    location: {
      latitude: 34.090009,
      longitude: -118.361744,
      bounds: [
        {
          latitude: 34.098071,
          longitude: -118.34338,
        },
        {
          latitude: 34.07639,
          longitude: -118.395844,
        },
      ],
    },
    address: '7859 Romaine St, West Hollywood, CA 90046, USA',
    placeId: '3408885751183609507',
    universalId: 'NULL, WEST HOLLYWOOD, CALIFORNIA, US',
  },
  {
    name: 'ECHO PARK\nLOS ANGELES',
    img: location2,
    location: {
      latitude: 34.078159,
      longitude: -118.260557,
      bounds: [
        {
          latitude: 34.108309,
          longitude: -118.226618,
        },
        {
          latitude: 34.062552,
          longitude: -118.267007,
        },
      ],
    },
    address: '14001 Burbank Blvd, Van Nuys, CA 91401, United States of America',
    placeId: '3407026981182680134',
    universalId: 'ECHO PARK, LOS ANGELES, CALIFORNIA, US',
  },
  {
    name: 'NORTH HOLLYWOOD\nLOS ANGELES',
    img: location3,
    location: {
      latitude: 34.187044,
      longitude: -118.381256,
      bounds: [
        {
          latitude: 34.215604,
          longitude: -118.344511,
        },
        {
          latitude: 34.16824,
          longitude: -118.38751,
        },
      ],
    },
    address: '1925 Waterloo St, Los Angeles, CA 90039, United States of America',
    placeId: '3417222811183789684',
    universalId: 'NORTH HOLLYWOOD, LOS ANGELES, CALIFORNIA, US',
  },
  {
    name: 'SANTA MONICA',
    img: location4,
    location: {
      latitude: 34.019454,
      longitude: -118.491191,
      bounds: [
        {
          latitude: 34.05056,
          longitude: -118.443426,
        },
        {
          latitude: 33.993161,
          longitude: -118.518085,
        },
      ],
    },
    address: '727 Broadway, Santa Monica, CA 90401, USA',
    placeId: '3401811411184902000',
    universalId: 'NULL, DOWNTOWN, SANTA MONICA, CALIFORNIA, US',
  },
  {
    name: 'MID CITY\nLOS ANGELES',
    img: location5,
    location: {
      latitude: 34.04161,
      longitude: -118.328661,
      bounds: [
        {
          latitude: 34.062011,
          longitude: -118.284008,
        },
        {
          latitude: 34.03371,
          longitude: -118.518085,
        },
      ],
    },
    address: '8790 Beverly Blvd, West Hollywood, CA 90048, United States of America',
    placeId: '340290091184827848',
    universalId: 'MID CITY, LOS ANGELES, CALIFORNIA, US',
  },
  {
    name: 'DTLA\nLOS ANGELES',
    img: location6,
    location: {
      latitude: 34.040713,
      longitude: -118.246769,
      bounds: [
        {
          latitude: 34.062611,
          longitude: -118.2259,
        },
        {
          latitude: 34.023813,
          longitude: -118.274007,
        },
      ],
    },
    address: '715 E 8th St #6, Los Angeles, CA 90021, USA',
    placeId: '34038378118248136Є',
    universalId: 'DOWNTOWN LOS ANGELES, LOS ANGELES, CALIFORNIA, US',
  },
  {
    name: 'KOREATOWN\nLOS ANGELES',
    img: location7,
    location: {
      latitude: 34.061639,
      longitude: -118.300374,
      bounds: [
        {
          latitude: 34.069065,
          longitude: -118.291608,
        },
        {
          latitude: 34.052511,
          longitude: -118.30916,
        },
      ],
    },
    address: '3625 W 6th St, Los Angeles, CA 90020, USA',
    placeId: '3406379341183012161',
    universalId: 'WILSHIRE CENTER - KOREATOWN, LOS ANGELES, CALIFORNIA, US',
  },
  {
    name: 'SILVER LAKE\nLOS ANGELES',
    img: location8,
    location: {
      latitude: 34.086941,
      longitude: -118.270204,
      bounds: [
        {
          latitude: 34.112609,
          longitude: -118.250291,
        },
        {
          latitude: 34.073848,
          longitude: -118.284559,
        },
      ],
    },
    address: 'Silver Lake, Los Angeles, CA, USA',
    placeId: '3408294471182733331',
    universalId: 'SILVER LAKE, LOS ANGELES, CALIFORNIA, US',
  },
  {
    name: 'BURBANK',
    img: location9,
    location: {
      latitude: 34.180839,
      longitude: -118.308966,
      bounds: [
        {
          latitude: 34.221654,
          longitude: -118.280109,
        },
        {
          latitude: 34.142367,
          longitude: -118.370313,
        },
      ],
    },
    address: 'Burbank, CA, USA',
    placeId: '34181811118307767',
    universalId: 'NULL, BURBANK, CALIFORNIA, US',
  },
  {
    name: 'DOWNTOWN\nCULVER CITY',
    img: location10,
    location: {
      latitude: 34.02268,
      longitude: -118.396593,
      bounds: [
        {
          latitude: 34.027785,
          longitude: -118.39003,
        },
        {
          latitude: 34.021208,
          longitude: -118.39837,
        },
      ],
    },
    address: '3841 Main St, Culver City, CA 90232, USA',
    placeId: '3402457331183944977',
    universalId: 'DOWNTOWN, CULVER CITY, CALIFORNIA, US',
  },
];
export default firebaseLocations;
