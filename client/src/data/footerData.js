export const getFooterData = () => {
  return {
    companyInfo: {
      description:
        "Lorem ipsum dolor sit amet, consy ect etur adipisc de elit. Quisque act raqum nunc no dolor sit de amet.",
      logoUrl: "/assets/logo2.webp",
      socialLinks: [
        { icon: "Twitter", color: "black", link: "https://twitter.com" },
        { icon: "Facebook", color: "black", link: "https://facebook.com" },
        { icon: "Instagram", color: "black", link: "https://instagram.com" },
      ],
    },
    contactInfo: {
      addressLine1: "113 Fulton Street, Suite 721",
      addressLine2: "New York, NY 10010",
      email: "foton@qodeinteractive.com",
      phone: "+88 (0) 101 0000 000",
      addressLink:
        "https://www.google.com/maps/search/113+Fulton+Street,+Suite+721,+New+York,+NY+10010",
      emailLink: "mailto:foton@qodeinteractive.com",
      phoneLink: "tel:+881010000000",
    },
    supportDownloads: {
      description:
        "Quisque actraqum nunc no dolor sit ametaugue dolor. Lorem ipsum dolor sit amet, consyect etur.",
      appleStoreImage: "/assets/footer-icon1.webp",
      googlePlayImage: "/assets/footer-icon2.webp",
    },
    bottomText: "© 2018 Qode Interactive, All Rights Reserved",
  };
};
