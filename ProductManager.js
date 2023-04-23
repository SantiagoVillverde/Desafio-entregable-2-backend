const fs = require('fs');

class Product {
constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
}
}

class ProductManager {
constructor(path) {
this.path = path;
    this.products = [];
    this.nextId = 1;
    this.loadProducts();
}

addProduct(product) {
    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
    console.log('All fields are required');
    return;
    }

    if (this.getProductByCode(product.code)) {
    console.log('Product code already exists');
    return;
    }

    const newProduct = new Product(product.title, product.description, product.price, product.thumbnail, product.code, product.stock);
    newProduct.id = this.nextId++;
    this.products.push(newProduct);
    this.saveProducts();
}

getProductById(id) {
    const product = this.products.find(product => product.id === id);
    if (!product) {
    console.log('Product not found');
    }
    return product;
}

getProductByCode(code) {
    const product = this.products.find(product => product.code === code);
    return product;
}

updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
    console.log('Product not found');
    return;
    }

    const updatedProduct = { ...this.products[productIndex], ...updatedFields };
    this.products[productIndex] = updatedProduct;
    this.saveProducts();
}

deleteProduct(id) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
    console.log('Product not found');
    return;
    }

    this.products.splice(productIndex, 1);
    this.saveProducts();
}

getProducts() {
    return this.products;
}

saveProducts() {
    fs.writeFileSync(this.path, JSON.stringify(this.products), 'utf-8');
}

loadProducts() {
    try {
    const data = fs.readFileSync(this.path, 'utf-8');
    this.products = JSON.parse(data);
    this.nextId = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
    } catch (err) {
    console.log('Error loading products');
    }
}
}

module.exports = { Product, ProductManager };

