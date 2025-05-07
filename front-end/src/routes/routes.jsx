
import Homepage from '../pages/Homepage'

import CustomersList from '../pages/customers/CustomersList'
import CustomersForm from '../pages/customers/CustomersForm'
import CarsList from '../pages/cars/CarsList'
import CarsForm from '../pages/cars/CarsForm'
import UsersList from '../pages/users/UsersList'
import LoginPage from '../pages/LoginPage'


const routes = [
    {
      route: '/',
      description: 'Início',
      element: <Homepage />,
      userLevel: 0,
      divider: true
    },
    {
      route: '/login',
      description: 'Entrar',
      element: <LoginPage />,
      userLevel: 0,
      omitFromMainMenu: true
    },
    {
      route: '/customers',
      description: 'Listagem de clientes',
      element: <CustomersList />,
      userLevel: 1
    },
    {
      route: '/customers/new',
      description: 'Cadastro de clientes',
      element: <CustomersForm />,
      userLevel: 1,
      divider: true
    },
    {
      route: '/customers/:id',
      description: 'Alterar cliente',
      element: <CustomersForm />,
      userLevel: 2,
      omitFromMainMenu: true
    },
    {
      route: '/cars',
      description: 'Listagem de veículos',
      element: <CarsList />,
      userLevel: 1
    },
    {
      route: '/cars/new',
      description: 'Cadastro de veículos',
      element: <CarsForm />,
      userLevel: 1,
      divider: true
    },
    {
      route: '/cars/:id',
      description: 'Alterar veículo',
      element: <CarsForm />,
      userLevel: 2,
      omitFromMainMenu: true
    },
    {
      route: '/users',
      description: 'Listagem de usuários',
      element: <UsersList />,
      userLevel: 2
    }
  ]
  
  export default routes