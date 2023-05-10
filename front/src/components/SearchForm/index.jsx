import { useEffect, useState } from "react";
import ToggleAdvancedFilterIcon from "../../assets/icons/ToggleAdvancedFilterIcon";
import './styles.css';
import { useSearchParams } from "react-router-dom";
import { getCountries } from "../../api/getCountries";
import { getComposition } from "../../api/getComposition";
import { getQualities } from "../../api/getQualities";

const SearchForm = ({ submitFormHandler, searchData }) => {

    const [countries, setCountries] = useState([]);
    const [compositions, setCompositions] = useState([]);
    const [qualities, setQualities] = useState([]);

    // const [search, setSearch] = useState('')
    const [showAdvanced, setShowAdvanced] = useState(false);

    const [formValues, setFormValues] = useState({
        search: '',
        country: '',
        metal: '',
        quality: '',
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
        }

        getCountries().then(data => setCountries(data))
        getComposition().then(data => setCompositions(data))
        getQualities().then(data => setQualities(data))
    }, [])
    const onChangeForm = (e) => {
        setFormValues(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <form onChange={onChangeForm} onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.target);
            const formDataToArray = [...formData.entries()]
            const finalData = {}
            formDataToArray.forEach(item => { // [ country: Canada ]
                if (item[1]) {
                    finalData[item[0]] = item[1]
                }
            })
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
                                    {
                                        countries?.map((country, idx) => (
                                            <option key={idx} value={country.issuing_country}>{country.issuing_country}</option>
                                        ))
                                    }
                                    {/* <option value="canada">Canada</option>
                                    <option value="america">America</option> */}
                                </select>
                            </div>
                            <div>
                                <p>Metal</p>
                                <select defaultValue="" value={formValues.metal} name="metal" className="input select-metal">
                                    <option value="">Select a option</option>
                                    {
                                        compositions?.map((item, idx) => (
                                            <option key={idx} value={item.composition}>{item.composition}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div>
                                <p>Quality of the coin</p>
                                <select defaultValue="" value={formValues.quality} name="quality" className="input select-quality">
                                    <option value="">Select a option</option>
                                    {
                                        qualities?.map((item, index) => (
                                            <option key={index} value={item.quality}>{item.quality}</option>
                                        ))
                                    }
                                    {/* <option value="proof">Proof</option>
                                    <option value="bu">BU</option> */}
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