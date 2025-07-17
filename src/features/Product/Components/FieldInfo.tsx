import { AnyFieldApi } from "@tanstack/react-form";

function FieldInfo ({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.errors.length > 0 ? (
        <span style={{ color: "red" }}>{field.state.meta.errors.map((err) => err.message).join(",")}</span>
      ) : null}

    </>
  );
}

export default FieldInfo;