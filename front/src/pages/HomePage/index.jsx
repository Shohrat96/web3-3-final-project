import { useEffect, useState } from "react"
import { getCategories } from "../../api/getCategories"
import './styles.css';
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import SearchForm from "../../components/SearchForm";

const HomePage = () => {
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const location = useLocation()
    const [submitPressed, setSubmitPressed] = useState(false)

    useEffect(() => {
        console.log('location.search', location.search)
        if (submitPressed) {
            navigate({
                pathname: '/listOfCoins',
                search: location.search
            });
            setSubmitPressed(false)
        }
        
      }, [submitPressed]);

    useEffect(() => {
        getCategories().then(data => {
            setCategories(data)
        })
    }, [])


    const submitFormHandler = (values) => {
        setSubmitPressed(true)
        setSearchParams(values)
    }


    return (
        <div>
            <h1>Home Page</h1>
            <SearchForm submitFormHandler={(formValues) => submitFormHandler(formValues)} />

            <div className="categories">
                {
                    categories.map(item => (
                        <Link key={item.id} to={`categories/${item.id}`}>
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