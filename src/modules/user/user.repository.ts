import { Postgres } from "../../lib/postgresDriver";
import { IUserQueryDto } from "./dto/query.dto";
import { UserEntity } from "./entity/user.entity";
import { IUserRepository } from "./interfaces/user.repository";

export class UserRepository extends Postgres implements IUserRepository {
  async update(id: number, entity: UserEntity): Promise<UserEntity> {
    return await this.fetch<UserEntity>(
      "update users set login = $2, password = $3, balance = $4 where id = $1 returning *",
      id,
      entity.login,
      entity.password,
      entity.balance
    );
  }

  async getByLogin(login: string): Promise<UserEntity | undefined> {
    return await this.fetch<UserEntity | undefined>(
      "select * from users where login = $1",
      login
    );
  }

  async getAll(query: IUserQueryDto): Promise<UserEntity[]> {
    const searchQuery = query.login ? `%${query.login}%` : "%%";

    return await this.fetchAll<UserEntity>(
      `select * from users where login ILIKE $1`,
      searchQuery
    );
  }

  async insert(entity: UserEntity): Promise<UserEntity> {
    return await this.fetch<UserEntity>(
      "insert into users(login, password, balance) values ($1, $2, $3) returning *",
      entity.login,
      entity.password,
      entity.balance
    );
  }

  async getOneById(id: number) {
    return await this.fetch<UserEntity>(
      `select * from users where id = $1`,
      id
    );
  }
}
