import React, { useState } from "react";
import "./index.css";
import { IpropHeaderMenu } from "../../../interfaces/menu-home-page";
import {
  modalTypes,
  optionLanguage,
  routes,
} from "../../../constants/constant";
import { getCurrentUser, logOut } from "../../../services/auth.service";
import { IeventOnchangeSelect } from "../../../interfaces/common.interface";
import i18next from "i18next";
import { Container, Dropdown } from "react-bootstrap";
import { FaSignInAlt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { BsFlag } from "react-icons/bs";
import Select from "react-select";
import { withTranslation } from "react-i18next";
import ModalBootstrapCommon from "../../commons/modal-bootstrap";

const HeaderMenuPage = (props: IpropHeaderMenu) => {
  const { t } = props;
  const currentUser = getCurrentUser();
  const [state, setState] = useState({
    isLanguage: false,
  });

  const { isLanguage } = state;
  const onSelectLanguage = (e: IeventOnchangeSelect) => {
    i18next.changeLanguage(e?.value);
    setState({ ...state, isLanguage: false });
  };
  const logout = () => {
    logOut();
  };

  const content = (
    <Select options={optionLanguage} onChange={(e) => onSelectLanguage(e)} />
  );

  return (
    <Container>
      <div className="HeaderMenuPage text-white">
        <Dropdown className="mt-1">
          <Dropdown.Toggle
            className="bg-light text-primary"
            size="sm"
            href={routes.login}
          >
            <FaSignInAlt />{" "}
            {currentUser ? (
              <a href="/" onClick={() => logout()}>
                {t("SignOut")}
              </a>
            ) : (
              "SignIn"
            )}
          </Dropdown.Toggle>
          {" | "}
          <Dropdown.Toggle
            className="bg-light text-primary"
            size="sm"
            href={routes.register}
          >
            <FiLogOut /> {t("SignUp")}
          </Dropdown.Toggle>{" "}
          {" | "}
          <Dropdown.Toggle
            className="bg-light text-primary"
            size="sm"
            onClick={() => setState({ ...state, isLanguage: true })}
          >
            <BsFlag /> {t("Language")}
          </Dropdown.Toggle>
          <ModalBootstrapCommon
            isShowModal={isLanguage}
            onCloseModal={() => setState({ ...state, isLanguage: false })}
            type={modalTypes.OPTIONS}
            body={content}
            nameTitle="language"
            size="sm"
          />
        </Dropdown>
      </div>
    </Container>
  );
};

export default withTranslation()(HeaderMenuPage);
