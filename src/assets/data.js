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
} from "react-icons/fa";
import {
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { FaQuoteLeft, FaCalendarAlt } from "react-icons/fa";
import { Icon } from "@iconify/react";
import buildingsIcon from "@iconify/icons-bi/buildings"; // Correct import for Iconify icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"; // Import your icons
import { AiFillDashboard } from "react-icons/ai"; // Import the AiFillDashboard icon
import { FaBars } from "react-icons/fa";
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
  youtube: FaYoutube,
  quote: FaQuoteLeft,
  calendar: FaCalendarAlt,
  footerphone: FaPhoneAlt,
  envelope: FaEnvelope,
  angle_right: FaAngleRight,
  menu: FaBars,
  dashboardicon: AiFillDashboard,
  angleRight: faAngleRight,
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
      { to: "/", label: "Home" },
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
      { to: "/Signin", label: "Signin" }
    ],
    quoteButton: {
      label: "Signup/Login",
      link: "",
    },
  },
];

// signin
export const adminlogin = {
  title: "Admin Login",
  fields: [
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
  button: [{ to: "/admin", label: "Login" }],
};

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
      type: "date",
      placeholder: "Call Back Date",
      style: { height: "55px" },
    },
    {
      type: "time",
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
    },
  ],
};

export const tmonials = {
  imgage: testimonial,
  fields: [
    {
      image: testimonial_1,
      name: "Client Name",
      profession: "Profession",
      icon: "quote",
      quote:
        " Dolores sed duo clita tempor justo dolor et stet lorem kasd labore dolore lorem ipsum. At lorem lorem magna ut labore et tempor diam tempor erat. Erat dolor rebum sit ipsum.",
    },
    {
      image: testimonial_2,
      name: "Client Name",
      profession: "Profession",
      icon: "quote",
      quote:
        " Dolores sed duo clita tempor justo dolor et stet lorem kasd labore dolore lorem ipsum. At lorem lorem magna ut labore et tempor diam tempor erat. Erat dolor rebum sit ipsum.",
    },
  ],
  icons: [
    {
      name: "quote",
      component: FaQuoteLeft,
    },
  ],
};

export const blogPosts = [
  {
    id: 1,
    image: blog_1,
    authorImage: user,
    authorName: "John Doe",
    icon: "calendar",
    date: "01 Jan, 2045",
    title: "Rebum diam clita lorem erat magna est erat",
    button: "read more",
    arrowicon: "right_arrow",
  },
  {
    id: 2,
    image: blog_2,
    authorImage: user,
    authorName: "John Doe",
    icon: "calendar",
    date: "01 Jan, 2045",
    title: "Rebum diam clita lorem erat magna est erat",
    button: "read more",
    arrowicon: "right_arrow",
  },
  {
    id: 3,
    image: blog_3,
    authorImage: user,
    authorName: "John Doe",
    icon: "calendar",
    date: "01 Jan, 2045",
    title: "Rebum diam clita lorem erat magna est erat",
    button: "read more",
    arrowicon: "right_arrow",
  },
];

// data.js
export const footerData = {
  brand: {
    name: "WEBUILD",
    description:
      "Aliquyam sed elitr elitr erat sed diam ipsum eirmod eos lorem nonumy. Tempor sea ipsum diam sed clita dolore eos dolores magna erat dolore sed stet justo et dolor.",
    address: "123 Street, New York, USA",
    phone: "+012 345 67890",
    email: "info@example.com",
    icon: buildingsIcon,
  },
  quickLinks: [
    { text: "Home", link: "/" },
    { text: "About", link: "/about" },
    { text: "Our Services", link: "/service" },
    { text: "Meet The Team", link: "/team" },
    { text: "Contact Us", link: "/contact" },
  ],
  popularLinks: [
    { text: "Home", link: "/" },
    { text: "About Us", link: "/about" },
    { text: "Our Services", link: "/service" },
    { text: "Meet The Team", link: "/team" },
    { text: "Contact Us", link: "/contact" },
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
    { name: "buildingsIcon", component: Icon, iconData: buildingsIcon },
  ],
};

// data.js
export const footerBottomData = {
  siteName: "Your Site Name",
  designCredit: {
    text: "Designed by",
    link: "http://localhost:3000",
    linkText: "HTML Codex",
  },
};

export const professionalteam = {
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
    {
      id: "5",
      image: team_1,
      contenttitle: "Adam Phillips",
      content: "CEO & Founder",
    },
    {
      id: "6",
      image: team_2,
      contenttitle: "Dylan Adams",
      content: "Civil Engineer",
    },
    {
      id: "7",
      image: team_3,
      contenttitle: "Jhon Doe",
      content: "Interior Designer",
    },
    {
      id: "8",
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
    },
  ],
};

