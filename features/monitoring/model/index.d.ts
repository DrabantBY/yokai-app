export namespace YokaiType {
  type State = {
    danger: "low" | "critical";
    status: "caught" | "active";
  };

  type Card = {
    name: string;
    image: string;
    location: string;
  } & State;
}
