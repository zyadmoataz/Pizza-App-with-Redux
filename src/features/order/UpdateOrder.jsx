/* eslint-disable no-unused-vars */
import { useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';

function UpdateOrder() {
  //here we will write and update using fetcher using form component
  const fetcher = useFetcher();
  return (
    //normal Form comonent navigate away after submit
    //this fetcher is used to update and revaildate the page
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary"> Make Priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

//we need an action to update the order > Dont forget to coneect the action to App.jsx
//this is revalidation using fetcher as the react router knows that the data has changed as a result of this action function
//when the data is updatedit will re-fetch the data in the background and then re-render the page with the new data
export async function action({ request, params }) {
  //params can give us the order id from the url
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}
