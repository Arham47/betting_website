import { observer } from "mobx-react";
import { memo, useEffect, useState } from "react";
import style from "./style.module.scss";
import { Col, Empty, Row, Skeleton, Spin } from "antd";
import { constRoute } from "@utils/route";
import { useLocation } from "react-router-dom";
import { useStore } from "@stores/root-store";
import { getSingleUrlParam } from "@utils/common-functions";
import CustomButton from "@components/common-components/custom-button";
import { isMobile } from "react-device-detect";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";

interface Props {}
const GameCategories: React.FC<Props> = observer(({ ...props }) => {
  const location = useLocation()
  const { user: { getUserInfo },
    bet: {loadingAllSelectedCasinos, loadAllSelectedCasinos, loadGetGameListIframeLink },
  } = useStore(null);
  const [isGameId, setIsGameId] = useState(null)
  const gameCategory = getSingleUrlParam(location, 'name')
  const [scrolledImages, setScrolledImages] = useState([]);
  const [totalRecords, setTotalRecords] = useState(null);
  const [isFirst, setIsFirst] = useState(true);
  const [numRecords, setNumRecords] = useState(20);

    useEffect(()=>{
  window.scrollTo(0, 0);
}, []);

  const handleLoadSelectedCasinosGames = async () => {
    const payload = {
      numRecords,
      isMobile,
      gameCategory: gameCategory,
    };
    const res = await loadAllSelectedCasinos(payload);
    setScrolledImages(res?.results);
    setTotalRecords(res?.pagination?.total);
    setIsFirst(false);
  };
useEffect(() => {
 if(gameCategory) handleLoadSelectedCasinosGames();
}, [gameCategory, numRecords]);
  const handleGameListIframe=async(data)=>{
    setIsGameId(data?.id_hash)
    setIsGameId(null)
     window.open(`${window.location.href.replaceAll("/evolution-casino?name=evolution",`${constRoute.relatedGame}?hasId=${data?.id_hash}`)}`,"_blank");
  }
  return (
    <div className={style.mainWrapper}>
      <Row style={{justifyContent:'center'}}>
        <Col span={22}><TitleBarUpdated title={`Evolution Casino`} /></Col>
      </Row>
      {loadingAllSelectedCasinos && isFirst 
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
            {scrolledImages?.length > 0 ? scrolledImages?.map((item, index) => {
              return (
                <>
                  <Col key={index} md={8} lg={6} sm={12} xs={12} className={style.secondCol}>
                   {item?.id_hash===isGameId ? <Spin className={style.antIconClass} size="large" /> : <div
                      className={`${style.imgWrapper} ${style.cardAnimation}`}
                      
                      onClick={async() =>{
                        // eslint-disable-next-line eqeqeq
                        if(getUserInfo?.role=="5")
                        await  handleGameListIframe(item)
                        }}
                    >
                      <img src={item?.image_filled} alt="" />
                      <div className={style.gameName} >{item?.name || ''}</div>
                    </div>}
                  </Col>
                </>
              );
            }) : <Empty />}
              {totalRecords > 20 &&
                totalRecords !== scrolledImages?.length ? (
                  <div className={style.loadMoreClass}>
                    <CustomButton
                      title={"Load More"}
                      customClass={style.btnStyle}
                      loading={loadingAllSelectedCasinos}
                      onClick={() => {
                        setNumRecords((numRecords) => numRecords + 20);
                      }}
                    />
                  </div>
                ) : (
                  ""
                )}
          </Row>
        </Col>
      </Row>
      </>}
    </div>
  );
});

export default memo(GameCategories);
