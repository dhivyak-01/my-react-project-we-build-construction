// image
import carousel_1 from "./img/carousel-1.jpg";
import carousel_2 from "./img/carousel-2.jpg";
import signature from "./img/signature.jpg";
import about from "./img/about.jpg";
import service_1 from "./img/service-1.jpg";
import service_2 from "./img/service-2.jpg";
import service_3 from "./img/service-3.jpg";
import service_4 from "./img/service-4.jpg";
import service_5 from "./img/service-5.jpg";
import service_6 from "./img/service-6.jpg";
import portfolio_1 from "./img/portfolio-1.jpg";
import portfolio_2 from "./img/portfolio-2.jpg";
import portfolio_3 from "./img/portfolio-3.jpg";
import portfolio_4 from "./img/portfolio-4.jpg";
import portfolio_5 from "./img/portfolio-5.jpg";
import portfolio_6 from "./img/portfolio-6.jpg";
import team_1 from "./img/team-1.jpg";
import team_2 from "./img/team-2.jpg";
import team_3 from "./img/team-3.jpg";
import team_4 from "./img/team-4.jpg";
import testimonial_1 from "./img/testimonial-1.jpg";
import testimonial_2 from "./img/testimonial-2.jpg";
import testimonial from "./img/testimonial.jpg";

import blog_1 from "./img/blog-1.jpg";
import blog_2 from "./img/blog-2.jpg";
import blog_3 from "./img/blog-3.jpg";
import user from "./img/user.jpg";


// icons
import { BsGeoAlt, BsEnvelopeOpen, BsPhoneVibrate } from "react-icons/bs";
import {
  FaArrowRight,
  FaArrowUp,
  FaHome,
  FaTools,
  FaBuilding,
  FaCheck,
  FaPalette,
  FaPaintBrush,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaAngleRight,
  FaDraftingCompass,
  FaYoutube,
} from "react-icons/fa";
import {
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { FaQuoteLeft, FaCalendarAlt } from "react-icons/fa";
import { Icon } from '@iconify/react';
import buildingsIcon from "@iconify/icons-bi/buildings"; // Correct import for Iconify icon

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
  building_2: FaBuilding, // Remove if not used
  paintplate: FaPalette,
  compass: FaDraftingCompass,
  brush: FaPaintBrush,
  smalllocation: FaMapMarkerAlt,
  twitter: FaTwitter,
  facebook: FaFacebookF,
  linkedin: FaLinkedinIn,
  insta: FaInstagram,
  youtube:FaYoutube,
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
    id: 1,
    location_icon_1: "location",
    heading_1: "our office",
    description_1: "123 Street, New York, USA",
  },
  {
    id: 2,
    email_icon_2: "email",
    heading_2: "email us",
    description_2: "info@example.com",
  },
  {
    id: 3,
    phone_icon_3: "phone",
    heading_3: "call us",
    description_3: "+012 345 6789",
  },
];

//navbar
export const navbar = [
  {
    icon: "building_1",
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
        { to: "/detail", label: "Blog Detail" },
      ],
    },
    links1: [{ to: "/contact", label: "Contact" }],
    button: [
      { to: "/signup", label: "Signup" },
      { to: "/Signin", label: "Signin" },
    ],
    quoteButton: {
      label: "Signup/Signin",
      link: "",
    },
  },
];

// signin
export const signinForm = {
  title: "Signin Form",
  fields: [
    {
      label: "Name",
      id: "fname",
      type: "text",
      required: true,
    },
    {
      label: "Company",
      id: "lname",
      type: "text",
      required: true,
    },
    {
      label: "Email",
      id: "email",
      type: "email",
      required: true,
    },
    {
      label: "Password",
      id: "password",
      type: "password",
      required: true,
    },
  ],
};

//carousel
export const carousel = {
  1: {
    icon: "home",
    image: carousel_1,
    heading: "Build Your Dream House With Us",
    caption: "get a quote",
  },
  2: {
    icon: "tool",
    image: carousel_2,
    heading: "We Are Trusted For Your Project",
    caption: "Contact us",
  },
};

