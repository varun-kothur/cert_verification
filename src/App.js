import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import Home from "./components/Home";
import GenerateCertificate from "./components/GenerateCertificate";
import VerifyCertificate from "./components/VerifyCertificate";
import { web3, contract } from "./contract";

function App() {
  const [account, setAccount] = useState("");

  useEffect(() => {
    const loadAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    };
    loadAccount();
  }, []);

  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Certification DApp</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/generate">Generate Certificate</Nav.Link>
          <Nav.Link href="/verify">Verify Certificate</Nav.Link>
        </Nav>
        <Navbar.Text className="justify-content-end">
          {account ? `Connected: ${account}` : "Not connected"}
        </Navbar.Text>
      </Navbar>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generate" element={<GenerateCertificate account={account} />} />
          <Route path="/verify" element={<VerifyCertificate />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
