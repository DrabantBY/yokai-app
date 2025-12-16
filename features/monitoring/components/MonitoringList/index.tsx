"use client";

import { Modal } from "@shared/ui";
import { useYokaiState, YokaiCard } from "@entities/yokai";

import { createPortal } from "react-dom";

import styles from "./styles.module.scss";

export const MonitoringList = () => {
  const { data, mutate, error } = useYokaiState();

  return (
    <section>
      <div className="__container">
        <ul className={styles.monitoringList}>
          {data.map((yokai) => (
            <YokaiCard key={yokai.name} {...yokai} mutate={mutate} />
          ))}
        </ul>
      </div>

      {!error
        ? null
        : createPortal(
            <Modal message={error?.message} />,
            document.getElementById("root")!,
          )}
    </section>
  );
};
