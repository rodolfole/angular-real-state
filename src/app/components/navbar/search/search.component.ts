import { Component } from '@angular/core';
import { differenceInDays } from 'date-fns';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchModal: () => void = () => { };
  // const params = useSearchParams();
  // const { getByValue } = useCountries();

  locationValue: string = "";
  startDate: string = "";
  endDate: string = ""
  guestCount: number = 0;

  guestLabel: string = "";
  durationLabel: string = "";
  locationLabel: string = "";

  constructor() { }

  getLocationLabel() {
    if (this.locationValue) {
      // return getByValue(locationValue as string)?.label;
      return "";
    }

    return "Anywhere";
  }
  getDurationLabel() {
    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate as string);
      const end = new Date(this.endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return "Any Week";
  }

  getGuestLabel() {
    if (this.guestCount) {
      return `${this.guestCount} Guests`;
    }

    return "Add Guests";
  }

  showToast() {

  }
}
