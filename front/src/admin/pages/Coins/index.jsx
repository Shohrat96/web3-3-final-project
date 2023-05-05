import { Link, useNavigate, useSearchParams } from "react-router-dom"
import SearchForm from "../../../components/SearchForm"
import { useEffect, useState } from "react"
import { getCoins } from "../../../api/getCoins"
import './styles.css'
import { deleteCoin } from "../../../api/deleteCoins"

const CoinsManagePage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([]);
  const navigate = useNavigate()
  const submitFormHandler = (values) => {
    setSearchParams(values)
  }

  const searchData = [...searchParams.entries()]

  useEffect(() => {
    if (searchParams.toString()) {
      getCoins('', searchParams.toString()).then(data => setProducts(data))

    }
  }, [searchParams])
  return (
    <div>
      <h1>Admin panel</h1>
      <SearchForm submitFormHandler={(formValues) => submitFormHandler(formValues)} searchData={searchData} />
      <div className="coins-admin">
        {
          products?.length > 0 && products.map(item => (
            <div className="single-coin_wrapper">
              <Link className="single-coin_link" to={`/coins/${item.id}`}>
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
              <div className="coin-actions">
                <button onClick={() => navigate(`edit/${item.id}`)} className="coin-edit">Edit</button>
                <button onClick={() => {
                  deleteCoin(item.id)
                }} className="coin-delete">Delete</button>
              </div>
            </div>
          ))
        }
        <div onClick={() => navigate('add')} className="add-coin">
          <div className="add-circle">+</div>
          <div className="add-label">Add a new coin</div>
        </div>
      </div>
    </div>
  )
}

export default CoinsManagePage