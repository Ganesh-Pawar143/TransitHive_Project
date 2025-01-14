// import React from 'react';
//import { Form, Button, Card } from 'react-bootstrap';

// const VendorReviewForm = ({ vendor }) => {
//   const handleApprove = () => {
//     // Implement approve logic
//   };

//   const handleReject = () => {
//     // Implement reject logic
//   };

//   return (
//     <div>
//       <Card className="mb-4">
//         <Card.Body>
//           <Card.Title>Company Information</Card.Title>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Company Name</Form.Label>
//               <Form.Control type="text" value={vendor.companyName} readOnly />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Company Owner Name</Form.Label>
//               <Form.Control type="text" value={vendor.companyOwnerName} readOnly />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Email</Form.Label>
//               <Form.Control type="email" value={vendor.email} readOnly />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Phone</Form.Label>
//               <Form.Control type="text" value={vendor.phone} readOnly />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>GSTIN</Form.Label>
//               <Form.Control type="text" value={vendor.gstin} readOnly />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>PAN Number</Form.Label>
//               <Form.Control type="text" value={vendor.panNumber} readOnly />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Aadhar Number</Form.Label>
//               <Form.Control type="text" value={vendor.ownerAadharNumber} readOnly />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>City</Form.Label>
//               <Form.Control type="text" value={vendor.city} readOnly />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Registration Date</Form.Label>
//               <Form.Control 
//                 type="text" 
//                 value={new Date(vendor.createdOn).toLocaleDateString()} 
//                 readOnly 
//               />
//             </Form.Group>
//           </Form>
//         </Card.Body>
//       </Card>

//       <div className="d-flex gap-2 justify-content-end">
//         <Button variant="success" onClick={handleApprove}>
//           Approve
//         </Button>
//         <Button variant="danger" onClick={handleReject}>
//           Reject
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default VendorReviewForm;


// import axios from 'axios';
// import { Form, Button, Card } from 'react-bootstrap';

// const VendorReviewForm = ({ vendor }) => {
//   const handleApprove = async () => {
//     try {
//       const response = await axios.put(`http://localhost:8080/vendors/${vendor.id}/status?status=APPROVED`);
//       console.log('Vendor approved:', response.data);
//     } catch (error) {
//       console.error('Error approving vendor:', error);
//     }
//   };

//   const handleReject = async () => {
//     try {
//       const response = await axios.post('/api/vendors/reject', { vendorId: vendor.id });
//       console.log('Vendor rejected:', response.data);
//     } catch (error) {
//       console.error('Error rejecting vendor:', error);
//     }
//   };

//   return (
//     <div>
//       <Card className="mb-4">
//         <Card.Body>
//           <Card.Title>Company Information</Card.Title>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Company Name</Form.Label>
//               <Form.Control type="text" value={vendor.companyName} readOnly />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Company Owner Name</Form.Label>
//               <Form.Control type="text" value={vendor.companyOwnerName} readOnly />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Email</Form.Label>
//               <Form.Control type="email" value={vendor.email} readOnly />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Phone</Form.Label>
//               <Form.Control type="text" value={vendor.phone} readOnly />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>GSTIN</Form.Label>
//               <Form.Control type="text" value={vendor.gstin} readOnly />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>PAN Number</Form.Label>
//               <Form.Control type="text" value={vendor.panNumber} readOnly />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Aadhar Number</Form.Label>
//               <Form.Control type="text" value={vendor.ownerAadharNumber} readOnly />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>City</Form.Label>
//               <Form.Control type="text" value={vendor.city} readOnly />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Registration Date</Form.Label>
//               <Form.Control 
//                 type="text" 
//                 value={new Date(vendor.createdOn).toLocaleDateString()} 
//                 readOnly 
//               />
//             </Form.Group>
//           </Form>
//         </Card.Body>
//       </Card>

//       <div className="d-flex gap-2 justify-content-end">
//         <Button variant="success" onClick={handleApprove}>
//           Approve
//         </Button>
//         <Button variant="danger" onClick={handleReject}>
//           Reject
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default VendorReviewForm;

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';

//toast.configure();

const VendorReviewForm = ({ vendor, onClose }) => {
  console.log('Vendor:', vendor);
  const handleApprove = async () => {
    try {
      const response = await axios.patch(`http://localhost:5205/api/Vendor/${vendor.id}/status?status=APPROVED`);
      console.log('Vendor approved:', response.data);
      toast.success('Vendor approved successfully');
      //onClose();
    } catch (error) {
      console.error('Error approving vendor:', error);
      toast.error('Error approving vendor');
    }
  };

  // const handleReject = async () => {
  //   try {
  //     const response = await axios.post('/api/vendors/reject', { vendorId: vendor.id });
  //     console.log('Vendor rejected:', response.data);
  //     toast.success('Vendor rejected successfully');
  //     onClose();
  //   } catch (error) {
  //     console.error('Error rejecting vendor:', error);
  //     toast.error('Error rejecting vendor');
  //   }
  // };

  return (
    <div>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Company Information</Card.Title>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control type="text" value={vendor.companyName} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Company Owner Name</Form.Label>
              <Form.Control type="text" value={vendor.companyOwnerName} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={vendor.email} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" value={vendor.phone} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>GSTIN</Form.Label>
              <Form.Control type="text" value={vendor.gstin} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>PAN Number</Form.Label>
              <Form.Control type="text" value={vendor.panNumber} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Aadhar Number</Form.Label>
              <Form.Control type="text" value={vendor.ownerAadharNumber} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" value={vendor.city} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Registration Date</Form.Label>
              <Form.Control 
                type="text" 
                value={new Date(vendor.createdAt).toLocaleDateString()} 
                readOnly 
              />
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>

      <div className="d-flex gap-2 justify-content-end">
        <Button variant="success" onClick={handleApprove}>
          Approve
        </Button>
        {/* <Button variant="danger" onClick={handleReject}>
          Reject
        </Button> */}
      </div>
    </div>
  );
};

export default VendorReviewForm;