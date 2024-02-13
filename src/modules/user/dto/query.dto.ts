import Joi from "joi";

export const userQuerySchema = Joi.object<IUserQueryDto, true>({
  login: Joi.string().optional(),
});

export type IUserQueryDto = {
  login?: string;
};
