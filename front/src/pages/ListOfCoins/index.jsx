import { useEffect, useState } from "react"
import { Link, useParams, useSearchParams } from "react-router-dom"
import { getCoins } from "../../api/getCoins"
import './styles.css';

const ListOfCoins = () => {
    const params = useParams()
    const { id } = params;
    const [products, setProducts] = useState([]);
    const [urlSearch, setUrlSearch] = useSearchParams()

    useEffect(() => {
        if (id) {
            getCoins(id).then(data => {
                setProducts(data)
            })
        } else {
            getCoins('', urlSearch.toString()).then(data => console.log('data: ', data))
        }
    }, [])
    return (
        <div>
            <h1>List Of Coins</h1>
            <form onSubmit={() => { }} className="form">
                <label>
                    <p>Input field</p>
                    <input className="category-input" name="search" value={'test'} onChange={() => { }} />
                    <input className="search-btn" type="submit" value="Search" />
                </label>
            </form>
            <div className="coins">
                {
                    products.map(item => (
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