import { Injectable, Output, EventEmitter } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class CommonService {
	constructor() { }
	@Output() search_on_change: EventEmitter<String> = new EventEmitter();
	set_search(value)
	{
		this.search_on_change.emit(value);
	}

	@Output() toggle_sidebar: EventEmitter<String> = new EventEmitter();
	set_sidebar_toggle()
	{
		this.toggle_sidebar.emit();
	}
}
