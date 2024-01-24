import { Rating } from 'react-simple-star-rating';
import { Table } from 'reactstrap';
import Link from 'next/link'
import DashboardWrapper from '../DashboardWrapper'
import { ReviewAPI } from '../../../Utils/AxiosUtils/API';
import { useQuery } from '@tanstack/react-query';
import request from '../../../Utils/AxiosUtils';
import Avatar from '../../CommonComponent/Avatar';
import placeHolderImage from '../../../../public/assets/images/placeholder.png';
import NoDataFound from '../../CommonComponent/NoDataFound';
import { useContext } from 'react';
import I18NextContext from '@/Helper/I18NextContext';

const ReviewCard = () => {
    const { i18Lang } = useContext(I18NextContext);
    const { data: reviewData } = useQuery([ReviewAPI], () => request({ url: ReviewAPI, params: { paginate: 5 } }), {
        refetchOnWindowFocus: false, select: (data) => data?.data?.data,
    });
    return (
        <DashboardWrapper classes={{ title: "LatestReviews", colProps: { sm: 12 }, headerRight: <Link href={`/${i18Lang}/review`} className='txt-primary'>View All</Link> }}>
            <div className='review-box table-responsive'>
                {reviewData?.length > 0 ? <Table>
                    <tbody>
                        {
                            reviewData?.map((elem, i) => (
                                <tr key={i}>
                                    <td>
                                        <div className='review-content'>
                                            <div className="img-box">
                                                <Avatar data={elem?.product?.product_thumbnail} name={elem?.product?.name} placeHolder={placeHolderImage} />
                                            </div>
                                            <span>{elem?.product?.name}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span>{elem?.consumer?.name}</span>
                                    </td>
                                    <td>
                                        <Rating initialValue={elem?.rating} readonly={true} size={17} />
                                    </td>
                                </tr>

                            ))}
                    </tbody>
                </Table> :
                    <NoDataFound title={"NoDataFound"} noImage={true} />
                }
            </div>
        </DashboardWrapper>
    )
}

export default ReviewCard