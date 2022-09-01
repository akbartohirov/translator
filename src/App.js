import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [fromLanguage, setFromLanguage] = useState("en"); // select 1
  const [toLanguage, setToLanguage] = useState("ru"); // select 2
  const [translateTo, setTranslateTo] = useState(""); // tarjima qilinishi kerak bo'lgan so'z
  const [translated, setTranslated] = useState(""); // tarjima

  const encodedParams = new URLSearchParams();
  encodedParams.append("source_language", `${fromLanguage}`);
  encodedParams.append("target_language", `${toLanguage}`);
  encodedParams.append("text", `${translateTo}`);

  const submitHandler = (e) => {
    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "b74cc903dbmshfe199f88fc35e3ap1e172ajsn1d8fccbbc644",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      data: encodedParams,
    };

    axios
      .request(options)
      .then((response) => {
        setTranslated(response.data.data.translatedText);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <Container>
      <h1 className="mt-4">Translator</h1>
      <Row>
        <Col lg={6} md={12}>
          <Form.Select
            value={fromLanguage}
            onChange={(e) => setFromLanguage(e.target.value)}
            aria-label="Default select example"
          >
            <option value="ru">Russian</option>
            <option value="en">English</option>
            <option value="uz">Uzbek</option>
            <option value="de">German</option>
          </Form.Select>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              value={translateTo}
              onChange={(e) => setTranslateTo(e.target.value)}
              style={{
                minHeight: "300px",
                marginTop: "20px",
              }}
              rows={3}
            />
          </Form.Group>
        </Col>
        <Col lg={6} md={12}>
          <Form.Select
            value={toLanguage}
            onChange={(e) => {
              setToLanguage(e.target.value);
            }}
            aria-label="Default select example"
          >
            <option value="ru">Russian</option>
            <option value="en">English</option>
            <option value="uz">Uzbek</option>
            <option value="de">German</option>
          </Form.Select>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              value={translated}
              onChange={(e) => setTranslated(e.target.value)}
              disabled
              style={{
                minHeight: "300px",
                marginTop: "20px",
              }}
              rows={3}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Button onClick={(e) => submitHandler(e)} variant="success">
          Translate
        </Button>
      </Row>
    </Container>
  );
};

export default App;
