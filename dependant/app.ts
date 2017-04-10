import { AppService } from './app-service';

export class AppComponent {
    constructor(private service: AppService) {

    }

    items: string[];

    loadData() {
        this.items = this.service.getData();
    }

}