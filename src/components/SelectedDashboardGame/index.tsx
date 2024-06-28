import { observer } from "mobx-react";
import { memo, useEffect, useState } from "react";
import style from "./style.module.scss";
import { Col, Empty, Row, Select, Spin } from "antd";
import { useStore } from "@stores/root-store";
import { CheckCircleFilled } from "@ant-design/icons";
import CustomButton from "@components/common-components/custom-button";
import { truncate } from "@utils/common-functions";
import { CommonInput } from "@components/common-components/input";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";
interface Props {}
const SelectedGameDashboard: React.FC<Props> = observer(({ ...props }) => {
  const [isSelectedGames, setIsSelectedGames] = useState([]);
  const [scrolledImages, setScrolledImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dashboardGameCategories, setDashboardGameCategories] = useState([]);
  const [gameCategory, setGameCategory] = useState("");
  const [isDashBoard, setIsDashBaord] = useState("");
  const [isMobile, setIsMobile] = useState("");
  const [numRecords, setNumRecords] = useState(20);
  const [totalRecords, setTotalRecords] = useState(null);
  const [isFirst, setIsFirst] = useState(true)
  const {
    bet: {
      getGamesCateGoryData,
      loadingGetDashBoardGames,
      loadGetDashBoardGames,
      loadSaveGameFortheDashBoardGameList,
    },
  } = useStore(null);
  useEffect(()=>{
    window.scrollTo(0, 0);
}, []);
  const handleGameCategory = async () => {
    const res = await getGamesCateGoryData();
    if (res?.success) {
      const games = res?.categories?.map((z) => {
        return { key: z?.category, value: z?.category };
      });
      setDashboardGameCategories(games);
    }
  };
  useEffect(() => {
    handleGameCategory();
  }, []);
  const handleOnChangeGame = async(item) => {
    let tempData = [...isSelectedGames];
    const data = tempData?.find((z) => z === item?.id);
    if (data) {
      // eslint-disable-next-line eqeqeq
      const filterData = tempData?.filter((z) => z != item?.id);
      tempData = filterData;
      setIsSelectedGames(filterData);
      const payload = {
        gameId: item?.id,
        status: false
      };
      await loadSaveGameFortheDashBoardGameList(payload);
    } else {
      setIsSelectedGames([...tempData, item?.id]);
      tempData = [...tempData, item?.id];
      const payload = {
        gameId: item?.id,
        status: true
      };
      await loadSaveGameFortheDashBoardGameList(payload);
    }
  };

  const dashboardItems = [
    {
      key: "1",
      value: "Yes",
    },
    {
      key: "1",
      value: "No",
    },
  ];
  const mobileDesktopGae = [
    {
      key: "1",
      value: "Mobile",
    },
    {
      key: "1",
      value: "Desktop",
    },
  ];
  const handleSearchGames = async (pageSize = 0) => {
    const isDashBoardData = isDashBoard === "Yes" ? true : false;
    const isMobileData = isMobile === "Mobile" ? true : false;
    const payload = {
      gameCategory: gameCategory || "",
      isDashboard: isDashBoardData,
      isMobile: isMobileData,
      numRecords: pageSize ? pageSize : numRecords,
      name: searchQuery || "",
    };
    try{
    const res = await loadGetDashBoardGames(payload);
    if (res?.success) {
      setTotalRecords(res?.pagination?.total);
      const filterGame = res?.results
        ?.filter((z) => z?.isDashboard === true)
        ?.map((item) => item?.id);
      setIsSelectedGames(filterGame);
      setScrolledImages(res?.results);
      setIsFirst(false)
    }
  } catch(error){
    setIsFirst(false)
  }finally{
    setIsFirst(false)
  }
  };
  useEffect(() => {
    handleSearchGames();
  }, []);

  return (
    <div className={style.mainWrapper}>
      {isFirst ? (
        <Spin className={style.antIconClass} size="large" />
      ) : (
        <>
          <Row
            style={{ justifyContent: "space-between", alignItems: "center", paddingTop:10, paddingBottom:10 }}
          >
            <TitleBarUpdated className={style.mainHeading} title={`Dashboard Game`}/>
          </Row>

          <Row
            gutter={[20, 10]}
            style={{ marginBottom: 20, alignItems: "center" }}
          >
            <Col style={{ paddingLeft: 5, paddingRight: 5 }}>
              <Select
                className={style.commonSelectBox}
                options={dashboardGameCategories}
                placeholder={"Select Game Category"}
                onChange={(e) => setGameCategory(e)}
                allowClear
              />
            </Col>
            <Col style={{ paddingLeft: 5, paddingRight: 5 }}>
              <Select
                className={style.dashboardSelect}
                options={dashboardItems}
                placeholder={"Dashboard"}
                onChange={(e) => setIsDashBaord(e)}
                allowClear
              />
            </Col>
            <Col style={{ paddingLeft: 5, paddingRight: 5 }}>
              <Select
                className={style.dashboardSelect}
                options={mobileDesktopGae}
                placeholder={"Mobile/Desktop"}
                onChange={(e) => setIsMobile(e)}
                allowClear
              />
            </Col>
            <Col
              style={{ paddingLeft: 5, paddingRight: 5 }}
              className={style.searchBarCol}
            >
              <div className={style.searchWrapper}>
                <CommonInput
                  className={style.searchBar}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="search By Name..."
                />{" "}
              </div>
            </Col>
            <Col style={{ paddingLeft: 5, paddingRight: 5 }}>
              <CustomButton
                className={style.searchBtn}
                customClass={style.btnStyle}
                title="Search"
                onClick={() => {
                  setNumRecords((numRecords) => 20);
                  handleSearchGames(20);
                }}
              />
            </Col>
          </Row>
          {
            <>
              <div className={style.FlexWraperForGame}>
                <Row gutter={10}>
                  { scrolledImages?.length ? (
                    scrolledImages?.map((item, index) => {
                      return (
                        <Col
                          xs={12}
                          sm={12}
                          md={6}
                          lg={4}
                          style={{ marginTop: 10 }}
                        >
                          <div
                            className={style.imageContainer}
                            key={index}
                            style={{
                              boxShadow: isSelectedGames?.find(
                                (z) => z === item?.id
                              )
                                ? "0 0 0 0.2rem rgb(49, 122, 250, .7)"
                                : "",
                            }}
                            onClick={() => {
                              handleOnChangeGame(item);
                            }}
                          >
                            <img
                              className={style.image}
                              style={{
                                objectFit: "cover",
                                width: "100%",
                              }}
                              src={item?.image_filled}
                              alt="logo"
                            />
                            <div className={style.textOverlay}>
                              {isSelectedGames?.find((z) => z === item?.id) ? (
                                <CheckCircleFilled />
                              ) : (
                                ""
                              )}
                              <p
                                title={
                                  item?.name?.length > 16 ? item?.name : ""
                                }
                              >
                                {truncate(item?.name, 16)}
                              </p>
                            </div>
                          </div>
                        </Col>
                      );
                    })
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "auto",
                      }}
                    >
                      <Empty />
                    </div>
                  )}
                </Row>
                {totalRecords > 20 &&
                totalRecords !== scrolledImages?.length ? (
                  <div className={style.loadMoreClass}>
                    <CustomButton
                      title={"Load More"}
                      customClass={style.btnStyle}
                      loading={loadingGetDashBoardGames}
                      onClick={() => {
                        setNumRecords(
                          (numRecords) => scrolledImages?.length + 20
                        );
                        handleSearchGames(20 + numRecords);
                      }}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </>
          }
        </>
      )}
    </div>
  );
});
export default memo(SelectedGameDashboard);
