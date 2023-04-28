
const ToggleAdvancedFilterIcon = ({ isClosed }) => {
    if (isClosed) return (
        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L7 7L13 1" stroke="black" />
        </svg>
    )

    return (
        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 7L7 0.999999L1 7" stroke="black" />
        </svg>
    )
}

export default ToggleAdvancedFilterIcon