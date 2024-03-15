import { Button, Col, Row, Table } from 'react-bootstrap';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../../../components/Footer';
import Message from '../../../components/Message';
import { IOrder } from '@/interfaces/Order';
import { CANCEL, CONFIRM, NOTRECEIVED } from '../../../constants/constants';
import { useGetOrdersQuery } from '../../../redux/query/ordersApiSlice';

const IsReceived = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <Row>
      <Col md={9}>
        <h2>Đơn hàng đã giao</h2>
        <td>
          <LinkContainer to={NOTRECEIVED}>
            <Button className='btn-sm' variant='secondary'>
              Đơn hàng chưa giao
            </Button>
          </LinkContainer>
        </td>
        <td>
          <LinkContainer className='cancel' to={CANCEL} >
            <Button className='btn-sm' variant='secondary'>
              Đơn hàng đã huỷ
            </Button>
          </LinkContainer>
        </td>
        <td>
          <LinkContainer className='confirm' to={CONFIRM} >
            <Button className='btn-sm' variant='secondary'>
              Đơn hàng đã nhận
            </Button>
          </LinkContainer>
        </td>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>Đã xảy ra lỗi.Vui lòng thử lại sau</Message>
        ) : (
          <Table striped hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders
                ?.filter((order:IOrder) => order.isDelivered)
                .map((order:IOrder) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>
                      {' '}
                      {order.createdAt instanceof Date
                        ? order.createdAt.toISOString().substring(0, 10)
                        : ''}
                    </td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.deliveredAt instanceof Date ? (
                          order.deliveredAt.toISOString().substring(0, 10)
                        ) : (
                         <FaCheck className='facheck'/>
                      )
                    ) : (
                      <FaTimes className='fatimes'/>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.paidAt instanceof Date ? (
                          order.paidAt.toISOString().substring(0, 10)
                        ) : (
                         <FaCheck className='facheck'/>
                      )
                    ) : (
                      <FaTimes className='fatimes'/>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className='btn-sm' variant='light'>
                          Chi tiết
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default IsReceived;
