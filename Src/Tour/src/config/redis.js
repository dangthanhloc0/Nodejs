import redis from 'redis'

const redisClient = redis.createClient();

export const connectRedisClient = async () => {   
    redisClient.on('error',(err)=> {
        console.log('Redis error:', err);   
    })
    await redisClient.connect().then(() => console.log('Connected to Redis successfully'))
}

export {redisClient}