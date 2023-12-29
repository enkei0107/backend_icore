import { RateLimiterModuleAsyncOptions } from "nestjs-rate-limiter";

export const rateLimiterConfig: RateLimiterModuleAsyncOptions = {
    useFactory: async () => ({
        points: 5,
        duration: 60,
        blockDuration: 60 * 15,
        errorMessage: 'Too many attempts, please try again later.',
      }),
};