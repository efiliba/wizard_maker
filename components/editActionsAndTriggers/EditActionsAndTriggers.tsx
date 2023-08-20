// "use client";

type Props = {
  show: boolean,
};

export const EditActionsAndTriggers = ({ show }: Props) =>
  <div>
    ToDo: Was unable to extract this component<br />
    It is not allowed to define inline &quot;use server&quot; annotated Server Actions in Client Components.<br />
    Edit Actions And Triggers {show.toString()}
  </div>;
