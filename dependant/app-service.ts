import { DataService } from './data-service';
import { LogService } from './log-service';

export class AppService {
    constructor(private dataService: DataService, private logger: LogService) {

    }

    getData() {
        this.logger.info("Getting Hugo Data");
        return this.dataService.getData("hugo");
    }
}
