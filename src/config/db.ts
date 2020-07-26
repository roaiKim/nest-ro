import {join} from 'path';

export default {
    type: 'mysql',
    entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')],
    synchronize: true
}