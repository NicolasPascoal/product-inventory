export interface Link {
    id:number;
    product:{
        id:number;
        name:string;
    };
    rawMaterial:{
        id:number;
        name:string;
    };
    quantityRequired:number;
}