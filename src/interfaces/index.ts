import {ImageSourcePropType} from 'react-native';

export interface ScheduleDetails {
  serviceType: 'walk' | 'care';
  walkerName: string;
  walkerImage: ImageSourcePropType;
  petName: string;
  petImage: ImageSourcePropType;
  date: Date;
  time: string;
}

export interface Pet {
  name: string;
  age?: number;
  image: ImageSourcePropType;
}
