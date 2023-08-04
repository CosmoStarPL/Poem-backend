import { body } from "express-validator";

export const userValidation = [
  body("email", "Заголовок должен быть больше одного символа").isLength({
    min: 1,
  }),
  body("nickName", "Заголовок должен быть больше 20 символа").isLength({
    min: 20,
  }),
  body("password", "Заголовок должен быть больше одного символа").isLength({
    min: 1,
  }),
];
