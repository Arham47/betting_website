/* eslint-disable eqeqeq */
import { observer } from "mobx-react";
import { useState } from "react";
import Table from "@components/common-components/table";
import { Row } from "antd";
import style from "../style.module.scss";
import styled from "styled-components";
import useWindowSize from "@utils/hooks/useWindowSize";
import RulesModal from "../rulesModal";
import { BET_DELAY_NUMBER, NUM_STR_5_ROLE } from "@utils/const";
import {
  formatLargeNumberWithKValues,
  numberWithCommas,
  truncate,
} from "@utils/common-functions";
import { useStore } from "@stores/root-store";
import { FaIdBadge } from "react-icons/fa";
import moment from "moment";
import { constRoute } from "@utils/route";
import { useNavigate } from "react-router-dom";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";
interface AllMatchesTableProps {
  tableData?: any;
  loading?: boolean;
  setIsEditStake?: any;
  isEditStake?: any;
  setBetPlayType?: any;
  copyDataOfFakeBets?: any;
  scoreBoard?: any;
  liveMatchData?: any;
  marketId?: any;
  eventName?: any;
  horseRaceHeading?: any;
  raceStatus?: any;
  runnersData?: any;
  eventWinner?: any;
  getMatchBetsData?: any;
  matchId?: any;
}

