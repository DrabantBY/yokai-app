import type { YokaiType } from "@entities/yokai";
import { YOKAI_DANGER, YOKAI_STATUS } from "@entities/yokai";
import Image from "next/image";
import { memo } from "react";

import styles from "./styles.module.scss";

export const YokaiCard = memo(
  ({
    name,
    image,
    status,
    location,
    danger,
    mutate,
  }: YokaiType.Card & { mutate: (body: YokaiType.Body) => void }) => {
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

        <div className={styles.yokaiBody}>
          <h2 className={styles.yokaiTitle}>{name}</h2>

          <p className={styles.yokaiText}>
            <span>Location:</span>
            {location}
          </p>

          <div className={styles.yokaiControls}>
            <span
              key={danger}
              className={`${danger === YOKAI_DANGER.CRITICAL ? styles.yokaiDangerCritical : styles.yokaiDangerLow}`}
            >
              {danger}
            </span>

            <button
              key={status}
              className={styles.yokaiStatus}
              type="button"
              disabled={status === YOKAI_STATUS.CAPTURED}
              onClick={() =>
                mutate({
                  name,
                  status: YOKAI_STATUS.CAPTURED,
                  danger: YOKAI_DANGER.LOW,
                })
              }
            >
              {status === YOKAI_STATUS.CAPTURED ? status : "CAPTURE"}
            </button>
          </div>
        </div>
      </li>
    );
  },
);
