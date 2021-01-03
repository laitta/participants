import { Field, Form, Formik } from "formik";
import React, { FC, useState } from "react";
import { Participant } from "./participants";
import styles from "./styles.module.scss";

interface Props {
  participant: Participant;
  onSave: (participant: Participant) => void;
  onCancel: (() => void) | undefined;
}

// A counter for generating unique id for edit forms. Forms require ids so that the fields can be associated to the form
// correctly. The counter is incremented every time a row is rendered, but JS number's safe integer range should be
// large enough for it to not matter.
let idCounter = 0;

/**
 * Shows a participant's information as an editable table row. If onCancel is not given, the row is assumed to be for
 * adding a new participant.
 * @param param0 Component props.
 */
export const ParticipantRowEdit: FC<Props> = ({participant, onSave, onCancel}) => {
  const [id] = useState(`ParticipantRowEdit-${idCounter++}`);

  return (
    <Formik initialValues={participant} onSubmit={onSave}>
      <tr className={styles["participant-row-edit"]}>
        <td>
          <Form id={id}>
            <Field name="name" placeholder="Full name" required maxLength="128" />
          </Form>
        </td>
        <td>
          <Field form={id} name="email" type="email" placeholder="E-mail address" required />
        </td>
        <td>
          <Field form={id} name="phone" type="tel" placeholder="Phone number" required pattern="^\d+$" />
        </td>
        <td>
          <div className={styles["buttons"]}>
            {onCancel && <button form={id} className="secondary" type="button" onClick={onCancel}>Cancel</button>}
            <button form={id} type="submit" className={onCancel ? undefined : styles["add-new-button"]}>
              {onCancel ? "Save" : "Add new"}
            </button>
          </div>
        </td>
      </tr>
    </Formik>
  );
};
