import { Component } from '@angular/core';
import { differenceInDays } from 'date-fns';
import { ModalService } from '../../../services/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { Feature, MapboxService } from 'src/app/services/mapbox.ts.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchModal: () => void = () => { };
  // const params = useSearchParams();
  // const { getByValue } = useCountries();

  $formSubscription?: Subscription;
  locationValue: string = "";
  startDate: string = "";
  endDate: string = ""
  guestCount: number = 0;
  guestLabel: string = "";
  durationLabel: string = "";
  locationLabel: string = "";

  form: FormGroup;
  locations: Feature[] = [];

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private mapboxService: MapboxService
  ) {
    this.form = this.fb.group({
      searchParam: [{ value: "", disabled: false }, Validators.required]
    });
    this.handleFormChanges();
  }

  ngOnDestroy(): void {
    this.$formSubscription?.unsubscribe();
  }

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
    this.modalService.setToast("Info", "Información");
  }

  handleSubmit = () => {
    this.form.disable()
    console.log(this.form.value);
  };

  handleFormChanges() {
    this.$formSubscription =
      this.form.valueChanges.pipe(
        debounceTime(1000),
        distinctUntilChanged()
      ).subscribe(value => {

        // Check that form "searchParam" is null
        if (!value.searchParam) this.locations = [];
        else {
          const getLocationsSubscription = this.mapboxService.searchPlaceByTerm(value.searchParam).subscribe(locations => {
            this.locations = locations;

            getLocationsSubscription.unsubscribe();
          });
        }
      });
  }
}
