import path from 'path'
import { DataSource } from 'typeorm'

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'jelani',
    port: 5432,
    password: 'u8S_G5NuCFaqMoCAbGf4NrPJNAtbjHGG',
    username: 'gbbsrzps',
    url: "postgres://gbbsrzps:u8S_G5NuCFaqMoCAbGf4NrPJNAtbjHGG@jelani.db.elephantsql.com/gbbsrzps",
    synchronize: true,
    entities: [path.join(__dirname, '..', 'entities', '*.entity.{ts,js}')]
})