import { ResonseData } from "../../common/responseData";
import { CreateUserDto } from "./dto/create.dto";
import { IUserQueryDto } from "./dto/query.dto";
import { UpdateUserDto } from "./dto/update.dto";
import { UserEntity } from "./entity/user.entity";
import { UserNotFoundException } from "./exception/user.exception";
import { IUserRepository } from "./interfaces/user.repository";
import { IUserService } from "./interfaces/user.service";
import { UserRepository } from "./user.repository";

export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }
  async getOneById(id: number): Promise<ResonseData<UserEntity>> {
    const foundUser = await this.userRepository.getOneById(id);

    if (!foundUser) {
      throw new UserNotFoundException();
    }

    return new ResonseData<UserEntity>("success", 200, foundUser);
  }

  async update(
    id: number,
    dto: UpdateUserDto
  ): Promise<ResonseData<UserEntity>> {
    const foundUserByIdResponse: ResonseData<UserEntity> =
      await this.getOneById(id);

    const foundUser = foundUserByIdResponse.data as UserEntity;

    const updatedUserData = Object.assign(foundUser, dto);

    const updatedUser = await this.userRepository.update(id, updatedUserData);

    return new ResonseData<UserEntity>("updated", 200, updatedUser);
  }

  async getByLogin(
    login: string
  ): Promise<ResonseData<UserEntity | undefined>> {
    const user = await this.userRepository.getByLogin(login);

    let resData: ResonseData<UserEntity>;
    if (user) {
      resData = new ResonseData("success", 200, user);
    } else {
      resData = new ResonseData("not found", 404);
    }

    return resData;
  }

  async create(dto: CreateUserDto): Promise<ResonseData<UserEntity>> {
    const newUser: UserEntity = new UserEntity(dto);

    const createdUser = await this.userRepository.insert(newUser);

    return new ResonseData<UserEntity>("created", 201, createdUser);
  }

  async getAll(query: IUserQueryDto): Promise<ResonseData<UserEntity[]>> {
    const products = await this.userRepository.getAll(query);

    return new ResonseData<UserEntity[]>("success", 200, products);
  }
}
