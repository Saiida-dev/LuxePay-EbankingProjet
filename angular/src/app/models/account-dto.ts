import { CompteType } from "../enums/compte-type";

export interface AccountDTO {
        id: number;
        accountNumber: string;
        type: CompteType;
        solde: number;
        date_creation: string;
        status: boolean;
        id_user: number;

}
