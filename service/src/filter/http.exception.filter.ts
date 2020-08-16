import { ExceptionFilter, ArgumentsHost, HttpException } from "@nestjs/common";


export class CustomException implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();

        if (exception instanceof HttpException) {
            const exceptionBody = exception.getResponse()
            if (exceptionBody.hasOwnProperty("code")) {
                const exceptionResponse = typeof exceptionBody === "string" ? {
                    message: exceptionBody,
                    timeISO: new Date().toISOString(),
                    path: request.url,
                } : {
                    ...exceptionBody,
                    timeISO: new Date().toISOString(),
                    path: request.url,
                }
                return response.status(200).json(exceptionResponse)
            }
        }

        return response.status(exception.getStatus()).json(exception.getResponse())
    }
}