import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message, { IMessageProps } from '../../../components/Message';
import Loader from '../../../components/Loader';
import FormContainer from '../../../components/FormContainer';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../../redux/query/usersApiSlice';
import { displayErrorMessage } from '../../../components/Error';
import { USERLIST } from '../../../constants';
interface IUserState {
  userName:string
  email:string;
  isAdmin:boolean
}
const UserEditScreen = () => {
  const { id: userId } = useParams();
 
const [state,setState] = useState<IUserState>({
  userName:'',
  email:'',
  isAdmin:false
}
)
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId as string);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();

  const submitHandler = async (user: React.FormEvent<HTMLFormElement>) => {
    user.preventDefault();
    try {
      await updateUser({ userId,userName: state.userName,email: state.email,isAdmin: state.isAdmin });
      toast.success('user updated successfully');
      refetch();
      navigate(USERLIST);
    } catch (err) {
      displayErrorMessage(err);
    }
  };

  useEffect(() => {
    if (user) {
      setState({...state,userName:user.userName,email:user.email,isAdmin:user.isAdmin});
     
    }
  }, [user]);

  return (
    <>
      <Link to={USERLIST} className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>Đã xảy ra lỗi.Vui lòng thử lại sau</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className='my-2' controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={state.userName}
                onChange={(e) => setState({...state,userName:e.target.value})}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={state.email}
                onChange={(e) => setState({...state,email:e.target.value})}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={state.isAdmin}
                onChange={(e) => setState({...state,isAdmin:e.target.checked})}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
