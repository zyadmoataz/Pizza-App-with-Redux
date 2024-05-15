import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';

function Menu() {
  //this is the third step
  const menu = useLoaderData();

  return (
    //divide class will add lines to the child elements
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </ul>
  );
}

//this is the first step
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
