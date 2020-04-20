import { Injectable, Output, EventEmitter } from '@angular/core'
import { MapsAPILoader } from "@agm/core";
declare var google: any;

@Injectable()
export class PlacePredictionService {
  private autocompleteService;
  private googlePlacesService;
  constructor(private mapsAPILoader: MapsAPILoader) {
    this.mapsAPILoader.load().then(() => {
      this.autocompleteService = new google.maps.places.AutocompleteService();
      this.googlePlacesService = new google.maps.places.PlacesService();
    });
  }
  @Output() google_places: EventEmitter<String> = new EventEmitter();
	getPlacePredictions(value)
	{
    if(value.trim()!="")
    {
      this.autocompleteService.getPlacePredictions({ input: value }, data => {
        if(data!=null)
        {
          for (var i = 0; i < data.length; i++) {
            this.googlePlacesService.getDetails({ reference:  data[i].reference }, details => {
              console.log(details.geometry.location);
            });
          }
        }
        console.log(data)
        this.google_places.emit(data);
      })
    }
	}
}