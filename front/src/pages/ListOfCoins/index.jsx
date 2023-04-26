import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getCoins } from "../../api/getCoins"

const ListOfCoins = () => {
    const params = useParams()
    const { id } = params;
    const [products, setProducts] = useState([])

    useEffect(() => {
        getCoins(id).then(data => {
            setProducts(data)
        })
        // getCategories().then(data => {
        //     setCategories(data)
        // })
    }, [])
    return (
        <div>
            <h1>List Of Coins</h1>
            {/* <form onSubmit={submitFormHandler} className="form">
                <label>
                    <p>Input field</p>
                    <input className="category-input" name="search" value={search} onChange={searchHandler} />
                    <input className="search-btn" type="submit" value="Search" />
                </label>
            </form> */}
            <div className="categories">
                {
                    products.map(item => (
                        <Link to={`/coins/${item.id}`}>
                            <div className="category" key={item.id}>
                                <p className="category-name">{item.title}</p>
                                <p className="category-name">{item.short_desc}</p>
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

export default ListOfCoins