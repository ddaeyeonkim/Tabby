import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column('text')
  firstName: string = ""

  @Column('text')
  lastName: string = ""

  @Column('int')
  age: number = 0
}
