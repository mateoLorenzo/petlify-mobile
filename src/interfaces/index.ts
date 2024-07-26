import {JwtPayload} from 'jwt-decode';
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
  size: 'small' | 'medium' | 'large' | 'extra_large' | undefined;
  gender: 'male' | 'female' | undefined;
  id?: string;
  owner_id?: string;
  walks?: number | null;
  cares?: number | null;
}

// Interface for data needed for libraries and info displayed in register pet screen
export interface PetData {
  name: string;
  type: 'perro' | 'gato' | undefined;
  gender: 'male' | 'female' | undefined;
  breed: string;
  years: string;
  months: string;
  size: 'small' | 'medium' | 'large' | 'extra_large' | undefined;
  image: string | ImageSourcePropType | undefined;
}

export interface UserInfo {
  name: string;
  lastName: string;
  email: string;
  phone?: string;
  id: string;
  provider: string;
  picture?: string;
}

interface UserMetadata {
  email: string;
  email_verified: boolean;
  last_name: string;
  name: string;
  phone_verified: boolean;
  sub: string;
}

interface AppMetadata {
  provider: string;
  providers: string[];
}

export interface CustomJwtPayload extends JwtPayload {
  aal: string;
  amr: {method: string; timestamp: number}[];
  app_metadata: AppMetadata;
  aud: string;
  email: string;
  exp: number;
  iat: number;
  is_anonymous: boolean;
  iss: string;
  phone: string;
  role: string;
  session_id: string;
  sub: string;
  user_metadata: UserMetadata;
}
