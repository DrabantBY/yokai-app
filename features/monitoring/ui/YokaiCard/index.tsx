"use client";

import type { YokaiType } from "@monitoring/model";

import { memo, useState } from "react";

import Image from "next/image";

import styles from "./styles.module.scss";

export const YokaiCard = memo(
  ({ name, image, status, location, danger }: YokaiType.Card) => {
    const [state, setState] = useState<YokaiType.State>(() => ({
      status,
      danger,
    }));

    return (
      <li className={styles.yokaiCard}>
        <figure className={styles.yokaiFigure}>
          <Image
            src={image}
            alt={`${name} picture`}
            sizes="200px"
            loading="eager"
            fill
          />
        </figure>

        <h2 className={styles.yokaiTitle}>{name}</h2>

        <hr />

        <p className={styles.yokaiText}>
          <span>Location:</span>
          {location}
        </p>

        <div className={styles.yokaiControls}>
          <span
            className={`${state.danger === "critical" ? styles.yokaiDangerCritical : styles.yokaiDangerLow}`}
          >
            {state.danger}
          </span>

          <button
            className={styles.yokaiStatus}
            type="button"
            disabled={state.status === "caught"}
            onClick={() => setState({ status: "caught", danger: "low" })}
          >
            {state.status === "caught" ? state.status : "catch"}
          </button>
        </div>
      </li>
    );
  },
);
