import {join} from 'path';

export default {
    type: 'mysql',
    host: 'rm-wz9bnr1qt0xvgyd5b9o.mysql.rds.aliyuncs.com',
    port: 3306,
    username: 'roaikim',
    password: '953507353aliyun',
    database: 'roaikim',
    entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')],
    synchronize: true
}