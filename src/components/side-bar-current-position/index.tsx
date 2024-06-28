import styled from "styled-components";
import style from "./style.module.scss";
import { observer } from "mobx-react";
import { CAP_AMOUNT, DATA_NOT_FOUND } from "@utils/const";
import Table from "@components/common-components/table";
import { useEffect, useState } from "react";
import { useStore } from "@stores/root-store";
import { Col, Empty, Row, Spin } from "antd";
import { constRoute } from "@utils/route";
import { useNavigate } from "react-router";
import { formatLargeNumber, numberWithCommas } from "@utils/common-functions";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";
import { BsArrowRepeat } from "react-icons/bs";

export const CurrentPositionSideBar = observer(() => {
  const {
    user: {
      getUserInfo,
      loadCurrentPositonData,
      loadCurrentPositonData2,
      loadGetHighlight2,
      loadingCurrentPositonData,
    },
  } = useStore(null);
  const [allCurrentPosition, setAllCurrentPosition] = useState({});
  const [cricketProiftLoss, setCricketProiftLoss] = useState(null);
  const [soccerProiftLoss, setSoccerProiftLoss] = useState(null);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const navigate = useNavigate();
  const filterInplayData = (inplayDataArray, sportsId, iconStatus = false) => {
    return inplayDataArray?.filter((a) => a?.sportsId == sportsId) || [];
  };
  const handleGetCurrentPositionData = async () => {
    const payload = {
      id: getUserInfo?.userId,
      marketId: "38d3bc03-8a59-4551-85cf-a35298f75124",
    };
    //--------------new function for current Position -------------------
    const response = await loadCurrentPositonData2(payload);
    // -------------- previous function for Current Position
    //  const res =  await loadCurrentPositonData(payload)
    if (response?.success) {
      // if(res?.results?.length){
      // setAllCurrentPosition(res?.results)}
      const dummyCurrentPositionObj = {};
      const cricket = filterInplayData(response?.results, "4");
      const tenniss = filterInplayData(response?.results, "2");
      const soccer = filterInplayData(response?.results, "1");
      const greyhound = filterInplayData(response?.results, "4339");
      const horseRace = filterInplayData(response?.results, "7");

      if (cricket?.length) {
        const groupedData: { [marketId: string]: any[] } = {};
        const uniqueMarketObjects = cricket?.reduce((acc, current) => {
          const existingObject = acc.find(
            (item) => item?.marketId === current?.marketId
          );
          if (!existingObject) {
            acc.push(current);
          }
          return acc;
        }, []);
        cricket?.forEach((item) => {
          const { marketId } = item;
          if (!groupedData[marketId]) {
            groupedData[marketId] = [item];
          } else {
            groupedData[marketId].push(item);
          }
        });

        // Iterate through grouped data, merge objects, and sum up loosingAmount
        const mergedData = Object.values(groupedData)?.map((group) => {
          return group?.reduce((merged, item) => {
            merged.loosingAmount =
              (merged.loosingAmount || 0) + item.loosingAmount;
            merged.marketId = item.marketId;
            // Add other properties if needed
            return merged;
          }, {});
        });
        setCricketProiftLoss(mergedData);
        dummyCurrentPositionObj["Cricket"] = uniqueMarketObjects;
      }

      if (tenniss?.length) dummyCurrentPositionObj["Tenis"] = tenniss;
      if (soccer?.length) {
        const groupedData: { [marketId: string]: any[] } = {};
        const uniqueMarketObjects = soccer?.reduce((acc, current) => {
          const existingObject = acc.find(
            (item) => item?.marketId === current?.marketId
          );
          if (!existingObject) {
            acc.push(current);
          }
          return acc;
        }, []);
        soccer?.forEach((item) => {
          const { marketId } = item;
          if (!groupedData[marketId]) {
            groupedData[marketId] = [item];
          } else {
            groupedData[marketId].push(item);
          }
        });

        // Iterate through grouped data, merge objects, and sum up loosingAmount
        const mergedData = Object.values(groupedData)?.map((group) => {
          return group?.reduce((merged, item) => {
            merged.loosingAmount =
              (merged.loosingAmount || 0) + item.loosingAmount;
            merged.marketId = item.marketId;
            // Add other properties if needed
            return merged;
          }, {});
        });
        setSoccerProiftLoss(mergedData);
        dummyCurrentPositionObj["Soccer"] = uniqueMarketObjects;
      }
      if (greyhound?.length) dummyCurrentPositionObj["GreyHound"] = greyhound;
      if (horseRace?.length) dummyCurrentPositionObj["HorseRace"] = horseRace;

      setAllCurrentPosition(dummyCurrentPositionObj);

      console.log("resultsssssssssssssssss", dummyCurrentPositionObj);
      setIsFirstLoading(false);
      //  }
    }
  };
  useEffect(() => {
    handleGetCurrentPositionData();
    const intervalId = setInterval(handleGetCurrentPositionData, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNavigateFunction = (data, item) => {
    console.log(data, "======data");

    if (data?.toLowerCase() === "cricket")
      navigate(
        `${constRoute?.cricketMarketWise}?id=${item?.mId}&marketId=${item?.marketId}&market=${item?.subMarketId}`
      );
    else if (data?.toLowerCase() === "tenis")
      navigate(`${constRoute?.tennis}?id=${item?.mId}`);
    else if (data?.toLowerCase() === "soccer")
      navigate(
        `${constRoute?.soccerMarketWise}?id=${item?.mId}&marketId=${item?.marketId}&market=${item?.subMarketId}`
      );
    //                                http://localhost:3000/#/horse-race?id=1.221602434&matchId=655ffe14ebca7ef9b347178a&eId=32821224.0210
    else if (data?.toLowerCase() === "greyhound")
      navigate(
        `${constRoute?.greyhound}?id=${
          item?.marketId?.length ? item?.marketId : ""
        }&matchId=${item?.matchId}&eId=${item?.mId}`
      );
    else if (data?.toLowerCase() === "horserace")
      navigate(
        `${constRoute?.horseRace}?id=${
          item?.marketId?.length ? item?.marketId : ""
        }&matchId=${item?.matchId}&eId=${item?.mId}`
      );
  };
  // ------------------get market Name---------------

  const handleGetMarketName = (data) => {
    // console.log(' ==========data', data)
    const id = Number(data._id);
    if (id == 9) return "Figures";
    else if (id == 10) return "Even/Odd";
    else if (id === 34) return "Chota/Bara";
    else if (!isNaN(id)) {
      const market = data.marketId.find(
        (marketItem) => marketItem.id == data._id
      );
      return market?.marketName || "";
    } else return data?._id;
  };

  const handleSubMarketNames = (subMarketId) => {
    const arr = [
      {
        Id: 1,
        name: "Sports Book",
        marketId: "6",
        countryCode: "Sports Book",
      },
      {
        Id: 2,
        name: "Ezugi Casino",
        marketId: "6",
        countryCode: "ezugi",
      },
      {
        Id: 3,
        name: "evolution Casino",
        marketId: "6",
        countryCode: "evolution",
      },
      {
        Id: 4,
        name: "Betfair Games",
        marketId: "6",
        countryCode: "BF Games",
      },

      {
        Id: 5,
        name: "120 British Casino",
        marketId: "6",
        countryCode: "",
      },
      {
        Id: 6,
        marketId: "4",
        name: "Match Odds",
      },
      {
        Id: 7,
        name: "Fancy",
        marketId: "4",
      },
      {
        Id: 8,
        marketId: "4",
        name: "Bookmaker",
      },
      {
        Id: 9,
        name: "Figure",
        marketId: "4",
      },
      {
        Id: 10,
        name: "Even Odd",
        marketId: "4",
      },
      {
        Id: 11,
        marketId: "4",
        name: "Toss",
      },
      {
        Id: 12,
        marketId: "4",
        name: "Cup Winner",
      },

      {
        Id: 13,
        marketId: "1",
        name: "Match Odds",
      },
      {
        Id: 14,
        name: "Over/Under Goals",
        marketId: "1",
      },

      {
        Id: 15,
        marketId: "2",
        name: "Match Odds",
      },

      {
        Id: 16,
        marketId: "7",
        name: "Dubai",
        countryCode: "AE",
      },
      {
        Id: 17,
        marketId: "7",
        name: "Australia",
        countryCode: "AU",
      },
      {
        Id: 18,
        marketId: "7",
        name: "Bahrain",
        countryCode: "BH",
      },
      {
        Id: 19,
        marketId: "7",
        name: "France",
        countryCode: "FR",
      },
      {
        Id: 20,
        marketId: "7",
        name: "England",
        countryCode: "GB",
      },
      {
        Id: 21,
        marketId: "7",
        name: "England (PLACE)",
        countryCode: "GB",
      },
      {
        Id: 22,
        marketId: "7",
        name: "Ireland",
        countryCode: "IE",
      },
      {
        subMarketId: 23,
        marketId: "7",
        name: "Ireland (PLACE)",
        countryCode: "IE",
      },
      {
        Id: 24,
        marketId: "7",
        name: "New Zealand",
        countryCode: "NZ",
      },
      {
        Id: 25,
        marketId: "7",
        name: "Sweden",
        countryCode: "SE",
      },
      {
        Id: 26,
        marketId: "7",
        name: "Singapore",
        countryCode: "SG",
      },
      {
        Id: 27,
        marketId: "7",
        name: "America",
        countryCode: "US",
      },
      {
        Id: 28,
        marketId: "7",
        name: "Africa",
        countryCode: "ZA",
      },

      {
        Id: 29,
        marketId: "4339",
        name: "Australia",
        countryCode: "AU",
      },
      {
        Id: 30,
        marketId: "4339",
        name: "Britian",
        countryCode: "GB",
      },
      {
        Id: 31,
        marketId: "4339",
        name: "Ireland",
        countryCode: "IE",
      },
      {
        Id: 32,
        marketId: "4339",
        name: "New Zealand",
        countryCode: "NZ",
      },
      {
        Id: 33,
        marketId: "4339",
        name: "Africa",
        countryCode: "ZA",
      },
      {
        Id: 34,
        marketId: "4",
        name: "Chotta Bara",
      },
      {
        Id: 35,
        marketId: "4",
        name: "Tied Match",
      },
    ];
    const match = arr?.find((item) => item.Id == subMarketId);
    return match ? match.name : "";
  };

  const getSportsAmounts = (item, data) => {
    if (item === "Soccer") {
      return (
        <p style={{ color: "red" }}>
          {numberWithCommas(
            Math.round(
              soccerProiftLoss?.find((item) => item?.marketId == data?.marketId)
                ?.loosingAmount || 0
            )
          ) || 0}
        </p>
      );
    } else if (item === "Cricket") {
      return (
        <p style={{ color: "red" }}>
          {numberWithCommas(
            Math.round(
              cricketProiftLoss?.find(
                (item) => item?.marketId == data?.marketId
              )?.loosingAmount || 0
            )
          ) || 0}
        </p>
      );
    } else {
      return (
        <p style={{ color: "red" }}>
          {numberWithCommas(Math.round(data?.loosingAmount))}
        </p>
      );
    }
  };
  const dynamicCol = (item) => {
    return [
      {
        title: `${item}`,
        dataIndex: "name",
        width: "70%",
        render: (_, data) => {
          // return <div><p className={style.clickAble}  onClick={() => {
          //   handleNavigateFunction(item, data);
          // }}>{`${value}  /  (${handleGetMarketName(data)})
          // `
          // } </p></div>
          const fancyMarketData =
            data?.subMarketId === "7" && data?.sportsId === "4"
              ? handleSubMarketNames(data?.subMarketId) + " / " + data?.marketId
              : handleSubMarketNames(data?.subMarketId);
          // const subMarketIdData = fancyMarketData;
          const maketIdData = `${data?.event} / ${fancyMarketData}`;
          return (
            <div>
              <p
                className={style.clickAble}
                onClick={() => {
                  handleNavigateFunction(item, data);
                }}
              >
                {data?.event ? ` ${maketIdData}  ` : ""}
                {/* {`${value}  /  ${((Number(data.sportsId) === 7 || Number(data.sportsId) === 4339) ? "(Match Odds)": `(${handleGetMarketName(data)})`)}`} */}
              </p>
            </div>
          );
        },
      },
      {
        title: `${CAP_AMOUNT}`,
        dataIndex: "amount",
        render: (_, data) => {
          return getSportsAmounts(item, data);
        },
      },
    ];
  };
  const AntdTable = ({ tableData, item }) => {
    return (
      <Table
        checkPagination={false}
        dataSource={
          tableData[item]?.sort(
            (a, b) => Number(a?.amount) - Number(b?.amount)
          ) || []
        }
        columns={dynamicCol(item)}
        loading={false}
      />
    );
  };

  return (
    <Wrapper>
      {isFirstLoading ? (
        <div>
          <Spin className={style.antIconClass} size="large" />{" "}
        </div>
      ) : (
        <>
          <TitleBarUpdated
            title={"Market Position"}
            btnTitle={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {"Refresh"}
                <BsArrowRepeat className={style.refreshIcon} />
              </div>
            }
            isButton={true}
            //   enterButton={
            //   <div className={style.searchIcon}>
            //     <BsArrowRepeat className={style.iconSearch} />
            //     {'Refresh'}
            //   </div>
            // }
            clickHandler={() => {
              setIsFirstLoading(true);
              handleGetCurrentPositionData();
            }}
          />
          <Row>
            <Col className={style.tableCard} span={24}>
              <div className={style.tableWrraper}>
                {Object.keys(allCurrentPosition)?.length > 0 ? (
                  Object?.keys(allCurrentPosition)?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        style={{ marginTop: index === 0 ? "5px" : "10px" }}
                      >
                        <AntdTable
                          key={index}
                          tableData={allCurrentPosition}
                          item={item}
                        />
                      </div>
                    );
                  })
                ) : (
                  <div className={style.dataNotFound}>
                    <Empty />
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </>
      )}
    </Wrapper>
  );
});

const Wrapper = styled.div`
  padding: 10px;
  @media screen and (max-width: 650px) {
    padding: 4px 0px;
  }
`;
