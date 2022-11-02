export default ({odds}) => {
    if (odds === 0) return (
        <ul>
            {/* <li>Buy "Yes" shares for <span className='green'>{odds-1}¢ or less</span></li> */}
            <li>Buy "No" shares for <span className='green'>{100-odds - 1}¢ or less</span></li>
            <li>Sell "Yes" shares for <span className='green'>{parseInt(odds) + 1}¢ or more</span></li>
            {/* <li>Sell "No" shares for <span className='green'>{100 - parseInt(odds) + 1}¢ or more</span></li> */}
        </ul>
    )

    if (odds === 1) return (
        <ul>
            {/* <li>Buy "Yes" shares for <span className='green'>{odds-1}¢ or less</span></li> */}
            <li>Buy "No" shares for <span className='green'>{100-odds - 1}¢ or less</span></li>
            <li>Sell "Yes" shares for <span className='green'>{parseInt(odds) + 1}¢ or more</span></li>
            {/* <li>Sell "No" shares for <span className='green'>{100 - parseInt(odds) + 1}¢</span></li> */}
        </ul>
    )

    if (odds === 2) return (
        <ul>
            <li>Buy "Yes" shares for <span className='green'>{odds-1}¢</span></li>
            <li>Buy "No" shares for <span className='green'>{100-odds - 1}¢ or less</span></li>
            <li>Sell "Yes" shares for <span className='green'>{parseInt(odds) + 1}¢ or more</span></li>
            <li>Sell "No" shares for <span className='green'>{100 - parseInt(odds) + 1}¢</span></li>
        </ul>
    )

    if (odds === 100) return (
        <ul>
            <li>Buy "Yes" shares for <span className='green'>{odds-1}¢ or less</span></li>
            {/* <li>Buy "No" shares for <span className='green'>{100-odds - 1}¢ or less</span></li> */}
            {/* <li>Sell "Yes" shares for <span className='green'>{parseInt(odds) + 1}¢ or more</span></li> */}
            <li>Sell "No" shares for <span className='green'>{100 - parseInt(odds) + 1}¢ or more</span></li>
        </ul>
    )

    if (odds === 99) return (
        <ul>
            <li>Buy "Yes" shares for <span className='green'>{odds-1}¢ or less</span></li>
            {/* <li>Buy "No" shares for <span className='green'>{100-odds - 1}¢ or less</span></li> */}
            {/* <li>Sell "Yes" shares for <span className='green'>{parseInt(odds) + 1}¢ or more</span></li> */}
            <li>Sell "No" shares for <span className='green'>{100 - parseInt(odds) + 1}¢ or more</span></li>
        </ul>
    )

    if (odds === 98) return (
        <ul>
            <li>Buy "Yes" shares for <span className='green'>{odds-1}¢ or less</span></li>
            <li>Buy "No" shares for <span className='green'>{100-odds - 1}¢ or less</span></li>
            <li>Sell "Yes" shares for <span className='green'>{parseInt(odds) + 1}¢ or more</span></li>
            <li>Sell "No" shares for <span className='green'>{100 - parseInt(odds) + 1}¢ or more</span></li>
        </ul>
    )


    return (
        <ul>
            <li>Buy "Yes" shares for <span className='green'>{odds-1}¢ or less</span></li>
            <li>Buy "No" shares for <span className='green'>{100-odds - 1}¢ or less</span></li>
            <li>Sell "Yes" shares for <span className='green'>{parseInt(odds) + 1}¢ or more</span></li>
            <li>Sell "No" shares for <span className='green'>{100 - parseInt(odds) + 1}¢ or more</span></li>
        </ul>
    )
}

// export default SuggestedTransactions
