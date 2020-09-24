import { Controller, Get, Query, HttpService } from "@nestjs/common";
import { RoResponse } from "module/user/type";

@Controller("http")
export class HttpRoController {
    constructor(private readonly httpService: HttpService) {}
    
    @Get("get")
    async uploadsss(@Query("name") name: string): Promise<RoResponse<any>> {
        const user = await this.httpService.get("http://www.baidu.com").toPromise().then(reqponse => reqponse.data)
        // console.log("iuserd", user)
        return {code: 0, message: "ok", data: user}
    }
}
