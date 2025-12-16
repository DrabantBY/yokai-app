"use client";

import { useYokaiState, YokaiCard } from "@entities/yokai";

import styles from "./styles.module.scss";

export const MonitoringList = () => {
  const { data, mutate } = useYokaiState();

  return (
    <section>
      <div className="__container">
        <ul className={styles.monitoringList}>
          {data.map((yokai) => (
            <YokaiCard key={yokai.name} {...yokai} mutate={mutate} />
          ))}
        </ul>
      </div>
    </section>
  );
};
