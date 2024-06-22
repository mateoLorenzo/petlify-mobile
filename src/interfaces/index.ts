import {ImageSourcePropType} from 'react-native';
import {SvgProps} from 'react-native-svg';

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

export interface Location {
  title: string;
  description: string;
}

export interface PaymentMethod {
  name: string;
  image: React.FC<SvgProps>;
  description?: string;
}

export interface PaymentCard {
  cardNumber: string;
  expiry: string;
  cvv: string;
  description: string;
  cardType: string;
  name?: string;
}