export const theleader = [
  {
    title: "We are Leader in Construction Industry",
    description_1:
      "It was a time of elitr at rebum at at clita. Diam pain diam diam very time diam diam diam diam and labor them",
    description_2:
      "It was time for the vines to settle down. Let the pain be long, and let it be settled in time. Some of them have a lot of work to do. Clita was the very thing, but it was not the work of the people. Saint Clita two just and time",
    icon: "check",
    ponit_1: "Perfect Planning",
    ponit_2: "Professional Workers",
    ponit_3: "First Working Process",
    description_3:
      "It was time for the vines to settle down. Let the pain be long, and let it be settled in time. I'm going to do some homework and work on them",
    imagesign: signature,
    imagegirl: about,
  },
];
// data.js
export const thebest = {
  title: "We Provide The Best Construction Services",
  fields: [
    {
      id: "1",
      image: service_1,
      contenttitle: "Building Construction",
      content:
        "Two with pain and a diam, but he himself will stand two diam. I'm going to do it as I'm going to do it but it was but it's going to be a big elitr amet kasd diam two",
      icon: "building_2",
      button: "read more",
      arrowicon: "right_arrow",
    },
    {
      id: "2",
      image: service_2,
      contenttitle: "House Renovation",
      content:
        "Two with pain and a diam, but he himself will stand two diam. I'm going to do it as I'm going to do it but it was but it's going to be a big elitr amet kasd diam two",
      icon: "home",
      button: "read more",
      arrowicon: "right_arrow",
    },
    {
      id: "3",
      image: service_3,
      contenttitle: "Architecture Design",
      content:
        "Two with pain and a diam, but he himself will stand two diam. I'm going to do it as I'm going to do it but it was but it's going to be a big elitr amet kasd diam two",
      icon: "compass",
      button: "read more",
      arrowicon: "right_arrow",
    },
    {
      id: "4",
      image: service_4,
      contenttitle: "Interior Design",
      content:
        "Two with pain and a diam, but he himself will stand two diam. I'm going to do it as I'm going to do it but it was but it's going to be a big elitr amet kasd diam two",
      icon: "paintplate",
      button: "read more",
      arrowicon: "right_arrow",
    },
    {
      id: "5",
      image: service_5,
      contenttitle: "Fixing & Support",
      content:
        "Two with pain and a diam, but he himself will stand two diam. I'm going to do it as I'm going to do it but it was but it's going to be a big elitr amet kasd diam two",
      icon: "tool",
      button: "read more",
      arrowicon: "right_arrow",
    },
    {
      id: "6",
      image: service_6,
      contenttitle: "Painting",
      content:
        "Two with pain and a diam, but he himself will stand two diam. I'm going to do it as I'm going to do it but it was but it's going to be a big elitr amet kasd diam two",
      icon: "brush",
      button: "read more",
      arrowicon: "right_arrow",
    },
  ],
};

export const requestCallBackData = {
  header: {
    title: "Request A Call Back",
    highlight: "Call Back",
  },
  description:
    "Nonumy ipsum amet tempor takimata vero ea elitr. Diam diam ut et eos duo duo sed. Lorem elitr sadipscing eos et ut et stet justo, sit dolore et voluptua labore. Ipsum erat et ea ipsum magna sadipscing lorem. Sit lorem sea sanctus eos. Sanctus sit tempor dolores ipsum stet justo sit erat ea, sed diam sanctus takimata sit. Et at voluptua amet erat justo amet ea ipsum eos, eirmod accusam sea sed ipsum kasd ut.",
  buttonText: "Get A Quote",
  formFields: [
    {
      type: "text",
      placeholder: "Your Name",
      style: { height: "55px" },
    },
    {
      type: "email",
      placeholder: "Your Email",
      style: { height: "55px" },
    },
    {
      type: "text",
      placeholder: "Call Back Date",
      style: { height: "55px" },
    },
    {
      type: "text",
      placeholder: "Call Back Time",
      style: { height: "55px" },
    },
    {
      type: "textarea",
      placeholder: "Message",
      rows: 5,
    },
  ],
  submitButtonText: "Submit Request",
};

export const popular = {
  title: "Some Of Our Popular Dream Projects",
  fields: [
    {
      id: "1",
      image: portfolio_1,
      contenttitle: "project name",
      location: "location",
      content: "123 Street, New York, USA",
    },
    {
      id: "2",
      image: portfolio_2,
      contenttitle: "project name",
      location: "location",
      content: "123 Street, New York, USA",
    },
    {
      id: "3",
      image: portfolio_3,
      contenttitle: "project name",
      location: "location",
      content: "123 Street, New York, USA",
    },
    {
      id: "4",
      image: portfolio_4,
      contenttitle: "project name",
      location: "location",
      content: "123 Street, New York, USA",
    },
    {
      id: "5",
      image: portfolio_5,
      contenttitle: "project name",
      location: "location",
      content: "123 Street, New York, USA",
    },
    {
      id: "6",
      image: portfolio_6,
      contenttitle: "project name",
      location: "location",
      content: "123 Street, New York, USA",
    },
  ],
};

