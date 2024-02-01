export class Customer {
    id: number;
    name: string;
    address: string;
    email: string;
    pinCode: number;
    imageUrl: File | null; 
    imageFile:File|null;
    cityId: number;
    city: {
      id: number;
      name: string;
      state: {
        id: number;
        name: string;
        country: {
          id: number;
          name: string;
        };
      };
    };
  
    constructor() {
      this.id = 0;
      this.name = "";
      this.address = "";
      this.email = "";
      this.pinCode = 0;
      this.imageUrl = null;
      this.imageFile=null
      this.cityId = 0;
      this.city = {
        id: 0,
        name: "",
        state: {
          id: 0,
          name: "",
          country: {
            id: 0,
            name: "",
          },
        },
      };
    }
}
