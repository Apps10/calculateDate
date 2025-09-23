import * as z from "zod";
import { APIGatewayEvent, Context } from "aws-lambda";
import { BusinessTime } from "@code/domain/entities/BusinessTime";
import { CalculateDateUseCase } from "@code/application/useCases/calculateDateUseCase";
import { HolidayByCountryService } from "@code/infraestructure/services/holidaysByCountryService";
import { paramsValidator } from "@code/infraestructure/httpDto/express";

const useCase = new CalculateDateUseCase(
  new BusinessTime(new HolidayByCountryService())
);

export async function main(event: APIGatewayEvent, context: Context) {
  try {
    const { error, data } = paramsValidator.safeParse(
      event.queryStringParameters || {}
    );
    console.log('XD')
    if (error) {
      return response({
          error: "InvalidParameters",
          message: z.treeifyError(error),
      }, 400)
    }

    const { date: dateString, days, hours } = data;
    if (!dateString && !days && !hours) {
       return response({
          error: "InvalidParameters",
          message: "you must send at least 1 parameter (date, days, hours)",
      }, 400)
    }

    const date = dateString ? new Date(dateString) : new Date();
    const result = useCase.execute({ date, days, hours });

    return response({ date: result }, 200)

  } catch (error) {
    console.error("tryCatchError", error);

    return response( {
      error: "InternalServerError",
      message: "Internal Server Error",
    }, 500)
  }
}



function response(body: object, statusCode: number) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}