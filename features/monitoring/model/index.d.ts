export namespace YokaiType {
  type Card = {
    name: string;
    image: string;
    danger: "low" | "critical";
    location: string;
    status: "caught" | "active";
  };
}
