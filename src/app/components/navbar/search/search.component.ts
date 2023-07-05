import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { Feature, MapboxService } from 'src/app/services/mapbox.ts.service';
import { OutsideClickDirective } from 'src/app/directives/outside-click.directive';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  @ViewChild(OutsideClickDirective) outsideClickDirective?: OutsideClickDirective;

  $formSubscription?: Subscription;

  form: FormGroup;
  locations: Feature[] = [];
  preventMenuClose: boolean = false;
  isMenuVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private mapboxService: MapboxService
  ) {
    this.form = this.initForm();
    this.handleFormChanges();
  }

  @HostListener('window:scroll', ['$event'])
  getScrollHeight() {
    if (window.scrollY > 0 && this.isMenuVisible)
      this.isMenuVisible = false;
  }

  showMenu(isVisible?: boolean) {
    this.outsideClickDirective?.showMenu(isVisible);
  }

  preventCloseOnClick() {
    this.outsideClickDirective?.preventCloseOnClick();
  }

  ngOnDestroy(): void {
    this.$formSubscription?.unsubscribe();
  }

  handleFormChanges() {
    this.$formSubscription =
      this.form.valueChanges.pipe(
        debounceTime(1000),
        distinctUntilChanged()
      ).subscribe(value => {

        // Check that form "searchParam" is null
        if (!value.searchParam) {
          this.locations = [];
          this.isMenuVisible = false;
        }
        else {
          const getLocationsSubscription = this.mapboxService.searchPlaceByTerm(value.searchParam).subscribe(locations => {
            this.isMenuVisible = true;
            this.locations = locations;

            getLocationsSubscription.unsubscribe();
          });
        }
      });
  }

  initForm(): FormGroup {
    return this.fb.group({
      searchParam: [{ value: "", disabled: false }, Validators.required]
    });
  }
}
