import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message, { IMessageProps } from '../../../components/Message';
import Loader from '../../../components/Loader';
import FormContainer from '../../../components/FormContainer';
import { toast } from 'react-toastify';
import {
  useGetCategoryDetailsQuery,
  useUpdateCategoryMutation,
} from '../../../redux/query/categorySlice';
import { displayErrorMessage } from '../../../components/Error';
import { CONTACTADD } from '../../../constants';

const CategoryEditScreen = () => {
  const { id: categoryId } = useParams();

  const [categoryName, setName] = useState('');

  const {
    data: category,
    isLoading,
    refetch,
    error,
  } = useGetCategoryDetailsQuery(categoryId as string);
  const [updateCategory, { isLoading: loadingUpdate }] =
    useUpdateCategoryMutation();

  const navigate = useNavigate();

  const isFormValid = () => {
   
    if (!categoryName ) {
      toast.error('Vui lòng điền đầy đủ thông tin sản phẩm.');
      return false}
    return true;
  ;}
const submitHandler = async (category: React.FormEvent<HTMLFormElement>) => {
  category.preventDefault()
  if (!isFormValid()) {
    return;
  }
    try {
      await updateCategory({
        categoryId,
        categoryName,
      }).unwrap();
      toast.success('Category updated');
      refetch();
    navigate(CONTACTADD);
    } catch (err) {
      displayErrorMessage(err);
    }
  };

  useEffect(() => {
    if (category) {
      setName(category.categoryName);
    }
  }, [category]);

  return (
    <>
<Link to={CONTACTADD} className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Category</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>Đã xảy ra lỗi.Vui lòng thử lại sau</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='categoryName'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={categoryName}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              type='submit'
              variant='primary'
              style={{ marginTop: '1rem' }}
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default CategoryEditScreen;
