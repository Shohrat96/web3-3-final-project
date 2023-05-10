import { useEffect, useState } from 'react';
import { addNewCoin } from '../../../api/addNewCoin';
import './styles.css';
import { getCategories } from '../../../api/getCategories';
import { useNavigate, useParams } from 'react-router-dom';
import getCoinDetails from '../../../api/getCoinDetails';
import { editSingleCoin } from '../../../api/editSingleCoin';
import { Upload } from 'antd'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../firebase';

const EditPage = () => {
  const simpleMetadata = ['title', 'short_desc', 'image', 'category_id']


  const { id } = useParams()
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
      addNewCoin({
        ...formDataObj,
        image: coinData?.image,
        back_image: coinData?.back_image
      }).then(data => {
        if (data?.success) {
          navigate(-1)
        }
      })
    }

  }

  const onChangeHandler = (e) => {
    setCoinData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleUploadImage = (e, imageType) => {

    const { originFileObj, uid } = e.file;
    const nameArr = originFileObj.name.split('.')
    const finalReferenceName = nameArr[0] + uid + '.' + nameArr[1]
    const storageRef = ref(storage, finalReferenceName);

    uploadBytes(storageRef, originFileObj).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(url => {

        if (imageType === 'front') {
          setCoinData(prev => ({
            ...prev,
            image: url
          }))
        } else {
          setCoinData(prev => ({
            ...prev,
            back_image: url
          }))
        }
      })
    })
  }
  const navigate = useNavigate()


  //   const uploadButton = (
  //   <div>
  //     {loading ? <LoadingOutlined /> : <PlusOutlined />}
  //     <div
  //       style={{
  //         marginTop: 8,
  //       }}
  //     >
  //       Upload
  //     </div>
  //   </div>
  // );
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
          {
            id ? (
              <>
                <label>
                  <p>Link to obverse image</p>
                  <input value={coinData.image} className="input" name="image" />
                </label>
                <label>
                  <p>Link to reverse image</p>
                  <input value={coinData.back_image} className="input" name="back_image" />
                </label>
              </>
            ) : (
              <>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '20px'
              }}>
                <Upload
                  name="avatar"
                  listType="picture-circle"
                  className="avatar-uploader"
                  showUploadList={false}
                  action=""
                  // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  // beforeUpload={beforeUpload}
                  onChange={(e) => handleUploadImage(e, 'front')}
                >
                  {coinData?.image ? (
                  <img
                    src={coinData?.image}
                    alt="avatar"
                    style={{
                      width: '100%',
                    }}
                  />
                ) : (
                  <div>+</div>
                )}
                </Upload>

                <span className='upload-btn-label'>Upload Front Image</span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center'
              }}>
                <Upload
                  name="avatar"
                  listType="picture-circle"
                  className="avatar-uploader"
                  showUploadList={false}
                  action=""
                  // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  // beforeUpload={beforeUpload}
                  onChange={(e) => handleUploadImage(e, 'reverse')}
                >
                  {coinData?.back_image ? (
                  <img
                    src={coinData?.back_image}
                    alt="avatar"
                    style={{
                      width: '100%',
                    }}
                  />
                ) : (
                  <div>+</div>
                )}
                </Upload>

                <span className='upload-btn-label'>Upload Reverse Image</span>
              </div>
              </>
            )
          }

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