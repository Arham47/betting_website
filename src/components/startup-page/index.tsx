import { observer } from "mobx-react";
import { memo } from "react";
import style from "./style.module.scss"

interface Props {}
const ScreenName: React.FC<Props> = observer(({ ...props }) => {
  return (
    <div className={style.mainWrapper}>
        {/* content */}
    </div>
  );
});

export default memo(ScreenName);
 