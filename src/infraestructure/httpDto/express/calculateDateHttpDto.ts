import z from "zod"

export const paramsValidator = z.object({
  date: z.iso.datetime().optional(),
  hours: z.coerce.number().min(1, { error: 'the minimun value is 1'}).optional(),
  days: z.coerce.number().min(1, { error: 'the minimun value is 1'}).optional(),
})

export type calculateDateDto = z.infer<typeof paramsValidator>