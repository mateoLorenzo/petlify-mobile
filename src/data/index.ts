import {Location, Pet, ScheduleDetails} from '../interfaces';

const matumoto = require('../../assets/images/matumoto.png');
const lucy = require('../../assets/images/lucy.jpeg');
const anastasia = require('../../assets/images/anastasia.jpeg');

const roccoImage =
  'https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg';

export const schedules: ScheduleDetails[] = [
  {
    serviceType: 'walk',
    walkerName: 'Mateo Lorenzo',
    walkerImage: matumoto,
    petName: 'Paseo con Lucy',
    petImage: lucy,
    date: new Date('2024-05-15'),
    time: '17:00hs',
  },
  {
    serviceType: 'care',
    walkerName: 'Mateo Lorenzo',
    walkerImage: matumoto,
    petName: 'Cuidado con Lucy',
    petImage: lucy,
    date: new Date('2024-05-18'),
    time: '18:00hs',
  },
];

export const pets: Pet[] = [
  {name: 'Lucy', image: lucy},
  {name: 'Anastasia', image: anastasia},
  {name: 'Rocco', image: {uri: roccoImage}},
];

export const locations: Location[] = [
  {title: 'Casa', description: 'Colorados del Monte 142, San Miguel del Monte'},
  {title: 'Dpto de Matu', description: 'Belgrano 2662, Mar del Plata'},
  {title: 'Dpto de Ema', description: 'Calle altura, Ciudad'},
];
