import Image from 'next/image'
import { Col } from 'reactstrap'
import productImage from '../../../public/assets/images/placeholder.png'

const LeftSideModal = ({ cloneVariation, productData }) => {
    return (
        <Col lg="6">
            <div className="slider-image">
                <Image src={cloneVariation?.selectedVariation?.variation_image ? cloneVariation?.selectedVariation?.variation_image?.original_url
                    : (productData?.product_thumbnail?.original_url ? productData?.product_thumbnail?.original_url : productImage)}
                    className="img-fluid" alt="product" width={369} height={369} />
            </div>
        </Col>
    )
}

export default LeftSideModal