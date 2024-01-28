export interface Task {
  id?: number
  taskName: string
  estimatedDurationHours?: number
  actualDurationHours?: number
  startTime?: Date
  endTime?: Date
  fixVersion?: string
  description?: string
  createdAt: Date
  isCompleted: boolean
}

export interface SubTask {
  id?: number
  taskId?: number
  subTaskName: string
  estimatedDurationHours?: number
  actualDurationHours?: number
  startTime?: Date
  endTime?: Date
  fixVersion?: string
  description?: string
  isCompleted: boolean
}

export enum TimerEventType {
  START = 'START',
  PAUSE = 'PAUSE',
  RESUME = 'RESUME',
  STOP = 'STOP'
}

export interface TimerEvent {
  id?: number
  taskId?: number
  subTaskId?: number
  // 이벤트가 생성될 때 START
  eventType: TimerEventType
  startTime?: Date
  endTime?: Date
}
