import { useState,useEffect } from 'react';
import { Container, Nav, Tab, Row, Col } from 'react-bootstrap';
import VendorProfile from './components/VendorProfile';
import AvailableBookings from './components/AvailableBookings';
import MyBookings from './components/MyBookings';
import BookingDetailsModal from './components/BookingDetailsModal';
import DashboardLayout from '../../components/common/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

function VendorDashboard() {
  const [activeTab, setActiveTab] = useState('profile');
 
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const[profileVendor,setProfile]=useState([]);

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  useEffect(() => {
    const storedProfile = localStorage.getItem('vendorData');
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);
  const { user } = useAuth();
  const handleAcceptBooking = async (bookingId) => {
    try {
      console.log('Accepting booking:', bookingId);
       // Assuming profileVendor has an id property
      const response = await axios.patch(`http://localhost:5205/api/Booking/${bookingId}/vendor/${user.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log('Accepting booking:', response.data);
      
    } catch (error) {
      console.error('Error accepting booking:', error);
    }
  };

    const handleUpdateStatus = async (bookingId, newStatus) => {
      try {
        const response = await axios.patch(`http://localhost:5205/api/Booking/${bookingId}/status/COMPLETED`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });     
        console.log('Updating booking status:', bookingId, newStatus);
      } catch (error) {
        console.error('Error updating booking status:', error);
      }
    };

    return (
      <DashboardLayout title="Vendor Dashboard">
        <Container fluid>
          <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
            <Row>
              <Col>
                <Nav variant="tabs" className="mb-4">
                  <Nav.Item>
                    <Nav.Link eventKey="profile">My Profile</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="available">Available Bookings</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="mybookings">My Bookings</Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content>
                  <Tab.Pane eventKey="profile">
                    <VendorProfile />
                  </Tab.Pane>

                  <Tab.Pane eventKey="available">
                    <AvailableBookings
                      onViewDetails={handleViewDetails}
                      onAcceptBooking={handleAcceptBooking}
                    />
                  </Tab.Pane>

                  <Tab.Pane eventKey="mybookings">
                    <MyBookings
                      onViewDetails={handleViewDetails}
                      onUpdateStatus={handleUpdateStatus}
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
        </Container>
      </DashboardLayout>
    );
  }

  export default VendorDashboard;


  