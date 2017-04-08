import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = "We're testing Javascript!";

  timedItems = ["One", "Two", "Three", "Four", "Five"];

  delay = 1000;
}
