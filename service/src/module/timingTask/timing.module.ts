import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { TimingService } from "./timing.service";
import { TimingController } from "./timing.controller";

@Module({
    imports: [ScheduleModule.forRoot()],
    controllers:[TimingController],
    providers: [TimingService]
})
export class TimingMoule {}