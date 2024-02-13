import { IUserQueryDto } from "../dto/query.dto";
import { UserEntity } from "../entity/user.entity";

export interface IUserRepository {
  getOneById(id: number): Promise<UserEntity | undefined>;
  getAll(query: IUserQueryDto): Promise<UserEntity[]>;
  insert(entity: UserEntity): Promise<UserEntity>;
  getByLogin(login: string): Promise<UserEntity | undefined>;
  update(id: number, entity: UserEntity): Promise<UserEntity>;
}
