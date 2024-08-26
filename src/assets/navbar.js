// src/assets/navbar.js


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
        { to: "/register", label: "register" },
        { to: "/login", label: "login" }
      ],
      // button: {
      //   label:"Get A Quote",
      //   link: ""
      // }
    }
  ];
  