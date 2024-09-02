// icons
import { BsGeoAlt, BsEnvelopeOpen, BsPhoneVibrate } from 'react-icons/bs';
import { FaArrowRight, FaArrowUp, FaHome, FaTools, FaCheck, FaPalette, FaPaintBrush, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaAngleRight } from 'react-icons/fa';
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { FaQuoteLeft, FaCalendarAlt } from 'react-icons/fa';
import buildingsIcon from '@iconify/icons-bi/buildings'; // Correct import for Iconify icon

const iconMap = {
    location: BsGeoAlt,
    email: BsEnvelopeOpen,
    phone: BsPhoneVibrate,
    building_1: buildingsIcon, 
    right_arrow: FaArrowRight,
    up_arrow: FaArrowUp,
    home: FaHome,
    tool: FaTools,
    check: FaCheck,
    // building_2: FaBuilding, // Remove if not used
    paintplate: FaPalette,
    brush: FaPaintBrush,
    smalllocation: FaMapMarkerAlt,
    twitter: FaTwitter,
    facebook: FaFacebookF,
    linkedin: FaLinkedinIn,
    insta: FaInstagram,
    quote: FaQuoteLeft,
    calendar: FaCalendarAlt,
    footerphone: FaPhoneAlt,
    envelope: FaEnvelope,
    angle_right: FaAngleRight,
};

export default iconMap;

// quickcontact
export const quickcontact = [
    {
        id:1,
        location_icon_1: 'location',
        heading_1: 'our office',
        description_1: '123 Street, New York, USA'
    },
    {
        id:2,
        email_icon_2: 'email',
        heading_2: 'email us',
        description_2: 'info@example.com'
    },
    {
        id:3,
        phone_icon_3: 'phone',
        heading_3: 'call us',
        description_3: '+012 345 6789'
    }
];


//navbar
export const navbar = [
    {
      icon: 'building_1',
      brand: "WEBUILD",
      links: [
        { to: "/index", label: "Home" },
        { to: "/about", label: "About" },
        { to: "/service", label: "Service" },
      ],
      dropdown: {
        title: "Pages",
        items: [
          { to: "/project", label: "Our Project" },
          { to: "/team", label: "The Team" },
          { to: "/testimonial", label: "Testimonial" },
          { to: "/blog", label: "Blog Grid" },
          { to: "/detail", label: "Blog Detail" }
        ]
      },
      links1: [
        { to: "/contact", label: "Contact" }
      ],
      button: [
        { to: "/signup", label: "Signup" },
        { to: "/Signin", label: "Signin" }
      ],
      quoteButton: {
        label: "Signup/Signin",
        link: ""
      }
    }
  ];


  //carousel

import carousel_1 from "./img/carousel-1.jpg";
import carousel_2 from "./img/carousel-2.jpg";

export const carousel = {
  1: {
    icon:"home",
    image: carousel_1,
    heading: "Build Your Dream House With Us",
    caption: "Default caption",
  },
  2: {
    icon:"tool",
    image: carousel_2,
    heading: "We Are Trusted For Your Project",
    caption: "Contact us",
  },
};
