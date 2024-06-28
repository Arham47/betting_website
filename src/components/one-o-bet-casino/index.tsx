/* eslint-disable eqeqeq */
import { observer } from "mobx-react";
import { memo, useEffect, useState } from "react";
import style from "./style.module.scss";
import { Col, Empty, Row, Skeleton, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useStore } from "@stores/root-store";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";
import { oneobetCasinoUrl } from "@api/const";

interface Props {}
const OneOBetCasino: React.FC<Props> = observer(({ ...props }) => {
  const {bet: {loadoneOBetCasinos, loadingOneOBetCasinos },
  } = useStore(null);

  const [casinoImages, setCasinoImages] = useState([]);
  const [isFirst, setIsFirst] = useState(true);
  const navigate = useNavigate();
  const handleLoadCasinosGames = async () => {
 
    const res = await loadoneOBetCasinos();
    if(res?.success){
      setCasinoImages(res?.allAsianTables);
    }
    setIsFirst(false);
  };
useEffect(() => {
handleLoadCasinosGames();
}, []);

useEffect(()=>{
  window.scrollTo(0, 0);
}, []);

  return (
    <div className={style.mainWrapper}>
       <Row style={{justifyContent:'center'}}>
        <Col span={22}><TitleBarUpdated title={`1obet Casino`} className={style.mainHeading}/></Col>
      </Row>
      {loadingOneOBetCasinos && isFirst
       ? 
       <Row style={{ justifyContent: "center", marginBottom:10 }} >
       <Col span={22}>
         <Row className={style.loadingRow} gutter={[20, 20]}>
         {Array(12)
           .fill(12)
           .map((i) => (
             <Col xs={12} sm={12} md={12} lg={6} xxl={6}>
               <div className={style.skeletonLoaderWrapper}>
                 <Skeleton.Image active />
               </div>
             </Col>
           ))}
         </Row>
       </Col>
   </Row>
      : <>
      <Row className={style.secondRowWrapper}>
        <Col span={22}>
          <Row style={{ justifyContent: "center", marginBottom:10 }} gutter={20}>
            {casinoImages?.length> 0 ?casinoImages?.map((item, index) => {
              return (
                <>
                  <Col key={index} md={8} lg={6} sm={12} xs={12} className={style.secondCol}>
                   <div
                      className={`${style.imgWrapper} ${style.cardAnimation}`}>
                      <img src={`${oneobetCasinoUrl}${item?.imageUrl}`} alt="" />
                      <div className={style.gameName} >{item?.tableName || '' }</div>
                    </div>
                  </Col>
                </>
              );
            }) : <Empty />}
          </Row>
        </Col>
      </Row>
      </>}
    </div>
  );
});

export default memo(OneOBetCasino);
