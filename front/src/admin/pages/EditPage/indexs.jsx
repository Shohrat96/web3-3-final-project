import { useEffect, useState } from 'react';
import { addNewCoin } from '../../../api/addNewCoin';
import './styles.css';
import { getCategories } from '../../../api/getCategories';

const EditPage = () => {

  const [categories, setCategories] = useState([])


  useEffect(() => {
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
    const formData = new FormData(e.target);
    const formDataArr = [...formData.entries()];
    const formDataObj = {}
    formDataArr.forEach(item => {
      formDataObj[item[0]] = item[1]
    })
    addNewCoin(formDataObj)
    console.log('data: ', [...formData.entries()])
  }
  return (
    <div className='edit-page-wrapper'>
      <h1>Admin panel</h1>
      <form onSubmit={submitFormHandler} className="add-form">
        <div className='first-col'>
          <label>
            <p>Coin name</p>
            <input className="input" name="name" />
          </label>
          <label>
            <p>Year of issue</p>
            <input type='number' className="input" name="year_of_issue" />
          </label>
          <label>
            <p>Price</p>
            <input type='number' className="input" name="price" />
          </label>
          <label>
            <p>Country</p>
            <input className="input" name="country" />
          </label>
          <label>
            <p>Metal</p>
            <input className="input" name="metal" />
          </label>
          <label>
            <p>Category id</p>
            <select className='input select-category' name="category_id">
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
            <textarea className="input desc" name="short_desc" />
          </label>
          <label>
            <p>Long description</p>
            <textarea className="input desc" name="long_desc" />
          </label>
          <label>
            <p>Quality of the coin</p>
            <input className="input" name="quality" />
          </label>
          <label>
            <p>Weight</p>
            <input type='number' className="input" name="weight" />
          </label>
        </div>

        <div className='third-col'>
          <label>
            <p>Link to obverse image</p>
            <input className="input" name="front_image" />
          </label>
          <label>
            <p>Link to reverse image</p>
            <input className="input" name="reverse_image" />
          </label>
          <label>
            <p>Face value</p>
            <input className="input" name="face_value" />
          </label>
          <div className='form-actions'>
            <button type='submit' className='btn-save'>Save</button>
            <button className='btn-cancel'>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  )
}
export default EditPage