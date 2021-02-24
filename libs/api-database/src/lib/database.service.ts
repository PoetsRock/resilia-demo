import { Injectable, Logger } from '@nestjs/common';
import { Db, MongoClient, MongoClientOptions } from 'mongodb';

export interface DbConnectionConfigs {
  uri: string;
  port: number;
  dbName: string;
  options: MongoClientOptions;
}

@Injectable()
export class DatabaseService {
  private readonly logger: Logger = new Logger(DatabaseService.name);
  private _db!: Db;

  public get db(): Db {
    return this._db;
  }

  public constructor() {
    this.dbConnection()
      .then((db: Db) => {
        this._db = db;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  protected async dbConnection(
    dbConnectionConfigs?: DbConnectionConfigs,
  ): Promise<Db> {
    try {
      const uri = dbConnectionConfigs?.uri || 'mongodb://localhost';
      const port = dbConnectionConfigs?.port || 27017;
      const dbName = dbConnectionConfigs?.dbName || 'resilia';
      const options = dbConnectionConfigs?.options || {};
      const dbOptions: MongoClientOptions = Object.assign(
        {},
        {
          useUnifiedTopology: true,
        },
        options,
      );
      const client = await MongoClient.connect(`${uri}:${port}`, dbOptions);

      this._db = client.db(dbName);
      return this._db;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
