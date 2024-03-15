 import { IContact } from '@/interfaces/Contact';
import { useState } from 'react';
import { Button, Col, Pagination, Row, Table } from 'react-bootstrap';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { displayErrorMessage } from '../../../components/Error';
import Loader from '../../../components/Footer'
import Message from '../../../components/Message';
import { CONTACTADD } from '../../../constants/constants';
import {
  useAddContactMutation,
  useDeleteContactMutation,
  useGetContactsQuery,
} from '../../../redux/query/contactSlice';
import { ContactAdminStyle } from './styled';

const ContactListScreen = () => {
  const { data: contacts, isLoading, error, refetch } = useGetContactsQuery();
  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteContactMutation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 5;
  const deleteHandler = async (id: string) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteProduct(id);
        refetch();
      } catch (err) {
        toast.error('Error');
      }
    }
  };

  const [createContacts, { isLoading: loadingCreate, error: createError }] =
    useAddContactMutation();
  const createContactHandler = async () => {
    try {
      navigate(CONTACTADD);
      refetch();
    } catch (err) {
      displayErrorMessage(err);
    }
  };
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts && Array.isArray(contacts)
    ? contacts.slice(indexOfFirstContact, indexOfLastContact)
    : [];
  return (
   <ContactAdminStyle>
     <>
      <Row className='align-items-center'>
        <Col>
          <h1>Contacts</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-3' onClick={createContactHandler}>
            <FaPlus /> Create Contact
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}

      {loadingDelete && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>Đã xảy ra lỗi.Vui lòng thử lại sau</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PHONE</th>
                <th>EMAIL</th>
                <th>CONTENT</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentContacts?.map((contact: IContact) => (
                <tr key={contact._id}>
                  <td>{contact._id}</td>
                  <td>{contact.contactName}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.email}</td>
                  <td>{contact.content}</td>
                  <td>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => contact._id && deleteHandler(contact._id)}
                    >
                      <FaTrash className='fatrash' />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination>
            {Array.from({
              length: Math.ceil((contacts?.length || 0) / contactsPerPage) || 1,
            }).map((page, index) => (
              <Pagination.Item
                key={index}
                active={index + 1 === currentPage}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </>
      )}
    </>
   </ContactAdminStyle>
  );
};

export default ContactListScreen;
