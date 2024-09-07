import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from 'axios';

function GenerateCertificate() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [ipfsHash, setIpfsHash] = useState(""); // This can be left as an empty string if not used
  const [certificateId, setCertificateId] = useState(""); // Added for storing certificate ID

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for server
    const certificateData = {
      name,
      course,
      email,
      ipfsHash, // This can be an empty string if IPFS is not used
    };

    try {
      // Send data to server
      const response = await axios.post('http://localhost:5000/api/certificates', certificateData);

      // Check if response contains the certificate ID
      const { data } = response; // Destructure response data
      if (data && data.data && data.data._id) {
        setCertificateId(data.data._id); // Set the certificate ID in the state
        setTransactionHash(data.data._id); // For demo purposes, using _id as transaction hash
        alert("Certificate generated and stored successfully!");
      } else {
        alert("Failed to retrieve certificate ID.");
      }
    } catch (error) {
      console.error("Error generating certificate:", error);
      alert("Failed to generate certificate. Please check the console for more details.");
    }
  };

  return (
    <div>
      <h2>Generate Certificate</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formCourse">
          <Form.Label>Course</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter course name"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Generate Certificate
        </Button>
      </Form>
      {transactionHash && (
        <div>
          <h4>Certificate ID:</h4>
          <p>{transactionHash}</p>
        </div>
      )}
      {ipfsHash && (
        <div>
          <h4>IPFS Hash:</h4>
          <p>{ipfsHash}</p>
        </div>
      )}
    </div>
  );
}

export default GenerateCertificate;
