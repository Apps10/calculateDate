import zod from 'zod'
import { config } from 'dotenv'

interface IEnv {
  PORT: number
}

class Env {
  private static envs: IEnv
  private static envSchema = zod.object({
    PORT: zod.string().transform((val) => parseInt(val))
  })

  private constructor(){}

  public static getInstance(): IEnv{
    config()
    if(!Env.envs){
      const result = Env.envSchema.safeParse(process.env)
      if(result?.error){
        console.error(`
          ❌ Invalid environment variables: ${JSON.stringify(result.error.format())}
        `)
        throw new Error('Invalid Environment variables')
      }
      Env.envs = result?.data
    }
    return Env.envs
  }
}

export const {
  PORT
}: IEnv = Env.getInstance()