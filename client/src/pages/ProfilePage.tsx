import React from "react";
import FormContainer from "../components/form/FormContainer";
import { Repair } from "../classes/Repair";
import { v4 as uuidv4 } from "uuid";

export default function ProfilePage(): React.ReactNode {
  return (
    <FormContainer
      id={uuidv4()}
      initialFormState={new Repair()}
    />
  );
}
