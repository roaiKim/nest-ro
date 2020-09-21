
import * as OSS from 'ali-oss';

const client = new OSS({
    region: 'oss-cn-shenzhen',
    accessKeyId: 'LTAI4GEE7acfe3KfHAthDGYQMAN',
    accessKeySecret: 'irBO6hrgpChaYauRK0HhXAPuu9NXSZon',
    bucket: 'public-upsky'
})

export default client
