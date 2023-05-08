import { useEffect, useState } from 'react';
import { addNewCoin } from '../../../api/addNewCoin';
import './styles.css';
import { getCategories } from '../../../api/getCategories';
import { useNavigate, useParams } from 'react-router-dom';
import getCoinDetails from '../../../api/getCoinDetails';
import { editSingleCoin } from '../../../api/editSingleCoin';

const EditPage = () => {
  const simpleMetadata = ['title', 'short_desc', 'image', 'category_id']

  const { id } = useParams()
  console.log('id in edit: ', id)
  const [categories, setCategories] = useState([])
  const [initialData, setInitialData] = useState({
    title: '',
    short_desc: '',
    year: null,
    price: null,
    issuing_country: '',
    composition: '',
    category_id: null,
    quality: '',
    weight: '',
    image: '',
    back_image: '',
    denomination: ''
  })
  const [coinData, setCoinData] = useState({
    title: '',
    short_desc: '',
    year: null,
    price: null,
    issuing_country: '',
    composition: '',
    category_id: null,
    quality: '',
    weight: '',
    image: '',
    back_image: '',
    denomination: ''
  })

  useEffect(() => {

    getCoinDetails(id).then(res => {
      console.log('single coin data: ', res)
      const { coin_metadata: data } = res
      setCoinData({
        title: data?.title,
        short_desc: data?.short_desc,
        year: data?.year,
        price: parseInt(data?.price),
        issuing_country: data?.issuing_country,
        composition: data?.composition,
        category_id: data?.category_id,
        quality: data?.quality,
        weight: parseInt(data?.weight),
        image: data?.image,
        back_image: data?.back_image,
        denomination: data?.denomination
      })
      setInitialData({
        title: data?.title,
        short_desc: data?.short_desc,
        year: data?.year,
        price: parseInt(data?.price),
        issuing_country: data?.issuing_country,
        composition: data?.composition,
        category_id: data?.category_id,
        quality: data?.quality,
        weight: parseInt(data?.weight),
        image: data?.image,
        back_image: data?.back_image,
        denomination: data?.denomination
      })
    })

    getCategories().then(data => { // [{id, name, image}]
      const categoriesArr = []

      data.forEach(item => {
        const { id, name } = item
        categoriesArr.push({
          id,
          name
        })
      })
      setCategories(categoriesArr)
    })
  }, [])

  const submitFormHandler = (e) => {
    e.preventDefault()

    if (id) {
      const changedFields = Object.entries(coinData).filter(item => {
        return initialData[item[0]] !== item[1]
      })
      const finalData = Object.fromEntries(changedFields)

      const simpleData = changedFields.filter(item => simpleMetadata.includes(item[0]))

      const detailedData = changedFields.filter(item => !simpleMetadata.includes(item[0]))

      console.log('simple changed fields: ', simpleData)
      console.log('detailed changed fields: ', detailedData)

      editSingleCoin({
        id,
        simpleData: simpleData?.length ? Object.fromEntries(simpleData) : null,
        detailedData: detailedData?.length ? Object.fromEntries(detailedData) : null,
      })

    } else {
      const formData = new FormData(e.target);
      const formDataArr = [...formData.entries()];
      const formDataObj = {}
      formDataArr.forEach(item => {
        formDataObj[item[0]] = item[1]
      })
      addNewCoin(formDataObj)
    }

  }

  const onChangeHandler = (e) => {
    setCoinData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const navigate = useNavigate()

  return (
    <div className='edit-page-wrapper'>
      <h1>Admin panel</h1>
      <form onChange={onChangeHandler} onSubmit={submitFormHandler} className="add-form">
        <div className='first-col'>
          <label>
            <p>Coin name</p>
            <input value={coinData.title} className="input" name="title" />
          </label>
          <label>
            <p>Year of issue</p>
            <input value={coinData.year} type='number' className="input" name="year" />
          </label>
          <label>
            <p>Price</p>
            <input value={coinData.price} type='number' className="input" name="price" />
          </label>
          <label>
            <p>Country</p>
            <input value={coinData.issuing_country} className="input" name="issuing_country" />
          </label>
          <label>
            <p>Metal</p>
            <input value={coinData.composition} className="input" name="composition" />
          </label>
          <label>
            <p>Category id</p>
            <select value={coinData.category_id} className='input select-category' name="category_id">
              <option value="">Select Country</option>
                {
                  categories?.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))
                }
            </select>
            {/* <input type='number' className="input" name="category_id" /> */}
          </label>
        </div>

        <div className='second-col'>
          <label>
            <p>Short description</p>
            <textarea value={coinData.short_desc} className="input desc" name="short_desc" />
          </label>
          <label>
            <p>Long description</p>
            <textarea className="input desc" name="long_desc" />
          </label>
          <label>
            <p>Quality of the coin</p>
            <input value={coinData.quality} className="input" name="quality" />
          </label>
          <label>
            <p>Weight</p>
            <input value={coinData.weight} type='number' className="input" name="weight" />
          </label>
        </div>

        <div className='third-col'>
          <label>
            <p>Link to obverse image</p>
            <input value={coinData.image} className="input" name="image" />
          </label>
          <label>
            <p>Link to reverse image</p>
            <input value={coinData.back_image} className="input" name="back_image" />
          </label>
          <label>
            <p>Face value</p>
            <input value={coinData.denomination} className="input" name="denomination" />
          </label>
          <div className='form-actions'>
            <button type='submit' className='btn-save'>Save</button>
            <button onClick={() => navigate(-1)} className='btn-cancel'>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  )
}
export default EditPage