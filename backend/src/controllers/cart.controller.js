import Product from '../models/product.model.js';

export async function getCartProducts(req, res) {
  try {
    const products = await Product.find({
      _id: { $in: req.user.cartItems.map((item) => item.product) },
    });

    // adding quantities from user cartItem to products
    const cartItems = products.map((product) => {
      const item = req.user.cartItems.find((cartItem) => {
        return cartItem.product.toString() === product._id.toString();
      });
      return { ...product.toJSON(), quantity: item.quantity };
    });

    res.status(200).json({ status: 'success', result: cartItems });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}

export async function addToCart(req, res) {
  try {
    const { productId } = req.body;
    const user = req.user;

    const existingItem = user.cartItems.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push({ product: productId, quantity: 1 });
    }

    await user.save();

    res.status(200).json({ status: 'success', result: user.cartItems });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}

// this removes all items from cart if no productId is provided OR removes specific item based on productId provided
export async function removeAllFromCart(req, res) {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter(
        (item) => item.product.toString() !== productId.toString()
      );
    }

    await user.save();

    res.status(200).json({ status: 'success', result: user.cartItems });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}

export async function updateQuantity(req, res) {
  try {
    const { productId } = req.params;

    const { quantity } = res.body;
    const user = req.user;

    const existingItem = user.cartItems.find((item) => item.id === productId);

    if (existingItem) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter((item) => item.id !== productId);
        await user.save();
        return res
          .status(200)
          .json({ status: 'success', result: user.cartItems });
      }
      existingItem.quantity = quantity;
      await user.save();
      res.status(200).json({ status: 'success', result: user.cartItems });
    } else {
      res.status(404).json({ status: 'fail', message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}
