import { useTheme } from "@utils/hooks/useTheme";
import PublicRouting from "../../../../router-service-public"

function PublicLayout() {
  const theme = useTheme();
  return (
    <div className={theme}>
      <PublicRouting />
    </div>
  );
}

export default PublicLayout;
