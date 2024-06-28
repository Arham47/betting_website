/* eslint-disable eqeqeq */
import { useStore } from '@stores/root-store';
import { constRoute } from '@utils/route';
import React, { useEffect, useState } from 'react';
import { isMobile } from "react-device-detect";
import { Col, Empty, Row } from 'antd';
import style from "./style.module.scss"
import TitleBarUpdated from '@components/users/common-components/title-bar-updated';
const SportBook: React.FC = () => {
  const {user: { getUserInfo },
    bet: {loadAllSelectedCasinos}
  } = useStore(null);
  useEffect(()=>{
    window.scrollTo(0, 0);
}, []);
  const [filterGame, setFilterGame] = useState([])
const handleGameListIframe=async(data)=>{
window.open(`${window.location.href.replaceAll("/sports-book",`${constRoute.relatedGame}?hasId=${data?.id_hash}`)}`,"_blank");

}
const handleLoadSelectedCasinosGames = async () => {
  const payload = {
    numRecords:20,
    isMobile,
    gameCategory: 'digitain',
  };
  const res = await loadAllSelectedCasinos(payload);
  console.warn('res', res)
const filterGamesData =  res?.results?.filter((item)=>item?.name=='Sportsbook')
setFilterGame(res?.results)
};
useEffect(() => {
   handleLoadSelectedCasinosGames();
 }, []);
  return (
    <div className={style.mainWrapper}>
      <Row>
      <Col md={24} lg={18} sm={24} xs={24}>
        <TitleBarUpdated title={'Sport Book'}/>
        </Col>
      </Row>
      <Row gutter={[20, 20]}>
      {filterGame?.length>0 ?filterGame?.map((item, index) => {
              return (
                <>
                  <Col key={index} md={8} lg={6} sm={12} xs={12} className={style.secondCol}>
                   {  <div
                      className={`${style.imgWrapper} ${style.cardAnimation}`}
                      
                      onClick={async() =>{
                        // eslint-disable-next-line eqeqeq
                        if(getUserInfo?.role=="5")
                        await  handleGameListIframe(item)
                        }}
                    >
                      <img src={item?.image_filled} alt="" />
                      <div className={style.gameName} >{item?.name || '' }</div>
                    </div>}
                  </Col>
                </>
              );
            }) : 
            <div className={style.emptyClass} style={{width:"100%"}}>
            <Empty />
            </div>
            }
            </Row>
    </div>
  );
};

export default SportBook;
