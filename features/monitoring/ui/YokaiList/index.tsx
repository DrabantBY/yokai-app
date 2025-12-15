"use client";

import { YokaiCard } from "@monitoring/ui";
import { useQueryYokaiList } from "@monitoring/api";

import styles from "./styles.module.scss";

export const YokaiList = () => {
  const { data, mutate } = useQueryYokaiList();
  console.log("yokaiList:", data);

  return (
    <section>
      <div className="__container">
        <ul className={styles.yokaiList}>
          {data.map((yokai) => (
            <YokaiCard key={yokai.name} {...yokai} mutate={mutate} />
          ))}
        </ul>
      </div>
    </section>
  );
};
