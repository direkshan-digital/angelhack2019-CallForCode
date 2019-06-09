import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HospitalDataService } from '../service/hospital.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  hospitalData = [];
  filteredHospital = [];
  isfiltered: boolean;

  constructor(
    private router: Router,
    private hospitalSerivice: HospitalDataService,
  ) {
    fetch('./assets/data/hospital.json').then(res => res.json())
      .then(data => {
        this.hospitalData = data.hospitals;
        this.hospitalSerivice.setHospitals(this.hospitalData);
      });
  }

  searchMaps(event) {
    if (event.target.value.length > 2) {
      const filteredJson = this.hospitalData.filter((row) => {
        if (row.state.indexOf(event.target.value) !== -1) {
          return true;
        } else {
          return false;
        }
      });
      this.isfiltered = true;
      this.filteredHospital = filteredJson;
    }
  }

  getHospitalDetails(hospital) {
    this.hospitalSerivice.setHospital(hospital);
    this.router.navigate(['/hospital-detail']);
  }

  allHospitalMap() {
    this.router.navigate(['/all-hospital']);
  }
}
