import React, { FC, useState } from "react";
import { ParticipantRow } from "./ParticipantRow";
import { ParticipantRowEdit } from "./ParticipantRowEdit";
import { Participant, useParticipants } from "./participants";
import { arrayRemove } from "../utils";
import styles from "./styles.module.scss";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

interface Props {}

interface Ordering {
  orderBy: keyof Participant;
  direction: "asc" | "desc";
}

/**
 * Renders the participants as a table with a form to create a new participant.
 */
export const ParticipantTable: FC<Props> = () => {
  const [editedParticipants, setEditedParticipants] = useState([] as readonly number[]);
  const [ordering, setOrdering] = useState({ orderBy: "name", direction: "asc" } as Ordering);

  const {
    participants,
    createParticipant,
    updateParticipant,
    removeParticipant,
  } = useParticipants(20, ordering.orderBy, ordering.direction);

  const renderRow = (participant: Participant) => {
    if (editedParticipants.includes(participant.id)) {
      return <ParticipantRowEdit
        key={participant.id}
        participant={participant}
        onSave={participant => {
          updateParticipant(participant);
          setEditedParticipants(values => arrayRemove(values, participant.id));
        }}
        onCancel={() => setEditedParticipants(values => arrayRemove(values, participant.id))}
      />;
    } else {
      return <ParticipantRow
        key={participant.id}
        participant={participant}
        onEdit={() => setEditedParticipants(values => [...values, participant.id])}
        onRemove={removeParticipant}
      />;
    }
  };

  const changeOrdering = (orderBy: keyof Participant) => {
    setOrdering(old => {
      if (old.orderBy === orderBy) {
        return {
          orderBy: old.orderBy,
          direction: old.direction === "asc" ? "desc" : "asc",
        };
      } else {
        return {
          orderBy,
          direction: "asc",
        };
      }
    });
  };

  const renderHeader = (property: keyof Participant, label: string) => {
    let arrow = <svg/>;

    if (property === ordering.orderBy) {
      if (ordering.direction === "asc") {
        arrow = <ArrowDownward />;
      } else {
        arrow = <ArrowUpward />;
      }
    }

    return (
      <button
        onClick={() => changeOrdering(property)}
        className={ordering.orderBy === property ? styles["selected-header"] : undefined}
      >
        {label}
        {arrow}
      </button>
    );
  };

  return (
    <div className={styles["participant-table"]}>
      <table>
        <tbody>
          <ParticipantRowEdit
            participant={{email: "", id: -1, name: "", phone: ""}}
            onSave={createParticipant}
            onCancel={undefined}
          />
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>{renderHeader("name", "Name")}</th>
            <th>{renderHeader("email", "E-mail address")}</th>
            <th>{renderHeader("phone", "Phone number")}</th>
            <th/>
          </tr>
        </thead>
        <tbody>
          {participants.map(renderRow)}
        </tbody>
      </table>
    </div>
  );
};
