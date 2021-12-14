import Products from '../components/screens/Products/Products';
import Checkout from '../components/screens/Checkout/Checkout';

const NoMatch = () => {
	return <div>404</div>;
};

const Temporary = () => {
	return <div>Temporary</div>;
};

export const ROUTES = [
	{
		path: '/',
		exact: true,
		component: Temporary
	},
	{
		path: '*',
		exact: true,
		component: NoMatch
	}
];