const AllMatchesTable: React.FC<AllMatchesTableProps> = observer(
  ({
    raceStatus,
    liveMatchData,
    setIsEditStake,
    isEditStake,
    matchId,
    getMatchBetsData,
    eventWinner,
    runnersData,
    setBetPlayType,
    horseRaceHeading,
    scoreBoard,
    eventName,
    marketId,
    tableData,
    copyDataOfFakeBets,
    ...props
  }) => {
    const innerWidth = useWindowSize().width;
    const [rulesModalOpen, setRulesModalOpen] = useState(false);
    const navigate = useNavigate();
    const {
      user: { getUserInfo },
    } = useStore(null);
    const getTimeDiff = (timeString) => {
      const currentTime = moment();
      const time = moment(timeString);

      if (time.isSameOrAfter(currentTime)) {
        const timeDifferenceMinutes = time.diff(currentTime, "minutes");

        if (timeDifferenceMinutes <= 1) {
          return "In a minute";
        } else if (timeDifferenceMinutes < 60) {
          return `In ${timeDifferenceMinutes} minutes`;
        } else {
          const days = Math.floor(timeDifferenceMinutes / (60 * 24)); // Calculate days
          const hours = Math.floor((timeDifferenceMinutes % (60 * 24)) / 60);
          const minutes = timeDifferenceMinutes % 60;

          if (days === 0) {
            if (hours === 1) {
              return `In ${hours} hour and ${minutes} minutes `;
            } else if (hours > 1) {
              return `In ${hours} hours and ${minutes} minutes `;
            } else {
              return `In ${minutes} minutes `;
            }
          } else {
            return `In ${days} days and ${hours} hours `;
          }
        }
      } else {
        const timeDifferenceMinutes = currentTime.diff(time, "minutes");

        if (timeDifferenceMinutes <= 1) {
          return "a minute ago";
        } else if (timeDifferenceMinutes < 60) {
          return `${timeDifferenceMinutes} minutes ago`;
        } else {
          const days = Math.floor(timeDifferenceMinutes / (60 * 24)); // Calculate days
          const hours = Math.floor((timeDifferenceMinutes % (60 * 24)) / 60);
          const minutes = timeDifferenceMinutes % 60;

          if (days === 0) {
            if (hours === 1) {
              return `${hours} hour and ${minutes} minutes ago`;
            } else if (hours > 1) {
              return `${hours} hours and ${minutes} minutes ago`;
            } else {
              return `${minutes} minutes ago`;
            }
          } else {
            return `${days} days and ${hours} hours ago`;
          }
        }
      }
    };
    const colorList = [
      "#8b4513",
      "#2e8b57",
      "#9932cc",
      "#556b2f",
      "#8b008b",
      "#FA370D",
      "#4b0082",
      "#A66603",
      "#8a2be2",
      "#a0522d",
      "#800000",
      "#44A603",
      "#0C73A6",
      "#900C3F",
      "#A61403",
      "#0CA678",
      "#800080",
      "#008080",
      "#0FC000",
      "#20b2aa",
      "#FF5733",
      "#10A8B0",
    ];
    const colorListReverse = colorList.reverse();
    const columns = [
      {
        title: "",
        render: (_, data, ind) => {
          return (
            <div>
              {ind === 0 ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 6,
                    borderBottom: "1px solid gray",
                    borderTop: "1px solid gray",
                    gap: 6,
                  }}
                >
                  <b
                    className="dynamicColorOnHover"
                    style={{ fontSize: "1rem" }}
                  >
                    {liveMatchData?.eventNodes?.length
                      ? liveMatchData?.eventNodes[0]?.marketNodes?.description
                          ?.marketTime
                        ? moment(
                            liveMatchData?.eventNodes[0]?.marketNodes
                              ?.description?.marketTime
                          )?.format("MMM D h:mm A")
                        : "-"
                      : "-"}
                  </b>
                  <span
                    className="dynamicColorOnHover"
                    style={{ fontSize: "1rem" }}
                  >{`Winners: ${
                    liveMatchData?.eventNodes?.length
                      ? liveMatchData?.eventNodes[0]?.marketNodes?.state
                          ?.numberOfWinners || 0
                      : "-"
                  } `}</span>
                  <span
                    className="dynamicColorOnHover"
                    style={{ fontSize: "1rem" }}
                  >{`Bet Delay: ${BET_DELAY_NUMBER}`}</span>
                  <span
                    className="dynamicColorOnHover"
                    style={{ fontSize: "1rem" }}
                  >
                    {liveMatchData?.eventNodes?.length
                      ? liveMatchData?.eventNodes[0]?.marketNodes?.description
                          ?.marketTime
                        ? getTimeDiff(
                            liveMatchData?.eventNodes[0]?.marketNodes
                              ?.description?.marketTime
                          )
                        : "-"
                      : "-"}
                  </span>
                  <span
                    className="dynamicColorOnHover"
                    style={{ fontSize: "1rem" }}
                  >
                    {liveMatchData?.eventNodes?.length
                      ? formatLargeNumberWithKValues(
                          liveMatchData?.eventNodes[0]?.marketNodes?.state
                            ?.totalMatched
                        ) || 0
                      : "-"}
                  </span>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 10,
                    borderBottom: "1px solid gray",
                    borderTop: "1px solid gray",
                  }}
                >
                  {" "}
                  <b
                    style={{ fontSize: "1rem" }}
                    className="dynamicColorOnHover"
                  >
                    {data?.marketName}
                  </b>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ paddingLeft: 6 }}>
                  {data?.runners?.map((i, key) => (
                    <CuntriesHeader
                      className="dynamicColorOnHover"
                      key={key}
                      style={{
                        background:
                          i?.description?.runnerName == eventWinner
                            ? "lightgreen"
                            : "",
                      }}
                    >
                      <span
                        className="dynamicColorOnHover"
                        style={{
                          fontWeight: "bold",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          color: colorListReverse[key],
                        }}
                      >{`${
                        innerWidth > 450
                          ? i?.description?.runnerName || ""
                          : truncate(i?.description?.runnerName, 10) || ""
                      }`}</span>
                      <div
                        style={{
                          color:
                            runnersData?.find(
                              (item) => item?.selectionId == i?.selectionId
                            )?.profitLoss > 0
                              ? "#00a826"
                              : "red",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        {getMatchBetsData?.some((z) => z?.marketId == data?.mid)
                          ? runnersData?.find(
                              (item) => item?.selectionId == i?.selectionId
                            )?.profitLoss
                            ? Math.round(
                                Number(
                                  runnersData?.find(
                                    (item) =>
                                      item?.selectionId == i?.selectionId
                                  )?.profitLoss
                                )
                              )
                            : "0"
                          : ""}
                      </div>
                    </CuntriesHeader>
                  ))}
                </div>
                <div style={{ display: "flex", width: "50%" }}>
                  <div style={{ width: "50%" }}>
                    <div>
                      {data?.runners?.map((value, indexs) => {
                        if (
                          value?.state?.status === "ACTIVE" &&
                          !["CLOSED", "SUSPENDED"]?.includes(raceStatus?.status)
                        ) {
                          return (
                            <div
                              style={{
                                display: "flex",
                                height: 49,
                                background: "#8DD2F0",
                                justifyContent:
                                  value?.exchange?.availableToBack?.length === 3
                                    ? "center"
                                    : "left",
                              }}
                            >
                              {innerWidth > 890
                                ? value?.exchange?.availableToBack?.length
                                  ? [...value?.exchange?.availableToBack]
                                      ?.reverse()
                                      ?.map((item, index) => {
                                        return (
                                          <BackValueWrraper
                                            className={
                                              (copyDataOfFakeBets?.length &&
                                                copyDataOfFakeBets[ind]?.runners
                                                  ?.length &&
                                                copyDataOfFakeBets[ind]
                                                  ?.runners[indexs]?.exchange
                                                  ?.availableToBack?.length &&
                                                [
                                                  ...copyDataOfFakeBets[ind]
                                                    ?.runners[indexs]?.exchange
                                                    ?.availableToBack,
                                                ]?.reverse()[index]?.price !==
                                                  item?.price) ||
                                              (copyDataOfFakeBets?.length &&
                                                copyDataOfFakeBets[ind]?.runners
                                                  ?.length &&
                                                copyDataOfFakeBets[ind]
                                                  ?.runners[indexs]?.exchange
                                                  ?.availableToBack?.length &&
                                                [
                                                  ...copyDataOfFakeBets[ind]
                                                    ?.runners[indexs]?.exchange
                                                    ?.availableToBack,
                                                ]?.reverse()[index]?.size !==
                                                  item?.size)
                                                ? style.changeBackground
                                                : ""
                                            }
                                            onClick={() => {
                                              if (
                                                getUserInfo?.role ===
                                                NUM_STR_5_ROLE
                                              ) {
                                                setIsEditStake({
                                                  ...isEditStake,
                                                  status: true,
                                                  val: item?.price,
                                                  runnerName: value?.runnerName,
                                                });
                                                setBetPlayType(1);
                                              }
                                            }}
                                            bg={"#8DD2F0"}
                                            hoverBg={"#8DD2F0"}
                                          >
                                            <BackValues>
                                              {item?.price ? item?.price : ""}
                                            </BackValues>
                                            <TotalValues>
                                              {item?.size
                                                ? formatLargeNumberWithKValues(
                                                    item?.size,
                                                    1
                                                  )
                                                    ?.toString()
                                                    ?.replace(".0", "")
                                                : ""}
                                            </TotalValues>
                                          </BackValueWrraper>
                                        );
                                      })
                                  : ""
                                : value?.exchange?.availableToBack
                                    ?.slice(0, 1)
                                    ?.map((item, index) => {
                                      return (
                                        <BackValueWrraper
                                          className={
                                            copyDataOfFakeBets?.length &&
                                            copyDataOfFakeBets[ind]?.runners
                                              ?.length &&
                                            copyDataOfFakeBets[ind]?.runners[
                                              indexs
                                            ]?.exchange?.availableToBack
                                              ?.length &&
                                            copyDataOfFakeBets[ind]?.runners[
                                              indexs
                                            ]?.exchange?.availableToBack[index]
                                              ?.price !== item?.price
                                              ? style.changeBackground
                                              : ""
                                          }
                                          onClick={() => {
                                            if (
                                              getUserInfo?.role ===
                                              NUM_STR_5_ROLE
                                            ) {
                                              setIsEditStake({
                                                ...isEditStake,
                                                status: true,
                                                val: item?.price,
                                                runnerName: value?.runnerName,
                                              });
                                              setBetPlayType(1);
                                            }
                                          }}
                                          bg={"#8dd2f0"}
                                          hoverBg={"#8DD2F0"}
                                        >
                                          <BackValues>
                                            {item?.price ? item?.price : ""}
                                          </BackValues>
                                          <TotalValues>
                                            {item?.size
                                              ? formatLargeNumberWithKValues(
                                                  item?.size,
                                                  1
                                                )
                                                  ?.toString()
                                                  ?.replace(".0", "")
                                              : ""}
                                          </TotalValues>
                                        </BackValueWrraper>
                                      );
                                    })}
                            </div>
                          );
                        } else {
                          return (
                            <div
                              style={{
                                height: 48,
                                background: "#ececed",
                                width: "200%",
                                marginTop: 2,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <div
                                style={{
                                  color: "red",
                                  textAlign: "center",
                                  position: "absolute",
                                  fontSize: "1rem",
                                }}
                              >
                                {raceStatus?.status === "CLOSED" ||
                                raceStatus?.status === "SUSPENDED"
                                  ? raceStatus?.status
                                  : value?.state?.status}
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>

                  <div style={{ width: "50%" }}>
                    <div>
                      {data?.runners?.map((value, indexs) => {
                        if (
                          value?.state?.status === "ACTIVE" &&
                          !["CLOSED", "SUSPENDED"]?.includes(raceStatus?.status)
                        ) {
                          return (
                            <div
                              style={{
                                display: "flex",
                                height: 49,
                                background: "#FFAFB2",
                                justifyContent:
                                  value?.exchange?.availableToLay?.length === 3
                                    ? "center"
                                    : "left",
                              }}
                            >
                              {innerWidth > 890
                                ? value?.exchange?.availableToLay?.map(
                                    (item, index) => {
                                      return (
                                        <BackValueWrraper
                                          className={
                                            copyDataOfFakeBets?.length &&
                                            copyDataOfFakeBets[ind]?.runners
                                              ?.length &&
                                            copyDataOfFakeBets[ind]?.runners[
                                              indexs
                                            ]?.exchange?.availableToLay
                                              ?.length &&
                                            copyDataOfFakeBets[ind]?.runners[
                                              indexs
                                            ]?.exchange?.availableToLay[index]
                                              ?.price !== item?.price
                                              ? style.changeBackground
                                              : ""
                                          }
                                          onClick={() => {
                                            if (
                                              getUserInfo?.role ===
                                              NUM_STR_5_ROLE
                                            ) {
                                              setIsEditStake({
                                                ...isEditStake,
                                                status: true,
                                                val: item?.price,
                                                runnerName: value?.runnerName,
                                              });
                                              setBetPlayType(0);
                                            }
                                          }}
                                          bg={"#FFAFB2"}
                                          hoverBg={"#FFAFB2"}
                                        >
                                          <BackValues>
                                            {item?.price ? item?.price : ""}
                                          </BackValues>
                                          <TotalValues>
                                            {item?.size
                                              ? formatLargeNumberWithKValues(
                                                  item?.size,
                                                  1
                                                )
                                                  ?.toString()
                                                  ?.replace(".0", "")
                                              : ""}
                                          </TotalValues>
                                        </BackValueWrraper>
                                      );
                                    }
                                  )
                                : value?.exchange?.availableToLay
                                    ?.slice(0, 1)
                                    ?.map((item, index) => {
                                      return (
                                        <BackValueWrraper
                                          className={
                                            copyDataOfFakeBets?.length &&
                                            copyDataOfFakeBets[ind]?.runners
                                              ?.length &&
                                            copyDataOfFakeBets[ind]?.runners[
                                              indexs
                                            ]?.exchange?.availableToLay
                                              ?.length &&
                                            copyDataOfFakeBets[ind]?.runners[
                                              indexs
                                            ]?.exchange?.availableToLay[index]
                                              ?.price !== item?.price
                                              ? style.changeBackground
                                              : ""
                                          }
                                          onClick={() => {
                                            if (
                                              getUserInfo?.role ===
                                              NUM_STR_5_ROLE
                                            ) {
                                              setIsEditStake({
                                                ...isEditStake,
                                                status: true,
                                                val: item?.price,
                                                runnerName: value?.runnerName,
                                              });
                                              setBetPlayType(0);
                                            }
                                          }}
                                          bg={"#FFAFB2"}
                                          hoverBg={"#FFAFB2"}
                                        >
                                          <BackValues>
                                            {item?.price ? item?.price : ""}
                                          </BackValues>
                                          <TotalValues>
                                            {item?.size
                                              ? formatLargeNumberWithKValues(
                                                  item?.size,
                                                  1
                                                )
                                                  ?.toString()
                                                  ?.replace(".0", "")
                                              : ""}
                                          </TotalValues>
                                        </BackValueWrraper>
                                      );
                                    })}
                            </div>
                          );
                        } else {
                          return (
                            <div
                              style={{
                                height: 48,
                                background: "#ececed",
                                width: "100%",
                                marginTop: 2,
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                              }}
                            ></div>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        },
      },
    ];

    return (
      <MainTableWrraper>
        <Row className={style.eventHeader}>
          <TitleBarUpdated
            title={
              <span className={style.mainSpan}>
                {liveMatchData?.eventNodes?.length
                  ? liveMatchData?.eventNodes[0]?.event?.eventName || ""
                  : ""}{" "}
                <span className={style.firstSpan}>
                  {liveMatchData?.eventNodes?.length
                    ? innerWidth > 700
                      ? "  -  " +
                        liveMatchData?.eventNodes?.[0]?.marketNodes?.description
                          ?.marketName +
                        " - Match Odds"
                      : truncate(
                          "  -  " +
                            liveMatchData?.eventNodes?.[0]?.marketNodes
                              ?.description?.marketName +
                            " - Match Odds",
                          20
                        )
                    : ""}
                </span>{" "}
                {liveMatchData?.eventNodes?.length ? (
                  <span>
                    {" "}
                    {raceStatus?.status === "CLOSED" ||
                    raceStatus?.status === "SUSPENDED"
                      ? raceStatus?.status
                      : "OPEN"}
                  </span>
                ) : (
                  ""
                )}
                <span className={style.userIcon}>
                  <FaIdBadge
                    onClick={() => {
                      navigate(
                        `${constRoute?.userBookGreyHound}?id=${matchId}`,
                        { state: liveMatchData }
                      );
                      const otherEvents = JSON.parse(
                        localStorage.getItem("userBookEvent")
                      );
                      localStorage.setItem(
                        "userBookEvent",
                        JSON.stringify({
                          ...otherEvents,
                          greyHound:
                            liveMatchData?.eventNodes[0]?.event?.eventName,
                        })
                      );
                    }}
                  />
                </span>{" "}
              </span>
            }
          />
        </Row>
        <Table
          loading={props?.loading}
          checkPagination={false}
          dataSource={tableData}
          columns={columns}
          showHeader={false}
        />
        <RulesModal
          open={rulesModalOpen}
          title={"Market Rules"}
          setOpen={setRulesModalOpen}
        />
      </MainTableWrraper>
    );
  }
);

export default AllMatchesTable;

const MainTableWrraper = styled.div`
  width: 100%;
`;
const BackValueWrraper = styled.span<{ bg?: string; hoverBg?: string }>`
  width: 30%;
  margin-left: 5px;
  margin-top: 3px;
  // height: 50px;
  display: flex;
  color: #121212;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex-direction: column;
  background-color: ${(p) => (p.bg ? p.bg : "#eeee")};
  .changeBackground {
    background-color: yellow !important;
    transition: background-color 0.5s !important;
  }
  &:hover {
    background-color: ${(p) => p.hoverBg};
    cursor: pointer;
  }
`;

const BackValues = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #121212;
`;
const CuntriesHeader = styled.p`
  font-size: 1rem;
  height: 50px;
  margin: 0px;
  padding-left: 4px;
  display: flex;
  flex-direction: column;
  // align-items:center;
  justify-content: center;
  // color: #121212;

  // color: #121212;
`;
const TotalValues = styled.span`
  color: #121212;
`;
