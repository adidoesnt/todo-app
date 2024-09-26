import { getModelForClass, prop } from '@typegoose/typegoose';

export enum TaskStatus {
    TODO = 'to do',
    IN_PROGRESS = 'in progress',
    DONE = 'done',
    MISSED = 'missed',
}

export class TaskSchema {
    @prop({ required: true, type: String })
    declare userUUID: string;

    @prop({ required: true, type: String })
    declare name: string;

    @prop({ required: true, type: String })
    declare description: string;

    @prop({ required: true, type: Date })
    declare deadline: Date;

    @prop({ required: true, type: String })
    declare status: TaskStatus;
}

export const Task = getModelForClass(TaskSchema);
