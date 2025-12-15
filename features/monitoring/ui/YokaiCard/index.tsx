"use client";

import type { YokaiType } from "@monitoring/model";

import { Activity, memo, useState } from "react";

import Image from "next/image";

import styles from "./styles.module.scss";

const STATUS_MODE = {
  active: "visible",
  caught: "hidden",
} as const;

export const YokaiCard = memo(
  ({ name, image, status, location, danger }: YokaiType.Card) => {
    const [mode, setMode] = useState(() => STATUS_MODE[status]);

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
        <p className={styles.yokaiText}>
          <span>Danger:</span>
          {danger}
        </p>

        <Activity mode={mode}>
          <button
            className={styles.yokaiAction}
            type="button"
            onClick={() => setMode("hidden")}
          >
            capture
          </button>
        </Activity>
      </li>
    );
  },
);
