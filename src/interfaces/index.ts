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

export interface Pet {
  name: string;
  years?: number;
  months?: number;
  image: ImageSourcePropType;
  type: 'dog' | 'cat' | null;
  breed?: string;
  size?: 'small' | 'medium' | 'large';
  gender?: 'male' | 'female';
  id?: string;
  walks?: number | null;
  cares?: number | null;
}

// Interface for data needed for libraries and info displayed in register pet screen
export interface PetData {
  name: string;
  type: 'dog' | 'cat' | null;
  gender: 'male' | 'female' | undefined;
  breed: string;
  years: string;
  months: string;
  size: 'small' | 'medium' | 'large' | undefined;
  image: string | ImageSourcePropType;
}
