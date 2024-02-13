import Joi from "joi";
import { CreateUserDto } from "./create.dto";

export const updateUserSchema = Joi.object<UpdateUserDto, true>({
  login: Joi.string().optional(),
  password: Joi.string().min(0).optional(),
  balance: Joi.number().min(0).optional(),
});

export type UpdateUserDto = Partial<CreateUserDto>;