export const blogPostsgrid = [
  {
    id: 1,
    image: blog_1,
    authorImage: user,
    authorName: "John Doe",
    icon: "calendar",
    date: "01 Jan, 2045",
    title: "Rebum diam clita lorem erat magna est erat",
    button: "read more",
    arrowicon: "right_arrow",
  },
  {
    id: 2,
    image: blog_2,
    authorImage: user,
    authorName: "John Doe",
    icon: "calendar",
    date: "01 Jan, 2045",
    title: "Rebum diam clita lorem erat magna est erat",
    button: "read more",
    arrowicon: "right_arrow",
  },
  {
    id: 3,
    image: blog_3,
    authorImage: user,
    authorName: "John Doe",
    icon: "calendar",
    date: "01 Jan, 2045",
    title: "Rebum diam clita lorem erat magna est erat",
    button: "read more",
    arrowicon: "right_arrow",
  },
  {
    id: 4,
    image: blog_1,
    authorImage: user,
    authorName: "John Doe",
    icon: "calendar",
    date: "01 Jan, 2045",
    title: "Rebum diam clita lorem erat magna est erat",
    button: "read more",
    arrowicon: "right_arrow",
  },
  {
    id: 5,
    image: blog_2,
    authorImage: user,
    authorName: "John Doe",
    icon: "calendar",
    date: "01 Jan, 2045",
    title: "Rebum diam clita lorem erat magna est erat",
    button: "read more",
    arrowicon: "right_arrow",
  },
  {
    id: 6,
    image: blog_3,
    authorImage: user,
    authorName: "John Doe",
    icon: "calendar",
    date: "01 Jan, 2045",
    title: "Rebum diam clita lorem erat magna est erat",
    button: "read more",
    arrowicon: "right_arrow",
  },
  {
    id: 7,
    image: blog_1,
    authorImage: user,
    authorName: "John Doe",
    icon: "calendar",
    date: "01 Jan, 2045",
    title: "Rebum diam clita lorem erat magna est erat",
    button: "read more",
    arrowicon: "right_arrow",
  },
  {
    id: 8,
    image: blog_2,
    authorImage: user,
    authorName: "John Doe",
    icon: "calendar",
    date: "01 Jan, 2045",
    title: "Rebum diam clita lorem erat magna est erat",
    button: "read more",
    arrowicon: "right_arrow",
  },
  {
    id: 9,
    image: blog_3,
    authorImage: user,
    authorName: "John Doe",
    icon: "calendar",
    date: "01 Jan, 2045",
    title: "Rebum diam clita lorem erat magna est erat",
    button: "read more",
    arrowicon: "right_arrow",
  },
];

export const contactrouter = {
  contactSection: {
    title: "Please Feel Free To Contact Us",
    mapEmbedURL:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001156.4288297426!2d-78.01371936852176!3d42.72876761954724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd",
    formFields: [
      { type: "text", placeholder: "Your Name" },
      { type: "email", placeholder: "Your Email" },
      { type: "text", placeholder: "Subject" },
      { type: "textarea", rows: 4, placeholder: "Message" },
    ],
    buttonText: "Send Message",
  },
};

// data.js
export const blogDatadatail = {
  blogDetail: {
    image: blog_2,
    title:
      "Diam dolor duo ipsum clita sed lorem tempor. Clita kasd diam justo diam lorem sed amet sed rebum eos.",
    content: [
      "Sadipscing labore amet rebum est et justo gubergren. Et eirmod ipsum sit diam ut magna lorem. Nonumy vero labore lorem sanctus rebum et lorem magna kasd...",
      "Voluptua est takimata stet invidunt sed rebum nonumy stet...",
      "Diam dolor est labore duo invidunt ipsum clita et, sed et lorem voluptua tempor invidunt at est sanctus sanctus...",
    ],
  },
  comments: [
    {
      id: 1,
      user: "John Doe",
      date: "01 Jan 2045",
      text: "Diam amet duo labore stet elitr invidunt ea clita ipsum...",
      image: user,
    },
    {
      id: 2,
      user: "Jane Smith",
      date: "02 Jan 2045",
      text: "Sadipscing labore amet rebum est et justo gubergren...",
      image: user,
    },
    {
      id: 3,
      user: "Alex Johnson",
      date: "03 Jan 2045",
      text: "Diam amet duo labore stet elitr invidunt ea clita ipsum...",
      image: user,
    },
  ],
  recentPosts: [
    { id: 1, image: blog_1, title: "Lorem ipsum dolor sit amet consec adipis" },
    { id: 2, image: blog_2, title: "Rebum diam lorem sed amet ipsum est" },
    { id: 3, image: blog_3, title: "Magna est et stet dolor lorem ipsum" },
    { id: 4, image: blog_1, title: "Lorem ipsum dolor sit amet consec adipis" },
    { id: 5, image: blog_2, title: "Rebum diam lorem sed amet ipsum est" },
    { id: 6, image: blog_3, title: "Magna est et stet dolor lorem ipsum" },
  ],
  categories: [
    "Web Design",
    "Web Development",
    "Web Development",
    "Keyword Research",
    "Email Marketing",
  ],
  tags: [
    "Design",
    "Development",
    "Marketing",
    "SEO",
    "Writing",
    "Consulting",
    "Design",
    "Development",
    "Marketing",
    "SEO",
    "Writing",
    "Consulting",
  ],
};

