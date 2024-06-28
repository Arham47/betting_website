import { observer } from "mobx-react";
import { memo } from "react";
import style from "./style.module.scss"

interface Props {}
const NotFound: React.FC<Props> = observer(({ ...props }) => {
  return (
    <div className={style.mainWrapper}>
        <h4>404</h4>
        <p>Ooops!!</p>
        <p>That Page doesn't exist or is unavailable.</p>
    </div>
  );
});

export default memo(NotFound);
 