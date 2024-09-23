export interface JobOffer {
    _id:string;
    status:string;
    position:string;
    location:string;
    companyName:string;
    mode:string;
    jobDescription:string;
    contactInfo:string;
    salary:0;
    dates: { [date: string]: string[] };
    url:string;
    customNotes:string;
}
