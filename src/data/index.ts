import {ScheduleDetails} from '../interfaces';

const matumoto = require('../../assets/images/matumoto.png');
const lucy = require('../../assets/images/lucy.jpeg');

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
