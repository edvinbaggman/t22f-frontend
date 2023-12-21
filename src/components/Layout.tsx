import Footer from './Footer';
import Navbar from './navbar/Navbar';

interface Props {
  children: JSX.Element;
}

const Layout = ({ children }: Props) => {
  return (
    <div className='w-screen bg-gray-100'>
      <div className='relative min-h-screen flex flex-col'>
        <Navbar />
        <div className='flex flex-col grow'>{children}</div>
        <Footer />
      </div>
    </div>
  );
};
export default Layout;
