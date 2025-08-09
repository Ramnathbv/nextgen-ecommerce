import { Router, Request, Response } from "express";
import { requireAuth } from "../middleware/auth";
import { Cart, CartItem } from "../db/sequelize";

export const cartRouter = Router();

// Helpers
const toDecimal = (value: unknown): number => Number.parseFloat(String(value || 0));

const recalcCartTotals = async (cartId: number): Promise<void> => {
  const items = await CartItem.findAll({ where: { cartId } });
  const itemQty = items.length;
  const totalPrice = items.reduce((sum, i) => sum + toDecimal(i.price), 0);
  const selleablePrice = items.reduce((sum, i) => sum + toDecimal(i.selleablePrice), 0);
  const netpayable = items.reduce((sum, i) => sum + toDecimal(i.finalPrice), 0);
  await Cart.update(
    {
      itemQty,
      totalPrice: totalPrice.toFixed(2),
      selleablePrice: selleablePrice.toFixed(2),
      netpayable: netpayable.toFixed(2),
    },
    { where: { id: cartId } }
  );
};

// Get or create user's cart
cartRouter.get("/cart", requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = Number(req.user!.userId);
    let cart = await Cart.findOne({ where: { userId }, include: [{ model: CartItem, as: "items" }] });
    if (!cart) {
      cart = await Cart.create({ userId, itemQty: 0, totalPrice: "0.00", selleablePrice: "0.00", netpayable: "0.00" });
    }
    const items = await CartItem.findAll({ where: { cartId: cart.id } });
    return res.json({ success: true, data: { cart, items } });
  } catch (err) {
    return res.status(500).json({ success: false, error: "Server error" });
  }
});

// Add item to cart
cartRouter.post("/cart/items", requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = Number(req.user!.userId);
    const { productId, price, finalPrice, selleablePrice, couponValue } = req.body || {};
    if (!productId || price == null || finalPrice == null || selleablePrice == null) {
      return res.status(400).json({ success: false, error: "productId, price, finalPrice, selleablePrice are required" });
    }

    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      cart = await Cart.create({ userId, itemQty: 0, totalPrice: "0.00", selleablePrice: "0.00", netpayable: "0.00" });
    }

    await CartItem.create({
      cartId: cart.id,
      productId: Number(productId),
      price: String(price),
      finalPrice: String(finalPrice),
      selleablePrice: String(selleablePrice),
      couponValue: couponValue == null ? null : String(couponValue),
    });

    await recalcCartTotals(cart.id);
    const items = await CartItem.findAll({ where: { cartId: cart.id } });
    return res.status(201).json({ success: true, data: { cart: await Cart.findByPk(cart.id), items } });
  } catch (err) {
    return res.status(500).json({ success: false, error: "Server error" });
  }
});

// Update item (by item id)
cartRouter.patch("/cart/items/:itemId", requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = Number(req.user!.userId);
    const itemId = Number(req.params.itemId);
    const { price, finalPrice, selleablePrice, couponValue } = req.body || {};

    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) return res.status(404).json({ success: false, error: "Cart not found" });

    const item = await CartItem.findOne({ where: { id: itemId, cartId: cart.id } });
    if (!item) return res.status(404).json({ success: false, error: "Item not found" });

    await item.update({
      price: price == null ? item.price : String(price),
      finalPrice: finalPrice == null ? item.finalPrice : String(finalPrice),
      selleablePrice: selleablePrice == null ? item.selleablePrice : String(selleablePrice),
      couponValue: couponValue == null ? item.couponValue : String(couponValue),
    });

    await recalcCartTotals(cart.id);
    const items = await CartItem.findAll({ where: { cartId: cart.id } });
    return res.json({ success: true, data: { cart: await Cart.findByPk(cart.id), items } });
  } catch (err) {
    return res.status(500).json({ success: false, error: "Server error" });
  }
});

// Remove item
cartRouter.delete("/cart/items/:itemId", requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = Number(req.user!.userId);
    const itemId = Number(req.params.itemId);

    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) return res.status(404).json({ success: false, error: "Cart not found" });

    const deleted = await CartItem.destroy({ where: { id: itemId, cartId: cart.id } });
    if (!deleted) return res.status(404).json({ success: false, error: "Item not found" });

    await recalcCartTotals(cart.id);
    const items = await CartItem.findAll({ where: { cartId: cart.id } });
    return res.json({ success: true, data: { cart: await Cart.findByPk(cart.id), items } });
  } catch (err) {
    return res.status(500).json({ success: false, error: "Server error" });
  }
});

// Apply coupon to cart (optional)
cartRouter.post("/cart/coupon", requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = Number(req.user!.userId);
    const { couponCode } = req.body || {};
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) return res.status(404).json({ success: false, error: "Cart not found" });
    await cart.update({ couponCode: couponCode || null });
    await recalcCartTotals(cart.id);
    const items = await CartItem.findAll({ where: { cartId: cart.id } });
    return res.json({ success: true, data: { cart: await Cart.findByPk(cart.id), items } });
  } catch (err) {
    return res.status(500).json({ success: false, error: "Server error" });
  }
});

