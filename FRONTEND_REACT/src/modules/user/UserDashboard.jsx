import { useState,useEffect } from 'react';
import { Container, Nav, Tab, Row, Col } from 'react-bootstrap';
import UserProfile from './components/UserProfile';
//import AvailableBookings from './components/AvailableBookings';
import MyBookings from './components/MyBookings';
import BookingDetailsModal from './components/BookingDetailsModal';
//import makePaymentModal from './components/makePaymentModal';
import DashboardLayout from '../../components/common/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

function UserDashboard() {
  const [activeTab, setActiveTab] = useState('profile');
 
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const[profileVendor,setProfile]=useState([]);

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  
  // const handleShowPaymentModal = (booking) => {
  //   setSelectedBooking(booking);
  //   setShowPaymentModal(true);
  // };

  // const handleClosePaymentModal = () => {
  //   setShowPaymentModal(false);
  //   setSelectedBooking(null);
  // };

  useEffect(() => {
    const storedProfile = localStorage.getItem('vendorData');
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);
  const { user } = useAuth();
  // const handleAcceptBooking = async (bookingId) => {
  //   try {
  //      // Assuming profileVendor has an id property
  //     const response = await axios.put(`http://localhost:8080/bookings/${bookingId}/assign-vendor?vendorId=${user.id}`, {
  //       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  //     });
  //     console.log('Accepting booking:', response.data);
  //     console.log('Accepting booking:', bookingId);
  //   } catch (error) {
  //     console.error('Error accepting booking:', error);
  //   }
  // };

  // const handleMakePayment = async (bookingId,userId,vendorId,cost) => {
  //   try {
  //      // Assuming profileVendor has an id property
  //     const response = await axios.put(`http://localhost:8080/bookings/${bookingId}/assign-vendor?vendorId=${user.id}`, {
  //       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  //     });
  //     console.log('Accepting booking:', response.data);
  //     console.log('Accepting booking:', bookingId);
  //   } catch (error) {
  //     console.error('Error accepting booking:', error);
  //   }
  // };

    const handleUpdateStatus = async (bookingId) => {
      try {
        const response = await axios.patch(`http://localhost:5205/api/Booking/${bookingId}/status/CANCELLED`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        console.log('Updating booking status:', bookingId);
      } catch (error) {
        console.error('Error updating booking status:', error);
      }
    };

    return (
      <DashboardLayout title="User Dashboard">
        <Container fluid>
          <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
            <Row>
              <Col>
                <Nav variant="tabs" className="mb-4">
                  <Nav.Item>
                    <Nav.Link eventKey="profile">My Profile</Nav.Link>
                  </Nav.Item>
                  {/* <Nav.Item>
                    <Nav.Link eventKey="available">Available Bookings</Nav.Link>
                  </Nav.Item> */}
                  <Nav.Item>
                    <Nav.Link eventKey="mybookings">My Bookings</Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content>
                  <Tab.Pane eventKey="profile">
                    <UserProfile />
                  </Tab.Pane>

                  {/* <Tab.Pane eventKey="available">
                    <AvailableBookings
                      onViewDetails={handleViewDetails}
                      onAcceptBooking={handleAcceptBooking}
                    />
                  </Tab.Pane> */}

                  <Tab.Pane eventKey="mybookings">
                    <MyBookings
                      onViewDetails={handleViewDetails}
                      onUpdateStatus={handleUpdateStatus}
                     // onMakePayment={handleShowPaymentModal}
                    />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>

          {showDetailsModal && selectedBooking && (
            <BookingDetailsModal
              booking={selectedBooking}
              onClose={() => setShowDetailsModal(false)}
            />
          )}

          {/* {showPaymentModal && selectedBooking && (
            <makePaymentModal
              booking={selectedBooking}
              onClose={() => setShowPaymentModal(false)}
            />
          )} */}
        </Container>
      </DashboardLayout>
    );
  }

  export default UserDashboard;


  