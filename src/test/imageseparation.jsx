// PortfolioSection.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import portfolioData from './separatejson';

const PortfolioSection = () => {
  const [filter, setFilter] = useState('*');

  const filteredData = filter === '*' ? portfolioData : portfolioData.filter(item => `.${item.category}` === filter);

  return (
    <Container fluid className="bg-light py-6 px-5">
      <div className="text-center mx-auto mb-5" style={{ maxWidth: '600px' }}>
        <h1 className="display-5 text-uppercase mb-4">Some Of Our <span className="text-primary">Popular</span> Dream Projects</h1>
      </div>
      <Row className="gx-5">
        <Col className="text-center">
          <div className="d-inline-block bg-dark-radial text-center pt-4 px-5 mb-5">
            <ul className="list-inline mb-0" id="portfolio-flters">
              <li
                className={`btn btn-outline-primary bg-white p-2 mx-2 mb-4 ${filter === '*' ? 'active' : ''}`}
                onClick={() => setFilter('*')}
              >
                <img src="img/portfolio-1.jpg" alt="" style={{ width: '150px', height: '100px' }} />
                <div className="position-absolute top-0 start-0 end-0 bottom-0 m-2 d-flex align-items-center justify-content-center" style={{ background: 'rgba(4, 15, 40, .3)' }}>
                  <h6 className="text-white text-uppercase m-0">All</h6>
                </div>
              </li>
              <li
                className={`btn btn-outline-primary bg-white p-2 mx-2 mb-4 ${filter === '.first' ? 'active' : ''}`}
                onClick={() => setFilter('.first')}
              >
                <img src="img/portfolio-2.jpg" alt="" style={{ width: '150px', height: '100px' }} />
                <div className="position-absolute top-0 start-0 end-0 bottom-0 m-2 d-flex align-items-center justify-content-center" style={{ background: 'rgba(4, 15, 40, .3)' }}>
                  <h6 className="text-white text-uppercase m-0">Construction</h6>
                </div>
              </li>
              <li
                className={`btn btn-outline-primary bg-white p-2 mx-2 mb-4 ${filter === '.second' ? 'active' : ''}`}
                onClick={() => setFilter('.second')}
              >
                <img src="img/portfolio-3.jpg" alt="" style={{ width: '150px', height: '100px' }} />
                <div className="position-absolute top-0 start-0 end-0 bottom-0 m-2 d-flex align-items-center justify-content-center" style={{ background: 'rgba(4, 15, 40, .3)' }}>
                  <h6 className="text-white text-uppercase m-0">Renovation</h6>
                </div>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
      <Row className="g-5 portfolio-container">
        {filteredData.map(item => (
          <Col xl={4} lg={6} md={6} key={item.id} className={`portfolio-item ${item.category}`}>
            <Card className="position-relative portfolio-box">
              <Card.Img variant="top" src={item.image} className="img-fluid w-100" />
              <Card.Body>
                <Card.Title className="portfolio-title shadow-sm">
                  <p className="h4 text-uppercase">{item.title}</p>
                  <span className="text-body">
                    <i className="fa fa-map-marker-alt text-primary me-2"></i>{item.location}
                  </span>
                </Card.Title>
              </Card.Body>
              <Card.Footer className="portfolio-btn">
                <a href={item.image} data-lightbox="portfolio">
                  <i className="bi bi-plus text-white"></i>
                </a>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PortfolioSection;
