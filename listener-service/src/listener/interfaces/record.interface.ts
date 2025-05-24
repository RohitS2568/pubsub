export interface Record {
    id: string;
    user: string;
    class: string;
    age: number;
    email: string;
    inserted_at: Date;
  }
  
  export interface ExtendedRecord extends Record {
    modified_at: string;
  }