export const professional = {
  title: "We Are Professional & Expert Workers",
  fields: [
    {
      id: "1",
      image: team_1,
      contenttitle: "Adam Phillips",
      content: "CEO & Founder",
    },
    {
      id: "2",
      image: team_2,
      contenttitle: "Dylan Adams",
      content: "Civil Engineer",
    },
    {
      id: "3",
      image: team_3,
      contenttitle: "Jhon Doe",
      content: "Interior Designer",
    },
    {
      id: "4",
      image: team_4,
      contenttitle: "Josh Dunn",
      content: "Painter",
    },
  ],
  icons: [
    {
      name: "twitter",
      component: FaTwitter,
    },
    {
      name: "facebook",
      component: FaFacebookF,
    },
    {
      name: "linkedin",
      component: FaLinkedinIn,
    },
    {
      name: "instagram",
      component: FaInstagram,
    },
    {
      name: "youtube",
      component: FaYoutube,
    }
  ],
};

export const tmonials = {
  imgage: testimonial,
  fields: [
    {
      "image": testimonial_1,
      "name": "Client Name",
      "profession": "Profession",
      "icon":'quote',
      "quote": " Dolores sed duo clita tempor justo dolor et stet lorem kasd labore dolore lorem ipsum. At lorem lorem magna ut labore et tempor diam tempor erat. Erat dolor rebum sit ipsum."
      },
    {
      "image": testimonial_2,
      "name": "Client Name",
      "profession": "Profession",
      "icon":'quote',
      "quote":" Dolores sed duo clita tempor justo dolor et stet lorem kasd labore dolore lorem ipsum. At lorem lorem magna ut labore et tempor diam tempor erat. Erat dolor rebum sit ipsum."
     }
  ],
  icons: [
    {
      name: "quote",
      component: FaQuoteLeft,
    }
  ],
};



export const blogPosts = [
  {
    id: 1,
    image: blog_1,
    authorImage: user,
    authorName: "John Doe",
    icon:'calendar',
    date: "01 Jan, 2045",
    title: "Rebum diam clita lorem erat magna est erat",
    button:"read more",
    arrowicon:'right_arrow'
  },
  {
    id: 2,
    image: blog_2,
    authorImage: user,
    authorName: "John Doe",
    icon:'calendar',
    date: "01 Jan, 2045",
    title: "Rebum diam clita lorem erat magna est erat",
    button:"read more",
    arrowicon:'right_arrow'
  },
  {
    id: 3,
    image: blog_3,
    authorImage: user,
    authorName: "John Doe",
    icon:'calendar',
    date: "01 Jan, 2045",
    title: "Rebum diam clita lorem erat magna est erat",
    button:"read more",
    arrowicon:'right_arrow'
  }
];

// data.js
export const footerData = {
  brand: {
    name: "WEBUILD",
    description: "Aliquyam sed elitr elitr erat sed diam ipsum eirmod eos lorem nonumy. Tempor sea ipsum diam sed clita dolore eos dolores magna erat dolore sed stet justo et dolor.",
    address: "123 Street, New York, USA",
    phone: "+012 345 67890",
    email: "info@example.com",
    icon: buildingsIcon
  },
  quickLinks: [
    { text: "Home", link: "/" },
    { text: "About", link: "/about" },
    { text: "Our Services", link: "/service" },
    { text: "Meet The Team", link: "/team" },
    { text: "Contact Us", link: "/contact" }
  ],
  popularLinks: [
    { text: "Home", link: "/" },
    { text: "About Us", link: "/about" },
    { text: "Our Services", link: "/service" },
    { text: "Meet The Team", link: "/team" },
    { text: "Contact Us", link: "/contact" }  
  ],  
  icons: [
    { name: "twitter", component: FaTwitter },
    { name: "facebook", component: FaFacebookF },
    { name: "linkedin", component: FaLinkedinIn },
    { name: "instagram", component: FaInstagram },
    { name: "footerphone", component: FaPhoneAlt },
    { name: "envelope", component: FaEnvelope },
    { name: "angle_right", component: FaAngleRight },
    { name: "location", component: BsGeoAlt },
    { name: 'buildingsIcon', component: Icon, iconData: buildingsIcon },
  ]
};

// data.js
export const footerBottomData = {
  siteName: "Your Site Name",
  designCredit: {
    text: "Designed by",
    link: "http://localhost:3000",
    linkText: "HTML Codex"
  }
};
