import { sql } from "../config/connectDB.js";

export const getProducts = async (req, res) => {
  try {
    const products = await sql`
        SELECT * FROM products
        ORDER BY created_at DESC
        `;
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};



export const createProduct = async (req, res) => {
    const { name,price,image, description } = req.body;
      const defaultDescription = 'High-quality product designed to meet your needs. Crafted with premium materials and attention to detail, this item offers excellent value and durability. Perfect for everyday use or as a thoughtful gift.';
      const finalDescription = description && description.trim() !== '' ? description : defaultDescription;
    try {
        const newProduct = await sql`
        INSERT INTO products (name, price, image, description)
        VALUES (${name}, ${price}, ${image}, ${finalDescription})
        RETURNING *
        `;
        res.status(201).json({success:true, data: newProduct, message: "Product created successfully"});
    } catch (error) {
        res.status(500).json({success:false, message: "Internal server error"})
    }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await sql`
    SELECT * FROM products WHERE id=${id}
    `;
    res.status(200).json({ success: true, data: product[0] });
  } catch (error) {
    res.status(500).json({ success:false, message:error })
  }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name,price,image } = req.body;

    try {
        const updatedProduct = await sql`
        UPDATE products
        SET name = ${name}, price = ${price}, image = ${image}
        WHERE id = ${id}
        RETURNING *
        `
        res.status(200).json({success:true, data: updatedProduct[0], message: "Product updated successfully"});

    } catch (error) {
        res.status(500).json({success:false, message: "Internal server error"})
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
       const deletedProduct = await sql`
        DELETE FROM products
        WHERE id = ${id}
        RETURNING *
        `
        res.status(200).json({success:true, data: deletedProduct, message: "Product deleted successfully"});
    } catch (error) {
        res.status(500).json({success:false, message: "Internal server error"})
    }
};
