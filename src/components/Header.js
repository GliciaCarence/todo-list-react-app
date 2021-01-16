import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
    return (
        <header className="header">
            <FontAwesomeIcon icon="list-alt" className="list-alt" size="3x" />
            <h1 className="title">Todo List</h1>
        </header>
    );
};

export default Header;
