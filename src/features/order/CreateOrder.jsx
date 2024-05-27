import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import EmptyCart from './../cart/EmptyCart';
import store from './../../store';
import { formatCurrency } from './../../utils/helpers';
import { useState } from 'react';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: 'Mediterranean',
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: 'Vegetale',
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: 'Spinach and Mushroom',
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isSubmitting = navigation.state === 'submitting';

  const isLoadingAddress = addressStatus === 'loading';

  //we can get access to the action data by using useActionData in case there is no submitting
  const formErrors = useActionData(); //to return an error that we can display in the user interface
  const [withPriority, setWithPriority] = useState(false);
  // const cart = fakeCart;
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  if (!cart) return <EmptyCart />;
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-bold">Ready to order? Lets go!</h2>
      {/*  in action the react will match to the closest route*/}
      {/* <Form method="POST" action="/order/new"> this also works*/}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          {/* we used flex basis to make it take large width and not to be compressed */}
          <label className="sm:basis-40">First Name</label>
          {/* here it has no parent container so make it take flex grow */}
          <input
            className="input grow"
            type="text"
            name="customer"
            required
            defaultValue={username}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center ">
          <label className="sm:basis-40">Phone number</label>
          {/* this input is inside a div for incoming errors so it doesn't have full width to make it have full width use flex grow */}
          <div className="grow sm:flex sm:flex-col">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700 ">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          {/* here we should use the grow on the parent container and make the input child have full width */}
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {addressStatus === 'error' && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700 ">
                {errorAddress}
              </p>
            )}
          </div>
          {!position.lattitude && !position.longitude && (
            <span className=" absolute right-[10px] top-[35px] md:right-[5px] md:top-[10px]">
              <Button
                type="circle"
                disabled={isLoadingAddress}
                onClick={(e) => {
                  //button inside the form if we clicked on it it will submit the form to prevent that use preventDefault
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                📌
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2  "
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        {/* this is to send the cart data in this component into this action function by submitting it into the form  to get access to it in the action  > later on this cart will come from redux  */}
        {/* this is the way of getting some data into the action without it being in the form field */}
        {/* json.stringify(cart) as cart is now an object and we have to convert it into a string */}
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        {/* this is to help the company to get the position of the user */}
        <input
          type="hidden"
          name="priorityPrice"
          value={
            position.longitude && position.lattitude
              ? `${position.lattitude}, ${position.longitude}`
              : ''
          }
        />
        <div>
          {/* <button
            type="submit"
            disabled={isSubmitting}
           
          >
            {isSubmitting ? 'Placing order...' : ' Order now'}
          </button> */}
          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {' '}
            {isSubmitting
              ? 'Placing order...'
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// when this Form is submitted, behind the scenes react router will then call this action function and it will pass in the request that it was submitted > so we can get access to that request

export async function action({ request }) {
  const formData = await request.formData(); //form data is provided by the browser
  // console.log(formData);
  const data = Object.fromEntries(formData); //convert the form data to an object
  // console.log(data);
  //we will override some data make priority true or false by that condition as if its on it will be true otherwise false and convert caert back to an object > now we can use this data to create a new order
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  // errors object
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = 'Please enter a valid phone number';

  //if we have at least one error we will return it
  if (Object.keys(errors).length > 0) return errors; //then we can use this data up in the component

  //if everyting is okay create a new order and redirect
  const newOder = await createOrder(order);
  //now we want to redirect to the new order / id showing the info about the new order
  //we cannot use use navigate because it comes from use navigate hook and we cannot call hooks inside this function
  //so we will use use redirect that creates a new request and it will redirect to the new route
  // console.log(order);

  //we cannout use hooks inside the action function but we will make a hack approach
  //don't overuse this as it will cause a lot of problems
  store.dispatch(clearCart());

  return redirect(`/order/${newOder.id}`);
}

export default CreateOrder;
