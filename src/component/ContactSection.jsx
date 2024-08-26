import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import iconMap from '../assets/icons'; // Import your icon map
import { quickcontact } from '../assets/quickcontact';

const ContactSection = () => {
    return (
        <Container fluid className="px-5 hidden lg:block">
            <Row className="gx-5">
                {quickcontact.map((contact, index) => {
                    // Select the appropriate icon from iconMap based on available icons
                    const iconKey = contact.location_icon_1 || contact.email_icon_2 || contact.phone_icon_3;
                    const IconComponent = iconMap[iconKey] || null;

                    // Choose the appropriate heading and description
                    const heading = contact.heading_1 || contact.heading_2 || contact.heading_3;
                    const description = contact.description_1 || contact.description_2 || contact.description_3;

                    return (
                        <Col key={contact.id} lg={4} className={`text-center py-3 px-4 ${index === 1 ? 'border-x' : ''}`}>
                            <div className="d-flex align-items-center justify-content-center">
                                {IconComponent && <IconComponent className="text-customorange leading-7 text-4xl me-3" />}
                                <div className="text-start">
                                    <h6 className="uppercase font-roboto text-xl font-custom-bold text-customblack mt-1">
                                        {heading}
                                    </h6>
                                    <p className="text-customwhite font-open-sans text-xl mb-0">{description}</p>
                                </div>
                            </div>
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
};

export default ContactSection;



// import React from 'react';
// import { Container, Row, Col } from 'react-bootstrap'; 
// import iconMap from '../assets/icons';
// import { quickcontact } from '../assets/quickcontact';

// const ContactSection = () => {
//     return (
//         <Container fluid className="px-5 hidden lg:block">
//             <Row className="gx-5">
//                 {quickcontact.map((contact, index) => {
                    
//                     const IconComponent = iconMap[contact.location_icon_1] || 
//                                           iconMap[contact.email_icon_2] || 
//                                           iconMap[contact.phone_icon_3];

                    
//                     const heading = contact.heading_1 || contact.heading_2 || contact.heading_3;
//                     const description = contact.description_1 || contact.description_2 || contact.description_3;

//                     return (
//                         <Col key={index} lg={4} className={`text-center justify-center w-1/3 leading-7 py-3 px-4 ${index === 1  ? 'border-x' : ''} lg:inline-block`}>
//                             <div className="flex align-items-center justify-center">
//                                 {IconComponent && <IconComponent className="text-customorange leading-7 text-40px me-3" />}
//                                 <div className="text-start">
//                                     <h6 className="uppercase font-roboto text-16px font-custom-bold text-customblack mt-1">
//                                         {heading}
//                                     </h6>
//                                     <p className="text-customwhite font-open-sans text-16px mb-0">{description}</p>
//                                 </div>
//                             </div>
//                         </Col>
//                     );
//                 })}
//             </Row>
//         </Container>
//     );
// };

// export default ContactSection;
