export class Product {
    id:number;
    name:string;
    description:string;
    listPrice:number;
    productBrand:string;
    price:string;
    imageUrl: File | null; 
    imageFile:File|null;
    categoryId:number;
    category: {
        id: number;
        name: string;
    }
    constructor(){
        this.id=0;
        this.name="";
        this.description="";
        this.listPrice=0;
        this.productBrand="";
        this.price="";
        this.imageUrl = null;
        this.imageFile=null;
        this.categoryId=0;
        this.category={
            id: 0,
            name: "",

        }
    }
    
}

export interface ProductFilter {
    category: string;
    name: string;
  }
  export interface productData {
    id: number;
    name: string;
    compareOrRemove:string;
    
  }
  