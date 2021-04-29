import React, { useState, useRef } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { SHA256 } from "crypto-js";

const _ = require("lodash");

const POF = (props) => {
  const [diplomaId, setDiplomaId] = useState();
  const [institution, setInstitution] = useState();
  const [diplomaData, setDiplomaData] = useState({});
  const [fileHash, setFileHash] = useState("");
  const fileFrm = useRef();

  const handleFileChosen = (file) => {
    if (!file) {
      setFileHash("");
      return;
    }
    setFileHash("Calculating hash...");
    const fileReader = new FileReader();
    fileReader.onloadend = (e) => {
      setTimeout(() => setFileHash(SHA256(fileReader.result).toString()), 200);
    };
    fileReader.readAsBinaryString(file);
  };

  return (
    <Container>
      <Form className="user-select-none">
        <Form.Group>
          <Form.Label>Diploma Id</Form.Label>
          <Form.Control
            onChange={(e) => setDiplomaId(e.target.value)}
            type="text"
            placeholder="Enter id of the diploma"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Institution public address</Form.Label>
          <Form.Control
            onChange={(e) => setInstitution(e.target.value)}
            type="text"
            placeholder="e.g. 0xb794f5ea0ba39494ce839613fffba74279579268"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Digital Diploma -{" "}
            <small>
              file won't be uploaded, it is used to calculate its hash value
              using SHA256
            </small>
          </Form.Label>
          <Form.File
            ref={fileFrm}
            id="exampleFormControlFile1"
            onChange={(e) => handleFileChosen(e.target.files[0])}
          />

          {fileHash && (
            <Form.Control
              className="mt-2 mb-2"
              readOnly
              type="text"
              placeholder="File hash"
              value={fileHash}
            />
          )}
        </Form.Group>
        <Form.Group className="text-center">
          <Button
            variant="success"
            onClick={async () => {
              if (!diplomaId || !institution || !fileHash) return;
              const response = await props.proof_of_existence(
                diplomaId,
                institution,
                fileHash
              );
              setDiplomaData({
                isValid: response,
                diplomaId,
                institution,
                fileHash,
              });
            }}
          >
            Prove Existence
          </Button>
        </Form.Group>
      </Form>
      {!_.isEmpty(diplomaData) && (
        <Alert variant={diplomaData["isValid"] ? "success" : "danger"}>
          {diplomaData["isValid"] && (
            <span className="ml-3">
              The digital copy of the diploma{" "}
              <strong>{diplomaData["diplomaId"]}</strong> is authentic, was
              generated by the institution{" "}
              <strong>{diplomaData["institution"]}</strong>.
            </span>
          )}
          {!diplomaData["isValid"] && (
            <span className="ml-3">
              The digital copy of the diploma{" "}
              <strong>{diplomaData["diplomaId"]}</strong> is NOT valid
            </span>
          )}
        </Alert>
      )}
    </Container>
  );
};
export default POF;