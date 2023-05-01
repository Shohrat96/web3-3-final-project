import { useEffect, useState } from "react"
import { Link, useParams, useSearchParams } from "react-router-dom"
import { getCoins } from "../../api/getCoins"
import './styles.css';
import SearchForm from "../../components/SearchForm";

const ListOfCoins = () => {
    const params = useParams()
    const { id } = params;
    const [products, setProducts] = useState([]);
    const [urlSearch, setUrlSearch] = useSearchParams()

    const searchData = [...urlSearch.entries()]
    // console.log('urlSearch: ', [...urlSearch.entries()])

    useEffect(() => {
        if (id) {
            getCoins(id).then(data => {
                setProducts(data)
            })
        } else {
            getCoins('', urlSearch.toString()).then(data => setProducts(data))
        }
    }, [])
    console.log('products: ', products)
    return (
        <div>
            <h1>List Of Coins</h1>
            <SearchForm searchData={searchData}/>
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