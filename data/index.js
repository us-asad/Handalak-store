import slideImg1 from "public/main-slider/1.png";
import slideImg2 from "public/main-slider/2.jpeg";
import slideImg3 from "public/main-slider/3.jpeg";
import slideImg4 from "public/main-slider/4.jpeg";
import slideImg5 from "public/main-slider/5.jpeg";

export const languages = [
  {
    name: "O'zb",
    code: "uz",
    image: "/uz-flag.svg"
  }
];

export const mainSlideImages = [
  {
    image: slideImg1,
    destination: "/category/knigi"
  },
  {
    image: slideImg2,
    destination: "/page/payment-and-delivery"
  },
  {
    image: slideImg3,
    destination: "/category/avtomobilnye-aksessuary"
  },
  {
    image: slideImg4,
    destination: "/page/usloviya-rassrochki"
  },
  {
    image: slideImg5,
    destination: "/page/payment-and-delivery"
  }
];

export const getFormattedPrice = p => {
  if (!p) return "";

  const price = typeof p === "number" ? p.toString() : p;
  const reversed = price.split("").reverse();
  const priceArray = [];
  
  for (let i = 0; i < reversed.length;) {
    priceArray.push(`${reversed.splice(i, 3).reverse().join("")} `);
  }

  return priceArray.reverse().join("").trim();
}

export const info_navitems = [
  {
    name: "Biz haqimizda",
    destination: "/"
  },
  {
    name: "Eco-friendly",
    destination: "/"
  },
  {
    name: "Bo'sh ish o'rinlari",
    destination: "/"
  },
  {
    name: "Shaxsiy ma'lumotlar bilan ishlash bo'yicha Siyosat",
    destination: "/"
  },
  {
    name: "Ommaviy oferta",
    destination: "/"
  },
  {
    name: "To'lov va yetkazib berish",
    destination: "/"
  },
  {
    name: "To'lovni qaytarish va tovarlarni almashtirish",
    destination: "/"
  },
  {
    name: "Bonus va aksiyalar",
    destination: "/"
  },
  {
    name: "Muddatli to'lov shartlari",
    destination: "/"
  },
  {
    name: "Servis markazlar",
    destination: "/"
  },
  {
    name: "Onlayn to'lash",
    destination: "/"
  }
]

export const about_navitems = [
  {
    name: "Fikr qoldiring",
    destination: "/"
  },
  {
    name: "Kontaklar",
    destination: "/"
  },
  {
    name: "Manzil",
    destination: "/"
  },
  {
    name: "Info@olcha.uz",
    destination: "/"
  }
]

export const payment_systems = [
  {
    img: {
      src: "/payment/apelsin.png",
      alt: "Apelsin Olcha"
    },
    url: "https://apelsin.uz"
  },
  {
    img: {
      src: "/payment/uzcard.png",
      alt: "Uzcard"
    },
    url: "https://uzcard.uz"
  },
  {
    img: {
      src: "/payment/payme.png",
      alt: "Payme"
    },
    url: "https://payme.uz"
  },
  {
    img: {
      src: "/payment/click.png",
      alt: "Click"
    },
    url: "https://click.uz"
  },
  {
    img: {
      src: "/payment/humo.jpeg",
      alt: "Humo"
    },
    url: "https://humocard.uz"
  },
  {
    img: {
      src: "/payment/paynet.png",
      alt: "Paynet"
    },
    url: "https://app.paynet.uz"
  }
]

export const sortList = [
  {
    name: "Avval arzonlari",
    sort_by: "price"
  },
  {
    name: "Avval qimmatlari",
    sort_by: "-price"
  },
  {
    name: "Yangilari",
    sort_by: "new"
  },
  {
    name: "Chegirmada",
    sort_by: "discount"
  }
];

export const prdDetailSections = [
  {
    name: "Tavsifi",
    slug: undefined,
    icon: "document"
  },
  {
    name: "Ma'lumotlar",
    slug: "info",
    icon: "info"
  },
  {
    name: "Izohlar",
    slug: "comments",
    icon: "star"
  }
];

export const mobile_navitems = [
  {
    name: "Bosh sahifa",
    slug: "/",
    icon: "home"
  },
  {
    name: "Katalog",
    slug: "/category",
    icon: "apps"
  },
  {
    name: "Savatcha",
    slug: "/cart",
    icon: "basket"
  },
  {
    name: "Profil",
    slug: "/cabinet",
    icon: "user"
  }
]

export const toggleBodyOverflow = () => {
  document.body.style.overflow = document.body.style.overflow === "hidden" ? "auto" : "hidden";
}

export const getRating = comments => Math.floor(comments?.reduce(({rating: prevValue}, {rating: currValue}) => prevValue + currValue)) / comments.length;

export const getDiscountedPrice = (price, discount) => (discount ? price - (price * (discount / 100)) : price).toFixed(0);
