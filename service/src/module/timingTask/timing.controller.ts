import { Controller, Post } from "@nestjs/common";
import { SchedulerRegistry } from "@nestjs/schedule";
import { CronJob } from "cron";

@Controller("timing")
export class TimingController {
    constructor(private schedulerRegistry: SchedulerRegistry){}

    @Post('stop')
    stopTiming (): Date {
        //
        const job = this.schedulerRegistry.getCronJob("timingCore2")
        job.stop();
        console.log(job.lastDate());
        return job.lastDate()
    }

    @Post('create')
    createTiming (): void {
        //
        const job = new CronJob("*/10 * * * * *", () => {
            console.log("uio");
        })
        this.schedulerRegistry.addCronJob("createTiming", job)
        job.start();
    }
}
