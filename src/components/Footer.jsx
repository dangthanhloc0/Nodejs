import { useAuth } from '../context/AuthContext';

export default function Footer() {
  const { user, isLoggedIn } = useAuth();

  return (
    <footer className={`${isLoggedIn && user?.userType === 'admin' ? 'bg-gray-800' : 'bg-gray-800'} text-white p-4 text-center mt-8`}>
      <p>
        {isLoggedIn && user?.userType === 'admin' 
          ? '© 2025 TourBooking Admin Panel' 
          : '© 2025 TourBooking. All Rights Reserved.'}
      </p>
    </footer>
  );
}