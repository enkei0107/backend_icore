import { Column, ValueTransformer } from 'typeorm';

export const EpochTimestampTransformer: ValueTransformer = {
    from: (entityValue: Date) => {
        if(entityValue){
            return Math.floor(entityValue.getTime() / 1000);
        }
    },
    to: (databaseValue: number) => {
        return new Date(databaseValue * 1000);
    },
};

export function EpochTimestamp() {
    return Column({
        type: 'timestamp',
        transformer: EpochTimestampTransformer,
    });
}
