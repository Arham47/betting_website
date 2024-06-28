import React, { Component } from "react";
import style from "./style.module.scss";
import { ArrowRightOutlined } from "@ant-design/icons";
import CustomButton from "../custom-button";

class UpdateProfileBox extends Component {
  render() {
    return (
      <div className={style.updateProfileBoxContainer}>
        <p>
          <b>Update your profile</b> to improve your Dr. Clinica experience
        </p>
        {/* <Button type="primary" className={style.btn}>
          Update Profile <ArrowRightOutlined />
        </Button> */}
        <CustomButton
          title={"Update Profile"}
          endData={<ArrowRightOutlined />}
        />
      </div>
    );
  }
}

export default UpdateProfileBox;
