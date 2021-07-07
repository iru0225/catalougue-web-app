import { useEffect } from 'react';
import {useState} from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import image404 from '../../assets/image/404.png';
import './detail.style.scss';

const DetailPage = ({location}) => {
    const data = location.state.itemDetail;
    const [imageUrl] = useState('https://www.awalmula.co.id/media/catalog/product');
    const [description, setDescription] = useState(null);

    useEffect(() => {
        setDescription(data.custom_attributes.find(e => e.attribute_code === 'description'));
    }, [description])

    return(
        <>
            <div className="detail-wrapper">
                <div className="slider-carousel">
                    <Carousel infiniteLoop>
                        {
                            data.media_gallery_entries?.map((item, index) => {
                                return(
                                    <div key={index}>
                                        <img src={`${imageUrl}${item.file}`} alt="product" onError={e => e.target.src = image404}/>
                                    </div>
                                )
                            })
                        }
                    </Carousel>
                    <div className="detail-button">
                        <span>{new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(data.price)}</span>
                        <button>+ Keranjang</button>
                    </div>
                </div>
                <div className="detail" style={{'width': '60%'}}>
                    <h2>{data.name}</h2>
                    <div>
                        <p dangerouslySetInnerHTML={{__html: description?.value}}>

                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailPage;