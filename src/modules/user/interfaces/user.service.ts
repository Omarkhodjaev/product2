import { ResonseData } from "../../../common/responseData";
import { CreateUserDto } from "../dto/create.dto";
import { IUserQueryDto } from "../dto/query.dto";
import { UpdateUserDto } from "../dto/update.dto";
import { UserEntity } from "../entity/user.entity";

export interface IUserService {
  getOneById(id: number): Promise<ResonseData<UserEntity>>;
  getAll(query: IUserQueryDto): Promise<ResonseData<UserEntity[]>>;
  create(dto: CreateUserDto): Promise<ResonseData<UserEntity>>;
  getByLogin(login: string): Promise<ResonseData<UserEntity | undefined>>;
  update(id: number, dto: UpdateUserDto): Promise<ResonseData<UserEntity>>;
}
