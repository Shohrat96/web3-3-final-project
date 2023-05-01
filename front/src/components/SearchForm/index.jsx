import { useEffect, useState } from "react";
import ToggleAdvancedFilterIcon from "../../assets/icons/ToggleAdvancedFilterIcon";
import './styles.css';
import { useSearchParams } from "react-router-dom";

const SearchForm = ({ submitFormHandler, searchData }) => {

    // const [search, setSearch] = useState('')
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [urlSearch, setUrlSearch] = useSearchParams()

    const [formValues, setFormValues] = useState({
        search: '',
        country: '',
        metal: '',
        quality: 'proof',
        fromPrice: '',
        toPrice: '',
        fromYear: '',
        toYear: ''
    })

    useEffect(() => {
        if (searchData){
            searchData.forEach(item => {
                setFormValues(prevState => ({
                    ...prevState,
                    [item[0]]: item[1]
                }))
            })
            console.log('in search data: ', searchData)
        }
    }, [])
    const onChangeForm = (e) => {
        setFormValues(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
        console.log('name: ', e.target.name)
        console.log('value: ', e.target.value)
    }

    // const searchHandler = (e) => {
    //     const searchValue = e.target.value;
    //     setSearch(searchValue);
    // }

    const onSelectHandler = (e) => {
        console.log(e.target.value)
    }
    return (
        <form onChange={onChangeForm} onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.target);
            const formDataToArray = [...formData.entries()]
            console.log('formDataToArray: ', formDataToArray)
            const finalData = {}
            formDataToArray.forEach(item => { // [ country: Canada ]
                if (item[1]) {
                    finalData[item[0]] = item[1]
                }
            })
            // setUrlSearch(finalData)
            submitFormHandler(finalData)
        }} className="form">
            <label>
                <p>Input field</p>
                <input className="input" name="search" value={formValues.search} />
                <input className="search-btn" type="submit" value="Search" />
            </label>
            <div onClick={() => setShowAdvanced(!showAdvanced)} className="toggle-advanced-filter">
                <span>Advanced filter</span>
                <ToggleAdvancedFilterIcon isClosed={!showAdvanced} />
            </div>

            {
                showAdvanced && (
                    <div className="advanced-filter">
                        <div className="select-filter-wrapper">
                            <div>
                                <p>Issuing country</p>
                                <select value={formValues.country} name="country" className="input select-country">
                                    <option value="canada">Canada</option>
                                    <option value="america">America</option>
                                </select>
                            </div>
                            <div>
                                <p>Metal</p>
                                <select value={formValues.metal} name="metal" className="input select-metal">
                                    <option value="gold">Gold</option>
                                    <option value="silver">Silver</option>
                                    <option value="nickel">Nickel</option>
                                </select>
                            </div>

                            <div>
                                <p>Quality of the coin</p>
                                <select defaultValue="proof" value={formValues.quality} name="quality" className="input select-quality">
                                    <option value="proof">Proof</option>
                                    <option value="bu">BU</option>
                                </select>
                            </div>

                        </div>

                        <div className="range-wrapper">
                            <div className="price-range">
                                <p>Price</p>
                                <div>
                                    <label>
                                        from
                                        <input value={formValues.fromPrice} name="fromPrice" type="number" className="range-input input" />
                                    </label>
                                    <label>
                                        to
                                        <input value={formValues.toPrice} name="toPrice" type="number" className="range-input input" />
                                    </label>
                                </div>
                            </div>

                            <div className="year-range">
                                <p>Year of issue</p>
                                <div>
                                    <label>
                                        from
                                        <input value={formValues.fromYear} name="fromYear" type="number" className="input range-input" />
                                    </label>
                                    <label>
                                        to
                                        <input value={formValues.toYear} name="toYear" type="number" className="input range-input" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </form>
    )
}
export default SearchForm