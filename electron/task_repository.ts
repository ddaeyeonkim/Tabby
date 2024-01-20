import { AppDataSource } from './db'
import { Task, SubTask, TimerEvent } from './entity/Task'

export default class TaskRepository {
  taskRepo
  subTaskRepo
  timerRepo

  constructor(private readonly dataSource: typeof AppDataSource) {
    this.taskRepo = dataSource.getRepository(Task)
    this.subTaskRepo = dataSource.getRepository(SubTask)
    this.timerRepo = dataSource.getRepository(TimerEvent)
  }

  async getAllTasks() {
    return await this.taskRepo.find()
  }

  async saveTask(
    taskName: string,
    estimatedDurationHours?: number,
    fixVersion?: string,
    description?: string
  ) {
    const task = new Task()
    task.taskName = taskName
    task.estimatedDurationHours = estimatedDurationHours
    task.fixVersion = fixVersion
    task.description = description

    return await this.taskRepo.save(task)
  }

  async updateTask(task: Task) {
    return await this.taskRepo.save(task)
  }

  async removeTask(taskId: number) {
    return await this.taskRepo.delete(taskId)
  }

  async saveSubTask(
    subTaskName: string,
    task: Task,
    estimatedDurationHours?: number,
    fixVersion?: string,
    description?: string
  ) {
    const subTask = new SubTask()
    subTask.subTaskName = subTaskName
    subTask.task = task
    subTask.estimatedDurationHours = estimatedDurationHours
    subTask.fixVersion = fixVersion
    subTask.description = description

    return await this.subTaskRepo.save(subTask)
  }

  async saveTimerEvent(startTime: Date, task?: Task, subTask?: SubTask) {
    const timerEvent = new TimerEvent()
    timerEvent.startTime = startTime
    timerEvent.task = task
    timerEvent.subTask = subTask

    return await this.timerRepo.save(timerEvent)
  }
}
