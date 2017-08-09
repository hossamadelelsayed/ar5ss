import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {SQLiteObject, SQLite} from "@ionic-native/sqlite";
import {CommonService} from "./common-service";
import {CustomerService} from "./customer-service";

/*
  Generated class for the DbServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DbService {
  public  db: SQLiteObject = null;
  public readonly favoriteTable : string = "Favorite" ;

  constructor( public sqlite : SQLite ) {
    console.log('Hello DbServiceProvider Provider');
  }
  openOrCreateSQLiteDB(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((dbObj: SQLiteObject) => {
      this.db = dbObj ;
    }).catch(e => console.log(e));
  }
  createFavoriteTable() : Promise <any>
  {
    return this.db.executeSql(`CREATE TABLE Favorite(
                              FavoritID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL ,
                              UserID    INTEGER NOT NULL,
                              TokenID   TEXT    DEFAULT NULL,
                              ProductID INTEGER NOT NULL ,
                              ProductName TEXT NOT NULL ,
                              Rate INTEGER NOT NULL ,
                              Image TEXT NOT NULL
                            )`, {});

  }
  checkIfTableExist(table_name : string) : Promise<any>
  {
    return this.db.executeSql(`SELECT name FROM sqlite_master WHERE type='table' AND name='${table_name}'` , {});
  }
  execFavLocalInsertion(UserID : number, TokenID: string , ProductID : number, ProductName : string, Rate : number, Image: string): Promise<any>
  {
    return this.db.executeSql(`INSERT INTO Favorite (UserID,TokenID,ProductID,ProductName,Rate,Image)
                        VALUES (${UserID}, '${TokenID}', ${ProductID}, '${ProductName}',${Rate},'${Image}')`,{});
  }
  execFavLocalGet() : Promise<any>
  {
    return this.db.executeSql(`SELECT * FROM Favorite` , {});
  }
}
