import Modal from 'react-modal';
import ListItem from '../components/list-items/LisItem';
import { nullCheck, nullCheckKeys } from '../utils';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    padding: '0',
    margin: '0',
    'border-radius': '10px',
  },
};

export default function BusinessPreviewModal({
  isOpen,
  onOpen,
  onClose = () => {},
  orderDetails,
}) {
  const {
    creditScore,
    orderDetailsToday = {},
    orderDetails: orderInfo = {},
    selectedTransaction = {},
  } = orderDetails;
  return (
    <>
      <Modal
        style={customStyles}
        shouldCloseOnOverlayClick={true}
        isOpen={isOpen}
        onAfterOpen={onOpen}
        onRequestClose={onClose}>
        <div className='w-[380px] bg-[#F7F7F7] pb-8'>
          <div className='border-b pb-5 pl-8 pt-7 mb-7'>
            <span className='text-xl'>ORDER INFO</span>
          </div>

          <div className='mx-8 mb-5'>
            <ListItem
              mainTitle='Business ID'
              mainTitleStyle='comms-r-12 text-grey05'
              subTitle={selectedTransaction.businessID}
              subTitleStyle='mont-b-20 text-black'
              trailing={
                <ListItem
                  mainTitle='Credit Score'
                  mainTitleStyle='comms-r-12 text-grey05'
                  subTitle={creditScore}
                  subTitleStyle='mont-b-20 text-black'
                />
              }
            />
          </div>

          <div
            className={`mx-8 bg-white border border-grey01 rounded-[.8rem] px-9 pt-10 pb-9 grid grid-cols-2 gap-y-10`}>
            <ListItem
              mainTitle='Total number of orders'
              mainTitleStyle='comm-r-12'
              subTitle={nullCheck(
                orderInfo.total_number_of_orders,
                nullCheckKeys.num
              )}
              subTitleStyle='comm-d-14'
            />
            <ListItem
              mainTitle='Total amount of orders'
              mainTitleStyle='comm-r-12'
              subTitle={`₦ ${nullCheck(
                orderInfo.toatl_amount_of_orders,
                nullCheckKeys.amount
              )}`}
              subTitleStyle='comm-d-14'
            />
            <ListItem
              mainTitle='Total number of orders today'
              mainTitleStyle='comm-r-12'
              subTitle={nullCheck(
                orderDetailsToday.total_number_of_orders_today,
                nullCheckKeys.num
              )}
              subTitleStyle='comm-d-14'
            />
            <ListItem
              mainTitle='Total amount of orders today'
              mainTitleStyle='comm-r-12'
              subTitle={`₦ ${nullCheck(
                orderDetailsToday.total_amount_of_orders_today,
                nullCheckKeys.amount
              )}`}
              subTitleStyle='comm-d-14'
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
