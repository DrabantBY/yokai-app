export namespace YokaiType {
  type Card = {
    name: string;
    image: string;
    danger: "#05df72" | "#ff2056";
    location: string;
    status: "caught" | "active";
  };
}
