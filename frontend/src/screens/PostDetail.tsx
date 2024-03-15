import { Link, useParams } from 'react-router-dom';
import Loader from '../components/Footer'
import Message from '../components/Message';
import { useGetPostDetailsQuery } from '../redux/query/postSlice';
import { POST } from '../constants/constants';

const PostDetail = () => {
  const { postId } = useParams();
  const { data: post, isLoading, error } = useGetPostDetailsQuery(postId || '');
  return (
    <div className='container mt-4'>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>Đã xảy ra lỗi.Vui lòng thử lại sau</Message>
      ) : (
        <div className='post-content'>
          <div className='post-header'>
            <h1>{post?.postName}</h1>
            <img
              src={post?.image}
              alt={post?.content}
              className='img-fluid rounded post-image'
              style={{ width: 500 }}
            />
          </div>
          <p className='fs-5'>{post?.content}</p>

          <Link to={POST} className='btn btn-primary'>
            Quay Lại
          </Link>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
