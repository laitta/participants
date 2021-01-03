import { Delete, Edit } from "@material-ui/icons";
import { FC } from "react";
import { Participant } from "./participants";
import styles from "./styles.module.scss";

interface Props {
  participant: Participant;
  onEdit: (participant: Participant) => void;
  onRemove: (participant: Participant) => void;
}

/**
 * Shows a participant's information as a table row.
 * @param param0 Component props.
 */
export const ParticipantRow: FC<Props> = ({participant, onEdit, onRemove}) => {
  return (
    <tr className={styles["participant-row"]}>
      <td>{participant.name}</td>
      <td>{participant.email}</td>
      <td>{participant.phone}</td>
      <td className={styles["minimum-width"]}>
        <div className={styles["buttons"]}>
          <button type="button" onClick={() => onEdit(participant)}><Edit /></button>
          <button type="button" onClick={() => onRemove(participant)}><Delete /></button>
        </div>
      </td>
    </tr>
  );
};
