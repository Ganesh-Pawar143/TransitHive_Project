// import React from 'react';
// import { Card, ListGroup, Button } from 'react-bootstrap';

// const VendorProfile = ({ vendor }) => {
//   const handleEdit = () => {
//     // Implement edit functionality
//   };

  // const handleSuspend = () => {
  //   // Implement suspend functionality
  // };

//   return (
//     <div>
//       <Card className="mb-4">
//         <Card.Body>
//           <Card.Title>Company Details</Card.Title>
//           <ListGroup variant="flush">
//           <ListGroup.Item>
//               <strong>Vendor ID:</strong> {vendor.id}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>Company Name:</strong> {vendor.companyName}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>Company Owner:</strong> {vendor.companyOwnerName}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>Email:</strong> {vendor.email}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>Phone:</strong> {vendor.phone}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>GSTIN:</strong> {vendor.gstin}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>PAN Number:</strong> {vendor.panNumber}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>Aadhar Number:</strong> {vendor.ownerAadharNumber}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>city:</strong> {vendor.city}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>Registration Date:</strong>{' '}
//               {new Date(vendor.createdOn).toLocaleDateString()}
//             </ListGroup.Item>
//           </ListGroup>
//         </Card.Body>
//       </Card>

//       <div className="mt-3 d-flex gap-2">
//         <Button variant="primary" onClick={handleEdit}>
//           Edit Details
//         </Button>
//         <Button variant="warning" onClick={handleSuspend}>
//           Suspend Vendor
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default VendorProfile;


import React, { useState } from 'react';
import axios from 'axios';
import { Card, ListGroup, Button } from 'react-bootstrap';

const VendorProfile = ({ vendor }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...vendor });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`/api/vendors/${vendor.id}`, formData);
      console.log('Vendor updated:', response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating vendor:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSuspend = async () => {
    try {
      const response = await axios.patch(`http://localhost:5205/api/Vendor/${vendor.id}/status?status=SUSPENDED`);
      console.log('Vendor Suspended:', response.data);
      toast.success('Vendor Suspended successfully');
      //onClose();
    } catch (error) {
      console.error('Error Suspend vendor:', error);
      toast.error('Error Suspend vendor');
    }
  };

  return (
    <div>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Company Details</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Vendor ID:</strong> {vendor.id}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Company Name:</strong>
              {isEditing ? (
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              ) : (
                vendor.companyName
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Company Owner:</strong>
              {isEditing ? (
                <input
                  type="text"
                  name="companyOwnerName"
                  value={formData.companyOwnerName}
                  onChange={handleChange}
                />
              ) : (
                vendor.companyOwnerName
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Email:</strong>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              ) : (
                vendor.email
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Phone:</strong>
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              ) : (
                vendor.phone
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>GSTIN:</strong>
              {isEditing ? (
                <input
                  type="text"
                  name="gstin"
                  value={formData.gstin}
                  onChange={handleChange}
                />
              ) : (
                vendor.gstin
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>PAN Number:</strong>
              {isEditing ? (
                <input
                  type="text"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleChange}
                />
              ) : (
                vendor.panNumber
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Aadhar Number:</strong>
              {isEditing ? (
                <input
                  type="text"
                  name="ownerAadharNumber"
                  value={formData.ownerAadharNumber}
                  onChange={handleChange}
                />
              ) : (
                vendor.ownerAadharNumber
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>City:</strong>
              {isEditing ? (
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              ) : (
                vendor.city
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Registration Date:</strong>{' '}
              {new Date(vendor.createdAt).toLocaleDateString()}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>

      <div className="mt-3 d-flex gap-2">
        {isEditing ? (
          <Button variant="success" onClick={handleSave}>
            Save Changes
          </Button>
        ) : (
          <Button variant="primary" onClick={handleEdit}>
            Edit Details
          </Button>
        )}
        <Button variant="warning" onClick={handleSuspend}>
          Suspend Vendor
        </Button>
      </div>
    </div>
  );
};

export default VendorProfile;