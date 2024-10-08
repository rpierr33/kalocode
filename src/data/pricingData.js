export const getAssetsAndData = () => {
  const PricingTypes = [
    {
      id: 1,
      month: 12,
      title: "Personal",
      tagline: "We Think Ahead",
      services: [
        "Mobile-Optimized",
        "Free Custom Domain",
        "Best Hosting",
        "Outstanding Support",
        "Happy Customers",
      ],
    },
    {
      id: 2,
      month: 37,
      title: "Business",
      tagline: "Special Offer",
      services: [
        "Mobile-Optimized",
        "Free Custom Domain",
        "Best Hosting",
        "Outstanding Support",
        "Happy Customers",
      ],
    },
    {
      id: 3,
      month: 78,
      title: "Enterprise",
      tagline: "Our Best Solution",
      services: [
        "Mobile-Optimized",
        "Free Custom Domain",
        "Best Hosting",
        "Outstanding Support",
        "Happy Customers",
      ],
    },
  ];

  const serviceComparison = [
    { service: "Mobile-Optimized", basic: true, regular: true, premium: true },
    {
      service: "Free Custom Domain",
      basic: false,
      regular: true,
      premium: true,
    },
    { service: "Best Hosting", basic: false, regular: true, premium: true },
    {
      service: "Outstanding Support",
      basic: false,
      regular: false,
      premium: true,
    },
    { service: "Happy Customers", basic: false, regular: false, premium: true },
  ];

  const images = {
    checkIcon: "/assets/p5-check-icon-img.webp",
  };

  const textContent = {
    heading: "Perfect Integration",
    paragraph:
      "Ut venenatis aliquam pellentesque. Phasellus a scelerisque augue non enim etiam non enim varius, vehicula nisi interdum, molestie.",
  };

  return { PricingTypes, serviceComparison, images, textContent };
};
