export interface EcoPoint {
    id?: string;
    title: string;
    cnpj: string;
    opening_hours: string;
    interval: string;
    accepted_materials: string[];
    address: string;
    coordinates: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface EcoPointList {
    id: string;
    title: string;
    cnpj: string;
    opening_hours: string;
    interval: string;
    accepted_materials: string[];
    address: string;
    coordinates: string;
}