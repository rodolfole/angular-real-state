import { ChangeDetectorRef, Component, HostListener, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { Feature, MapboxService } from 'src/app/services/mapbox.ts.service';
import { OutsideClickDirective } from 'src/app/directives/outside-click.directive';
import { CommonModule } from '@angular/common';
import { SearchMenuComponent } from '../search-menu/search-menu.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  imports: [
    CommonModule,
    OutsideClickDirective,
    SearchMenuComponent,
    ReactiveFormsModule
  ],
  standalone: true
})
export class SearchComponent {

  @ViewChild(OutsideClickDirective) outsideClickDirective?: OutsideClickDirective;

  @Input() placeholder: string = "Search property by location";
  @Input() isExpanded: boolean = false;
  @Output() location?: Feature;

  formSubscription$?: Subscription;
  handleCloseMenuSub$?: Subscription;

  form: FormGroup;
  locations: Feature[] = [];
  preventMenuClose: boolean = false;
  isMenuVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private mapboxService: MapboxService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.form = this.initForm();
    this.handleFormChanges();
    this.handleHideMenu();
  }

  @HostListener('window:scroll', ['$event'])
  getScrollHeight() {
    if (window.scrollY > 0 && this.isMenuVisible && !this.isExpanded)
      this.isMenuVisible = false;
  }

  ngOnInit(): void {
    this.changeDetector.detectChanges();
  }

  showMenu(isVisible?: boolean) {
    if (!!this.form.value.searchParam) this.outsideClickDirective?.showMenu(isVisible);
  }

  preventCloseOnClick() {
    this.outsideClickDirective?.preventCloseOnClick();
  }

  ngOnDestroy(): void {
    this.formSubscription$?.unsubscribe();
    this.handleCloseMenuSub$?.unsubscribe();
  }

  handleHideMenu() {
    this.handleCloseMenuSub$ = this.mapboxService.emitSelectedLocation.subscribe(({ placeName }) => {
      this.form.setValue({ searchParam: placeName });
      this.isMenuVisible = false;
    });
  }

  handleFormChanges() {
    this.formSubscription$ =
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
