import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { contract } from "../contract";
import { create } from "ipfs-http-client";

const ipfs = create("https://ipfs.infura.io:5001");

function GenerateCertificate({ account }) {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for IPFS
    const certificateData = JSON.stringify({ name, course, email });

    try {
      // Upload to IPFS
      const result = await ipfs.add(certificateData);
      setIpfsHash(result.path);

      // Interact with smart contract
      const txResult = await contract.methods
        .addcert(name, course, email)
        .send({ from: account });

      setTransactionHash(txResult.transactionHash);
      alert("Certificate generated successfully and stored on IPFS!");
    } catch (error) {
      console.error("Error generating certificate:", error);
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
          <h4>Transaction Hash:</h4>
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
