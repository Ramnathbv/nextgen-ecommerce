import { Sequelize, DataTypes, Model, Optional, ModelStatic } from "sequelize";
import mysql from "mysql2/promise";

export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserCreationAttributes = Optional<UserAttributes, "id" | "createdAt" | "updatedAt">;

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

export let sequelize: Sequelize | null = null;
export let User: ModelStatic<UserInstance>;
export interface CartAttributes {
  id: number;
  userId: number;
  itemQty: number;
  totalPrice: string; // DECIMAL returned as string by default
  selleablePrice: string; // DECIMAL returned as string by default
  netpayable: string; // DECIMAL returned as string by default
  couponCode?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CartCreationAttributes = Optional<
  CartAttributes,
  "id" | "itemQty" | "totalPrice" | "selleablePrice" | "netpayable" | "couponCode" | "createdAt" | "updatedAt"
>;

export interface CartInstance
  extends Model<CartAttributes, CartCreationAttributes>,
    CartAttributes {}

export let Cart: ModelStatic<CartInstance>;

export interface CartItemAttributes {
  id: number;
  cartId: number;
  productId: number;
  price: string; // DECIMAL as string
  finalPrice: string; // DECIMAL as string
  selleablePrice: string; // DECIMAL as string
  couponValue?: string | null; // DECIMAL as string or null
  createdAt?: Date;
  updatedAt?: Date;
}

export type CartItemCreationAttributes = Optional<
  CartItemAttributes,
  "id" | "couponValue" | "createdAt" | "updatedAt"
>;

export interface CartItemInstance
  extends Model<CartItemAttributes, CartItemCreationAttributes>,
    CartItemAttributes {}

export let CartItem: ModelStatic<CartItemInstance>;

const getDbConfig = () => {
  return {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "nextgen_commerce",
  };
};

export const initSequelize = async (): Promise<void> => {
  const { host, port, user, password, database } = getDbConfig();

  // Ensure database exists using mysql2 direct connection
  const admin = await mysql.createConnection({ host, port, user, password });
  await admin.query(
    `CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
  );
  await admin.end();

  sequelize = new Sequelize(database, user, password, {
    host,
    port,
    dialect: "mysql",
    logging: false,
  });

  User = (sequelize as Sequelize).define<UserInstance>(
    "User",
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      passwordHash: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "password",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "created_at",
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "updated_at",
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "users",
      modelName: "User",
      underscored: true,
    }
  );

  Cart = (sequelize as Sequelize).define<CartInstance>(
    "Cart",
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        field: "user_id",
      },
      itemQty: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        field: "item_qty",
      },
      totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: "0.00",
        field: "total_price",
      },
      selleablePrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: "0.00",
        field: "selleable_price",
      },
      netpayable: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: "0.00",
        field: "netpayable",
      },
      couponCode: {
        type: DataTypes.STRING(64),
        allowNull: true,
        field: "coupon_code",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "created_at",
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "updated_at",
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "cart",
      modelName: "Cart",
      underscored: true,
    }
  );

  CartItem = (sequelize as Sequelize).define<CartItemInstance>(
    "CartItem",
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      cartId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        field: "cart_id",
      },
      productId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        field: "product_id",
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      finalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: "final_price",
      },
      selleablePrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: "selleable_price",
      },
      couponValue: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        field: "coupon_value",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "created_at",
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "updated_at",
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "cart_item",
      modelName: "CartItem",
      underscored: true,
    }
  );

  // Associations (use attribute names for foreignKey)
  Cart.hasMany(CartItem, { foreignKey: "cartId", sourceKey: "id", as: "items" });
  CartItem.belongsTo(Cart, { foreignKey: "cartId", targetKey: "id", as: "cart" });

  await sequelize.sync();
};


