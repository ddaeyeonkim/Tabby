import Dexie, { type Table } from 'dexie'
import type { Task, SubTask, TimerEvent } from './entity/Task'

export class MyDatabase extends Dexie {
    tasks!: Table<Task>
    subTasks!: Table<SubTask>
    timerEvents!: Table<TimerEvent>

    constructor() {
        super('myDatabase')
        this.version(1).stores({
            tasks: '++id, fixVersion, createdAt, isCompleted',
            subTasks: '++id, taskId, fixVersion',
            timerEvents: '++id, taskId, subTaskId, fixVersion'
        })
    }
}

export const db = new MyDatabase()