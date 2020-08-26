import { Module } from "@nestjs/common"
import { ChatEventsGateway } from "./chat.gateway"

@Module({
    providers: [ChatEventsGateway]
})
export class ChatEventsModule {}