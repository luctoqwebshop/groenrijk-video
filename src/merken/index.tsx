import { createContext, useContext } from "react";
import { groenrijk } from "./groenrijk";
import { outlet } from "./outlet";
import type { Merk, MerkId } from "./types";

export type { Merk, MerkId } from "./types";

export const merken: Record<MerkId, Merk> = { groenrijk, outlet };

const MerkContext = createContext<Merk>(groenrijk);

export const MerkProvider: React.FC<{ readonly merk: MerkId; readonly children: React.ReactNode }> = ({
  merk,
  children,
}) => <MerkContext.Provider value={merken[merk]}>{children}</MerkContext.Provider>;

// Het merk van de video waarin een component staat
export const useMerk = () => useContext(MerkContext);
