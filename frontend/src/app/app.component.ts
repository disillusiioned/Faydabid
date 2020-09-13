import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product, Stock, Warehouse } from './models/app.model';
import { FormGroup, NgModel } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  warehouse: Warehouse = new Warehouse();
  warehouseErrorMessage: string = null;
  newWarehouse = false;
  products: Product[];
  showList = true;
  showProduct = false;
  currentProduct: Product;
  productChanges: any = {
    ITEM_COUNT: null,
    LOW_ITEM_THRESHOLD: null
  };
  errorMessage: string;
  stocks: Stock[];
  tableData: any;
  warehouses: Warehouse[];
  @ViewChild('productEditForm') productEditForm: FormGroup;
  @ViewChild('createWarehouseForm') createWarehouseForm: FormGroup;
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
        this.tableData[prodIndex] = {
          ... this.tableData[prodIndex], [stock.WH_CODE]:
            { count: stock.ITEM_COUNT, threshold: stock.LOW_ITEM_THRESHOLD }
        };
      });
      console.log(this.tableData);
      this.showList = true;
      this.newWarehouse = false;
      this.errorMessage = null;
      if (!!this.productChanges) {
        this.productChanges.ITEM_COUNT = null;
        this.productChanges.LOW_ITEM_THRESHOLD = null;
      }
      this.warehouse = new Warehouse();
      this.warehouseErrorMessage = null;
      this.currentProduct = null;
      this.showProduct = false;
    },
      err => {
        console.log(err);
      });
  }

  toggleProduct(product: Product) {
    this.showList = false;
    this.showProduct = true;
    this.newWarehouse = false;
    this.currentProduct = product;
  }

  saveProductDetails() {
    if (this.productEditForm.valid) {
      console.log(this.productChanges);
      this.productChanges = { ...this.productChanges, SKU_CODE: this.currentProduct.SKU_CODE };
      const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
      this.httpClient.post('http://localhost:1337/setProductInfo', JSON.stringify(this.productChanges), config).subscribe(
        res => {
          console.log('Done');
          this.getStock();
        },
        err => {
          this.errorMessage = 'Operation could not be completed. Please try after sometime.';
        }
      );
    }
  }

  showRed(product: any, wh_code: any) {
    if (product[wh_code] &&
      (product[wh_code].count < product[wh_code].threshold)) {
      return true;
    }

    return false;
  }

  createWarehouse() {
    this.showProduct = false;
    this.showList = false;
    this.newWarehouse = true;
  }

  saveWarehouse() {
    if (this.createWarehouseForm.valid) {
      console.log(this.warehouse);
      const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
      const data = { ...this.warehouse, products: this.products, WH_CODE: this.makeid(8) };
      this.httpClient.post('http://localhost:1337/createWarehouse', JSON.stringify(data), config).subscribe(
        res => {
          console.log('Done');
          setTimeout(() => {
            this.getStock();
          }, 1000)
        },
        err => {
          this.warehouseErrorMessage = 'Operation could not be completed. Please try after sometime.';
        }
      );
    }

  }

  makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

}
