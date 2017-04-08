import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timed-display',
  templateUrl: './timed-display.html',
  styleUrls: ['./timed-display.css']
})
export class TimedDisplayComponent implements OnInit {
  @Input() items = [];

  displayedItems = [];

  @Input() delay: number;

  async sleep(miliseconds) {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(this.delay);
        resolve();
      }, miliseconds);
    });
    return promise;
  }

  async ngOnInit() {
    while (true) {
      this.displayedItems = [];
      for (let index = 0; index < this.items.length; index++) {
        const element = this.items[index];
        this.displayedItems.push(element);
        await this.sleep(this.delay);
      }
    }
  }

}
