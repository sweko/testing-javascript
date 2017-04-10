import { HttpService } from './http';

export class DataService {
    constructor(private http: HttpService) {

    }

    getData(type: string){
        return this.http.get(type).data;
    }
}
