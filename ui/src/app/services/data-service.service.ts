import { BehaviorSubject, Observable, tap } from 'rxjs';
import { JobOffer } from './../models/job-offer';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private mongoUrl = "http://localhost:8800/api/jobOffer"

  private jobOffersSubject = new BehaviorSubject<JobOffer[]>([]);
  jobOffers$ = this.jobOffersSubject.asObservable();

  constructor(private _httpClient: HttpClient) { }

  getJobOfferList(): Observable<JobOffer[]> {
    const url = `${this.mongoUrl}/job-offers`;
    return this._httpClient.get<JobOffer[]>(url, { withCredentials: true }).pipe(
      tap((jobOffers) => this.jobOffersSubject.next(jobOffers))
    );
  }

  fetchJobOffers() {
    this.getJobOfferList().subscribe();
  }

  createJobOffer(jobOffer: JobOffer): Observable<JobOffer> {
    return this._httpClient.post<JobOffer>(this.mongoUrl, jobOffer, { withCredentials: true }).pipe(
      tap(() => this.fetchJobOffers())
    );
  }  

  getJobOfferById(id: string): Observable<JobOffer> {
    const url = `${this.mongoUrl}/${id}`;
    return this._httpClient.get<JobOffer>(url, { withCredentials: true });
  }
  updateJobOfferList(jobOffer: JobOffer, id: string): Observable<JobOffer> {
    const url = `${this.mongoUrl}/${id}`;
    return this._httpClient.put<JobOffer>(url, jobOffer, { withCredentials: true }).pipe(
      tap(() => this.fetchJobOffers())
    );
  }

  deleteJobOffer(id: string): Observable<void> {
    const url = `${this.mongoUrl}/${id}`;
    return this._httpClient.delete<void>(url,{ withCredentials: true }).pipe(
      tap(() => this.fetchJobOffers())
    );
  }


}
