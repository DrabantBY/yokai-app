import type { YOKAI_DANGER, YOKAI_STATUS } from "@monitoring/model/enums";

export namespace YokaiType {
  type State = {
    danger: YOKAI_DANGER;
    status: YOKAI_STATUS;
  };

  type Body = { name: string } & Partial<State>;

  type Card = {
    name: string;
    image: string;
    location: string;
  } & State;
}
