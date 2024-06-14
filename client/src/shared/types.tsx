export interface Marker {
    id: number;
    name: string;
    discription: string;
    latitude: number;
    longitude: number;
    photo: string | File | null;
    afterphoto: string;
    is_active: boolean;
}