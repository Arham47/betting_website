import { observer } from "mobx-react";
import { memo, useEffect, useState } from "react";
import style from "./style.module.scss";
import { Col, Empty, Row, Skeleton, Spin } from "antd";
import categoryImg from "@assets/images/category1.png";
import { constRoute } from "@utils/route";
import { useStore } from "@stores/root-store";
import CustomButton from "@components/common-components/custom-button";
import { isMobile } from "react-device-detect";

interface Props {}
const AsianGammes: React.FC<Props> = observer(({ ...props }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [allSelectedCasinosList, setAllSelectedCasinosList] = useState([{
    providerName: 'Supernowa',
    code: 'SN'
  },
  {
    providerName: 'Power Games',
    code: 'PG'
  },
  {
    providerName: 'Xprogramming',
    code: 'XPG'
  },
  // {
  //   providerName: 'Evolution',
  //   code: 'EV'
  // },
  // {
  //   providerName: 'Ezugi',
  //   code: 'EZ'
  // },
  {
    providerName: 'Qtech',
    code: 'QT'
  },
  {
    providerName: 'AE Sexy Casino',
    code: 'AWC'
  },
  // {
  //   providerName: 'Binary',
  //   code: 'BN'
  // },
  {
    providerName: 'Pragmatic Play',
    code: 'PP'
  },
  // {
  //   providerName: 'Only Play',
  //   code: 'GT'
  // },
  {
    providerName: 'One Touch',
    code: 'OT'
  },
  // {
  //   providerName: 'Fantasy Sports',
  //   code: 'FTZ'
  // },
]);
  const [scrolledImages, setScrolledImages] = useState([]);
  const [isGameId, setIsGameId] = useState(null);
  const [numRecords, setNumRecords] = useState(20);
  const [selectedCategoryName, setSelectedCategoryName] = useState(allSelectedCasinosList[0]?.providerName);
  const [totalRecords, setTotalRecords] = useState(null);
  const [isFirst, setIsFirst] = useState(true);
  const {
    user: { getUserInfo },
    bet: {
      loadAllSelectedCasinos,
      loadingAllSelectedAsianGame,
      loadAllSelectedAsianGames,
      loadAddCasinoGameDetailsData,
    },
  } = useStore(null);
  useEffect(()=>{
    window.scrollTo(0, 0);
}, []);
  // const handleGameListIframe = async (data) => {
  //   setIsGameId(data?.id_hash);
  //   const payload={
  //     gameId: data?.id_hash
  //   }
  //  const res= await loadAddCasinoGameDetailsData(payload)
  //  if(res?.data?.launchURL){
  //    window.open(`${window.location.href.replaceAll("/asian-games",`${constRoute.relatedGame}?hasId=${data?.id_hash}`)}`,"_blank");
  //  }

  //   setIsGameId(null);
  // };
  const handleLoadSelectedCasinosGames = async () => {
    const payload = {
      numRecords,
      isMobile,
      gameCategory:  selectedCategoryName,
    };
    const res = await loadAllSelectedAsianGames(payload)
    console.log('res', res)
    // const res = await loadAllSelectedCasinos(payload);
    setScrolledImages(res?.results);
    // const data = res?.categories
    // data?.unshift({category: 'All'})
    // setAllSelectedCasinosList(data);
    setTotalRecords(res?.pagination?.total);
    if (isFirst) setSelectedCategory(allSelectedCasinosList[0]?.providerName);
    setIsFirst(false);
  };
  useEffect(() => {
    handleLoadSelectedCasinosGames();
  }, [selectedCategoryName, numRecords]);
  return (
    <div className={style.mainWrapper}>
      <Row className={style.categoryWrapper}>
        <Col span={18} className={style.categoryCol}>
          <div className={style.categoryScroll}>
            {allSelectedCasinosList?.length
              ? allSelectedCasinosList?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      style={{ marginLeft: index === 0 ? 0 : 20 }}
                      className={
                        selectedCategory === item?.providerName
                          ? style.selectedImgWrapper
                          : style.imgWrapper
                      }
                      onClick={() => {
                        setSelectedCategory(item?.providerName);
                        setSelectedCategoryName(item?.providerName);
                        setNumRecords(20);
                      }}
                    >
                      <img src={categoryImg} alt="" />
                      <p>{item?.providerName}</p>
                    </div>
                  );
                })
              : ""}
          </div>
        </Col>
      </Row>
      {loadingAllSelectedAsianGame && isFirst ? (
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
      ) : (
        <>
          <Row className={style.secondRowWrapper}>
            <Col span={22}>
              <Row style={{ justifyContent: "center" }} gutter={20}>
                {scrolledImages?.length ? (
                  scrolledImages?.map((item, index) => {
                    return (
                      <>
                        <Col
                          key={index}
                          md={8}
                          lg={6}
                          xs={12}
                          sm={12}
                          className={style.secondCol}
                        >
                          {item?.code === isGameId ? (
                            <Spin className={style.antIconClass} size="large" />
                          ) : (
                            <div
                              className={`${style.imgWrapper} ${style.cardAnimation}`}
                              // onClick={async () => {
                              //   if (getUserInfo?.role === "5")
                              //     await handleGameListIframe(item);
                              // }}
                            >
                              <img src={item?.thumb} alt="" />
                              <div
                                className={style.gameName}
                              >
                                {item?.name || ''}
                              </div>
                            </div>
                          )}
                        </Col>
                      </>
                    );
                  })
                ) : (
                  <Empty />
                )}
                {totalRecords > 20 &&
                totalRecords !== scrolledImages?.length ? (
                  <div className={style.loadMoreClass}>
                    <CustomButton
                      title={"Load More"}
                      loading={loadingAllSelectedAsianGame}
                      customClass={style.btnStyle}
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
        </>
      )}
    </div>
  );
});

export default memo(AsianGammes);
