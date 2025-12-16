import type { YOKAI_DANGER, YOKAI_STATUS } from "./enums";

export namespace YokaiType {
  export type State = {
    danger: YOKAI_DANGER;
    status: YOKAI_STATUS;
  };

  export type Body = { name: string } & Partial<State>;

  export type Card = {
    name: string;
    image: string;
    location: string;
  } & State;
}
