"use client";

import { useQueryYokaiList } from "@monitoring/api";

export const YokaiList = () => {
  const yokaiList = useQueryYokaiList();
  console.log("yokaiList:", yokaiList);

  return (
    <section>
      <div className="__container">
        <ul>
          {yokaiList.map((yokai) => (
            <li key={yokai.name}>{yokai.name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};
