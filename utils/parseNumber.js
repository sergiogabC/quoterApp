import { preprocess } from "zod/v4";

export const stringToNumber = () => {
  preprocess((val) => {
    if (typeof val === "string") {
      return Number.parseInt(val);
    }
    return val;
  });
};
