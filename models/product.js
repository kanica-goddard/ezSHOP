const products = {
  fakeDB: [],

  init() {
    this.fakeDB.push({
      title: "Acer Aspire 7 Ultra Slim 15.6",
      price: `CDN$ 1,499.99`,
      imgSrc: `prod1.jpg`,
      isBestSeller: true
    });

    this.fakeDB.push({
      title: "Canon EOS M100 EF-M 15-45mm",
      price: `CDN$ 376.22`,
      imgSrc: `prod2.jpg`,
      isBestSeller: false
    });

    this.fakeDB.push({
      title: "Kobo Clara HD-6 E-Reader",
      price: `CDN$ 139.95`,
      imgSrc: `prod3.jpg`,
      isBestSeller: true
    });

    this.fakeDB.push({
      title: "Fast Wireless Charging Stand",
      price: `CDN$ 25.49`,
      imgSrc: `prod4.jpg`,
      isBestSeller: true
    });

    this.fakeDB.push({
      title: "Bluetooth AII0 5.0 Earbuds",
      price: `CDN$ 24.99`,
      imgSrc: `prod5.jpg`,
      isBestSeller: false
    });

    this.fakeDB.push({
      title: "Waterproof Activity Tracker",
      price: `CDN$ 36.99`,
      imgSrc: `prod6.jpg`,
      isBestSeller: true
    });
  },

  getAllProducts() {
    return this.fakeDB;
  },

  getBestSellingProducts() {
    return this.fakeDB.filter(product => {
      return product.isBestSeller == true;
    });
  }
};

products.init();
module.exports = products;
