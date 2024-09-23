
export interface Meetings {
    description: string;
    jobOfferId: string;
  }
  
  export interface Dates {
    [key: string]: Meetings[];
  }