const fs = require("fs");
const path = require("path");

class ProductManager {
  constructor() {
    this.products = [];
    this.file = path.join(__dirname, "products.json");
  }
  async getProdutcs() {
    if (fs.existsSync(this.file)) {
      let data = await fs.promises.readFile('products.json');
      let result = JSON.parse(data)
      return result;
    }
    else {
      await fs.promises.writeFile("products.json", JSON.stringify([], null, 2))
      let data = await fs.promises.readFile('products.json');
      let resultado = JSON.parse(data)
      return resultado;
    }

  }


  async addProducts(product) {
    let data = await this.getProdutcs();
    if (data.length > 0) {
      let newId = data[data.length - 1].id + 1;
      const newProduct = {
        id: newId,
        ...product
      };

      data.push(newProduct);
      await fs.promises.writeFile('products.json', JSON.stringify(data, null, 2))
      return newProduct.id
    } else {
      const newProduct = {
        id: 1,
        ...product
      };

      data.push(newProduct);
      await fs.promises.writeFile('products.json', JSON.stringify(data, null, 2))
      return newProduct.id

    }
  }

  async getProdutcsById(id) {
    let data = await this.getProdutcs();
    let byId = data.find(product => product.id == id);
    return byId;
  }

  async updateProduct(id, upgrade) {
    let data = await this.getProdutcs();
    let update = [];
    data.forEach(product => {
      if (product.id == id) {
        let Uproduct = { id: id, ...upgrade }
        update.push(Uproduct);
      } else {
        update.push(product)
      }
    }
    );

    await fs.promises.writeFile('products.json', JSON.stringify(update, null, 2))

  }

  async deleteProduct(id) {
    let data = await this.getProdutcs();
    let Delete = data.filter(product => product.id != id);
    await fs.promises.writeFile('products.json', JSON.stringify(Delete, null, 2))
  }


}

let product1 = {
  title: "Fender",
  description: "stratocaster",
  price: 500,
  thumbnail: "sin imagen",
  code: "3asd",
  stock: 3
}



let product = new ProductManager();
//product.fileExists();
async function exe() {
  //await product.addProducts(product1);
  //console.log(await product.getProdutcsById(3));


  /* await product.updateProduct(3, {
    title: "Fender",
    description: "stratocaster",
    price: 700,
    thumbnail: "sin imagen",
    code: "4basd",
    stock: 12
  }); */

  //await product.deleteProduct(1);
}

exe();