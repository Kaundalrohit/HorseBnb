import { Link } from 'react-router-dom'
import HenceForthApi from '../../Utils/HenceForthApi'
export default function ListingViewer(props: any) {
    const { description, title, listing_price, image, id } = props
    return (
        <div className=' col-3 mt-4' key={id}>
            <Link to={`/booking-details/${id}`} className='text-decoration-none text-black'>
                <div className='border rounded' key={id}>
                    <img className='p-2' alt="" src={image ? `${HenceForthApi.API_FILE_ROOT_MEDIUM}${image}` : 'https://horsebnb.com/assets/img/default_image.svg'} width="253" height="168" />
                    <p className='text-muted ms-2'>{title?.length > 20 ? `${title?.slice(0, 20)}...` : title}</p>
                    <p className='ms-2 fw-bold'>{description?.length > 20 ? `${description?.slice(0, 20)}...` : description} </p>
                    <p className='ms-2 fw-bold'>${listing_price}/Night</p>
                </div>
            </Link>
        </div>
    )
}
