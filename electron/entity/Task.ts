import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm'

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  taskId?: number

  @Column({ type: 'varchar', length: 255, default: '' })
  taskName: string = ''

  @Column({ nullable: true, type: 'int' })
  estimatedDurationHours?: number

  @Column({ nullable: true, type: 'int' })
  actualDurationHours?: number

  @Column({ type: 'datetime', nullable: true })
  startTime?: Date

  @Column({ type: 'datetime', nullable: true })
  endTime?: Date

  @Column({ type: 'varchar', length: 255, nullable: true })
  fixVersion?: string

  @Column({ type: 'text', nullable: true })
  description?: string

  @Column({ type: 'boolean', default: false })
  isCompleted: boolean = false

  @OneToMany(() => SubTask, (subTask) => subTask.task)
  subTasks?: SubTask[]

  @OneToMany(() => TimerEvent, (timerEvent) => timerEvent.subTask)
  timerEvents?: TimerEvent[]
}

@Entity()
export class SubTask {
  @PrimaryGeneratedColumn()
  subTaskId?: number

  @Column({ type: 'varchar', length: 255, default: '' })
  subTaskName: string = ''

  @Column({ nullable: true, type: 'int' })
  estimatedDurationHours?: number

  @Column({ nullable: true, type: 'int' })
  actualDurationHours?: number

  @Column({ type: 'datetime', nullable: true })
  startTime?: Date

  @Column({ type: 'datetime', nullable: true })
  endTime?: Date

  @Column({ type: 'varchar', length: 255, nullable: true })
  fixVersion?: string

  @Column({ type: 'text', nullable: true })
  description?: string

  @Column({ type: 'boolean', default: false })
  isCompleted: boolean = false

  @ManyToOne(() => Task, (task) => task.subTasks)
  @JoinColumn({ name: 'taskId' })
  task?: Task

  @OneToMany(() => TimerEvent, (timerEvent) => timerEvent.subTask)
  timerEvents?: TimerEvent[]
}

export enum TimerEventType {
  START = 'START',
  PAUSE = 'PAUSE',
  RESUME = 'RESUME',
  STOP = 'STOP'
}

@Entity()
export class TimerEvent {
  @PrimaryGeneratedColumn()
  eventId?: number

  @ManyToOne(() => Task, (task) => task.subTasks)
  @JoinColumn({ name: 'taskId' })
  task?: Task

  @ManyToOne(() => SubTask, (subTask) => subTask.timerEvents)
  @JoinColumn({ name: 'subTaskId' })
  subTask?: SubTask

  // 이벤트가 생성될 때 START
  @Column({
    type: 'varchar',
    enum: TimerEventType,
    default: TimerEventType.START
  })
  eventType: TimerEventType = TimerEventType.START

  @Column({ type: 'datetime' })
  startTime?: Date

  @Column({ type: 'datetime', nullable: true })
  endTime?: Date
}
