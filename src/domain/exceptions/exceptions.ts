import { CustomException } from "@/shared/exceptions/customException";

export const InternalServerErrorByDomainException = CustomException(
  "Error",
  "InternalServerErrorByDomainException",
  "Internal Server Error",
  500
);
export const ResourceNotFoundException = CustomException(
  "InvalidUrl",
  "ResourceNotFoundException",
  "Not Found",
  404
);
export const BadRequestException = CustomException(
  "InvalidRequest",
  "BadRequestException",
  "Bad Request Exception",
  400
);