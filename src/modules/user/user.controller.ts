import { ResonseData } from "../../common/responseData";
import { Error } from "../../common/types/types";
import { checkDto } from "../../lib/cheackDto";
import { CreateUserDto, createUserSchema } from "./dto/create.dto";
import { IUserQueryDto, userQuerySchema } from "./dto/query.dto";
import { UpdateUserDto, updateUserSchema } from "./dto/update.dto";
import { UserLoginAlreadyExist } from "./exception/user.exception";
import { IUserService } from "./interfaces/user.service";
import { Request, Response } from "express";

export class UserController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  async getOneById(req: Request, res: Response) {
    try {
      const userId: number = Number(req.params.id);

      const resData = await this.userService.getOneById(userId);

      res.status(resData.statusCode).json(resData);
    } catch (error: Error | any) {
      const resData = new ResonseData(
        error.message,
        error.statusCode || 500,
        null,
        error
      );

      res.status(resData.statusCode).json(resData);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const query: IUserQueryDto = req.query;

      checkDto<IUserQueryDto>(userQuerySchema, query);

      const resData = await this.userService.getAll(query);

      res.status(resData.statusCode).json(resData);
    } catch (error: Error | any) {
      const resData = new ResonseData(
        error.message,
        error.statusCode || 500,
        null,
        error
      );

      res.status(resData.statusCode).json(resData);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const dto: CreateUserDto = req.body;

      checkDto<CreateUserDto>(createUserSchema, dto);

      const getByLogin = await this.userService.getByLogin(dto.login);

      if (getByLogin.data) {
        throw new UserLoginAlreadyExist();
      }

      const resData = await this.userService.create(dto);

      res.status(resData.statusCode).json(resData);
    } catch (error: Error | any) {
      const resData = new ResonseData(
        error.message,
        error.statusCode || 500,
        null,
        error
      );

      res.status(resData.statusCode).json(resData);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const dto: UpdateUserDto = req.body;
      const userId: number = Number(req.params.id);
      checkDto<UpdateUserDto>(updateUserSchema, dto);

      await this.userService.getOneById(userId);

      if (dto?.login) {
        const getByLogin = await this.userService.getByLogin(dto.login);

        if (getByLogin.data && getByLogin.data.id !== userId) {
          throw new UserLoginAlreadyExist();
        }
      }

      const resData = await this.userService.update(userId, dto);

      res.status(resData.statusCode).json(resData);
    } catch (error: Error | any) {
      const resData = new ResonseData(
        error.message,
        error.statusCode || 500,
        null,
        error
      );

      res.status(resData.statusCode).json(resData);
    }
  }
}
