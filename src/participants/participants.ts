import { useCallback, useMemo, useState } from "react";
import { randomName } from "../names";
import { range } from "../utils";

export interface Participant {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly phone: string;
}

/**
 * A hook that exposes a list of participants and methods to modify the list.
 * @param initialCount How many participants should be created initially.
 * @param orderBy By which property the list should be ordered.
 * @param orderDirection Should the ordering be ascending or descending.
 */
export const useParticipants = (initialCount: number, orderBy: keyof Participant, orderDirection: "asc" | "desc") => {
  const [participants, setParticipants] = useState([...range(initialCount)].map(randomParticipant));

  const createParticipant = useCallback((newParticipant: Omit<Participant, "id">) => {
    setParticipants(values => {
      const maxId = values.length > 0 ? Math.max(...values.map(p => p.id)) : 0;
      return [
        ...values,
        {
          ...newParticipant,
          id: maxId + 1,
        }
      ];
    });
  }, []);

  const updateParticipant = useCallback((updatedParticipant: Participant) => {
    setParticipants(values => {
      const index = values.findIndex(p => p.id === updatedParticipant.id);
      if (index < 0) {
        return values;
      }

      return [
        ...values.slice(0, index),
        updatedParticipant,
        ...values.slice(index + 1),
      ];
    });
  }, []);

  const removeParticipant = useCallback((removedParticipant: Participant) => {
    setParticipants(values => {
      const index = values.findIndex(p => p.id === removedParticipant.id);
      if (index < 0) {
        return values;
      }

      return [
        ...values.slice(0, index),
        ...values.slice(index + 1),
      ];
    });
  }, []);

  const orderedParticipants = useMemo(() => {
    return participants.slice().sort((a, b) => {
      let result: number;
      if (orderBy === "id") {
        const aValue = a[orderBy];
        const bValue = b[orderBy];
        result = aValue - bValue;
      } else {
        const aValue = a[orderBy];
        const bValue = b[orderBy];
        result = aValue.localeCompare(bValue);
      }

      return orderDirection === "asc" ? result : -result;
    });
  }, [participants, orderBy, orderDirection]);

  return {
    participants: orderedParticipants,
    createParticipant,
    updateParticipant,
    removeParticipant,
  };
};

/**
 * Creates a new random participant with the given id.
 * @param id The id of the new participant.
 */
const randomParticipant = (id: number): Participant => {
  const name = randomName();
  const email = `${name.toLowerCase().replace(/ /g, "-")}@email-provider.com`;
  return {
    id,
    name,
    email,
    phone: randomPhone(),
  };
};

/**
 * Creates a random phone number.
 */
const randomPhone = () => {
  let result = "";
  for (let i = 0; i < 10; ++i) {
    result += Math.floor(Math.random() * 10).toString();
  }

  return result;
};
