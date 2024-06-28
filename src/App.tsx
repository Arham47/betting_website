import { Suspense, lazy, memo, useMemo} from "react";
import "./App.scss";
import "./style.module.scss";
import DefaultLayout from "@components/layout";
import { useTheme } from "@utils/hooks/useTheme";
import { LOWER_LIGHT_HYPEN_THEME, LOWER_THEME } from "@utils/const";

function App() {
  const theme = useTheme();
  const LazyDefaultLayout = useMemo(() => lazy(() => import("@components/layout")), []);
  return (
    <div
      className={theme || LOWER_LIGHT_HYPEN_THEME}
      style={{ position: "relative", overflowX: "hidden" }}
    >
        <Suspense>
        <LazyDefaultLayout />
      </Suspense>
    </div>
  );
}

export default memo(App);
