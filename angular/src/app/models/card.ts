import { CarteType } from '../enums/carte-type';

export interface Card {
  id_carte: number;
  numero_carte: string;
  expiration_date: string;
  carte_type: CarteType; // Changed to CarteType enum
  status: boolean;
  id_compte: number;
} 