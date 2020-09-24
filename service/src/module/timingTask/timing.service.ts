import { Injectable } from "@nestjs/common";
import { Cron, CronExpression, Interval } from "@nestjs/schedule";

@Injectable()
export class TimingService {
    // @Cron("*/10 * * * * *")
    /* core(): void{
        // 每隔10秒钟
        console.log("tast")
    } */

    // @Cron(CronExpression.EVERY_10_SECONDS, {name: "timingCore2"})
    core2(): void{
        // 内部列举的枚举
        console.log("tast2")
    }

    /* @Interval('notifications', 2500)
    core3(): void{
        // 内部列举的枚举
        console.log("tast3")
    } */
}
