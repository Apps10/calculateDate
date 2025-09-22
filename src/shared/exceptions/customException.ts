export function CustomException (name: string, defaultCategoryError: string, defaultMessageError: string, statusCode: number) {
  return class extends Error {
    messageError: string
    errorName: string
    statusCode: number
    categoryError: string

    constructor(messageError?: string){
      super(name)
      this.errorName = name
      this.messageError = messageError ?? defaultMessageError
      this.statusCode = statusCode
      this.categoryError = defaultCategoryError
    }
  }
}