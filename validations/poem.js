import { body } from "express-validator";

export const poemValidation = [
  body("title", "Заголовок должен быть больше одного символа").isLength({
    min: 1,
  }),
  body("poem", "Заголовок должен быть больше 20 символа").isLength({
    min: 20,
  }),
  body("author", "Заголовок должен быть больше одного символа").isLength({
    min: 1,
  }),
];
