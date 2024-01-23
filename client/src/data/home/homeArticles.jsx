import img1 from "../../assets/images/home-article-img-1.jpg";
import img2 from "../../assets/images/home-article-img-2.jpg";
import img3 from "../../assets/images/home-article-img-3.jpg";

const homeArticles = [
  {
    id: 1,
    image: `${img1}`,
    alt: "pharmacy staff helping customer",
    text: "We take pride in finding solutions for healthcare professionals and their patients when licensed medicines are in short supply or when there isn't a UK licensed product available to meet their requirements. This can often necessitate importing a medicine from outside the UK that is licensed in the country of origin. We have a skilled and experienced team offering an exceptional level of customer service, to ensure we can provide access to viable solutions to maintain patient treatment.",
    animate: "zoom-in-right",
  },
  {
    id: 2,
    image: `${img2}`,
    alt: "hospital staff shaking hands with patient",
    text: "We have a strong network of global suppliers and pharmaceutical manufacturers and excellent working relationships with several UK specials laboratories from whom we can service the needs of our customers. We have access to over 1,000 imported medicines and can work with NHS customers to hold sufficient stock levels to ensure consistency of supply. We provide cost-effective medicines to a wide, variety of customers including NHS & private hospitals, wholesalers and community pharmacies.",
    animate: "zoom-in-left",
  },
  {
    id: 3,
    image: `${img3}`,
    alt: "warehouse staff",
    text: " We consider ourselves dynamic and agile and can respond to our customer's needs immediately.",
    animate: "zoom-in-right",
  },
];

export default homeArticles;
