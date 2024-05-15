import { useDispatch } from 'react-redux';
import { useState } from 'react';
import Button from '../../ui/Button';
import { updateName } from './userSlice';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  //1-This is a local state this is made to make theinput element controlled element
  //when we change the username in the input field we will update the local state variable and not always update redux store
  //only update the redux store when the input is done and after the form is submitted
  const [username, setUsername] = useState('');

  //4- then redirect to the menu using navigate from react router dom
  const navigate = useNavigate();

  //2-To update the store we do that using useDispatch from redux
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();

    if (!username) return;
    //3- Here we can dispatch the action to update the store
    //instead of manually dispatching an action we can use action creator function which is updateName that was exported from userSlice
    dispatch(updateName(username));
    navigate('./menu');
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        className="input mb-8 w-72"
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {username !== '' && (
        <div>
          {/* <button>Start ordering</button> */}
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
