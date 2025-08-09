import { Router, Request, Response } from "express";
import { requireAuth } from "../middleware/auth";
import { Cart, CartItem } from "../db/sequelize";

export const checkoutRouter = Router();

// Simple checkout that reads current cart totals from DB
checkoutRouter.post("/checkout", requireAuth, async (req: Request, res: Response) => {
  try {
    const user = req.user!;
    const userId = Number(user.userId);
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      return res.status(400).json({ success: false, error: "Cart is empty" });
    }
    const items = await CartItem.findAll({ where: { cartId: cart.id } });
    if (items.length === 0) {
      return res.status(400).json({ success: false, error: "Cart is empty" });
    }

    const subtotal = Number(cart.totalPrice);
    const shipping = 0;
    const tax = Math.round(subtotal * 0.08 * 100) / 100;
    const total = Math.round((subtotal + shipping + tax) * 100) / 100;

    const orderId = `ord_${Date.now()}`;
    return res.json({
      success: true,
      data: {
        orderId,
        user: { userId: user.userId || user.guestId, email: user.email || null },
        currency: "USD",
        subtotal,
        shipping,
        tax,
        total,
        items: items.map((i) => ({
          id: i.id,
          productId: i.productId,
          price: Number(i.price),
          finalPrice: Number(i.finalPrice),
          selleablePrice: Number(i.selleablePrice),
          couponValue: i.couponValue == null ? null : Number(i.couponValue),
        })),
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: "Server error" });
  }
});


