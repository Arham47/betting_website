import { getUserOnRole, numberWithCommas } from "@utils/common-functions";
import { DOUBLE_DASH } from "@utils/const";

export const ColTextCheck = (text) => {
  return (
    <p className="dynamicColorOnHover">
      {text
        ? typeof text === "number"
          ? numberWithCommas(Math.round(text))
          : text
        : text === 0
        ? 0
        : DOUBLE_DASH}
    </p>
  );
};

export const ColUserOnRole = (role) => <p>{getUserOnRole(role)?.name}</p>;
