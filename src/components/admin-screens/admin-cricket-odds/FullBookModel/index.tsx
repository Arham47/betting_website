import React, { memo, useEffect, useState } from "react";
import { Modal } from "antd";
import { observer } from "mobx-react";
import styled from "styled-components";
import style from "./style.module.scss";
import { useTheme } from "@utils/hooks/useTheme";
import CustomButton from "@components/common-components/custom-button";
import { useStore } from "@stores/root-store";
import Table from "@components/common-components/table";

interface ModalHandle {
  open?: any;
  setOpen?: any;
  handlelSubmit?: any;
  title?: string;
  fetchPayload?: any;
  loading?: any;
  matchData?: any;
  setTitle?: any;
  liveMatchData?: any;
  getMatchedBetsData?: any;
  filterData?: any;
}
const FullBookModel: React.FC<ModalHandle> = observer(
  ({
    getMatchedBetsData,
    filterData,
    liveMatchData,
    open,
    title,
    handlelSubmit,
    setOpen,
    fetchPayload,
    matchData,
    loading,
    setTitle,
    ...props
  }) => {
    const {
      user: {loadingForFullBook, getUserInfo, loadFullBookDetailData },
    } = useStore(null);
    const theme = useTheme();
    const handleCancel = () => {
      setOpen(false);
      setTitle('')
      setFullBookData([])
      setLoadingTable(true)
    };
    const [fullBookData, setFullBookData] = useState([])
    const [loadingTable, setLoadingTable] = useState(true)
    let calculationData = []
    function calculateOutcomeForScore(score) {
      let totalWins = 0;
      let totalLosses = 0;
  // console.log('calculation', calculationData)
      // Loop through each entry in the data
      calculationData.forEach(entry => {
          // If type is 0
          if (entry.type === 1) {
              // If the score is greater than or equal to the runner value
              if (score >= parseInt(entry.betRate)) {
                totalLosses += entry.loosingAmount; // for admin it will reverse
                   // add to the winnings
              } else {
                totalWins += entry.maxWinningAmount; // add to the losses
              }
          } 
          // If type is 1
          else if (entry.type === 0) {
              // If the score is less than or equal to the runner value
              if (score <= parseInt(entry.betRate)) {
                totalLosses += entry.loosingAmount; // for admin it will reverse
                 // add to the winnings
              } else {
                totalWins += entry.maxWinningAmount; // add to the losses
              }
          }
      });
  
      return { wins: totalWins, losses: totalLosses };
  }
  function generateScores(data) {
    let runners = data.map(entry => parseInt(entry.betRate));
    if (runners.length === 0) {
      return [];
    }
  
    // Find the minimum and maximum numbers in the array
    const minNumber = Math.min(...runners);
    const maxNumber = Math.max(...runners);
  
    // Create a new array with the range from minNumber - 1 to maxNumber + 1
    const range = [];
    for (let i = minNumber - 1; i <= maxNumber + 1; i++) {
      range.push(i.toString());
    }


    console.log('runners', runners)
    // let uniqueRunners = runners.filter((value, index, self) => {
    //   return self.indexOf(value) === index;
    // });
    // // let uniqueRunners = [...new Set(runners)]; // Remove duplicate values

    // let scores = [];

    // // For each unique runner value
    // uniqueRunners.forEach(runner => {
    //     scores.push((runner - 1).toString());  // add one value less than the runner
    //     scores.push(runner.toString());        // add the runner itself
    //     scores.push((runner + 1).toString());  // add one value more than the runner
    // });

    // Return the resulting list, removing duplicates and sorting
    let scoreUnique = range.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
    return [...scoreUnique.sort((a, b) => parseInt(a) - parseInt(b))]
    // return [...new Set(scores)].sort((a, b) => parseInt(a) - parseInt(b)); 
}
   const handleFullBookDetailData = async()=>{
    const payload = {
      matchId: liveMatchData?._id,
      fancyName: title,
      isAdmin : true
    }

    // const res = await loadFullBookDetailData(payload)
      calculationData = filterData
      const scores = generateScores(filterData);
      const arrayForFullBook = []
      scores.forEach(score => {
        const outcome = calculateOutcomeForScore(score);
        console.warn(`For score ${score}, Wins: ${outcome.wins}, Losses: ${outcome.losses}`);
        arrayForFullBook.push({score:score, position: outcome.wins + outcome.losses})
    })
    console.warn('arrayForFullBook', arrayForFullBook)
    setFullBookData(arrayForFullBook)
    setLoadingTable(false)
  }
    useEffect(()=>{
   if(title) handleFullBookDetailData()
    }, [title])
    const columns =[
      {
        title: "Sccore",
        render: (text, data, index) => <p>{data?.score || ''}</p>,
      },
      {
        title: "Position",
        render: (text, data, index) => <p style={{color: data?.position>=0 ? 'green': 'red'}}>{Math.round(Number(data?.position || 0)) || 0}</p>,
      },
  ]
    return (
      <>
        <Modal
          open={open}
          //   title={title}
          closable={true}
          onOk={handlelSubmit}
          className={`${theme} ${style.antModalPlaceBet}`}
          onCancel={handleCancel}
          footer={null}
        >
          <div className={style.wrapper}>
            <div className={style.titleWrapper}>
              <div className={style.titleClass}>{title}</div>
              <div>
                <CustomButton title="Refresh"  />
              </div>
            </div>

            <div className={style.tableWrapper}>
            <Table
              dataSource={fullBookData}
              columns={columns}
              loading={loadingTable}
              />
      </div>

          </div>
        </Modal>
      </>
    );
  }
);

export default memo(FullBookModel);

const BettingValuesWrraper = styled.span`
  font-size: 16px;
  padding: 4px;
  color: #121212;
  background: #ccc;
  dispaly: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  margin: 4px;
  cursor: pointer;
`;
