"use client";

import { useQueryYokaiList } from "@monitoring/api";

import styles from "./styles.module.scss";
import { YokaiCard } from "@monitoring/ui";

export const YokaiList = () => {
  const yokaiList = useQueryYokaiList();
  console.log("yokaiList:", yokaiList);

  return (
    <section>
      <div className="__container">
        <ul className={styles.yokaiList}>
          {yokaiList.map((yokai) => (
            <YokaiCard key={yokai.name} {...yokai} />
          ))}
        </ul>
      </div>
    </section>
  );
};