export const plainTextData = {
  title: "Plain Text",
  content:
    "Vero sea et accusam justo dolor accusam lorem consetetur, dolores sit amet sit dolor clita kasd justo, diam accusam no sea ut tempor magna takimata, amet sit et diam dolor ipsum amet diam.",
  buttonText: "Read More",
  buttonLink: "#",
};

export const AdminpanelData = {
  name: "Administration",
  demouserimage: user,
  demousername: "demo user",
  button: "logout",
  fields: [
    {
      id: "1",
      button: "Dashboard",
    },
    {
      id: "2",
      icon: "menu",
      button: "Users",
      dropdown: [
        { id: "1", label: "Add User" },
        { id: "2", label: "Manage User" },
      ],
    },
    {
      id: "3",
      icon: "menu",
      button: "Request",
      dropdown: [
        { id: "2", label: "Manage Request" },
      ],
    },
    {
      id: "4",
      icon: "menu",
      button: "Company",
      dropdown: [
        { id: "1", label: "Add User" },
        { id: "2", label: "Manage User" },
      ],
    },
    {
      id: "5",
      icon: "menu",
      button: "Comments",
      dropdown: [
        { id: "1", label: "Manage Comments" },
      ],
    },
  ],
};

export const UserTable = {
  title: "User List",
  tableHeading: [
    { id: "1", heading: "Image" },
    { id: "2", heading: "User Name" },
    { id: "3", heading: "Date" },
    { id: "4", heading: "Email" },
    { id: "5", heading: "Gender" },
    { id: "6", heading: "Phone no" },
    { id: "7", heading: "City" },
  ],
  Data: [
    {
      id: "1",
      Image: "user",
      UserName: "William",
      Date: "12/3/2002",
      Email: "William12324@gmail.com",
      Gender: "Male",
      PhoneNo: "9973625173",
      City: "selam",
    },
    {
      id: "2",
      Image: "user",
      UserName: "Liam",
      Date: "12/3/2002",
      Email: "Liam5624@gmail.com",
      Gender: "Male",
      PhoneNo: "8632415173",
      City: "erode",
    },
    {
      id: "3",
      Image: "user",
      UserName: " Henry",
      Date: "12/3/2002",
      Email: " Henry98724@gmail.com",
      Gender: "Male",
      PhoneNo: "9965430973",
      City: "selam",
    },
    {
      id: "4",
      Image: "user",
      UserName: "Alice",
      Date: "12/3/2002",
      Email: "AliceWilliam@gmail.com",
      Gender: "Female",
      PhoneNo: "9933334561",
      City: "selam",
    },
    {
      id: "5",
      Image: "user",
      UserName: "Clara",
      Date: "12/3/2002",
      Email: "Clara64537@gmail.com",
      Gender: "Female",
      PhoneNo: "9128964573",
      City: "selam",
    },
    {
      id: "6",
      Image: "user",
      UserName: "Noah",
      Date: "12/3/2002",
      Email: "Noah12555@gmail.com",
      Gender: "Male",
      PhoneNo: "9973625173",
      City: "selam",
    },
    {
      id: "7",
      Image: "user",
      UserName: "Erin",
      Date: "12/3/2002",
      Email: "WilliamErin24@gmail.com",
      Gender: "Female",
      PhoneNo: "9973625173",
      City: "selam",
    },
    {
      id: "8",
      Image: "user",
      UserName: "Daniel",
      Date: "12/3/2002",
      Email: "Danielinfo@gmail.com",
      Gender: "Male",
      PhoneNo: "9973625173",
      City: "selam",
    },
  ],
};
