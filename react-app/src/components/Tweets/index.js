import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


const Tweets = () => {
    const history = useHistory();



    const sessionUser = useSelector(state => state.session.user)


    return (
        <>
            <div>
                <h1>All Tweets</h1>
            </div>
        </>
    )
}

export default Tweets
