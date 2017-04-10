import { AppComponent } from './app';
import { AppService } from './app-service';
import { DataService } from './data-service';

class MockAppService {
    getData = jasmine.createSpy("getData");
};

describe("Application tests", () => {
     it("should create component", () => {
         // 1. Arrange
         const service = <AppService><any>new MockAppService();
         // 2. Act
         const app = new AppComponent(service);
         // 3. Assert
         expect(app).toBeDefined();
     });
});

