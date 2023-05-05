import { useEffect, useState } from "react"
import { Link, useParams, useSearchParams, useNavigate, useLocation } from "react-router-dom"
import { getCoins } from "../../api/getCoins"
import './styles.css';
import SearchForm from "../../components/SearchForm";

const ListOfCoins = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const params = useParams()
    const { id } = params;
    const [products, setProducts] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams()
    

    const searchData = [...searchParams.entries()]
    // console.log('searchParams: ', [...searchParams.entries()])

    useEffect(() => {

        if (id && !searchParams.toString().length) {
            getCoins(id).then(data => {
                setProducts(data)
            })
        } else {
            navigate({
                pathname: '/listOfCoins',
                search: location.search
            }, {
                replace: true
            })
            getCoins('', searchParams.toString()).then(data => setProducts(data))
        }
    }, [searchParams])

    const submitFormHandler = (values) => {
        setSearchParams(values)

    }

    // useEffect(())
    return (
        <div>
            <h1>List Of Coins</h1>
            <SearchForm submitFormHandler={(formValues) => submitFormHandler(formValues)} searchData={searchData}/>
            <div className="coins">
                {
                    products?.length > 0 && products.map(item => (
                        <Link className="single-coin" to={`/coins/${item.id}`}>
                            <div className="single-coin-item" key={item.id}>
                                <div className="single-coin-image">
                                    <img src={item.image} alt="category pic" />
                                </div>
                                <div className="single-coin-metadata">
                                    <p className="single-coin-title">{item.title}</p>
                                    <p className="single-coin-desc">{item.short_desc}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default ListOfCoins