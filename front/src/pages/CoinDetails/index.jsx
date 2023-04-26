import { useEffect, useState } from "react";
import getCoinDetails from "../../api/getCoinDetails";
import './styles.css';

const { useParams } = require("react-router-dom")

const CoinDetails = () => {
    const { id } = useParams()
    const [coin, setCoin] = useState({
    });

    console.log('single coin data: ', coin);

    useEffect(() => {
        getCoinDetails(id).then(data => setCoin(data[0]))
    }, [])

    const image = coin?.image
    const back_image = coin?.back_image;
    const issuing_country = coin?.issuing_country;
    const composition = coin?.composition
    const quality = coin?.quality
    const denomination = coin?.denomination;
    const year = coin?.year;
    const weight = coin?.weight;
    const price = coin?.price;

    // const { image, back_image, issuing_country, composition, quality, denomination, year, weight, price } = coin;

    return (
        <div className="details-wrapper">
            <div className="images-wrapper">
                <div className="image-front">
                    <img src={image} alt="coin front" />
                </div>
                <div className="image-back">
                    <img src={back_image} alt="coin back" />
                </div>
            </div>

            <div className="coin-desc">
                <h1>Coin Title</h1>
                <p className="coin-short-desc">Short Desc</p>
                {/* {
                    paragraphs.map(item => (
                        <p>{item.content}</p>
                    ))
                } */}
                <p>
                    In the center of the obverse is a portrait of Queen Elizabeth II, the profile is directed to the right. The inscription on the left semicircle (English) ELIZABETH II, on the right semicircle D · G · REGINA (ELIZABETH II QUEEN by the Grace of GOD) with dots. Below is a mint mark.
                </p>
                <p>
                    In the center of the coin reverse is a Canadian beaver on a rock sticking out of the water. At the top is a semicircle with the inscription "5 cents" between two maple leaves. At the bottom in two lines is the inscription CANADA (CANADA) and the year of minting.
                </p>
                <div className="coin-metadata">
                    <div className="coin-metadata-row">
                        <div className="data-label">Issuing Country</div>
                        <div className="data-value">{issuing_country}</div>
                    </div>
                    <div className="coin-metadata-row">
                        <div className="data-label">Composition</div>
                        <div className="data-value">{composition}</div>
                    </div>
                    <div className="coin-metadata-row">
                        <div className="data-label">Quality</div>
                        <div className="data-value">{quality}</div>
                    </div>
                    <div className="coin-metadata-row">
                        <div className="data-label">Denomination</div>
                        <div className="data-value">{denomination}</div>
                    </div>
                    <div className="coin-metadata-row">
                        <div className="data-label">Year</div>
                        <div className="data-value">{year}</div>
                    </div>
                    <div className="coin-metadata-row">
                        <div className="data-label">Weight</div>
                        <div className="data-value">{weight}</div>
                    </div>
                    <div className="coin-metadata-row">
                        <div className="data-label">Price</div>
                        <div className="data-value">{price}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CoinDetails