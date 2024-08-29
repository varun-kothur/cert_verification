import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { contract } from "../contract";

function VerifyCertificate() {
  const [certificateId, setCertificateId] = useState("");
  const [certificateData, setCertificateData] = useState(null);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const result = await contract.methods
        .getcert(certificateId)
        .call();

      setCertificateData(result);
    } catch (error) {
      console.error("Error verifying certificate:", error);
      alert("Certificate not found.");
    }
  };

  return (
    <div>
      <h2>Verify Certificate</h2>
      <Form onSubmit={handleVerify}>
        <Form.Group controlId="formCertificateId">
          <Form.Label>Certificate ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter certificate ID"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Verify Certificate
        </Button>
      </Form>
      {certificateData && (
        <div>
          <h4>Certificate Details:</h4>
          <p>Name: {certificateData[0]}</p>
          <p>Course: {certificateData[1]}</p>
          <p>Email: {certificateData[2]}</p>
          <p>Issuer: {certificateData[3]}</p>
        </div>
      )}
    </div>
  );
}

export default VerifyCertificate;
