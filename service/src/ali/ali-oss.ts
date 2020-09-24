
import * as OSS from 'ali-oss';

const client = new OSS({
    region: 'oss-cn-shenzhen',
    accessKeyId: 'LTAI4GEE7acfe3KfHAthDGYQ',
    accessKeySecret: 'irBO6hrgpChaYauRK0HhXAPuu9NXSZ',
    bucket: 'public-upsky'
})

export default client
