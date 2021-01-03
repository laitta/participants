import React, { FC } from "react";
import { ParticipantTable } from "./ParticipantTable";
import styles from "./styles.module.scss";

interface Props {}

export const ParticipantsPage: FC<Props> = () => {
  return (
    <main className={styles["participants-page"]}>
      <h2>List of participants</h2>
      <div className={styles["horizontal-scroll"]}>
        <ParticipantTable />
      </div>
    </main>
  );
};
