export default ({odds}) => {

    const buyYes = () => odds - 1
    const buyNo  = () => 100 - odds - 1
    const sellYes= () => parseInt(odds) + 1
    const sellNo = () => 100 - parseInt(odds) + 1
    const canYes = () => parseInt(odds) - 1
    const canNo  = () => 100 - parseInt(odds) - 1

    if (odds === 0) return (
        <ul>
            {/* <li>Buy "Yes" shares for <span className='green'>{buyYes(odds)}¢ or less</span></li> */}
            <li>Buy "No" shares for <span className='green'>{buyNo(odds)}¢ or less</span></li>
            <li>Sell "Yes" shares for <span className='green'>{sellYes(odds)}¢ or more</span></li>
            {/* <li>Sell "No" shares for <span className='green'>{sellNo(odds)}¢ or more</span></li> */}
            {/* <li>Cancel Orders To Sell "Yes" shares for <span className='green'>{canYes(odds)}¢ or less</span></li> */}
            <li>Cancel Orders To Sell "No" shares for <span className='green'>{canNo(odds)}¢ or less</span></li>
        </ul>
    )
    if (odds === 1) return (
        <ul>
            {/* <li>Buy "Yes" shares for <span className='green'>{buyYes(odds)}¢ or less</span></li> */}
            <li>Buy "No" shares for <span className='green'>{buyNo(odds)}¢ or less</span></li>
            <li>Sell "Yes" shares for <span className='green'>{sellYes(odds)}¢ or more</span></li>
            {/* <li>Sell "No" shares for <span className='green'>{sellNo(odds)}¢ or more</span></li> */}
            {/* <li>Cancel Orders To Sell "Yes" shares for <span className='green'>{canYes(odds)}¢ or less</span></li> */}
            <li>Cancel Orders To Sell "No" shares for <span className='green'>{canNo(odds)}¢ or less</span></li>
        </ul>
    )
    if (odds === 2) return (
        <ul>
            <li>Buy "Yes" shares for <span className='green'>{buyYes(odds)}¢</span></li>
            <li>Buy "No" shares for <span className='green'>{buyNo(odds)}¢ or less</span></li>
            <li>Sell "Yes" shares for <span className='green'>{sellYes(odds)}¢ or more</span></li>
            <li>Sell "No" shares for <span className='green'>{sellNo(odds)}¢ or more</span></li>
            <li>Cancel Orders To Sell "Yes" shares for <span className='green'>{canYes(odds)}¢</span></li>
            <li>Cancel Orders To Sell "No" shares for <span className='green'>{canNo(odds)}¢ or less</span></li>
        </ul>
    )
    if (odds === 100) return (
        <ul>
            <li>Buy "Yes" shares for <span className='green'>{buyYes(odds)}¢ or less</span></li>
            {/* <li>Buy "No" shares for <span className='green'>{buyNo(odds)}¢ or less</span></li> */}
            {/* <li>Sell "Yes" shares for <span className='green'>{sellYes(odds)}¢ or more</span></li> */}
            <li>Sell "No" shares for <span className='green'>{sellNo(odds)}¢ or more</span></li>
            <li>Cancel Orders To Sell "Yes" shares for <span className='green'>{canYes(odds)}¢ or less</span></li>
            {/* <li>Cancel Orders To Sell "No" shares for <span className='green'>{canNo(odds)}¢ or less</span></li> */}
        </ul>
    )
    if (odds === 99) return (
        <ul>
            <li>Buy "Yes" shares for <span className='green'>{buyYes(odds)}¢ or less</span></li>
            {/* <li>Buy "No" shares for <span className='green'>{buyNo(odds)}¢ or less</span></li> */}
            {/* <li>Sell "Yes" shares for <span className='green'>{sellYes(odds)}¢ or more</span></li> */}
            <li>Sell "No" shares for <span className='green'>{sellNo(odds)}¢ or more</span></li>
            <li>Cancel Orders To Sell "Yes" shares for <span className='green'>{canYes(odds)}¢ or less</span></li>
            {/* <li>Cancel Orders To Sell "No" shares for <span className='green'>{canNo(odds)}¢ or less</span></li> */}
        </ul>
    )
    if (odds === 98) return (
        <ul>
            <li>Buy "Yes" shares for <span className='green'>{buyYes(odds)}¢ or less</span></li>
            <li>Buy "No" shares for <span className='green'>{buyNo(odds)}¢</span></li>
            <li>Sell "Yes" shares for <span className='green'>{sellYes(odds)}¢</span></li>
            <li>Sell "No" shares for <span className='green'>{sellNo(odds)}¢ or more</span></li>
            <li>Cancel Orders To Sell "Yes" shares for <span className='green'>{canYes(odds)}¢ or less</span></li>
            <li>Cancel Orders To Sell "No" shares for <span className='green'>{canNo(odds)}¢</span></li>
        </ul>
    )
    return (
        <ul>
            <li>Buy "Yes" shares for <span className='green'>{buyYes(odds)}¢ or less</span></li>
            <li>Buy "No" shares for <span className='green'>{buyNo(odds)}¢ or less</span></li>
            <li>Sell "Yes" shares for <span className='green'>{sellYes(odds)}¢ or more</span></li>
            <li>Sell "No" shares for <span className='green'>{sellNo(odds)}¢ or more</span></li>
            <li>Cancel Orders To Sell "Yes" shares for <span className='green'>{canYes(odds)}¢ or less</span></li>
            <li>Cancel Orders To Sell "No" shares for <span className='green'>{canNo(odds)}¢ or less</span></li>
        </ul>
    )
}

// export default SuggestedTransactions
