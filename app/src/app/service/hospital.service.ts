import { Injectable } from '@angular/core';
import { Hospital } from '../models/hospital';

@Injectable({
  providedIn: 'root'
})
export class HospitalDataService {

  hospitals: [];
  hospital: Hospital;

  constructor() { }

  setHospitals(data) {
    this.hospitals = data;
  }

  getHospitals() {
    return this.hospitals;
  }

  setHospital(data) {
    this.hospital = data;
  }

  getHospital() {
    return this.hospital;
  }

}