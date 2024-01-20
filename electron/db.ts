import { DataSource } from 'typeorm'
import { User } from './entity/User'

const AppDataSource = new DataSource({
    type: "sqlite",
    database: "test.sqlite",
    entities: [User],
    synchronize: true,
    logging: true,
})

const userRepository = AppDataSource.getRepository(User)

async function saveUser() {
    const user = new User()
    user.firstName = 'Timber'
    user.lastName = 'Saw'
    user.age = 25
    await userRepository.save(user)
}

async function getAllUsers() {
    const users = await userRepository.find()
    console.log('All users from the db: ', users)
    return users
}

export { AppDataSource, saveUser, getAllUsers }