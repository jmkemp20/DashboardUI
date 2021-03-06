import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import StudentList from 'src/pages/StudentList';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import LibraryList from 'src/pages/LibraryList';
import LibraryAdd from 'src/pages/LibraryAdd';
import Register from 'src/pages/Register';
import Settings from 'src/pages/Settings';

const routes = (isLoggedIn) => [
  {
    path: 'app',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'students', element: <StudentList /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'library', element: <LibraryList /> },
      { path: 'library/add', element: <LibraryAdd /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: !isLoggedIn ? <MainLayout /> : <Navigate to="/app/dashboard" />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'app/account', element: <Account /> },
      { path: 'app/students', element: <StudentList /> },
      { path: 'app/dashboard', element: <Dashboard /> },
      { path: 'app/library', element: <LibraryList /> },
      { path: 'app/library/add', element: <LibraryAdd /> },
      { path: 'app/settings', element: <Settings /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
