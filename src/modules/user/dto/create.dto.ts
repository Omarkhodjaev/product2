import Joi from "joi";

export const createUserSchema = Joi.object<CreateUserDto, true>({
  login: Joi.string().required(),
  password: Joi.string().min(0).required(),
  balance: Joi.number().integer().min(0).required(),
});

export type CreateUserDto = {
  login: string;
  password: string;
  balance: number;
};


