import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, Stock, Warehouse } from './models/app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  products: Product[];
  showList = true;
  showProduct = false;
  currentProduct: Product;
  stocks: Stock[];
  tableData: any;
  warehouses: Warehouse[];
  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.getProducts();
    this.getStock();
    this.getWarehouses();
  }

  getProducts() {
    this.httpClient.get<Product[]>('http://localhost:1337/getProducts')
      .subscribe((res: Product[]) => {
        this.products = res;
      },
        err => {
          console.log(err);
        });
  }

  getWarehouses() {
    this.httpClient.get<Warehouse[]>('http://localhost:1337/getWarehouses')
      .subscribe((res: Warehouse[]) => {
        this.warehouses = res;
      },
        err => {
          console.log(err);
        });
  }

  getStock() {
    this.httpClient.get<Stock[]>('http://localhost:1337/getStock').subscribe((res: Stock[]) => {
      this.stocks = res;
      this.tableData = this.products;
      this.stocks.map(stock => {
        const prodIndex = this.tableData.findIndex(data => data.SKU_CODE === stock.SKU_CODE);
        this.tableData[prodIndex] = { ... this.tableData[prodIndex], [stock.WH_CODE]: stock.ITEM_COUNT };
      });
    },
      err => {
        console.log(err);
      });
  }

  toggleProduct(product: Product) {
    this.showList = false;
    this.showProduct = true;
    this.currentProduct = product;
  }


}
