// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Certificate {
    struct Cert {
        string name;
        string course;
        string email;
        string ipfsHash;
    }

    mapping(uint256 => Cert) private certificates;
    uint256 public certCounter;

    event CertificateIssued(uint256 indexed id, string name, string course, string email, string ipfsHash);

    function issueCertificate(
        string calldata _name,
        string calldata _course,
        string calldata _email,
        string calldata _ipfsHash
    ) external {
        certCounter++;
        certificates[certCounter] = Cert(_name, _course, _email, _ipfsHash);
        emit CertificateIssued(certCounter, _name, _course, _email, _ipfsHash);
    }

    function getCertificate(uint256 _id)
        external
        view
        returns (
            string memory name,
            string memory course,
            string memory email,
            string memory ipfsHash
        )
    {
        Cert storage cert = certificates[_id];
        return (cert.name, cert.course, cert.email, cert.ipfsHash);
    }
}
