import { Module, HttpModule } from "@nestjs/common";
import { HttpRoController } from "./http.controller";

@Module({
    imports: [ HttpModule ],
    controllers: [HttpRoController]
})
export class HttpRoModule {}
