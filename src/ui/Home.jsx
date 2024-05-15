import { useSelector } from 'react-redux';
import CreateUser from './../features/user/CreateUser';
import Button from './Button';
import { getUser } from '../features/user/userSlice';
function Home() {
  //read user from the state
  const username = useSelector(getUser);
  return (
    // small devices has margin y of 16 as a responsive design
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="mb-8  text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username === '' ? (
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary">
          Continue Ordering {username}
        </Button>
      )}
    </div>
  );
}

export default Home;
