import { useEffect, useState } from "react"
import { getCategories } from "../../api/getCategories"
import './styles.css';
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
    const [search, setSearch] = useState('')
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getCategories().then(data => {
            setCategories(data)
        })
    }, [])


    const submitFormHandler = (e) => {
        e.preventDefault()
        console.log('submit event: ', e)
        navigate("/listOfCoins")
    }

    const searchHandler = (e) => {
        const searchValue = e.target.value;
        setSearch(searchValue);
    }
    return (
        <div>
            <h1>Home Page</h1>
            <form onSubmit={submitFormHandler} className="form">
                <label>
                    <p>Input field</p>
                    <input className="category-input" name="search" value={search} onChange={searchHandler} />
                    <input className="search-btn" type="submit" value="Search" />
                </label>
            </form>
            <div className="categories">
                {
                    categories.map(item => (
                        <Link to={`categories/${item.id}`}>
                            <div className="category" key={item.id}>
                                <p className="category-name">{item.name}</p>
                                <div>
                                    <img className="category-image" src={item.image} alt="category pic" />
                                </div>
                            </div>
                        </Link>

                    ))
                }
            </div>

        </div>
    )
}

export default HomePage